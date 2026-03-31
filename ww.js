const {
  start_word,
  stop_word,
  padding_codeword,
  codewords,
  correctionFactors,
  latch_to_text,
  latch_to_byte_padded,
  latch_to_numeric,
  latch_to_byte,
  shift_to_byte,
  min_numeric_count,
  mixedMap,
  punctMap,
} = require("./ww_constants");

// Ported from the same PDF417 implementation used by the website's
// compiled Flutter bundle (`main.dart.js` -> `Ww`) with the site's
// runtime settings:
// - security level 2
// - module height 2
// - preferred ratio 3
const DEFAULT_SECURITY_LEVEL = 2;
const DEFAULT_MODULE_HEIGHT = 2;
const DEFAULT_PREFERRED_RATIO = 3;
const DEFAULT_SVG_HEIGHT = 30;
const DEFAULT_SVG_WIDTH = 100;

const MIN_COLS = 2;
const MAX_COLS = 60;
const MIN_ROWS = 2;
const MAX_ROWS = 60;

const ENC_TEXT = 0;
const ENC_NUMERIC = 1;
const ENC_BINARY = 2;

const SUB_UPPER = 0;
const SUB_LOWER = 1;
const SUB_MIXED = 2;
const SUB_PUNCT = 3;

function ensureByteArray(input) {
  if (input instanceof Uint8Array) {
    return Array.from(input);
  }
  if (Buffer.isBuffer(input)) {
    return Array.from(input);
  }
  if (Array.isArray(input)) {
    return Array.from(input, (value) => value & 0xff);
  }
  return Array.from(new TextEncoder().encode(String(input)));
}

function determineConsecutiveDigitCount(data) {
  let count = 0;
  for (const value of data) {
    if (value < 0x30 || value > 0x39) {
      break;
    }
    count += 1;
  }
  return count;
}

function encodeNumeric(digits) {
  const words = [];
  let chunkCount = Math.floor(digits.length / 44);
  if (digits.length % 44 !== 0) {
    chunkCount += 1;
  }

  for (let i = 0; i < chunkCount; i += 1) {
    const start = i * 44;
    const end = Math.min(start + 44, digits.length);
    let chunkNum = BigInt(`1${String.fromCharCode(...digits.slice(start, end))}`);
    const chunkWords = [];

    while (chunkNum > 0n) {
      chunkWords.unshift(Number(chunkNum % 900n));
      chunkNum /= 900n;
    }

    words.push(...chunkWords);
  }

  return words;
}

function isText(ch) {
  return ch === 0x09 || ch === 0x0a || ch === 0x0d || (ch >= 32 && ch <= 126);
}

function determineConsecutiveTextCount(data) {
  let result = 0;
  for (let i = 0; i < data.length; i += 1) {
    const numericCount = determineConsecutiveDigitCount(data.slice(i));
    if (numericCount >= min_numeric_count || (numericCount === 0 && !isText(data[i]))) {
      break;
    }
    result += 1;
  }
  return result;
}

function isAlphaUpper(ch) {
  return ch === 0x20 || (ch >= 0x41 && ch <= 0x5a);
}

function isAlphaLower(ch) {
  return ch === 0x20 || (ch >= 0x61 && ch <= 0x7a);
}

function isMixed(ch) {
  return mixedMap.has(ch);
}

function isPunctuation(ch) {
  return punctMap.has(ch);
}

