module.exports = {
  WS_URL: "wss://196.188.63.66:18443/",
  // Ensure your local encryption server is running as per your original script
  ENCRYPTION_API: "http://localhost:3000",
  ENCRYPT_FUNCTION: "a3U",
  DECRYPT_FUNCTION: "bJn",
  TWO_CAPTCHA_API_KEY: "aa3898de5c9c8837001473c46431515d", // <--- ENTER YOUR KEY
  VERIFICATION_API_URL:
    "https://actix-on-cloudflare.toppan-security-ics-project.workers.dev/api/1.0/turnstile/verify",
  GATE_SESSION_KEY: "turnstile_gate_passed",
  TARGET_URL: "https://www.immigration.gov.et",
  PING_INTERVAL: 3000,
  HEADERS: {
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
      Connection: "Upgrade",
    },
  },
  STANDARD_SLOTS: [
    { StartTime: "08:00 AM", EndTime: "09:00 AM" },
    { StartTime: "09:00 AM", EndTime: "10:00 AM" },
    { StartTime: "10:00 AM", EndTime: "11:00 AM" },
    { StartTime: "11:00 AM", EndTime: "12:00 PM" },
    { StartTime: "12:00 PM", EndTime: "01:00 PM" },
    { StartTime: "01:00 PM", EndTime: "02:00 PM" },
    { StartTime: "02:00 PM", EndTime: "03:00 PM" },
    { StartTime: "03:00 PM", EndTime: "04:00 PM" },
    { StartTime: "04:00 PM", EndTime: "05:00 PM" },
  ],
  OFFICE_ID: 11, // Bahir Dar as per payloads.js search default
  TOTAL_CAPACITY: 278,
  CONCURRENCY_LIMIT: 5,
};
