/**
 * Generates a Payment Barcode based on the sequence and office parameters.
 * 
 * @param {Object} options - Input parameters
 * @param {string} [options.n="AA"] - Office Code (Prefix)
 * @param {string} [options.m="PP"] - Organization/System Code
 * @param {string} [options.l="4"]  - Document Type
 * @param {number} [options.sequence=761611] - The sequential number to encode
 * @param {string} [options.g="P"]  - Suffix (Application Type)
 * @returns {string} The final generated barcode
 */
export function generateBarcode({
    n = "AA",
    m = "PP",
    l = "5",
    sequence = 761611,
    g = "P"
} = {}) {

    // 1. Get Year (k)
    // Uses current system time. For testing consistency, ensure system year is 2026.
    const k = new Date().getFullYear().toString().slice(-2);

    // 2. Generate Hex Sequence (j)
    // Convert sequence to Hex, Uppercase, and pad to 6 characters
    let j = sequence.toString(16).toUpperCase();
    j = j.padStart(6, "0");

    // 3. Calculate Checksum (h)
    // The string to sum includes m, l, k, and the hex sequence j (n is excluded)
    const stringToSum = m + l + k + j;
    
    let r = 0;
    
    // Sum ASCII values of the characters
    for (let x = 0; x < stringToSum.length; x++) {
        r += stringToSum.charCodeAt(x);
    }
    
    // Add the original integer sequence value to the sum
    r += sequence;

    // Modulo 10 to get the single digit checksum
    const h = (r % 10).toString();

    // 4. Final Assembly
    // Order: n + m + l + k + j + h + g
    return n + m + l + k + j + h + g;
}

// --- SELF-TEST (Runs only if this file is executed directly) ---
// Note: In ES modules, we check if import.meta.url is the main module, 
// but since we are just exporting, we can leave this commented out or remove it.
// The original used require.main === module which is CommonJS.
/*
if (require.main === module) {
    const testSequence = 761611;
    const expectedResult = "AAPP4260B9F0B2P";
    
    console.log("--- Running Self-Test ---");
    
    // Run with defaults provided in your prompt
    const result = generateBarcode({ sequence: testSequence });
    
    console.log(`Input Sequence: ${testSequence}`);
    console.log(`Generated:      ${result}`);
    console.log(`Expected:       ${expectedResult}`);
    console.log(`Is Valid:       ${result === expectedResult}`);
}
*/