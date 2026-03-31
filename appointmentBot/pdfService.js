const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { toLocalISOString } = require("../utils/utils");

// Configuration
const CRYPTO_API_URL = "http://localhost:3000/generate-svg";
const PDF_SERVICE_URL = "http://localhost:8000/generate-pdfs";
const CUSTOMER_PDF_OUTPUT_DIR = path.join(__dirname, "../output");

// Ensure output directory exists
if (!fs.existsSync(CUSTOMER_PDF_OUTPUT_DIR)) {
  fs.mkdirSync(CUSTOMER_PDF_OUTPUT_DIR, { recursive: true });
}

/**
 * Generates the barcode SVG by calling the cryptoAPI service.
 * @param {string} reference - The reference number.
 * @returns {Promise<string>} - The SVG string.
 */
async function generateBarcodeSvg(reference) {
  try {
    const response = await axios.post(CRYPTO_API_URL, { reference });
    if (response.data && response.data.svg_string) {
      return response.data.svg_string;
    }
    throw new Error("Invalid response from SVG generation service");
  } catch (error) {
    console.error("Error generating barcode SVG:", error.message);
    throw error;
  }
}

/**
 * Orchestrates the PDF generation process.
 * 1. Generates the barcode SVG.
 * 2. Constructs the replacement rules.
 * 3. Calls the FastAPI service to generate PDFs.
 * 4. Saves the customer copy and returns the Base64 strings for the others.
 *
 * @param {Object} userData - The user data object.
 * @param {string} reference - The generated reference number.
 * @param {string} seq - The sequence number.
 * @returns {Promise<Object>} - An object containing { personalPdfBase64, paymentPdfBase64 }.
 */
