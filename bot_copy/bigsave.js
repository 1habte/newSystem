import WebSocket from "ws";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { off as offOld } from "./office.js";
import { off as offNew } from "./offices_new.js";
import { getEthiopianDateISO } from "./utils.js";
import { EtDatetime } from "abushakir";

const WS_URL = "wss://196.188.63.66:18443/";
const OFFICE_ID = 9;
const SERVICE_TYPE = 915;
const USERNAME = "GetachewBalcha";
const PASSWORD = "GetachewBalcha@1234";
const START_SEQUENCE = 40600;
const END_SEQUENCE = 40600;
const FAILED_LIST = [];
const MAX_IN_FLIGHT = 8;
const AFTER_HOW_MANY_DAYS = 2;
const APPLICATION_START_DATE = "2025-12-31T10:54:12.122";
const VERSION = "1.0.1.108";
const PING_INTERVAL = 3000;
const WS_OPTIONS = {
  rejectUnauthorized: false,
  handshakeTimeout: 30000,
  headers: {
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Host: "www.immigration.gov.et:18443",
    Origin: "https://www.immigration.gov.et",
    Pragma: "no-cache",
    "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
    "Sec-WebSocket-Version": "13",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    Upgrade: "websocket",
    Connection: "Upgrade"
  }
};
const ONE_HOUR_SLOTS = [
  { StartTime: "08:00 AM", EndTime: "09:00 AM" },
  { StartTime: "09:00 AM", EndTime: "10:00 AM" },
  { StartTime: "10:00 AM", EndTime: "11:00 AM" },
  { StartTime: "11:00 AM", EndTime: "12:00 PM" },
  { StartTime: "12:00 PM", EndTime: "01:00 PM" },
  { StartTime: "01:00 PM", EndTime: "02:00 PM" },
  { StartTime: "02:00 PM", EndTime: "03:00 PM" },
  { StartTime: "03:00 PM", EndTime: "04:00 PM" },
  { StartTime: "04:00 PM", EndTime: "05:00 PM" }
];
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const { a3U, bJn } = require("../mcrypto.js");
const { loginPayload } = require("../appointmentBot/payloads.js");
const { generatePassportToken } = require("../appointmentBot/barcodeGenerator.js");
const {
  lockSlot,
  fullyPopulatedSaveDTO,
  addFeeToApplicationPayment,
  orderPortalPayment
} = require("../appointmentBot/PAYLOADS_REGULAR_WITH_URGENT.js");
const BASE_POOL = JSON.parse(readFileSync(path.join(__dirname, "people_pool.json"), "utf8"));
const EXPANDED_POOL = JSON.parse(readFileSync(path.join(__dirname, "people_pool_expanded.json"), "utf8"));

const requestMap = new Map();
const contexts = new Map();
const successes = [];
const failures = [];
const errorLogs = [];
const sequenceQueue = FAILED_LIST.length > 0
  ? [...FAILED_LIST]
  : Array.from({ length: END_SEQUENCE - START_SEQUENCE + 1 }, (_, index) => START_SEQUENCE + index);

let nextSequenceIndex = 0;
let activeCount = 0;
let loginReady = false;
let activeToken = "";
let activeTgPersonId = 0;
let activeOnlineAccountId = 1;
let pingInterval;
let finalStatusRendered = false;
let shutdownReason = "";
let lastNonSequenceStep = "";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function mergeUniqueByEnglish(base = [], extra = []) {
  const map = new Map();

  for (const item of [...base, ...extra]) {
    map.set(item.en, item);
  }

  return [...map.values()];
}

function buildRegionMap() {
  return new Map(BASE_POOL.regions.map(region => [region.name, region.lookupId]));
}

function getPoolCities(regionName) {
  const baseCities = BASE_POOL.cities_by_region?.[regionName] || [];
  const extraCities = EXPANDED_POOL.cities_by_region_extra?.[regionName] || [];
  return [...new Set([...baseCities, ...extraCities])];
}

