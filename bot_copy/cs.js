import WebSocket from "ws";
import { objOfJsons } from "./JSONs.js";
import { objOfB } from "./b2bs.js";
import { off as offOld } from "./office.js";
import { off as offNew } from "./offices_new.js";
import { generateBarcode } from "./barcode.js";
import { state } from "./state.js";
import { sendRequest, decryptB2BData, getEthiopianDateISO } from "./utils.js";

const WS_URL = "wss://www.immigration.gov.et:18443";
const OFFICE_ID = 14;
const SERVICE_TYPE = 915;
const USERNAME = "JojoeB";
const PASSWORD = "HAB@bil$guy2209te";
const AFTER_HOW_MANY_DAYS = 2;
const START_TIME = "08:00 AM";
const END_TIME = "09:00 AM";
const APPLICATION_START_DATE = "2025-12-31T10:54:12.122";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getApplicationStartDateISO() {
  return SERVICE_TYPE === 915 ? getEthiopianDateISO() : APPLICATION_START_DATE;
}

function getActiveOffices() {
  return SERVICE_TYPE === 915 ? offNew : offOld;
}

function checkValidationErrors(b2bDecrypted) {
  if (b2bDecrypted?.$values?.some(item => item.ValidationErrors?.$values?.length > 0)) {
    const errors = b2bDecrypted.$values
      .filter(item => item.ValidationErrors?.$values?.length > 0)
      .flatMap(item => item.ValidationErrors.$values);
    console.log("Validation Errors Found:", JSON.stringify(errors, null, 2));
    return true;
  }

  return false;
}

async function decryptB2B(encrypted) {
  return decryptB2BData(encrypted);
}

async function loginStep(ws) {
  const payload = clone(objOfJsons.loginj);
  const b2b = clone(objOfB.loginB2b);
  b2b.$values[0].Username = USERNAME;
  b2b.$values[0].ValidationPar = PASSWORD;
  await sendRequest(ws, "login", payload, b2b, null, "LOGIN");
}

async function portallockStep(ws, token) {
  const payload = clone(objOfJsons.portallockj);
  const b2b = clone(objOfB.portallockB2b);
  const appointmentDate = getEthiopianDateISO(AFTER_HOW_MANY_DAYS * 86700000);
  const parts = new Intl.DateTimeFormat("en-US-u-ca-ethiopic", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(appointmentDate));
  const nspDate = `${parts.find(x => x.type === "year").value}-${parts.find(x => x.type === "month").value}-${parts.find(x => x.type === "day").value}${appointmentDate.slice(10)}`;

  b2b.$values[0].AppointmentDate = appointmentDate;
  b2b.$values[0].tgSystemOrganisationId = OFFICE_ID;
  b2b.$values[0].StartTime = START_TIME;
  b2b.$values[0].EndTime = END_TIME;
  b2b.$values[0].tgPersonId = state.applicationDetails.tgp;
  b2b.$values[0].nspEthiopianAppointmentDate = nspDate;

  await sendRequest(ws, "portallock", payload, b2b, token, "PORTALLOCK");
}

async function loadsequenceStep(ws, token) {
  const payload = clone(objOfJsons.loadsequencej);
  const b2b = clone(objOfB.loadsequenceB2b);
  b2b.$values[0].EntityId = OFFICE_ID;
  await sendRequest(ws, "loadsequence", payload, b2b, token, "LOAD SEQUENCE");
}

const ws = new WebSocket(WS_URL, {
  rejectUnauthorized: false
});

let pingInterval;

ws.on("open", async () => {
  state.objOfIds.login = [];
  state.objOfIds.portallock = [];
  state.objOfIds.loadsequence = [];
  state.applicationDetails = {};

  pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 10000);

  await loginStep(ws);
});

ws.on("message", async msg => {
  const [first, rest] = msg.toString().split(/,(.+)/);

  try {
    const data = JSON.parse(rest);
    const id = data.Id.split("|")[1].trim();
    const foundKey = Object.keys(state.objOfIds).find(key => {
      return Array.isArray(state.objOfIds[key]) && state.objOfIds[key].includes(id);
    });

    if (first !== "true" || !foundKey) {
      return;
    }

    const decrypted = await decryptB2B(data.B2BDTOlist);

    if (checkValidationErrors(decrypted)) {
      ws.close();
      return;
    }

    if (foundKey === "login") {
      state.applicationDetails.ApplicationStartDateISO = getApplicationStartDateISO();
      state.applicationDetails.tgp = decrypted.$values[0].tgPersonId;
      await portallockStep(ws, data.Token);
      return;
    }

    if (foundKey === "portallock") {
      state.applicationDetails = {
        ...state.applicationDetails,
        ...decrypted
      };
      await loadsequenceStep(ws, data.Token);
      return;
    }

    if (foundKey === "loadsequence") {
      const currentValue = decrypted.$values[0].CurrentValue;
      const abbreviation = getActiveOffices().find(o => o.tgSystemOrganisationId === OFFICE_ID)?.Abbreviation;
      const reference = generateBarcode({
        n: abbreviation,
        l: SERVICE_TYPE === 915 ? "4" : "5",
        sequence: currentValue
      });

      console.log(JSON.stringify({
        officeId: OFFICE_ID,
        serviceType: SERVICE_TYPE,
        currentValue,
        abbreviation,
        reference
      }, null, 2));

      ws.close();
    }
  } catch (err) {
    const isJsonError = err instanceof SyntaxError && err.message.includes("Unexpected token");
    if (!isJsonError) {
      console.error("Error processing message:", err.message);
      ws.close();
    }
  }
});

ws.on("error", err => {
  console.error("WebSocket error:", err.message);
});

ws.on("close", () => {
  clearInterval(pingInterval);
  console.log("WebSocket closed");
});
