const WebSocket = require("ws");
const CONFIG = require("./config");
const { encryptPayload, decryptPayload } = require("./crypto");
const { buildRequestDTO, customStringify } = require("./utils");

class ImmigrationClient {
  constructor() {
    this.ws = null;
    this.token = null;
    this.messageHandlers = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(CONFIG.WS_URL, CONFIG.HEADERS);

      this.ws.on("open", () => {
        console.log("✅ Connected to WebSocket");
        this._startPing();
        resolve();
      });

      this.ws.on("message", (data) => this._handleMessage(data.toString()));
      this.ws.on("error", (err) => reject(err));
      this.ws.on("close", () => console.log("❌ Disconnected"));
    });
  }

  async handleResponse(response) {
    const requestId = response.Id;

    // Decrypt if necessary
    if (response.B2BDTOlist) {
      try {
        // Ensure decryptPayload is imported or available via CONFIG/utils
        // console.log(
        //   `UNENCRYPTED PAYLOAD: ${JSON.stringify(response, null, 2)}`
        // );

        const { decryptPayload } = require("./crypto");
        let decrypted = await decryptPayload(response.B2BDTOlist);
        if (typeof decrypted === "string") {
          try {
            decrypted = JSON.parse(decrypted);
            console.log(
              `DECRYPTED RESPONSE DATA: ${JSON.stringify(decrypted, null, 2)}`,
            );
          } catch (e) {
            console.error("Failed to parse decrypted data:", e);
          }
        }
        response.decryptedData = decrypted;
      } catch (e) {
        console.error("Decryption error in handler:", e);
      }
    }

    if (this.messageHandlers.has(requestId)) {
      this.messageHandlers.get(requestId)(response);
      this.messageHandlers.delete(requestId);
    }
  }

  async send(payload, timeoutDuration = 600000) {
    // 1. Build basic structure
    const requestDTO = payload.$values[0];
    const requestId = requestDTO.id;
    const b2bData = requestDTO.b2bDTOlist;
    console.log(`PAYLOAD TO BE SENT ${JSON.stringify(payload, null, 2)}`);
    const encryptedData = await encryptPayload(b2bData);
    try {
      // console.log(`encrypted data: ${encryptedData}`);
      payload.$values[0].b2bDTOlist = encryptedData;
      if (this.token !== null) {
        payload.$values[0].token = this.token;
      }
    } catch (err) {
      console.log(
        `ENCRYPTION ERROR, CHECK IF THE ENCRYPTION SERVER IS RUNNING`,
      );
    }
    // 3. Send via WebSocket
    // check the actual payload sent to order payment on the portal
    // console.log(`CHECK PAYLOAD :${JSON.stringify(payload, null, 2)}`);
    console.log(`📤 Sending [${requestId}]...`);
    this.ws.send(JSON.stringify(payload));

    // 4. Wait for response
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.messageHandlers.delete(requestId);
        reject(new Error(`Timeout waiting for ${requestId}`));
      }, timeoutDuration);

      this.messageHandlers.set(requestId, async (response) => {
        clearTimeout(timeout);
        try {
          // Decrypt response if exists
          // if (response.B2BDTOlist) {
          //   let decrypted = await decryptPayload(response.B2BDTOlist);
          //   if (typeof decrypted === "string") {
          //     try {
          //       decrypted = JSON.parse(decrypted);
          //     } catch (e) {
          //       console.error("Failed to parse decrypted data:", e);
          //     }
          //   }
          //   console.log(
          //     `Decrypted payload ${JSON.stringify(decrypted, null, 2)}`,
          //   );
          //   resolve({ ...response, decryptedData: decrypted });
          // } else {
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  _handleMessage(message) {
    // Handle pong
    if (message.toUpperCase() === "PONG") {
      console.log("💓 Pong received");
      return;
    }

    // Handle status messages (Accepted/Processing)
    if (
      message.startsWith("true,Accepted,") ||
      message.startsWith("true,Processing,")
    ) {
      const status = message.split(",")[1];
      // Extract Request ID by finding the comma after the status
      const requestId = message.substring(message.indexOf(",", 6) + 1);
      console.log(`📊 Status: ${status} - ${requestId.substring(0, 30)}...`);
      return;
    } else if (message.startsWith("false,")) {
      console.error(
        `⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ CHECK ERROR RESPONSE FROM THE SERVER, U FUCKED UP SOMEWHERE `,
      );
      console.log(`${JSON.stringify(message, null, 2)}`);
      this.close();
    }

    // Handle actual response
    if (message.startsWith("true,")) {
      const jsonPart = message.substring(5); // Remove "true," prefix
      try {
        const response = JSON.parse(jsonPart);
        // console.log(`Response object ${JSON.stringify(response)}`);

        // This assumes you have the handleResponse method in your class
        // If not, simply uncomment the logic below:
        if (typeof this.handleResponse === "function") {
          this.handleResponse(response);
        } else {
          // Inline handler lookup if handleResponse doesn't exist
          const responseId = response.Id;
          if (this.messageHandlers.has(responseId)) {
            this.messageHandlers.get(responseId)(response);
            this.messageHandlers.delete(responseId);
          }
        }
      } catch (e) {
        console.error("Failed to parse response:", e);
      }
    }
  }

  _startPing() {
    setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) this.ws.send("ping");
    }, CONFIG.PING_INTERVAL);
  }

  setToken(token) {
    this.token = token;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

module.exports = ImmigrationClient;