function formatEthiopianBirthDate(date) {
  const et = new EtDatetime(date.getTime());
  const day = String(et.date.day).padStart(2, "0");
  const month = String(et.date.month).padStart(2, "0");
  const year = String(et.date.year);
  return `${day}/${month}/${year}`;
}

function randomBirthDate() {
  const start = new Date("1988-01-01T00:00:00.000Z").getTime();
  const end = new Date("2006-12-31T00:00:00.000Z").getTime();
  return new Date(start + Math.floor(Math.random() * (end - start)));
}

function randomDigits(length) {
  let value = "";

  for (let i = 0; i < length; i += 1) {
    value += Math.floor(Math.random() * 10);
  }

  return value;
}

function shortenReference(reference) {
  return `PP${reference.substring(5, 7)}${reference.substring(7, 13)}`;
}

function generateSyntheticPerson() {
  const maleNames = mergeUniqueByEnglish(BASE_POOL.male_name_pairs, EXPANDED_POOL.male_name_pairs_extra);
  const femaleNames = mergeUniqueByEnglish(BASE_POOL.female_name_pairs, EXPANDED_POOL.female_name_pairs_extra);
  const secondNames = mergeUniqueByEnglish(BASE_POOL.second_name_pairs, EXPANDED_POOL.second_name_pairs_extra);
  const thirdNames = mergeUniqueByEnglish(BASE_POOL.third_name_pairs, EXPANDED_POOL.third_name_pairs_extra);
  const regionMap = buildRegionMap();
  const genderlookupId = Math.random() < 0.5 ? 469 : 468;
  const firstPool = genderlookupId === 469 ? maleNames : femaleNames;
  const first = randomItem(firstPool);
  const middle = randomItem(secondNames);
  const surname = randomItem(thirdNames);
  const region = randomItem(BASE_POOL.regions);
  const cities = getPoolCities(region.name);
  const city = randomItem(cities.length ? cities : ["JIMMA"]);
  const addressPool = [
    ...(BASE_POOL.address_line1_pool || []),
    ...(EXPANDED_POOL.address_line1_pool_extra || [])
  ];
  const birthDate = randomBirthDate();

  return {
    FirstName: first.en,
    FirstNamesAmharic: first.am,
    MiddleName: middle.en,
    MiddleNameAmharic: middle.am,
    Surname: surname.en,
    SurnameAmharic: surname.am,
    Height: String(165 + Math.floor(Math.random() * 26)),
    EyeColourLookupId: 430,
    HairColourLookupId: 473,
    GenderlookupId: genderlookupId,
    NationalityLookupId: 538,
    PlaceOfBirthLookupId: regionMap.get(region.name),
    CityOfBirth: city,
    BirthDate: `${birthDate.toISOString().slice(0, 10)}T00:00:00.000`,
    MaritalStatusLookupId: 498,
    ContactNumber: `+251_9${randomDigits(8)}`,
    EmailAddress: `${first.en.toLowerCase()}.${middle.en.toLowerCase()}${randomDigits(4)}@gmail.com`,
    MainRegionLookupId: regionMap.get(region.name),
    MainCity: city,
    MainAddressLine1: randomItem(addressPool),
    nspEthiopianBirthDate: formatEthiopianBirthDate(birthDate),
    id: randomDigits(16)
  };
}

function getActiveOffices() {
  return SERVICE_TYPE === 915 ? offNew : offOld;
}

function getApplicationStartDateISO() {
  return SERVICE_TYPE === 915 ? getEthiopianDateISO() : APPLICATION_START_DATE;
}

function buildReference(sequence) {
  const regionCode = getActiveOffices().find(
    office => office.tgSystemOrganisationId === OFFICE_ID
  )?.Abbreviation;

  if (!regionCode) {
    throw new Error(`No office abbreviation found for office ${OFFICE_ID}`);
  }

  return generatePassportToken(regionCode, SERVICE_TYPE === 915 ? "4" : "5", Number(sequence));
}