function encodeText(text, startSubmode, result) {
  let idx = 0;
  let submode = startSubmode;
  const tmp = [];

  while (idx < text.length) {
    const ch = text[idx];

    switch (submode) {
      case SUB_UPPER:
        if (isAlphaUpper(ch)) {
          tmp.push(ch === 0x20 ? 26 : ch - 0x41);
        } else if (isAlphaLower(ch)) {
          submode = SUB_LOWER;
          tmp.push(27);
          continue;
        } else if (isMixed(ch)) {
          submode = SUB_MIXED;
          tmp.push(28);
          continue;
        } else {
          tmp.push(29, punctMap.get(ch));
        }
        break;

      case SUB_LOWER:
        if (isAlphaLower(ch)) {
          tmp.push(ch === 0x20 ? 26 : ch - 0x61);
        } else if (isAlphaUpper(ch)) {
          tmp.push(27, ch - 0x41);
        } else if (isMixed(ch)) {
          submode = SUB_MIXED;
          tmp.push(28);
          continue;
        } else {
          tmp.push(29, punctMap.get(ch));
        }
        break;

      case SUB_MIXED:
        if (isMixed(ch)) {
          tmp.push(mixedMap.get(ch));
        } else if (isAlphaUpper(ch)) {
          submode = SUB_UPPER;
          tmp.push(28);
          continue;
        } else if (isAlphaLower(ch)) {
          submode = SUB_LOWER;
          tmp.push(27);
          continue;
        } else {
          if (idx + 1 < text.length && isPunctuation(text[idx + 1])) {
            submode = SUB_PUNCT;
            tmp.push(25);
            continue;
          }
          tmp.push(29, punctMap.get(ch));
        }
        break;

      default:
        if (isPunctuation(ch)) {
          tmp.push(punctMap.get(ch));
        } else {
          submode = SUB_UPPER;
          tmp.push(29);
          continue;
        }
        break;
    }

    idx += 1;
  }

  let half = 0;
  for (let i = 0; i < tmp.length; i += 1) {
    const value = tmp[i];
    if (i % 2 !== 0) {
      result.push(half * 30 + value);
    } else {
      half = value;
    }
  }

  if (tmp.length % 2 !== 0) {
    result.push(half * 30 + 29);
  }

  return submode;
}

function determineConsecutiveBinaryCount(msg) {
  let result = 0;
  for (let i = 0; i < msg.length; i += 1) {
    const numericCount = determineConsecutiveDigitCount(msg.slice(i));
    if (numericCount >= min_numeric_count) {
      break;
    }

    const textCount = determineConsecutiveTextCount(msg.slice(i));
    if (textCount > 5) {
      break;
    }

    result += 1;
  }
  return result;
}

function encodeBinary(data, startMode) {
  const result = [];
  const count = data.length;

  if (count === 1 && startMode === ENC_TEXT) {
    result.push(shift_to_byte);
  } else if (count % 6 === 0) {
    result.push(latch_to_byte);
  } else {
    result.push(latch_to_byte_padded);
  }

  let idx = 0;
  if (count >= 6) {
    while (count - idx >= 6) {
      let packed = 0;
      for (let i = 0; i < 6; i += 1) {
        packed = (packed << 8) + data[idx + i];
      }

      const words = new Array(5).fill(0);
      for (let i = 0; i < 5; i += 1) {
        words[4 - i] = packed % 900;
        packed = Math.floor(packed / 900);
      }

      result.push(...words);
      idx += 6;
    }
  }

  for (let i = idx; i < count; i += 1) {
    result.push(data[i] & 0xff);
  }

  return result;
}

function highLevelEncode(data) {
  const result = [];
  let remaining = data.slice();
  let encodingMode = ENC_TEXT;
  let textSubMode = SUB_UPPER;

  while (remaining.length > 0) {
    const numericCount = determineConsecutiveDigitCount(remaining);
    if (numericCount >= min_numeric_count || numericCount === remaining.length) {
      result.push(latch_to_numeric);
      encodingMode = ENC_NUMERIC;
      textSubMode = SUB_UPPER;
      result.push(...encodeNumeric(remaining.slice(0, numericCount)));
      remaining = remaining.slice(numericCount);
      continue;
    }

    const textCount = determineConsecutiveTextCount(remaining);
    if (textCount >= 5 || textCount === remaining.length) {
      if (encodingMode !== ENC_TEXT) {
        result.push(latch_to_text);
        encodingMode = ENC_TEXT;
        textSubMode = SUB_UPPER;
      }

      const textWords = [];
      textSubMode = encodeText(remaining.slice(0, textCount), textSubMode, textWords);
      result.push(...textWords);
      remaining = remaining.slice(textCount);
      continue;
    }

    let binaryCount = determineConsecutiveBinaryCount(remaining);
    if (binaryCount === 0) {
      binaryCount = 1;
    }

    const bytes = remaining.slice(0, binaryCount);
    const startMode = bytes.length === 1 && encodingMode === ENC_TEXT ? ENC_TEXT : ENC_BINARY;
    if (startMode === ENC_BINARY) {
      encodingMode = ENC_BINARY;
      textSubMode = SUB_UPPER;
    }

    result.push(...encodeBinary(bytes, startMode));
    remaining = remaining.slice(binaryCount);
  }

  return result;
}

function errorCorrectionWordCount(level) {
  return 1 << (level + 1);
}

function getPadding(dataCount, ecCount, columns) {
  const totalCount = dataCount + ecCount + 1;
  const mod = totalCount % columns;
  if (mod === 0) {
    return [];
  }
  return new Array(columns - mod).fill(padding_codeword);
}

