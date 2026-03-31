const { a3U, bJn } = require("./mcrypto");
const { ww } = require("./ww");

function extractArgs(code, regex, label) {
  const match = String(code || "").trim().match(regex);
  if (!match) {
    throw new Error(`Unsupported local bridge code for ${label}`);
  }

  return match[1];
}

function parseArgs(rawArgs, label) {
  try {
    return JSON.parse(`[${rawArgs}]`);
  } catch (error) {
    throw new Error(`Failed to parse ${label} arguments: ${error.message}`);
  }
}

function runLocalBridgeCode(code) {
  const source = String(code || "").trim();

  if (source.includes("window.__CONSOLE_CRYPTO.a3U(") || source.includes("window.__CONSOLE_CRYPTO.a3r(")) {
    const rawArgs = extractArgs(
      source,
      /window\.__CONSOLE_CRYPTO\.(?:a3U|a3r)\(([\s\S]*?)\)\s*;?\s*$/m,
      "encrypt",
    );
    const [plainText] = parseArgs(rawArgs, "encrypt");
    return a3U(plainText);
  }

  if (source.includes("window.__CONSOLE_CRYPTO.bJn(") || source.includes("window.__CONSOLE_CRYPTO.bHT(")) {
    const rawArgs = extractArgs(
      source,
      /window\.__CONSOLE_CRYPTO\.(?:bJn|bHT)\(([\s\S]*?)\)\s*;?\s*$/m,
      "decrypt",
    );
    const [cipherText] = parseArgs(rawArgs, "decrypt");
    return bJn(cipherText);
  }

  if (
    source.includes("window.__BARCODE.WG(") ||
    source.includes("window.__BARCODE.Ww(") ||
    source.includes("window.__BARCODE.Wp(")
  ) {
    const rawArgs = extractArgs(
      source,
      /window\.__BARCODE\.(?:WG|Ww|Wp)\(([\s\S]*?)\)\s*;?\s*$/m,
      "barcode",
    );
    const [value, height = 30, width = 100] = parseArgs(rawArgs, "barcode");
    return ww(value, Number(height), Number(width));
  }

  throw new Error("Unsupported local bridge code");
}

module.exports = {
  runLocalBridgeCode,
};