function getRandomLockDetails() {
  const slot = randomItem(ONE_HOUR_SLOTS);
  const appointmentDate = getEthiopianDateISO(AFTER_HOW_MANY_DAYS * 86700000);
  const parts = new Intl.DateTimeFormat("en-US-u-ca-ethiopic", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(appointmentDate));
  const nspDate = `${parts.find(x => x.type === "year").value}-${parts.find(x => x.type === "month").value}-${parts.find(x => x.type === "day").value} 00:00:00.000`;

  return {
    appointmentDate,
    startTime: slot.StartTime,
    endTime: slot.EndTime,
    nspDate
  };
}

function checkValidationErrors(b2bDecrypted) {
  return Boolean(
    b2bDecrypted?.$values?.some(item => item.ValidationErrors?.$values?.length > 0)
  );
}

function getEthiopianDateOnly(dateString) {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-ethiopic", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(dateString));

  return `${parts.find(x => x.type === "year").value}-${parts.find(x => x.type === "month").value}-${parts.find(x => x.type === "day").value}`;
}

function buildAppointmentBotUserData(context) {
  const locked = context.applicationDetails.$values?.[0] || {};

  return {
    ...context.person,
    officeId: OFFICE_ID,
    priorityLookupId: SERVICE_TYPE,
    applicationStartDate: context.applicationDetails.ApplicationStartDateISO,
    reference: context.reference,
    shortenedReference: shortenReference(context.reference),
    birthCertificateId: context.person.id,
    tgApplicationAppId: locked.tgApplicationAppointmentId,
    appointmentDate: locked.AppointmentDate,
    startTime: locked.StartTime,
    endTime: locked.EndTime,
    tgPersonId: locked.tgPersonId ?? activeTgPersonId,
    nspEthiopianAppointmentDate:
      locked.nspEthiopianAppointmentDate || getEthiopianDateOnly(locked.AppointmentDate || getEthiopianDateISO()),
    lockedCreatedDate:
      locked.CreatedDate || locked.CreateDate || getEthiopianDateISO(),
    tgApplicationId: context.applicationDetails.apid,
    tgPersonIdNew: context.applicationDetails.enid,
    createdBySystemUserId: activeOnlineAccountId,
    tgPersonIdentityId: context.applicationDetails.tgPersonIdentityId,
    birthCertificateBase64: "1234"
  };
}

async function encryptB2B(data) {
  return a3U(JSON.stringify(data));
}

async function decryptB2B(encrypted) {
  return bJn(encrypted);
}

async function sendTrackedPayload(ws, key, payloadTemplate, token, meta) {
  const payload = clone(payloadTemplate);
  const payloadId = payload.$values[0].id;

  if (token) {
    payload.$values[0].token = token;
  }

  payload.$values[0].version = VERSION;
  payload.$values[0].b2bDTOlist = await encryptB2B(payload.$values[0].b2bDTOlist);
  requestMap.set(payloadId, { key, ...meta });

   if (meta.sequence != null) {
    const context = contexts.get(meta.sequence);
    if (context) {
      context.currentStep = key;
      context.lastRequestId = payloadId;
    }
  } else {
    lastNonSequenceStep = key;
  }

  ws.send(JSON.stringify(payload));
}

async function sendLogin(ws) {
  const payload = loginPayload({
    Username: USERNAME,
    Password: PASSWORD
  });
  await sendTrackedPayload(ws, "login", payload, null, {});
}

async function sendLock(ws, context) {
  const lockDetails = getRandomLockDetails();

  context.applicationDetails = {
    ApplicationStartDateISO: getApplicationStartDateISO(),
    Reference: context.reference,
    tgp: activeTgPersonId
  };

  const payload = lockSlot({
    officeId: OFFICE_ID,
    appointmentDate: lockDetails.appointmentDate,
    startTime: lockDetails.startTime,
    endTime: lockDetails.endTime,
    tgPersonId: activeTgPersonId,
    lockNspEthiopianAppointmentDate: lockDetails.nspDate.split(" ")[0]
  });

  await sendTrackedPayload(ws, "portallock", payload, activeToken, {
    sequence: context.sequence
  });
}

