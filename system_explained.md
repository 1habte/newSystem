# System Explained — Ethiopian Passport Booking Automation

This document explains **every file, every function, and every configurable value** in this system.

The system has two independent processes that must both be running at the same time before running the booking bot:

| Process | Command | What it does |
|---|---|---|
| **Telegram Bot** | `node cert.js` | Receives applicant photos via Telegram and saves them to disk |
| **PDF Flask API** | `python a.py` | Listens for PDF generation requests from Node.js |
| **Booking Bot** | `node bot_copy.js` | Connects to immigration server and completes bookings |

---

## 📁 Root-Level Files

---

### `bot_copy.js` — The WebSocket Entry Point

This is the **main script you run to book passports**. It is the front door of the entire system.

**What it does, line by line:**

1. **Opens a WebSocket connection** to the immigration server at `wss://www.immigration.gov.et:18443`
   - `rejectUnauthorized: false` ignores SSL certificate errors (needed for some network setups)
2. **Registers an error handler** — if the connection times out or fails, it logs cleanly instead of crashing
3. **On connection open:**
   - Clears the console
   - Starts a **ping every 10 seconds** to keep the connection alive
   - Immediately calls `StartBooking(ws, 0, people.length)` — kicks off booking for everyone in `ppl.js`
4. **Listens for incoming messages** from the server:
   - Every server response has the format `true,{JSON}` or `false,{JSON}`
   - It splits on the first comma, parses the JSON, and extracts the UUID from `data.Id`
   - Looks up which step that UUID belongs to via `state.objOfIds`
   - If `"true"` → calls the correct handler function
   - If `"false"` → the step failed, logs it in red

> **Key Variable:**
> `const WS_URL = "wss://www.immigration.gov.et:18443";`
> Change to an IP address if the domain is blocked: `wss://196.188.63.66:18443`

---

### `cert.js` — The Telegram Photo Bot

This script runs **continuously** to receive applicant photos via Telegram and save them as numbered JPG files into the `cirt/` folder.

**How it works:**
1. Connects to Telegram using `Telegraf` library with a hardcoded bot token
2. Listens for any photo sent to the bot
3. Uses a **promise queue** (`processingQueue`) so multiple photos sent at once are handled one-by-one — prevents race conditions in file naming
4. For each photo:
   - Gets the highest-resolution version
   - Checks the `cirt/` folder and finds the **next sequential number** (0, 1, 2, 3...)
   - Downloads the photo from Telegram's servers
   - Saves it as `{index}.jpg` inside `cirt/`
   - Replies to the sender confirming the save

**`getNextIndex(dir)`** — Reads all files in `cirt/`, parses their names as numbers, returns `highest + 1`. Returns `0` if folder is empty.

