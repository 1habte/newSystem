import WebSocket from 'ws';
import crypto from 'node:crypto';
import { encryptB2BString, decryptB2BData } from './utils.js';

const WS_URL = "wss://196.188.63.66:18443/";
const WS_OPTIONS = {
  rejectUnauthorized: false,
  headers: {
    Host: "www.immigration.gov.et:18443",
    Origin: "https://www.immigration.gov.et",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  }
};

const targetReference = process.argv[2];
if (!targetReference) {
    console.error("Usage: node check_status.js <REFERENCE_CODE>");
    process.exit(1);
}

const ws = new WebSocket(WS_URL, WS_OPTIONS);

ws.on('open', () => {
    console.log("WebSocket connected. Authenticating...");
    loginStep(ws);
});

async function loginStep(ws) {
    const loginB2b = {
        "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
        "$values": [
            {
                "$type": "Models.Core.tgSystemUserLoginPortalDTO, Models",
                "Username": "AbebeTadesse",
                "ValidationPar": "AbebeTadesse@1234"
            }
        ]
    };

    const req = {
        "$type": "Models.RequestDTO, Models",
        "id": "LOGIN | " + crypto.randomUUID(),
        "callType": 1,
        "project": 1,
        "responseRequired": true,
        "version": "1.0.1.108",
        "b2bDTOlist": encryptB2BString(JSON.stringify(loginB2b))
    };

    ws.send(JSON.stringify({
        "$type": "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
        "$values": [req]
    }));
}

async function searchApplicationStep(ws, token) {
    console.log(`🔍 Searching for Application: ${targetReference}...`);
    
    // Use the core DTO for searching to ensure the record is found regardless of its current specialized model state.
    const searchB2b = {
        "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
        "$values": [
            {
                "$type": "Models.Core.online_tgApplicationDTO, Models",
                "BaseSearchOptions": {
                    "$type": "Models.SearchCriteria, Models",
                    "Equals": {
                        "$type": "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                        "Reference": targetReference
                    }
                }
            }
        ]
    };

    const req = {
        "$type": "Models.RequestDTO, Models",
        "id": "SEARCH_APP",
        "callType": 1,
        "project": 1,
        "responseRequired": true,
        "token": token,
        "version": "1.0.1.108",
        "b2bDTOlist": encryptB2BString(JSON.stringify(searchB2b))
    };

    ws.send(JSON.stringify({
        "$type": "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
        "$values": [req]
    }));
}

async function loadDetailsExactStep(ws, token, applicationId) {
    console.log(`📄 Loading Full Record Details (ID: ${applicationId})...`);

    // Use the ET1240 specialized DTO for loading to ensure we get the full application graph.
    const loadB2b = {
        "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
        "$values": [
            {
                "$type": "Models.ET1240.online_tgApplication_ET1240DTO, Models",
                "tgApplicationId": applicationId
            }
        ]
    };

    const req = {
        "$type": "Models.RequestDTO, Models",
        "id": "LOAD_DET_EXACT",
        "callType": 1,
        "project": 1,
        "responseRequired": true,
        "token": token,
        "version": "1.0.1.108",
        "b2bDTOlist": encryptB2BString(JSON.stringify(loadB2b))
    };

    ws.send(JSON.stringify({
        "$type": "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
        "$values": [req]
    }));
}

ws.on('message', async (message) => {
    let raw;
    try {
        const str = message.toString();
        const start = str.indexOf('{');
        if (start === -1) return;
        raw = JSON.parse(str.substring(start));
    } catch (e) { return; }

    if (!raw || !raw.Id) return;

    if (raw.Id.includes("LOGIN")) {
        if (raw.Token) {
            console.log("✅ Authenticated.");
            await searchApplicationStep(ws, raw.Token);
        }
    } 
    else if (raw.Id.includes("SEARCH_APP")) {
        const decrypted = decryptB2BData(raw.B2BDTOlist);
        const app = decrypted.$values?.[0] || (decrypted.$values ? null : decrypted);
        
        if (app && app.tgApplicationId) {
            console.log(`✅ Application found in system.`);
            await loadDetailsExactStep(ws, raw.Token, app.tgApplicationId);
        } else {
            console.log("❌ Application record not found for this reference.");
            ws.close();
        }
    }
    else if (raw.Id.includes("LOAD_DET_EXACT")) {
        const decrypted = decryptB2BData(raw.B2BDTOlist);
        const app = decrypted.$values?.[0] || decrypted;
        
        if (app && (app.online_tgPersonDTOList || app.Remark)) {
            displayResults(app);
        } else if (app && app.tgApplicationId) {
            console.log("⚠️ Application record is restricted or incomplete in this view.");
            displayResults(app);
        } else {
            console.log("⚠️ Load failed.");
        }
        ws.close();
    }
});
ws.on('close', () => console.log("Verification complete."));
ws.on('error', (e) => console.error("Error:", e.message));