async function sendPasssave(ws, context) {
  const payload = fullyPopulatedSaveDTO(buildAppointmentBotUserData(context), "1234");

  await sendTrackedPayload(ws, "passave", payload, activeToken, {
    sequence: context.sequence
  });
}

async function sendAddFees(ws, context) {
  const payload = addFeeToApplicationPayment(buildAppointmentBotUserData(context));
  const b2b = payload.$values[0].b2bDTOlist.$values[0];

  b2b.PaymentDate = getEthiopianDateISO();
  b2b.AmountTendered = SERVICE_TYPE === 915 ? 20000 : 5000;
  b2b.tgFeeId = SERVICE_TYPE === 915 ? 55 : 53;
  b2b.FeeDescription = SERVICE_TYPE === 915
    ? "APPLICATION FEE FOR NORMAL PASSPORT (FIVE DAY SERVICE)"
    : "APPLICATION FEE FOR NORMAL PASSPORT (NORMAL SERVICE)";
  b2b.FeeAmount = SERVICE_TYPE === 915 ? 20000 : 5000;

  await sendTrackedPayload(ws, "addfees", payload, activeToken, {
    sequence: context.sequence
  });
}

async function sendPayPortal(ws, context) {
  const payload = orderPortalPayment(buildAppointmentBotUserData(context));
  const b2b = payload.$values[0].b2bDTOlist.$values[0];

  b2b.Amount = SERVICE_TYPE === 915 ? 20000 : 5000;
  b2b.FinancialInvoiceDTOList[0].tgFeeDTOList[0].tgFeeId = SERVICE_TYPE === 915 ? 55 : 53;

  await sendTrackedPayload(ws, "payportal", payload, activeToken, {
    sequence: context.sequence
  });
}

function totalCount() {
  return sequenceQueue.length;
}

function renderStatus() {
  const line =
    `\r${CYAN}total:${RESET} ${totalCount()}  ` +
    `${GREEN}ok:${RESET} ${successes.length}  ` +
    `${RED}fail:${RESET} ${failures.length}  ` +
    `${YELLOW}active:${RESET} ${activeCount}`;

  process.stdout.write(line);
}

async function maybeLaunchMore(ws) {
  while (loginReady && activeCount < MAX_IN_FLIGHT && nextSequenceIndex < sequenceQueue.length) {
    const sequence = sequenceQueue[nextSequenceIndex];
    nextSequenceIndex += 1;
    activeCount += 1;

    const context = {
      sequence,
      reference: "",
      person: generateSyntheticPerson(),
      applicationDetails: {},
      currentStep: "queued",
      lastRequestId: ""
    };

    contexts.set(sequence, context);
    await sendLock(ws, context);
  }

  renderStatus();

  if (loginReady && activeCount === 0 && nextSequenceIndex >= sequenceQueue.length) {
    renderStatus();
    finalStatusRendered = true;
    shutdownReason = "completed all queued sequences";
    ws.close();
  }
}

async function markSuccess(sequence, ws) {
  successes.push(sequence);
  contexts.delete(sequence);
  activeCount -= 1;
  renderStatus();
  await maybeLaunchMore(ws);
}

async function markFailure(sequence, reason, ws) {
  failures.push({ sequence, reason });
  errorLogs.push({ sequence, reason });
  contexts.delete(sequence);
  activeCount -= 1;
  renderStatus();
  await maybeLaunchMore(ws);
}

const ws = new WebSocket(WS_URL, WS_OPTIONS);

ws.on("open", async () => {
  renderStatus();

  pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("ping");
    }
  }, PING_INTERVAL);

  await sendLogin(ws);
});

