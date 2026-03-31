const CONFIG = require("./config");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

function getFormattedDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
}

function generateReferenceNumber() {
  // Generates BNPP + 13 random characters
  const suffix = uuidv4().replace(/-/g, "").substring(0, 13).toUpperCase();
  return `BNPP${suffix}`;
}

function buildRequestDTO(action, callType, b2bPayload, token = null) {
  const requestId = `${action} | ${uuidv4()}`;
  const request = {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: callType,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: null,
        version: "1.0.1.86",
      },
    ],
  };

  if (token) request.$values[0].token = token;

  const b2bObj = {
    $type:
      "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
    $values: Array.isArray(b2bPayload) ? b2bPayload : [b2bPayload],
  };

  return { request, requestId, b2bObj };
}

function getSortedUniqueDates(slots) {
  const dateSet = new Set();
  slots.forEach((slot) => {
    // Extract just the date part (YYYY-MM-DD)
    const date = slot.AppointmentDate.split("T")[0];
    dateSet.add(date);
  });

  // Sort dates chronologically
  const sortedDates = Array.from(dateSet).sort(
    (a, b) => new Date(a) - new Date(b),
  );
  return sortedDates;
}

function customStringify(obj) {
  function recursiveStringify(currentObj) {
    if (typeof currentObj !== "object" || currentObj === null) {
      return currentObj;
    }

    if (Array.isArray(currentObj)) {
      return currentObj.map(recursiveStringify);
    }

    const newObj = {};
    for (const key in currentObj) {
      if (key === "tgDTO") {
        newObj[key] = JSON.stringify(recursiveStringify(currentObj[key]));
      } else {
        newObj[key] = recursiveStringify(currentObj[key]);
      }
    }
    return newObj;
  }
  return JSON.stringify(recursiveStringify(obj));
}
// --- TURNSTILE & INJECTION LOGIC ---
async function solveTurnstileGate(page) {
  console.log("🛡️ Turnstile gate detected. Starting solver...");
  try {
    // --- STEP 1: EXTRACT SITE KEY ---
    console.log("Waiting for Turnstile Site Key...");
    await page.waitForFunction(
      () => window.ENV && window.ENV.TURNSTILE_SITE_KEY,
      null,
      { timeout: 150000 },
    );
    const sitekey = await page.evaluate(() => window.ENV.TURNSTILE_SITE_KEY);
    console.log(`Found sitekey: ${sitekey}`);

    // --- STEP 2: SOLVE VIA 2CAPTCHA ---
    console.log("Sending request to 2Captcha...");
    const initialResponse = await axios.post(
      "http://2captcha.com/in.php",
      null,
      {
        params: {
          key: CONFIG.TWO_CAPTCHA_API_KEY,
          method: "turnstile",
          sitekey,
          pageurl: CONFIG.TARGET_URL,
          json: 1,
        },
      },
    );

    if (initialResponse.data.status !== 1)
      throw new Error(`2Captcha Error: ${initialResponse.data.request}`);
    const requestId = initialResponse.data.request;
    console.log(`2Captcha Request ID: ${requestId}. Waiting...`);

    let solutionToken = null;
    while (!solutionToken) {
      await sleep(5000);
      const pollResponse = await axios.get("http://2captcha.com/res.php", {
        params: {
          key: CONFIG.TWO_CAPTCHA_API_KEY,
          action: "get",
          id: requestId,
          json: 1,
        },
      });
      if (pollResponse.data.status === 1)
        solutionToken = pollResponse.data.request;
    }
    console.log("✅ Solution token received!");

    // --- STEP 3: VERIFY TOKEN ---
    console.log("Verifying token via browser...");
    const verificationResult = await page.evaluate(
      async ({ url, token }) => {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return { success: true, data: await response.json() };
          }
          return { success: false, error: "Non-JSON response" };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      { url: CONFIG.VERIFICATION_API_URL, token: solutionToken },
    );

    if (!verificationResult.success || !verificationResult.data.success) {
      throw new Error("API verification failed.");
    }
    console.log("✅ API verification successful!");

    // --- STEP 4: BYPASS & RELOAD ---
    console.log("Setting gate session key...");
    await page.evaluate((key) => {
      sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now() }));
    }, CONFIG.GATE_SESSION_KEY);

    console.log("Reloading page to enter Authenticated Session...");
    await page.reload({ waitUntil: "domcontentloaded", timeout: 600000 });

    console.log("✅ Gate bypassed!");
    return true;
  } catch (error) {
    console.error("Solver Error:", error.message);
    return false;
  }
}

async function monitorForCaptcha(page) {
  console.log("🕵️‍♂️ Starting CAPTCHA monitor...");
  setInterval(async () => {
    try {
      const gate = await page.$("#turnstile-gate:not(.hidden)");
      if (gate) {
        console.log("CAPTCHA gate reappeared! Re-solving...");
        await solveTurnstileGate(page);
      }
    } catch (error) {}
  }, 5000);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { spawn } = require("child_process");
const path = require("path");

function processPdfWithDart(base64Pdf, configRules) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      pdf: base64Pdf,
      config: { rules: configRules },
    });

    // POINT TO YOUR COMPILED EXE
    // Adjust this path to where you built the flutter app
    const exePath = path.resolve(
      "C:/Users/hp/pdf_processor_executable/build/windows/x64/runner/Release/pdf_processor_executable.exe",
    );

    // Ensure the CWD (Current Working Directory) is the folder containing the font file
    // otherwise Dart won't find the .ttf
    const cwdPath = path.dirname(exePath);

    const dartProcess = spawn(exePath, [], { cwd: cwdPath });

    let outputData = "";
    let errorData = "";

    dartProcess.stdin.write(payload);
    dartProcess.stdin.end();

    dartProcess.stdout.on("data", (chunk) => {
      outputData += chunk.toString();
    });
    dartProcess.stderr.on("data", (chunk) => {
      errorData += chunk.toString();
    });

    dartProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Process failed: ${errorData}`));
      } else {
        try {
          const result = JSON.parse(outputData);
          if (result.status === "success") {
            resolve(result.pdf);
          } else {
            reject(new Error("Dart logic failed"));
          }
        } catch (e) {
          reject(
            new Error(`Parse error: ${e.message} \nRaw Output: ${outputData}`),
          );
        }
      }
    });
  });
}

function toLocalISOString(date) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const pad3 = (n) => (n < 10 ? "00" + n : n < 100 ? "0" + n : n);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ms = pad3(date.getMilliseconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}`;
}
function localeDateFormat(date) {
  const dateISO = new Date(date);
  const formattedDate = dateISO.toLocaleDateString("en-GB");
  return formattedDate;
}
module.exports = {
  getFormattedDate,
  generateReferenceNumber,
  buildRequestDTO,
  getSortedUniqueDates,
  customStringify,
  solveTurnstileGate,
  monitorForCaptcha,
  processPdfWithDart,
  toLocalISOString,
  localeDateFormat,
};