function computeErrorCorrection(level, data) {
  const factors = correctionFactors[level];
  const count = errorCorrectionWordCount(level);
  const ecWords = new Array(count).fill(0);

  for (const value of data) {
    const temp = (value + ecWords[0]) % 929;

    for (let i = count - 1; i >= 0; i -= 1) {
      let add = 0;
      if (i > 0) {
        add = ecWords[count - i];
      }
      ecWords[count - 1 - i] = (add + 929 - ((temp * factors[i]) % 929)) % 929;
    }
  }

  for (let i = 0; i < ecWords.length; i += 1) {
    if (ecWords[i] > 0) {
      ecWords[i] = 929 - ecWords[i];
    }
  }

  return ecWords;
}

function calculateNumberOfRows(messageWordCount, ecWordCount, columns) {
  let rows = Math.floor((messageWordCount + 1 + ecWordCount) / columns) + 1;
  if (columns * rows >= messageWordCount + 1 + ecWordCount + columns) {
    rows -= 1;
  }
  return rows;
}

function calcDimensions(dataWords, ecWords, moduleHeight, preferredRatio) {
  let ratio = 0;
  let columns = 0;
  let rows = 0;

  for (let c = MIN_COLS; c <= MAX_COLS; c += 1) {
    const r = calculateNumberOfRows(dataWords, ecWords, c);

    if (r < MIN_ROWS) {
      break;
    }

    if (r > MAX_ROWS) {
      continue;
    }

    if (r !== 0) {
      const newRatio = (17 * c + 69) / (r * moduleHeight);
      if (Math.abs(newRatio - preferredRatio) < Math.abs(ratio - preferredRatio)) {
        ratio = newRatio;
        columns = c;
        rows = r;
        continue;
      }
      break;
    }
  }

  if (rows === 0) {
    columns = MIN_COLS;
    rows = calculateNumberOfRows(dataWords, ecWords, columns);
    if (rows < MIN_ROWS) {
      rows = MIN_ROWS;
    }
  }

  return { columns, rows };
}

function getLeftCodeWord(rowNum, rows, columns, securityLevel) {
  const tableId = rowNum % 3;
  let x;
  switch (tableId) {
    case 0:
      x = Math.floor((rows - 3) / 3);
      break;
    case 1:
      x = securityLevel * 3 + ((rows - 1) % 3);
      break;
    default:
      x = columns - 1;
      break;
  }
  return 30 * Math.floor(rowNum / 3) + x;
}

function getRightCodeWord(rowNum, rows, columns, securityLevel) {
  const tableId = rowNum % 3;
  let x;
  switch (tableId) {
    case 0:
      x = columns - 1;
      break;
    case 1:
      x = Math.floor((rows - 1) / 3);
      break;
    default:
      x = securityLevel * 3 + ((rows - 1) % 3);
      break;
  }
  return 30 * Math.floor(rowNum / 3) + x;
}

function getCodeword(tableId, word) {
  return codewords[tableId][word];
}

function encodeData(dataWords, columns, securityLevel) {
  const encoded = dataWords.slice();
  encoded.push(...getPadding(encoded.length, errorCorrectionWordCount(securityLevel), columns));
  encoded.unshift(encoded.length + 1);
  encoded.push(...computeErrorCorrection(securityLevel, encoded));
  return encoded;
}

function renderCodeBits(codes) {
  const bits = [];
  for (const row of codes) {
    const lastIndex = row.length - 1;
    for (let i = 0; i < row.length; i += 1) {
      const bitCount = i === lastIndex ? 18 : 17;
      const value = row[i];
      for (let shift = bitCount - 1; shift >= 0; shift -= 1) {
        bits.push(((value >> shift) & 1) === 1);
      }
    }
  }
  return bits;
}