ws.on("message", async msg => {
  const rawMessage = msg.toString();
  const [first, rest] = rawMessage.split(/,(.+)/);

  try {
    if (!rest) {
      return;
    }

    const trimmedRest = rest.trim();

    if (!trimmedRest.startsWith("{") && !trimmedRest.startsWith("[")) {
      return;
    }

    const data = JSON.parse(trimmedRest);
    const tracked = requestMap.get(data.Id);

    if (!tracked) {
      errorLogs.push({
        sequence: null,
        reason: "untracked response id",
        details: data.Id
      });
      return;
    }

    requestMap.delete(data.Id);

    if (first !== "true") {
      if (tracked.sequence == null) {
        errorLogs.push({ sequence: null, reason: `${tracked.key} returned false` });
        shutdownReason = `${tracked.key} returned false during non-sequence stage`;
        ws.close();
        return;
      }

      await markFailure(tracked.sequence, `${tracked.key} returned false`, ws);
      return;
    }

    const decryptedRaw = data.B2BDTOlist ? await decryptB2B(data.B2BDTOlist) : null;
    const decrypted = decryptedRaw ? JSON.parse(decryptedRaw) : null;

    if (!decrypted) {
      if (tracked.sequence == null) {
        errorLogs.push({ sequence: null, reason: `${tracked.key} missing response body` });
        shutdownReason = `${tracked.key} missing response body during non-sequence stage`;
        ws.close();
        return;
      }

      await markFailure(tracked.sequence, `${tracked.key} missing response body`, ws);
      return;
    }

    if (checkValidationErrors(decrypted)) {
      if (tracked.sequence == null) {
        errorLogs.push({
          sequence: null,
          reason: `${tracked.key} validation errors`,
          details: JSON.stringify(decrypted.$values?.map(item => item.ValidationErrors?.$values || []).flat())
        });
        renderStatus();
        shutdownReason = `${tracked.key} validation errors during non-sequence stage`;
        ws.close();
        return;
      }

      errorLogs.push({
        sequence: tracked.sequence,
        reason: `${tracked.key} validation errors`,
        details: JSON.stringify(decrypted.$values?.map(item => item.ValidationErrors?.$values || []).flat())
      });
      await markFailure(tracked.sequence, `${tracked.key} validation errors`, ws);
      return;
    }

    if (tracked.key === "login") {
      activeToken = data.Token;
      activeTgPersonId = decrypted.$values[0].tgPersonId;
      activeOnlineAccountId = decrypted.$values[0].tgOnlineAccountId || activeOnlineAccountId;
      loginReady = true;
      renderStatus();
      await maybeLaunchMore(ws);
      return;
    }

    if (tracked.key === "portallock") {
      const context = contexts.get(tracked.sequence);

      if (!context) {
        return;
      }

      const appointment = decrypted.$values?.[0] || {};
      context.applicationDetails = {
        ...context.applicationDetails,
        ...decrypted
      };

      if (context.applicationDetails.$values?.[0]) {
        context.applicationDetails.$values[0].CreatedDate =
          context.applicationDetails.$values[0].CreatedDate ||
          appointment.CreatedDate ||
          appointment.CreateDate ||
          getEthiopianDateISO();
      }

      context.reference = buildReference(context.sequence);
      context.applicationDetails.Reference = context.reference;

      await sendPasssave(ws, context);
      return;
    }

    if (tracked.key === "passave") {
      const context = contexts.get(tracked.sequence);

      if (!context) {
        return;
      }

      const saved = decrypted.$values?.[0] || {};
      context.applicationDetails.apid = saved.tgApplicationId;
      context.applicationDetails.enid = saved.EntityId;
      context.applicationDetails.CreatedDate = saved.CreatedDate;
      context.applicationDetails.TgUserAuditDetailId = saved.TgUserAuditDetailId;
      context.applicationDetails.CreatedBySystemUserId = saved.CreatedBySystemUserId;
      context.applicationDetails.AssignedSystemOrganisationId = saved.AssignedSystemOrganisationId;
      context.applicationDetails.tgPersonIdentityId =
        saved.online_tgPersonDTOList?.$values?.[0]?.online_tgPersonIdentityDTOList?.$values?.[0]?.tgPersonIdentityId;

      await sendAddFees(ws, context);
      return;
    }

    if (tracked.key === "addfees") {
      const context = contexts.get(tracked.sequence);

      if (!context) {
        return;
      }

      await sendPayPortal(ws, context);
      return;
    }

    if (tracked.key === "payportal") {
      await markSuccess(tracked.sequence, ws);
    }
  } catch (err) {
    const isJsonError = err instanceof SyntaxError;
    if (!isJsonError) {
      errorLogs.push({
        sequence: null,
        reason: "message handler exception",
        details: err?.stack || String(err)
      });
      shutdownReason = "message handler exception";
      ws.close();
      return;
    }

    if (rest?.trim()?.startsWith("{") || rest?.trim()?.startsWith("[")) {
      errorLogs.push({
        sequence: null,
        reason: "invalid json response",
        details: `${rawMessage}\n${err?.stack || String(err)}`
      });
      shutdownReason = "invalid json response";
      ws.close();
    }
  }
});