async function generateAndProcessPdfs(userData, reference, seq) {
  try {
    console.log(`--- Starting PDF Orchestration for ${userData.FirstName} ---`);

    // 1. Generate Barcode SVG
    console.log(`   Generatng barcode for reference: ${reference}...`);
    const barcodeSvg = await generateBarcodeSvg(reference);
    // 2. Construct Replacement Rules

    // Helper to format date if needed, assuming ISO strings are passed or standard date objects
    // Example input: "2000-01-01T00:00:00.000Z" -> "01/01/2000"
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      try {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (e) {
        return dateStr;
      }
    };

    // Helper for time formatting if needed "08:00:00" -> "08:00:00"
    // userData.StartTime and EndTime are typically "08:00:00" strings already.

    const rules = {
      personal_data_rules: {
        text_replacements: [
          { old: "BTPP526007DFB3P", new: reference, english: true },
          {
            old: "01/03/2026",
            new: userData.applicationStartDate,
            english: true,
          }, // Appointment Date
          {
            old: "22:57:59 PM",
            new: new Date().toLocaleTimeString(),
            english: true,
          }, // Application Time (approx)
          {
            old: "01/07/2026",
            new: userData.appointmentDate,
            english: true,
          }, // Application Date
          {
            old: "24/10/2018",
            new: userData.nspEthiopianAppointmentDate,
            english: true,
          }, // ID Issue Date? Not in userData usually
          {
            old: "ዳውድ",
            new: userData.FirstNamesAmharic,
            english: false,
          },
          {
            old: "ኢብሳ",
            new: userData.MiddleNameAmharic,
            english: false,
          },
          {
            old: "ዳንጎቴ",
            new: userData.SurnameAmharic,
            english: false,
          },
          {
            old: "DAWUD",
            new: userData.FirstName.toUpperCase(),
            english: true,
          },
          {
            old: "EBSA",
            new: userData.MiddleName.toUpperCase(),
            english: true,
          },
          {
            old: "DANGOTE",
            new: userData.Surname.toUpperCase(),
            english: true,
          },
          {
            old: "01/01/2000",
            new: userData.birthDate,
            english: true,
          },
          {
            old: "10:00:00 - 11:00:00",
            new: userData.AppointmentTime,
            english: true,
          },
          {
            old: "1563241784521896",
            new: userData.birthCertificateId,
            english: true,
          },
          {
            old: "1563241784521896",
            new: userData.birthCertificateId,
            english: true,
          },
          {
            old: "MALE",
            new: userData.Gender,
            english: true,
          },
          {
            old: "174 cm",
            new: `${userData.Height} cm`,
            english: true,
          },
          {
            old: "+251 922522252",
            new: userData.ContactNumber.replace("_", " "),
            english: true,
          },
          {
            old: "placeholder27@gmail.com",
            new: userData.EmailAddress,
            english: true,
          },
          {
            old: "JI-MA",
            new: userData.CityOfBirth,
            english: true,
          },
          {
            old: "MAIN-ADDRESS-LINE",
            new: userData.MainAddress,
            english: true,
            limit: 45,
          },
        ],
        barcode_replacements: [
          {
            anchor: "BTPP526007DFB3P",
            svg_string: barcodeSvg,
          },
        ],
      },
      payment_instruction_rules: {
        text_replacements: [
          { old: "BTPP526007DFB3P", new: reference, english: true },
          {
            old: "01/03/2026",
            new: userData.applicationStartDate,
            english: true,
          },
          {
            old: "23:05:58 PM",
            new: new Date().toLocaleTimeString(),
            english: true,
          },
          {
            old: "ዳውድኢብሳዳንጎቴ",
            new: `${userData.FirstNamesAmharic} ${userData.MiddleNameAmharic} ${userData.SurnameAmharic}`,
            english: false,
          },
          {
            old: "DAWUD EBSA DANGOTE",
            new: `${userData.FirstName.toUpperCase()} ${userData.MiddleName.toUpperCase()} ${userData.Surname.toUpperCase()}`,
            english: true,
          },
          {
            old: "1563241784521896",
            new: userData.birthCertificateId,
            english: true,
          },
        ],
        barcode_replacements: [
          {
            anchor: "BTPP526007DFB3P",
            svg_string: barcodeSvg,
          },
        ],
      },
      customer_copy_rules: {
        text_replacements: [
          { old: "BTPP526007DFB3P", new: reference, english: true },
          {
            old: "01/03/2026",
            new: userData.applicationStartDate,
            english: true,
          }, // Appointment Date
          {
            old: "22:57:59 PM",
            new: new Date().toLocaleTimeString(),
            english: true,
          }, // Application Time (approx)
          {
            old: "01/07/2026",
            new: userData.appointmentDate,
            english: true,
          }, // Application Date
          {
            old: "24/10/2018",
            new: userData.nspEthiopianAppointmentDate,
            english: true,
          }, // ID Issue Date? Not in userData usually
          {
            old: "ዳውድ",
            new: userData.FirstNamesAmharic,
            english: false,
          },
          {
            old: "ኢብሳ",
            new: userData.MiddleNameAmharic,
            english: false,
          },
          {
            old: "ዳንጎቴ",
            new: userData.SurnameAmharic,
            english: false,
          },
          {
            old: "DAWUD",
            new: userData.FirstName.toUpperCase(),
            english: true,
          },
          {
            old: "EBSA",
            new: userData.MiddleName.toUpperCase(),
            english: true,
          },
          {
            old: "DANGOTE",
            new: userData.Surname.toUpperCase(),
            english: true,
          },
          {
            old: "01/01/2000",
            new: userData.birthDate,
            english: true,
          },
          {
            old: "10:00:00 - 11:00:00",
            new: userData.AppointmentTime,
            english: true,
          },
          {
            old: "1563241784521896",
            new: userData.birthCertificateId,
            english: true,
          },
          {
            old: "1563241784521896",
            new: userData.birthCertificateId,
            english: true,
          },
          {
            old: "MALE",
            new: userData.Gender,
            english: true,
          },
          {
            old: "174 cm",
            new: `${userData.Height} cm`,
            english: true,
          },
          {
            old: "+251 922522252",
            new: userData.ContactNumber.replace("_", " "),
            english: true,
          },
          {
            old: "placeholder27@gmail.com",
            new: userData.EmailAddress,
            english: true,
          },
          {
            old: "JI-MA",
            new: userData.CityOfBirth,
            english: true,
          },
          {
            old: "MAIN-ADDRESS-LINE",
            new: userData.MainAddress,
            english: true,
            limit: 45,
          },
        ],
        barcode_replacements: [
          {
            anchor: "BTPP526007DFB3P",
            svg_string: barcodeSvg,
          },
        ],
      },
    };
    // 3. Call FastAPI Service
    console.log(
      `   Sending generation request to PDF service... CHECK RULES ${JSON.stringify(rules, null, 2)}`,
    );
    const response = await axios.post(PDF_SERVICE_URL, rules);

    if (!response.data) {
      throw new Error("No data received from PDF service");
    }

    const {
      personal_data_pdf_base64,
      payment_instruction_pdf_base64,
      customer_copy_pdf_path,
    } = response.data;

    // 4. Handle Customer Copy
    console.log(`   ✅ PDFs generated successfully. `);
    console.log(`   Customer copy saved at: ${customer_copy_pdf_path}`);

    return {
      personalPdf: personal_data_pdf_base64,
      paymentPdf: payment_instruction_pdf_base64,
    };
  } catch (error) {
    console.error(
      `❌ PDF Orchestration failed for ${userData.FirstName}:`,
      error.message,
    );
    if (error.response) {
      console.error("   Server response:", error.response.data);
    }
    throw error; // Propagate error to caller
  }
}

module.exports = {
  generateAndProcessPdfs,
};