function generatePdf417Matrix(input, options = {}) {
  const securityLevel = options.securityLevel ?? DEFAULT_SECURITY_LEVEL;
  const moduleHeight = options.moduleHeight ?? DEFAULT_MODULE_HEIGHT;
  const preferredRatio = options.preferredRatio ?? DEFAULT_PREFERRED_RATIO;

  const dataWords = highLevelEncode(ensureByteArray(input));
  const dimensions = calcDimensions(
    dataWords.length,
    errorCorrectionWordCount(securityLevel),
    moduleHeight,
    preferredRatio,
  );

  if (
    dimensions.columns < MIN_COLS ||
    dimensions.columns > MAX_COLS ||
    dimensions.rows < MIN_ROWS ||
    dimensions.rows > MAX_ROWS
  ) {
    throw new Error("Unable to fit data in barcode");
  }

  const codeWords = encodeData(dataWords, dimensions.columns, securityLevel);
  const grid = [];
  for (let i = 0; i < codeWords.length; i += dimensions.columns) {
    grid.push(codeWords.slice(i, Math.min(i + dimensions.columns, codeWords.length)));
  }

  const codes = [];
  let rowNum = 0;
  for (const row of grid) {
    const table = rowNum % 3;
    const rowCodes = [start_word];
    rowCodes.push(getCodeword(table, getLeftCodeWord(rowNum, dimensions.rows, dimensions.columns, securityLevel)));
    for (const word of row) {
      rowCodes.push(getCodeword(table, word));
    }
    rowCodes.push(getCodeword(table, getRightCodeWord(rowNum, dimensions.rows, dimensions.columns, securityLevel)));
    rowCodes.push(stop_word);
    codes.push(rowCodes);
    rowNum += 1;
  }

  return {
    width: (dimensions.columns + 4) * 17 + 1,
    rows: dimensions.rows,
    moduleHeight,
    bits: renderCodeBits(codes),
  };
}

function formatSvgNumber(value) {
  const normalized = Math.abs(value) < 1e-12 ? 0 : value;
  return normalized.toFixed(5).replace(/\.?0+$/, "");
}

function matrixToWwSvg(matrix, svgHeight = DEFAULT_SVG_HEIGHT, svgWidth = DEFAULT_SVG_WIDTH) {
  const totalMatrixHeight = matrix.rows * matrix.moduleHeight;
  let contentWidth;
  let contentHeight;

  if (svgWidth / svgHeight > matrix.width / totalMatrixHeight) {
    contentWidth = (matrix.width * svgHeight) / totalMatrixHeight;
    contentHeight = svgHeight;
  } else {
    contentHeight = (totalMatrixHeight * svgWidth) / matrix.width;
    contentWidth = svgWidth;
  }

  const moduleWidth = contentWidth / matrix.width;
  const rowHeight = contentHeight / matrix.rows;
  const offsetX = (svgWidth - contentWidth) / 2;
  const offsetY = (svgHeight - contentHeight) / 2;

  let path = "";
  let bitIndex = 0;
  for (let row = 0; row < matrix.rows; row += 1) {
    let runStart = 0;
    let current = null;

    for (let col = 0; col < matrix.width; col += 1) {
      const bit = matrix.bits[bitIndex++];
      if (current === null) {
        current = bit;
      } else if (bit !== current) {
        if (current) {
          const x = offsetX + runStart * moduleWidth;
          const y = offsetY + row * rowHeight;
          const width = (col - runStart) * moduleWidth;
          path += `M ${formatSvgNumber(x)} ${formatSvgNumber(y)} `;
          path += `h ${formatSvgNumber(width)} `;
          path += `v ${formatSvgNumber(rowHeight)} `;
          path += `h ${formatSvgNumber(-width)} z `;
        }
        current = bit;
        runStart = col;
      }
    }

    if (current) {
      const x = offsetX + runStart * moduleWidth;
      const y = offsetY + row * rowHeight;
      const width = (matrix.width - runStart) * moduleWidth;
      path += `M ${formatSvgNumber(x)} ${formatSvgNumber(y)} `;
      path += `h ${formatSvgNumber(width)} `;
      path += `v ${formatSvgNumber(rowHeight)} `;
      path += `h ${formatSvgNumber(-width)} z `;
    }
  }

  const fontSize = svgHeight * 0.2;
  return `<svg viewBox="0 0 ${formatSvgNumber(svgWidth)} ${formatSvgNumber(svgHeight)}" xmlns="http://www.w3.org/2000/svg"><path d="${path}" style="fill: #000000"/><text style="fill: #000000; font-family: &quot;monospace&quot;; font-size: ${formatSvgNumber(fontSize)}px" x="0" y="0"></text></svg>`;
}

function ww(input, height = DEFAULT_SVG_HEIGHT, width = DEFAULT_SVG_WIDTH) {
  return matrixToWwSvg(generatePdf417Matrix(input), height, width);
}

function parseViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/);
  if (!match) {
    throw new Error("SVG viewBox not found");
  }
  const parts = match[1].trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some((value) => Number.isNaN(value))) {
    throw new Error("Invalid SVG viewBox");
  }
  return {
    minX: parts[0],
    minY: parts[1],
    width: parts[2],
    height: parts[3],
  };
}