ws.on("error", err => {
  errorLogs.push({
    sequence: null,
    reason: "websocket error",
    details: err?.stack || String(err)
  });
  shutdownReason = "websocket error";
});

ws.on("close", (code, reasonBuffer) => {
  clearInterval(pingInterval);
  if (!finalStatusRendered) {
    renderStatus();
  }
  process.stdout.write("\n");
  const reasonText = reasonBuffer ? reasonBuffer.toString() : "";
  if (shutdownReason || code || reasonText) {
    process.stdout.write(
      `${CYAN}Exit reason:${RESET} ${shutdownReason || "socket closed"}`
        + `${code ? ` | code=${code}` : ""}`
        + `${reasonText ? ` | detail=${reasonText}` : ""}\n`
    );
  }
  if (failures.length > 0) {
    const failedSequences = [...new Set(failures.map(item => item.sequence))];
    process.stdout.write(`${RED}Failed sequences:${RESET} ${JSON.stringify(failedSequences)}\n`);
  }
  if (errorLogs.length > 0) {
    process.stdout.write(`${YELLOW}Error logs:${RESET}\n`);
    for (const item of errorLogs) {
      const prefix = item.sequence == null ? "[system]" : `[seq ${item.sequence}]`;
      process.stdout.write(`${prefix} ${item.reason}\n`);
      if (item.details) {
        process.stdout.write(`${item.details}\n`);
      }
    }
  }
  if (requestMap.size > 0) {
    process.stdout.write(`${YELLOW}Pending requests:${RESET}\n`);
    for (const [requestId, tracked] of requestMap.entries()) {
      const prefix = tracked.sequence == null ? "[system]" : `[seq ${tracked.sequence}]`;
      process.stdout.write(`${prefix} ${tracked.key} | ${requestId}\n`);
    }
  }
  if (lastNonSequenceStep) {
    process.stdout.write(`${YELLOW}Last non-sequence step:${RESET} ${lastNonSequenceStep}\n`);
  }
  const activeContexts = [...contexts.values()];
  if (activeContexts.length > 0) {
    process.stdout.write(`${YELLOW}Active sequence steps:${RESET}\n`);
    for (const context of activeContexts) {
      process.stdout.write(
        `[seq ${context.sequence}] step=${context.currentStep || "unknown"}`
          + `${context.lastRequestId ? ` | request=${context.lastRequestId}` : ""}\n`
      );
    }
  }
});

process.on("unhandledRejection", error => {
  const details = error?.stack || String(error);
  process.stdout.write(`\n${RED}Unhandled rejection:${RESET} ${details}\n`);
});

process.on("uncaughtException", error => {
  const details = error?.stack || String(error);
  process.stdout.write(`\n${RED}Uncaught exception:${RESET} ${details}\n`);
});
