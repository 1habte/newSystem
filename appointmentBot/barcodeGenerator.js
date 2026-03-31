/**
 * Generates the Passport Application Token based on the reverse-engineered logic.
 *
 * @param {string} regionCode - The 2-letter Area Code (e.g., "BN", "AC").
 * @param {string|number} urgency - "5" for Normal, "4" for Urgent.
 * @param {number} serverSequence - The Integer value fetched from the 'load-sequence' API (e.g., 30312).
 * @returns {string} The full valid token (e.g., "BNPP5250076683P").
 */
function generatePassportToken(regionCode, urgency, serverSequence) {
  // 1. Constants (Hardcoded in the source)
  const TYPE = "PP";

  // logic found in 'Cy6': Year is derived from current date.
  // using "25" as per your screenshots (Year 2025).
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const YEAR = "26"; // or use 'currentYear' for dynamic generation

  // Logic found in 'du1': Always returns "P"
  const SUFFIX = "P";

  // 2. Generate Hex Sequence (The logic found in 'd6T')
  // Convert integer to Hex, Uppercase, and Pad Left with '0' to 6 chars
  const hexSequence = serverSequence
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");

  // 3. Build Base String
  // This is the variable 'a' passed into 'du_'
  // Structure: Type + Urgency + Year + HexSequence
  // Note: Region Code is NOT included in the checksum calculation base
  const baseString = `${TYPE}${urgency}${YEAR}${hexSequence}`;

  // 4. Calculate Checksum (The logic found in 'du_')

  // Step A: Calculate Sum of ASCII codes of the base string
  let asciiSum = 0;
  for (let i = 0; i < baseString.length; i++) {
    asciiSum += baseString.charCodeAt(i);
  }

  // Step B: Add the "Salt" (The original Integer Server Sequence)
  const totalCalculation = asciiSum + serverSequence;

  // Step C: Modulo 10 to get the last digit
  const checksumDigit = totalCalculation % 10;

  // 5. Final Assembly
  // Region + BaseString + Checksum + Suffix
  return `${regionCode}${baseString}${checksumDigit}${SUFFIX}`;
}

module.exports = { generatePassportToken };

// --- TEST CASES ---

// Case 1: The "Jackpot" case we solved
// Input: PP525007668 -> Result should end in 3P
// const token1 = generatePassportToken("BN", "5", 30312);
// console.log(`Test 1 (Exp: BNPP5250076683P): ${token1}`);
// console.log("Match:", token1 === "BNPP5250076683P");

// console.log("-------------------");

// // Case 2: The earlier case
// // Input: PP525000FEE -> Result should end in 6P
// const token2 = generatePassportToken("BN", "5", 4078);
// console.log(`Test 2 (Exp: BNPP525000FEE6P): ${token2}`);
// console.log("Match:", token2 === "BNPP525000FEE6P");