function parsePathRectangles(svg) {
  const pathMatch = svg.match(/<path d="([^"]*)"/);
  if (!pathMatch) {
    throw new Error("SVG path not found");
  }

  const rectangles = [];
  const pattern = /M ([^ ]+) ([^ ]+) h ([^ ]+) v ([^ ]+) h ([^ ]+) z/g;
  let match;
  while ((match = pattern.exec(pathMatch[1])) !== null) {
    rectangles.push({
      x: Number(match[1]),
      y: Number(match[2]),
      width: Number(match[3]),
      height: Number(match[4]),
    });
  }

  if (rectangles.length === 0) {
    throw new Error("No barcode rectangles found in SVG path");
  }

  return rectangles;
}

function layoutMetrics(matrix, svgHeight, svgWidth) {
  const totalMatrixHeight = matrix.rows * matrix.moduleHeight;
  let contentWidth;
  let contentHeight;

  if (svgWidth / svgHeight > matrix.width / totalMatrixHeight) {
    contentWidth = (matrix.width * svgHeight) / totalMatrixHeight;
    contentHeight = svgHeight;
  } else {
    contentHeight = (totalMatrixHeight * svgWidth) / matrix.width;
    contentWidth = svgWidth;
  }

  return {
    moduleWidth: contentWidth / matrix.width,
    rowHeight: contentHeight / matrix.rows,
    offsetX: (svgWidth - contentWidth) / 2,
    offsetY: (svgHeight - contentHeight) / 2,
  };
}

function readWwSvg(svg, matrix) {
  const viewBox = parseViewBox(svg);
  const rectangles = parsePathRectangles(svg);
  const metrics = layoutMetrics(matrix, viewBox.height, viewBox.width);
  const epsilon = 0.001;

  const rows = Array.from({ length: matrix.rows }, () => []);
  for (const rectangle of rectangles) {
    const rowIndex = Math.round((rectangle.y - metrics.offsetY) / metrics.rowHeight);
    if (rowIndex >= 0 && rowIndex < matrix.rows) {
      rows[rowIndex].push(rectangle);
    }
  }

  for (const row of rows) {
    row.sort((left, right) => left.x - right.x);
  }

  const bits = [];
  for (let rowIndex = 0; rowIndex < matrix.rows; rowIndex += 1) {
    const row = rows[rowIndex];
    let rectIndex = 0;

    for (let col = 0; col < matrix.width; col += 1) {
      const xCenter = metrics.offsetX + (col + 0.5) * metrics.moduleWidth;

      while (rectIndex < row.length && row[rectIndex].x + row[rectIndex].width < xCenter - epsilon) {
        rectIndex += 1;
      }

      const active = rectIndex < row.length
        && xCenter >= row[rectIndex].x - epsilon
        && xCenter <= row[rectIndex].x + row[rectIndex].width + epsilon;

      bits.push(active);
    }
  }

  return {
    width: matrix.width,
    rows: matrix.rows,
    moduleHeight: matrix.moduleHeight,
    bits,
  };
}

function matchWwSvg(svg, input, height = DEFAULT_SVG_HEIGHT, width = DEFAULT_SVG_WIDTH) {
  const expectedMatrix = generatePdf417Matrix(input);
  const actualMatrix = readWwSvg(svg, expectedMatrix);
  const mismatches = [];

  for (let i = 0; i < expectedMatrix.bits.length; i += 1) {
    if (expectedMatrix.bits[i] !== actualMatrix.bits[i]) {
      mismatches.push(i);
      if (mismatches.length >= 10) {
        break;
      }
    }
  }

  return {
    matched: mismatches.length === 0,
    input,
    svgHeight: height,
    svgWidth: width,
    expectedWidth: expectedMatrix.width,
    expectedRows: expectedMatrix.rows,
    mismatchCount: mismatches.length,
    mismatches,
  };
}

module.exports = {
  ww,
  generatePdf417Matrix,
  matrixToWwSvg,
  readWwSvg,
  matchWwSvg,
};

if (require.main === module) {
  const input = process.argv[2] ?? "";
  const height = process.argv[3] == null ? DEFAULT_SVG_HEIGHT : Number(process.argv[3]);
  const width = process.argv[4] == null ? DEFAULT_SVG_WIDTH : Number(process.argv[4]);
  process.stdout.write(ww(input, height, width));
}
