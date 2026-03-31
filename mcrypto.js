const crypto = require("crypto");
const { spawnSync } = require("child_process");
const Bunzip = require("seek-bzip");

const KEY_LEFT = [
  1268505151, 4283863368, 3866315419, 73469856, 1101901919, 2139793320,
  3658371389, 2545035777, 279385905, 2931728181, 671502757, 101247466,
  2006689821, 3434557368, 348484804, 454701057, 3042510932, 2248789182,
  952519987, 3806733325, 4004627876, 431922554, 1121390203, 35148064,
  3489904647, 885411592, 1979666013, 1312532835, 1444020387, 1965299589,
  3430054780, 1901003520,
];

const KEY_RIGHT = [
  1268505097, 4283863357, 3866315465, 73469927, 1101901863, 2139793386,
  3658371333, 2545035863, 279385863, 2931728222, 671502806, 101247362,
  2006689909, 3434557389, 348484764, 454701128, 3042510950, 2248789244,
  952520022, 3806733417, 4004627912, 431922475, 1121390090, 35148107,
  3489904720, 885411632, 1979665930, 1312532772, 1444020448, 1965299686,
  3430054683, 1901003623,
];

const IV_LEFT = [
  2709599278, 818902690, 1289160494, 3077362552, 527946598, 3094467466,
  4074233135, 2289481979, 3677636895, 89453311, 178936887, 3444227229,
  3220199502, 3793086645, 4085492249, 1826270488, 1469624703, 4006287249,
  138010484, 2239215705, 411628628, 2092711306, 4221412862, 3817241299,
];

const IV_RIGHT = [
  2709599297, 818902770, 1289160534, 3077362482, 527946549, 3094467507,
  4074233178, 2289481909, 3677636958, 89453231, 178936927, 3444227310,
  3220199450, 3793086711, 4085492310, 1826270536, 1469624597, 4006287332,
  138010407, 2239215665, 411628577, 2092711421, 4221412803, 3817241326,
];

function xorAscii(left, right) {
  if (left.length !== right.length) {
    throw new Error("Mismatched crypto seed lengths.");
  }

  const out = new Uint8Array(left.length);
  for (let i = 0; i < left.length; i += 1) {
    out[i] = (left[i] ^ right[i]) >>> 0;
  }
  return Buffer.from(out).toString("ascii");
}

function deriveSeedStrings() {
  return {
    keySeed: xorAscii(KEY_LEFT, KEY_RIGHT),
    ivSeed: xorAscii(IV_LEFT, IV_RIGHT),
  };
}

function deriveKeyAndIv() {
  const { keySeed, ivSeed } = deriveSeedStrings();
  return {
    keySeed,
    ivSeed,
    key: Buffer.from(keySeed, "base64"),
    iv: Buffer.from(ivSeed, "base64"),
  };
}

function compressWithPythonBzip2(inputBuffer) {
  const pythonScript = [
    "import base64, bz2, sys",
    "raw = base64.b64decode(sys.stdin.buffer.read())",
    "sys.stdout.buffer.write(bz2.compress(raw, compresslevel=9))",
  ].join(";");

  const encodedInput = Buffer.from(inputBuffer).toString("base64");
  const localPython =
    process.env.LOCALAPPDATA &&
    `${process.env.LOCALAPPDATA}\\Python\\bin\\python.exe`;
  const candidates = [
    [localPython, []],
    [process.env.PYTHON, []],
    ["python", []],
    ["py", ["-3"]],
  ].filter(([cmd]) => cmd && String(cmd).trim() !== "");

  let lastError = null;
  for (const [command, prefixArgs] of candidates) {
    const result = spawnSync(command, [...prefixArgs, "-c", pythonScript], {
      input: Buffer.from(encodedInput, "utf8"),
      windowsHide: true,
    });

    if (result.error) {
      lastError = result.error;
      continue;
    }

    if (result.status !== 0) {
      lastError = new Error(
        `Python bz2 compression failed: ${Buffer.from(result.stderr || []).toString("utf8")}`,
      );
      continue;
    }

    return Buffer.from(result.stdout);
  }

  throw lastError || new Error("No Python interpreter available for bzip2 compression.");
}

function getAlgorithm(key) {
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 24:
      return "aes-192-cbc";
    case 32:
      return "aes-256-cbc";
    default:
      throw new Error(`Unsupported AES key length: ${key.length}`);
  }
}

function encryptStrict(plainText) {
  const { key, iv } = deriveKeyAndIv();
  const compressed = compressWithPythonBzip2(Buffer.from(String(plainText), "utf8"));
  const payload = compressed.toString("base64");
  const cipher = crypto.createCipheriv(getAlgorithm(key), key, iv);
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(payload, "utf8")),
    cipher.final(),
  ]);
  return encrypted.toString("base64");
}

function decodePayloadToUtf8(payload) {
  const decoded = Buffer.from(payload, "base64");

  // The site's bJn() runs the AES/base64 layer and then bzip2-decompresses
  // the result when the payload is a compressed business-object blob.
  if (
    decoded.length >= 3 &&
    decoded[0] === 0x42 &&
    decoded[1] === 0x5a &&
    decoded[2] === 0x68
  ) {
    return Bunzip.decode(decoded).toString("utf8").replace(/^\uFEFF/, "");
  }

  return decoded.toString("utf8").replace(/^\uFEFF/, "");
}

function decryptStrict(cipherText) {
  const { key, iv } = deriveKeyAndIv();
  const encrypted = Buffer.from(String(cipherText), "base64");
  const decipher = crypto.createDecipheriv(getAlgorithm(key), key, iv);
  const decryptedPayload = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf8");
  return decodePayloadToUtf8(decryptedPayload);
}

function a3U(plainText) {
  try {
    return encryptStrict(plainText);
  } catch (_error) {
    return null;
  }
}

function bJn(cipherText) {
  try {
    return decryptStrict(cipherText);
  } catch (_error) {
    return "";
  }
}

module.exports = {
  a3U,
  bJn,
  compressWithPythonBzip2,
  decodePayloadToUtf8,
  decryptStrict,
  deriveKeyAndIv,
  deriveSeedStrings,
  encryptStrict,
  getAlgorithm,
};
