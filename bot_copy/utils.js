import { v4 as uuidv4 } from "uuid";
import { createRequire } from "node:module";
import { state } from "./state.js";

const require = createRequire(import.meta.url);
const { a3U, bJn } = require("../mcrypto.js");
const { runLocalBridgeCode } = require("../local_bridge.js");

export async function encDyc(a) {
  try {
    return runLocalBridgeCode(a?.code || "");
  } catch (err) {
    console.error("Local bridge error:", err.message);
    return null;
  }
}

export function encryptB2BString(b2bString) {
  return a3U(b2bString);
}

export function encryptB2BData(b2bData) {
  return encryptB2BString(JSON.stringify(b2bData));
}

export function decryptB2BString(encryptedB2B) {
  return bJn(encryptedB2B);
}

export function decryptB2BData(encryptedB2B) {
  const raw = decryptB2BString(encryptedB2B);
  return raw ? JSON.parse(raw) : null;
}

export async function sendRequest(ws, key, payloadTemplate, b2bData, token, logName) {
  let idPrefix = payloadTemplate.$values[0].id.split("|")[0].trim();
  let uuid = uuidv4();
  let payloadId = `${idPrefix} | ${uuid}`;

  if (!Array.isArray(state.objOfIds[key])) {
    state.objOfIds[key] = [];
  }
  state.objOfIds[key].push(uuid);

  console.log(`${logName} UUID:`, uuid);

  if (token) {
    payloadTemplate.$values[0].token = token;
  }
  payloadTemplate.$values[0].id = payloadId;

  let b2bString = JSON.stringify(b2bData);
  let encryptedB2b = encryptB2BString(b2bString);

  payloadTemplate.$values[0].b2bDTOlist = encryptedB2b;
  ws.send(JSON.stringify(payloadTemplate));
}

export function getEthiopianDateISO(offsetMs = 0) {
  return new Date(Date.now() + 3 * 60 * 60 * 1000 + offsetMs).toISOString().slice(0, -1);
}