> **Key Dynamic Values:**
> - `BOT_TOKEN` — The Telegram bot API token. Replace if you create a new bot.
> - `SAVE_DIR` — Auto-derived from `BASE_DIR` in `handlers.js`. Points to `newSystem\cirt\`.

---

### `mcrypto.js` — The Encryption/Decryption Engine

This is the **crypto core**. The immigration server encrypts all business data (B2B payloads) using AES-256-CBC. This file replicates the exact same crypto the website's frontend uses, so the server accepts requests as if they came from a real browser.

**The Hardcoded Key Arrays:**
```
KEY_LEFT  / KEY_RIGHT  — Two arrays of 32 numbers each (derive the AES key)
IV_LEFT   / IV_RIGHT   — Two arrays of 24 numbers each (derive the AES IV)
```
These were extracted from the immigration website's JavaScript bundle.

**`xorAscii(left, right)`** — XORs corresponding numbers from left/right arrays, converts the result to an ASCII string. This is how the real KEY and IV are derived without storing them in plain text.

**`deriveSeedStrings()`** — Calls `xorAscii` to get `keySeed` (AES key as Base64) and `ivSeed` (AES IV as Base64).

**`deriveKeyAndIv()`** — Decodes seeds from Base64 into raw `Buffer` objects that Node.js `crypto` can use directly.

**`compressWithPythonBzip2(inputBuffer)`** — Before encrypting, data is BZip2-compressed. JavaScript has no good native BZip2 compressor, so this spawns a Python subprocess (`python -c "import bz2, sys..."`) to compress the data. It tries multiple Python interpreter paths in order:
1. `%LOCALAPPDATA%\Python\bin\python.exe`
2. `%PYTHON%` env variable
3. `python`
4. `py -3`

**`encryptStrict(plainText)`** — Full encryption pipeline:
1. BZip2-compress using Python
2. Base64-encode the compressed bytes
3. AES-256-CBC encrypt
4. Return result as Base64 string

**`decryptStrict(cipherText)`** — Full decryption pipeline:
1. AES-256-CBC decrypt
2. Check if result starts with BZip2 magic bytes (`BZh` = `0x42 0x5A 0x68`)
3. If BZip2 → decompress using `seek-bzip` library
4. Return final UTF-8 string (stripping BOM if present)

**`a3U(plainText)`** — Public alias for `encryptStrict`. Same name as the website's function (`window.__CONSOLE_CRYPTO.a3U()`).

**`bJn(cipherText)`** — Public alias for `decryptStrict`. Same name as the website's function.

> ⚠️ **IMPORTANT:** If the immigration website updates its JS bundle, the 4 key/IV arrays must be re-extracted and updated here.

---

### `local_bridge.js` — The Code Execution Bridge

The portal's frontend sometimes sends JavaScript code strings to be evaluated locally. This file intercepts those strings and runs the equivalent local function instead of executing JS in a real browser.

**`extractArgs(code, regex, label)`** — Uses regex to extract the argument(s) from a function call string.

**`parseArgs(rawArgs, label)`** — Parses the extracted arguments as JSON.

**`runLocalBridgeCode(code)`** — The main dispatcher:
- Code contains `window.__CONSOLE_CRYPTO.a3U(` or `a3r(` → call local `a3U()` to encrypt
- Code contains `window.__CONSOLE_CRYPTO.bJn(` or `bHT(` → call local `bJn()` to decrypt
- Code contains `window.__BARCODE.WG(`, `Ww(`, or `Wp(` → call local `ww()` to generate barcode SVG

---

### `ww.js` — The PDF417 Barcode Generator

A full PDF417 barcode generator (~735 lines) ported from the immigration website's Flutter/Dart compiled JavaScript bundle.

**`ww(value, height, width)`** — The main exported function. Takes a string value (e.g., `HWPP2641120P`) and dimensions, returns an SVG string containing the full barcode pattern.

Internally handles: text/numeric/binary mode encoding, Reed-Solomon error correction, module layout, and SVG rendering.

---

### `wwsvg_cli.js` — Command-Line Wrapper for `ww.js`

A tiny 8-line file that makes `ww.js` callable from Python via `subprocess`:

```js
const input = process.argv[2];   // barcode value
const height = process.argv[3];  // height (default 30)
const width = process.argv[4];   // width (default 100)
process.stdout.write(ww(input, height, width));
```

Called by `a.py` using `subprocess.run(["node", "wwsvg_cli.js", barcode_value, "30", "100"])`.

---

### `a.py` — The PDF Flask Microservice

A **Flask HTTP API** running on `http://127.0.0.1:5000`. Receives PDF processing requests from Node.js (via `pdfr.js`) and returns the path to the finished customized PDF.

**`get_local_barcode_svg_string_ww(custom_data)`** — Generates a PDF417 barcode SVG by calling `node wwsvg_cli.js {value} 30 100` as a subprocess and capturing stdout.

**`edit_text_layer(input_pdf, output_pdf, amharic_font_path, replacements)`** — The text replacement engine:
- Opens the input PDF with PyMuPDF (`fitz`)
- For each replacement rule:
  - Searches for `old` text on every page
  - Draws a **white redaction box** over it (erasing it)
  - Inserts the `new` text at the same position
  - Uses Helvetica for English text (`english: true`), NotoSansEthiopic for Amharic (`english: false`)
  - Supports `mask_inset_*` to fine-tune the eraser box size
  - Auto-detects original font size
  - Wraps long text using `textwrap.wrap(text, width=limit)`

**`/process_pdf` (POST route)** — The main API endpoint. Receives JSON with:
`input_file_path`, `changes`, `barcode_value`, `fullName`, `type`, `id`

Step by step:
1. Creates output folder: `pdfs/{id}{fullName}/`
2. Names output file: `{barcode_value}{type}.pdf` (final with barcode becomes `{barcode_value}{type}bar.pdf`)
3. Calls `edit_text_layer()` for all text changes
4. Calls `get_local_barcode_svg_string_ww()` to generate barcode SVG
5. Calls `replace_barcode_expand_box()` from `b.py` to inject the barcode into the PDF's raw stream
6. Returns `{ status, message, output_file }`

> **Hardcoded Paths in `a.py` (lines 143 & 150):**
> - `out_dir_pre = r"C:\\Users\\habte\\Videos\\newSystem\\pdfs"` — PDF output folder
> - `font_file = r"C:\\Users\\habte\\Videos\\newSystem\\NotoSansEthiopic-Regular.ttf"` — Amharic font

---

### `b.py` — The Barcode Stream Injector

Does **surgical byte-level PDF manipulation** to inject a new barcode into the PDF's binary content stream, replacing the placeholder.

**`replace_barcode_expand_box(input_pdf, svg_string)`** — 4 steps:

**Step 1 — Find the barcode stream:**
Scans all PDF content streams for a regex pattern matching a 100×30 clipping rectangle (`{x} {y} 100 30 re W n`). This is how PDF417 barcode placeholders appear in the template PDFs.

**Step 2 — Calculate the new width:**
Parses the SVG's `M x y h w v h` path commands to find the rightmost pixel (`max_x`). Sets new box width = `max(100, max_x + 5)`.

**Step 3 — Construct the new stream (3 spliced parts):**
- **Part 1:** Everything before the barcode header — unchanged
- **New Middle:** 
  - New header: `0 0 {new_width} 30 re W n` (clipping box)
  - White box: `1 1 1 rg 0 0 {width} 30 re f` (erases old barcode)
  - Y-flip matrix: `1 0 0 -1 0 30 cm` (PDF Y-axis is inverted vs SVG)
  - Barcode bars: each SVG rectangle → PDF drawing commands
- **Part 3:** Everything after the barcode's closing `Q` — unchanged (preserves page layout)

**Step 4 — Save:**
Updates the stream object in the PDF and saves with `garbage=0` (do not reorganize the file — preserves fonts and structure).

---

## 📁 `bot_copy/` Directory — The Booking Engine

---

### `ppl.js` — The Applicant Database ✏️

This is the **primary input file you edit before every booking run**.

```js
export let people = [
  {
    "FirstName": "ASCHALEW",       // ALL CAPS English first name
    "FirstNamesAmharic": "አስቻለው", // Amharic first name
    "MiddleName": "TADESSE",
    "MiddleNameAmharic": "ታደሰ",
    "Surname": "TEFERA",
    "SurnameAmharic": "ተፈራ",
    "EyeColourLookupId": 430,      // Always 430
    "HairColourLookupId": 473,     // Always 473
    "GenderlookupId": 469,         // 469 = Male, 468 = Female
    "NationalityLookupId": 538,    // Always 538
    "PlaceOfBirthLookupId": 12,    // Region ID of birth (see regions table)
    "CityOfBirth": "DALE",
    "BirthDate": "1999-01-12T00:00:00.000",  // ISO format
    "MaritalStatusLookupId": 498,  // Always 498
    "ContactNumber": "+251_9727829188",  // MUST have underscore after +251
    "MainRegionLookupId": 12,      // Region ID of address
    "MainCity": "HAWASSA",
    "MainAddressLine1": "HAWASSA", // Kebele/Sefer
    "nspEthiopianBirthDate": "04/05/1991",  // Ethiopian calendar dd/mm/yyyy
    "id": "08020100420184560"      // Lidet card number
  }
]
```

`people` is an array — add multiple objects to book multiple people in sequence.

---

### `handlers.js` — The Booking Orchestrator ⚙️

The **brain of the system**. All configuration constants are at the top of this file.

#### 🔧 Dynamic Configuration (Change These Per Booking Session)

```js
export const BASE_DIR = String.raw`C:\Users\habte\Videos\newSystem`;
```
Root path of the project. All path calculations in other files derive from this.

---

```js
const OFFICE_ID = 9;
```
**The target passport office.** This single number controls which ICS office is used for the appointment.

| Office | ID | Abbreviation |
|---|---|---|
| Addis Ababa (Main) | 4 | AA |
| Hawassa | 9 | HW |
| Bahir Dar | check `offices_new.js` | — |
| Adama | check `offices_new.js` | — |
| Dire Dawa | check `offices_new.js` | — |

> To find other IDs: open `bot_copy/offices_new.js`, search for the city name, and note the `tgSystemOrganisationId` value.

---

```js
const SERVICE_TYPE = 915;
```
**Urgent vs Normal service.**

| Type | ID | Fee | Office List Used |
|---|---|---|---|
| **Urgent (5-Day)** | `915` | 20,000 ETB | `offices_new.js` |
| **Normal** | `918` | 5,000 ETB | `office.js` |

This one value automatically controls:
- Which fee amount is submitted (`20000` or `5000`)
- Which fee ID is used (`55` or `53`)
- Which office data file is used (`offNew` or `offOld`)
- Which label appears on PDFs (`"5 DAY SERVICE (URGENT)"` or `"NORMAL SERVICE"`)
- Whether `APPLICATION_START_DATE` is used or the current Ethiopian time

---

```js
const GIVEN_SEQUENCE = "41234";
```
**The ticket / sequence number.** The most important value to update every single run.

- The booking reference barcode (e.g., `HWPP2641234P`) is calculated from this
- For multiple people in `ppl.js`, it auto-increments: person 0 → `41234`, person 1 → `41235`, etc.
- **If set to a number string:** skips the `loadsequence` step (faster, used when you know the sequence)
- **If empty string `""`:** fetches the next sequence from the server automatically via `loadsequence` step

---

```js
const APPLICATION_START_DATE = '2025-12-31T10:54:12.122';
```
Only used when `SERVICE_TYPE === 918` (Normal). For Urgent, the current Ethiopian date/time is used.

---

```js
const AFTER_HOW_MANY_DAYS = 1;
const START_TIME = "08:00 AM";
const END_TIME   = "09:00 AM";
```
The appointment slot to lock. `AFTER_HOW_MANY_DAYS = 1` = tomorrow. `= 2` = day after tomorrow, etc.

---

#### Functions in `handlers.js`

**`getApplicationStartDateISO()`** — Returns `getEthiopianDateISO()` (current time) for Urgent, or `APPLICATION_START_DATE` for Normal.

**`getActiveOffices()`** — Returns `offNew` for Urgent (915), `offOld` for Normal (918).

**`getReferenceFromGivenSequence()`** — Builds the barcode reference from `GIVEN_SEQUENCE`. Auto-increments per person (`currentPersonIndex - initialPersonIndex`). Calls `generateBarcode()`.

**`decryptResponseB2B(responseData)`** — Shorthand: decrypts `responseData.B2BDTOlist`.

**`StartBooking(ws, startIndex, endIndex)`** — Initializes state, fires the first step (`loginStep`).

**`loginStep(ws)`** — Sends login credentials:
```js
Username: "ChalaTolosa"
ValidationPar: "ChalaTolosa@1234"
```
> ⚠️ These are hardcoded portal credentials. Change if they expire/change.

**`supdocStep(ws, token)`** — Submits the applicant's supporting document (birth certificate info).

**`appStep(ws, token, slotIndex)`** — Queries available appointment slots for each of the 9 time windows in `state.oneHourSlots`.

**`portallockStep(ws, token)`** — Locks an appointment slot at the office using `OFFICE_ID`, `START_TIME`, `END_TIME`, and `AFTER_HOW_MANY_DAYS`.

**`loadsequenceStep(ws, token)`** — Fetches the next available sequence number from the server. Only called when `GIVEN_SEQUENCE` is empty.

**`passaveStep(ws, token)`** — The main application save step. Sends all person data + the `firstpdf.pdf` as Base64.

**`loadfeesStep(ws, token)`** — Loads fees. Also triggers generation of all 3 PDFs.

**`addfeesStep(ws, token)`** — Records the fee payment. Uses `20000`/fee ID `55` for Urgent, `5000`/fee ID `53` for Normal.

**`updatepaydocumentStep(ws, token)`** — Attaches the receipt PDF (`secondpdf.pdf`) to the application.

**`updatesupportdocStep(ws, token)`** — Uploads the applicant's photo. Reads `cirt/{currentPersonIndex}.jpg`. If person index is 0, reads `cirt/0.jpg`. This is the photo saved by `cert.js`.

**`updatesupportdocStep2` and `updatesupportdocStep3`** — Upload empty placeholder supporting documents (required by the server for the submission to be valid).

**`loadinvoicestep(ws, token)`** — Loads the final invoice, re-generates `firstpdf.pdf` with updated invoice data.

**`payporatalStep(ws, token)`** — Final step. Submits the payment portal record with person's name, phone, application ID, amount, and fee ID.

**`checkValidationErrors(b2bDecrypted)`** — Scans the decrypted server response for `ValidationErrors.$values`. If the array is non-empty, logs all errors and returns `true` (signals the current step failed).

**`handlers` object** — Maps step name keys to async functions that handle each server response. Each handler:
1. Decrypts the `B2BDTOlist`
2. Checks for validation errors
3. Extracts and stores relevant IDs/dates in `state.applicationDetails`
4. Triggers the next step by calling the appropriate `*Step()` function

---

### `state.js` — The Global State Object

All live session data is stored here and shared across all modules.

```js
export const state = {
  currentPersonIndex: 0,    // Index into ppl.js people array (current booking)
  initialPersonIndex: 0,    // Index where current batch started (for sequence offset)
  endPersonIndex: 0,        // Total people to process
  currentStep: 0,           // Steps completed (shown in console as [X/12])
  totalSteps: 12,           // Total steps = 12

  applicationDetails: {     // Populated step-by-step as responses arrive:
    // .tgp            = tgPersonId (from login response)
    // .ApplicationStartDateISO = start date
    // .Reference      = the barcode reference string (e.g. HWPP2641234P)
    // .apid           = tgApplicationId (from passave response)
    // .enid           = EntityId / tgPersonId (from passave response)
    // .fees           = fee amount
    // .path           = Base64 of secondpdf (receipt) from loadfees
    // .CreatedDate, .TgUserAuditDetailId, etc.
  },

  objOfIds: {               // Maps step name → array of UUIDs sent for that step
    "login": [],            // Used to match incoming responses to the right handler
    "portallock": [],
    "loadsequence": [],
    "passave": [],
    "loadfees": [],
    "addfees": [],
    "updatepaydocument": [],
    "updatesupportdoc": [],
    "updatesupportdoc2": [],
    "updatesupportdoc3": [],
    "loadinvoice": [],
    "payportal": []
  },

  oneHourSlots: [           // 9 time slots queried during appStep
    { StartTime: "08:00 AM", EndTime: "09:00 AM" },
    // ... through 04:00 PM - 05:00 PM
  ]
};
```

---

### `utils.js` — Shared Utility Functions

**`encDyc(a)`** — Executes a code string through `runLocalBridgeCode()` (the local bridge).

**`encryptB2BString(str)`** — Calls `a3U()` from mcrypto to encrypt a string.

**`encryptB2BData(obj)`** — JSON.stringifies an object, then encrypts it.

**`decryptB2BString(str)`** — Calls `bJn()` from mcrypto to decrypt a string.

**`decryptB2BData(str)`** — Decrypts a string and JSON.parses the result.

**`sendRequest(ws, key, payloadTemplate, b2bData, token, logName)`** — The unified request sender:
1. Gets the ID prefix from the payload template (e.g., `"NEW_PASSPORT_PORTAL_SAVE"`)
2. Generates a new UUID
3. Creates `payloadId = "{PREFIX} | {UUID}"`
4. Pushes the UUID into `state.objOfIds[key]` so responses can be matched back
5. Attaches the JWT token to the template if provided
6. Encrypts B2B data with `encryptB2BString()`
7. Sends the complete payload as JSON over the WebSocket

**`getEthiopianDateISO(offsetMs = 0)`** — Returns current date/time in Ethiopian timezone (UTC+3) as an ISO string without the trailing `Z`. The `offsetMs` adds a millisecond offset — used to get tomorrow's date (`86400000` ms) or a few seconds ahead (`5000` ms).

---

### `barcode.js` — Payment Reference Generator

Generates the **application reference number** (e.g., `HWPP2641120P`).

**`generateBarcode({ n, m, l, sequence, g })`**

| Parameter | Default | Meaning |
|---|---|---|
| `n` | `"AA"` | **Office abbreviation** (from `offices_new.js` → `Abbreviation` field) |
| `m` | `"PP"` | Always `"PP"` (Passport) |
| `l` | `"5"` | `"4"` for Urgent (915), `"5"` for Normal (918) |
| `sequence` | `761611` | The ticket number from `GIVEN_SEQUENCE` |
| `g` | `"P"` | Always `"P"` |

**Algorithm:**
1. Get last 2 digits of current year → e.g., `"26"` for 2026
2. Convert `sequence` to 6-character uppercase hex (zero-padded): `41120` → `"00A0E0"`
3. Checksum: sum ASCII codes of `m + l + year + hex`, add the integer `sequence`, take `% 10`
4. Final string: `n + m + l + year + hex + checksum + g`

Example: Sequence `41120`, Office `HW`, Urgent → `HWPP26A0E07P`

---

### `pdfr.js` — PDF Content Builder (Node.js Side)

Builds the text-replacement rules for each of the 3 PDF types and POSTs to `a.py`.

**`getActiveOffices(serviceType)`** — Returns `offNew` or `offOld`.

**`getServiceLabelReplacement(serviceType)`** — Returns `"NORMAL SERVICE"` for 918, `"5 DAY SERVICE (URGENT)"` for 915.

**`pdfclient(inputPdfPath, index, other, idd)`** → **`firstpdf.pdf`** (Appointment Slip / "toBeSent")

Generates the main appointment slip. Replaces these placeholder texts in the template:
| Old (Placeholder) | New (Real Value) |
|---|---|
| `ABEBE` | FirstName |
| `KEBEDE` | MiddleName |
| `LEMUA` | Surname |
| `አበበ` | FirstNamesAmharic |
| `ከበደ` | MiddleNameAmharic |
| `አለሙ` | SurnameAmharic |
| `55555555555555555` | Lidet ID |
| `WOLDIA` | CityOfBirth |
| `08/02/2001 ` | Gregorian birth date |
| `+251 914352657` | Phone (with space) |
| `AMHARA KOMBOLCHA KEBELE 3` | Region + City + Kebele |
| `offadd` | Office physical address |
| `AAPP4260B9F0B2P` | Reference barcode |
| `02/06/2018` | Ethiopian appointment date |
| `09/02/2026` | Gregorian appointment date |
| `08/02/2026` | Application start datetime |
| `16:00:00 - 17:00:00` | Appointment time range |
| `yooo` | Office name |
| `MALE` | `FEMALE` (if gender ID = 468) |
| `5,000.00` | `20,000.00` (if Urgent) |

**`pdfclient2(inputPdfPath, index, other, idd)`** → **`secondpdf.pdf`** (Receipt)

Simpler — only replaces full name, Amharic full name, ID, reference, service label, start date, office name, and fee.

**`pdfclient3(inputPdfPath, index, other, idd)`** → **`thirdpdf.pdf`** (Collection Slip / "toBeGiven")

Same as `pdfclient` but used for the copy given to the applicant. Slightly different Amharic surname placeholder (`"አለ"` instead of `"አለሙ"`).

All three functions POST to `http://127.0.0.1:5000/process_pdf`, then read the output file and return it as a **Base64 string** for embedding in the API payload.

---

### `regions.js` — Ethiopian Region Lookup Table

Static array of all Ethiopian regions. Used by `pdfr.js` to convert `MainRegionLookupId` (e.g., `12`) into its English name (e.g., `"SIDAMA"`) for the PDF address line.

| ID | LookupDescription |
|---|---|
| 1 | ADDIS ABABA |
| 2 | AFAR |
| 3 | AMHARA |
| 4 | BENISHANGUL GUMUZ |
| 5 | CENTRAL ETHIOPIA PEOPLE REGION |
| 6 | DIRE DAWA ASTEDADAR |
| 7 | SOMALI |
| 8 | GAMBELA |
| 9 | HARERI |
| 10 | OROMIA |
| 12 | SIDAMA |
| 14 | SOUTH ETHIOPIA PEOPLE REGION |
| 15 | SOUTH WEST ETHIOPIA PEOPLE |
| 16 | TIGRAY |

---

### `dataFormatter.js` — Person Data Formatter

A utility module with a `formatPersonRecord()` function that converts raw/informal person data into the strict schema required by `ppl.js`. Also contains `REGION_MAP` (a plain object version of the region ID table).

---

### `passsave.js` — Passport Save Payload Builder

**`processpsB2b(a, index, other, officeId, serviceType, documentOverride, personOverride)`**

Takes the `passportsaveB2b` template object and injects the current applicant's data:
1. Copies all person fields from `ppl.js` into both `online_tgPersonDTOList` entries and their nested communication DTO copies
2. Sets `IdentityNumber` (Lidet card ID) on all identity sub-objects
3. Sets `ApplicationStartDate`, `PriorityLookupId`, `CollectionOfficeId`, `EnrolmentOfficeId`, `Reference`, `Remark`
4. Sets both SMS communication `RecipientAddress` values (phone without underscore)
5. Sets Ethiopian appointment date, appointment times, appointment ID
6. Calls `pdfclient()` to generate and upload `firstpdf.pdf` → stores Base64 in `DocumentObject`
7. Sets `IssueDate` using `getEthiopianDateISO()`

---

### `loadfees.js` — Load Fees Payload Builder

**`processlsB2b(b, index, other, officeId, serviceType, documentOverride, personOverride)`**

Same injection logic as `passsave.js` but for the `loadfeesB2b` template (which has an extra `.tgDTO` wrapper). Additionally:
- Calls `pdfclient()` → `firstpdf.pdf` → Base64 in `DocumentObject`
- Calls `pdfclient2()` → `secondpdf.pdf` (receipt) → returned as `b63`
- Calls `pdfclient3()` → `thirdpdf.pdf` (collection slip)

Returns `{ a: modifiedPayload, b64: receiptBase64 }`. The receipt Base64 is stored in `state.applicationDetails.path` for use in `updatepaydocumentStep`.

---

### `loadinvoice.js` — Load Invoice Payload Builder

**`processInvoice(a, index, other, officeId, serviceType)`**

Injects person data into the `loadinvoiceB2b` template. Sets application/entity IDs, dates, user audit IDs. Regenerates `firstpdf.pdf` and stores it as DocumentObject. Sets payment document IDs from the reference number.

---

### `state.js` — Global State (described above)

---

### `office.js` and `offices_new.js` — Office Data

Large static arrays containing all ICS passport office data.

- **`office.js`** (`offOld`) → used for **Normal** bookings (918)
- **`offices_new.js`** (`offNew`) → used for **Urgent** bookings (915)

Each entry includes:
```js
{
  tgSystemOrganisationId: 9,           // Numeric ID → set as OFFICE_ID
  Abbreviation: "HW",                  // 2-letter office code → used in barcode
  OrganisationName: "HAWASSA",         // Full name → printed on PDFs
  PhysicalAddressLine1: "...",         // Address → printed on PDFs (replaces "offadd")
  // + lat/long, hours, and many other fields
}
```

---

### `JSONs.js` — WebSocket Request Envelope Templates

A very large file containing the **outer WebSocket message structures** for every API call. These are the envelopes. The encrypted B2B business data is injected into the `b2bDTOlist` field of these templates.

Keys: `loginj`, `supdocj`, `appj`, `portallockj`, `loadsequencej`, `passportsavej`, `loadfeesj`, `addfeesj`, `updatepaydocumentj`, `updatesupportdocumentj`, `updatesupportingdocumentj2`, `updatesupportingdocumentj3`, `loadinvoicej`, `payportalj`

---

### `b2bs.js` — Business Object Payload Templates

An even larger file containing the actual **B2B payload objects** — the domain-model data structures that get encrypted and sent inside the WebSocket envelopes. These replicate the server's entity model exactly.

Keys: `loginB2b`, `supdocB2b`, `portallockB2b`, `loadsequenceB2b`, `passportsaveB2b`, `loadfeesB2b`, `addfeesB2b`, `updatepaymentB2b`, `updatesupportdocB2b`, `updatesupportdocB2b2`, `updatesupportdocB2b3`, `loadinvoiceB2b`, `payportalB2b`

---

### `filter.js` — Debug Utility

A 4-line script only used during development. Prints all regions with their IDs to the console.

---

## 🗺️ The Full 12-Step Booking Flow

```
node bot_copy.js
  │
  ▼
[1]  LOGIN ────────────────────────► Authenticate → get JWT token + tgPersonId
  │
  ▼
[2]  PORTALLOCK ───────────────────► Lock appointment slot at office (date + time)
  │
  ├── (if GIVEN_SEQUENCE is empty)
  │     [2.5] LOADSEQUENCE ─────────► Fetch next reference number from server
  │
  ▼
[3]  PASSSAVE ─────────────────────► Save application + firstpdf.pdf → returns apid & enid
  │
  ▼
[4]  LOADFEES ─────────────────────► Load fee + generate all 3 PDFs
  │
  ▼
[5]  ADDFEES ──────────────────────► Record fee payment (20000 or 5000 ETB)
  │
  ▼
[6]  UPDATEPAYDOCUMENT ────────────► Attach receipt PDF (secondpdf.pdf) to application
  │
  ▼
[7]  UPDATESUPPORTDOC ─────────────► Upload applicant photo from cirt/{index}.jpg
  │
  ▼
[8]  UPDATESUPPORTDOC2 ────────────► Empty placeholder doc (required by server)
  │
  ▼
[9]  UPDATESUPPORTDOC3 ────────────► Empty placeholder doc (required by server)
  │
  ▼
[10] LOADINVOICE ──────────────────► Load final invoice + re-generate firstpdf.pdf
  │
  ▼
[11] PAYPORTAL ────────────────────► Finalize payment → BOOKING COMPLETE ✅
  │
  ▼
  (If more people in ppl.js → index++ → back to LOGIN)
```

---

## 🔑 Quick Reference: What to Change Per Session

| What to change | File | Where |
|---|---|---|
| **Applicant(s)** | `bot_copy/ppl.js` | The `people` array |
| **Target office** | `bot_copy/handlers.js` | `OFFICE_ID` (line 20) |
| **Urgent vs Normal** | `bot_copy/handlers.js` | `SERVICE_TYPE` → `915` or `918` (line 21) |
| **Starting sequence** | `bot_copy/handlers.js` | `GIVEN_SEQUENCE` (line 22) |
| **Appointment time** | `bot_copy/handlers.js` | `START_TIME`, `END_TIME` (lines 25-26) |
| **Days until appt.** | `bot_copy/handlers.js` | `AFTER_HOW_MANY_DAYS` (line 24) |
| **Telegram bot token** | `cert.js` | `BOT_TOKEN` (line 7) |
| **Login credentials** | `bot_copy/handlers.js` | Inside `loginStep()` (line 74-75) |
| **Server URL** | `bot_copy.js` | `WS_URL` (line 7) |
| **Crypto keys** | `mcrypto.js` | `KEY_LEFT`, `KEY_RIGHT`, `IV_LEFT`, `IV_RIGHT` |
| **PDF output folder** | `a.py` | Line 143: `out_dir_pre` |
| **Amharic font path** | `a.py` | Line 150: `font_file` |
| **Project root path** | `bot_copy/handlers.js` | `BASE_DIR` (line 18) |

---

## 📦 Static Template Files

| File | Purpose |
|---|---|
| `firstpdf.pdf` | Template PDF for appointment slip (copy sent to server) |
| `secondpdf.pdf` | Template PDF for payment receipt |
| `thirdpdf.pdf` | Template PDF for collection slip (copy given to applicant) |
| `NotoSansEthiopic-Regular.ttf` | Amharic font used by `a.py` |
| `cirt/` | Where `cert.js` saves photos: `0.jpg`, `1.jpg`, `2.jpg`... |
| `pdfs/` | Where `a.py` saves generated PDFs, organized into `{id}{fullName}/` subfolders |
| `URGENT/booked.txt` | Log file where time-slot availability survey results are appended |
| `ww_constants.js` | Reference tables (codewords, correction factors) used internally by `ww.js` |
