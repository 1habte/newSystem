import WebSocket from "ws";
import { handlers, StartBooking } from "./bot_copy/handlers.js";
import { state } from "./bot_copy/state.js";
import { people } from "./bot_copy/ppl.js";

//url of the site change to the ip if needs be
const WS_URL = "wss://www.immigration.gov.et:18443";

const ws = new WebSocket(WS_URL, {
  rejectUnauthorized: false 
});

let pingInterval;

ws.on("open", () => {
  console.clear();
  console.log("✅ WebSocket connected");

  // Start sending pings every 30 seconds
  pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
      // console.log("📡 Ping sent");
    }
  }, 10000);

 if (ws.readyState === WebSocket.OPEN) {
      console.log("📡 process started ");
      StartBooking(ws, 0, people.length);
    }

  ws.on("close", () => {
    console.log("❌ WebSocket closed");
    clearInterval(pingInterval);
  });
});

ws.on("pong", () => {
  // console.log("🏓 Pong received");
});


ws.on("message", async (msg) => {
  console.log("📩 Received:", msg.toString());
  const [first, rest] = msg.toString().split(/,(.+)/);
  try{
   //console.dir(rest,{color:true})
   const data = JSON.parse(rest);
    //console.log("✅ token found",data.Token);
    const id = data.Id.split('|')[1].trim();
    
    // Find which step this ID belongs to
    // We iterate over the keys of objOfIds and check if the array associated with that key contains the ID
    const foundKey = Object.keys(state.objOfIds).find(key => {
        // Ensure it's an array before calling includes (safety check)
        return Array.isArray(state.objOfIds[key]) && state.objOfIds[key].includes(id);
    });

    if (first === "true") {
        if (foundKey && handlers[foundKey]) {
            const success = await handlers[foundKey](data, ws);
            if (success) {
                state.currentStep++;
                console.log(`\x1b[32m[${state.currentStep}/${state.totalSteps}] - ${foundKey} step successful\x1b[0m`);
            } else {
                console.log(`\x1b[31m${foundKey} step failed due to validation errors\x1b[0m`);
            }
        } else {
            console.log("Unknown response received or handler not found for key:", foundKey);
        }
    } else {
        console.log(`\x1b[31m${foundKey} step failed\x1b[0m`);
        return;
    }

  } catch(err){
    const isJsonError = err instanceof SyntaxError && err.message.includes('Unexpected token');
    !isJsonError? console.error("Error processing message:", err):null
  }
});
