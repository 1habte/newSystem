import { people } from "./ppl.js";
import { objOfJsons } from "./JSONs.js";
import { objOfB } from "./b2bs.js";
import { appendFile } from 'node:fs/promises';
import { off as offOld } from "./office.js";
import { off as offNew } from "./offices_new.js";
import { generateBarcode } from "./barcode.js";
import { processpsB2b } from "./passsave.js";
import { processlsB2b } from "./loadfees.js";
import { processInvoice } from "./loadinvoice.js";
import { state } from "./state.js";
import { sendRequest, decryptB2BData, getEthiopianDateISO } from "./utils.js";
import { pdfclient2 } from "./pdfr.js";
import { readFileSync } from "node:fs";
import path from 'node:path';
import { EtDatetime } from 'abushakir';

export const BASE_DIR = String.raw`C:\Users\habte\Videos\newSystem`;

const OFFICE_ID = 9;
const SERVICE_TYPE = 915
const GIVEN_SEQUENCE = "41102"
const APPLICATION_START_DATE = '2025-12-31T10:54:12.122'
const AFTER_HOW_MANY_DAYS = 1
const START_TIME = "08:00 AM"
const END_TIME = "09:00 AM"

function getApplicationStartDateISO() {
    return SERVICE_TYPE === 915 ? getEthiopianDateISO() : APPLICATION_START_DATE;
}

function getActiveOffices() {
    return SERVICE_TYPE === 915 ? offNew : offOld;
}

function getReferenceFromGivenSequence() {
    if (!GIVEN_SEQUENCE) {
        return "";
    }

    const sequenceOffset = Math.max(0, state.currentPersonIndex - (state.initialPersonIndex ?? 0));
    const sequenceValue = String(Number(GIVEN_SEQUENCE) + sequenceOffset);

    const abbreviation = getActiveOffices().find(o => o.tgSystemOrganisationId === OFFICE_ID)?.Abbreviation;

    if (!abbreviation) {
        throw new Error(`No office abbreviation found for office ${OFFICE_ID}`);
    }

    return generateBarcode({
        n: abbreviation,
        l: SERVICE_TYPE === 915 ? "4" : "5",
        sequence: sequenceValue
    });
}

function decryptResponseB2B(responseData) {
    return decryptB2BData(responseData.B2BDTOlist);
}

// --- Step Initiators (Functions that send requests) ---

export async function StartBooking(ws, startIndex, endIndex) {
    state.currentPersonIndex = startIndex;
    state.initialPersonIndex = startIndex;
    state.endPersonIndex = endIndex;
    state.currentStep = 0;
    console.log(`Starting booking for person index: ${state.currentPersonIndex}`);
    await loginStep(ws);
}

export async function loginStep(ws) {
    let loginB2b = objOfB.loginB2b;
    loginB2b.$values[0].Username = "ChalaTolosa";
    loginB2b.$values[0].ValidationPar = "ChalaTolosa@1234";
    
    await sendRequest(ws, "login", objOfJsons.loginj, loginB2b, null, "LOGIN");
}

async function supdocStep(ws, token) {
    // Application Start Date
    const ApplicationStartDateISO = getApplicationStartDateISO();
    // console.log(ApplicationStartDateISO);
    state.applicationDetails.ApplicationStartDateISO = ApplicationStartDateISO;

    // Person
    let person = people[state.currentPersonIndex];

    // Supporting Document B2B
    let SupDocB2b = objOfB.supdocB2b;

    // Swapping person
    let targetPerson = SupDocB2b.$values[0].tgDTO.online_tgPersonDTOList[0];
    for (let key in person) {
        if (person.hasOwnProperty(key)) {
            targetPerson[key] = person[key];
        }
    }

    // Changing date
    SupDocB2b.$values[0].tgDTO.ApplicationStartDate = ApplicationStartDateISO;
    SupDocB2b.$values[0].tgDTO.PriorityLookupId = SERVICE_TYPE;
    // Changing birth certificate number
    SupDocB2b.$values[0].tgDTO.online_tgPersonDTOList[0].online_tgPersonIdentityDTOList[0].IdentityNumber = person["id"];

    await sendRequest(ws, "supdoc", objOfJsons.supdocj, SupDocB2b, token, "SUPDOC");
}

async function appStep(ws, token, slotIndex = 0) {
    let appB2b = objOfB.appB;
    const formattedDate = getEthiopianDateISO(86400000).slice(0, 10);
    const date = formattedDate;
    const between = `'${date} 00:00:00','${date} 23:59:59'`;
    
    appB2b.$values[0].BaseSearchOptions.Between.AppointmentDate = between;
    appB2b.$values[0].StartTime = state.oneHourSlots[slotIndex].StartTime;
    appB2b.$values[0].EndTime = state.oneHourSlots[slotIndex].EndTime;

    await sendRequest(ws, "app", objOfJsons.appj, appB2b, token, "APPOINTMENT");
}

async function portallockStep(ws, token) {
    
    let portallockB2b = objOfB.portallockB2b;
    const offset = AFTER_HOW_MANY_DAYS*86700000 
    const dd = getEthiopianDateISO(offset);
    portallockB2b.$values[0].AppointmentDate =dd //'2026-03-09T00:00:00.000' 
    
    portallockB2b.$values[0].tgSystemOrganisationId = OFFICE_ID;
    const p = new Intl.DateTimeFormat('en-US-u-ca-ethiopic', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(dd));
    const nspDate = `${p.find(x=>x.type==='year').value}-${p.find(x=>x.type==='month').value}-${p.find(x=>x.type==='day').value}${dd.slice(10)}`;

    console.log("the ethiopian date",nspDate)
    
    portallockB2b.$values[0].StartTime = START_TIME; // result[0];
    portallockB2b.$values[0].EndTime = END_TIME; // result[1];
    portallockB2b.$values[0].tgPersonId = state.applicationDetails.tgp
    //console.log("shouldnt start with 55",portallockB2b.$values[0].tgPersonId)

    await sendRequest(ws, "portallock", objOfJsons.portallockj, portallockB2b, token, "PORTALLOCK");
}

async function loadsequenceStep(ws, token) {
    let loadsequenceB2b = objOfB.loadsequenceB2b;
    loadsequenceB2b.$values[0].EntityId = OFFICE_ID;
    await sendRequest(ws, "loadsequence", objOfJsons.loadsequencej, loadsequenceB2b, token, "LOAD SEQUENCE");
}

async function passaveStep(ws, token) {
    let passaveB2b = objOfB.passportsaveB2b;
    passaveB2b = await processpsB2b(passaveB2b, state.currentPersonIndex, state.applicationDetails, OFFICE_ID, SERVICE_TYPE);
    await sendRequest(ws, "passave", objOfJsons.passportsavej, passaveB2b, token, "PASS SAVE");
}

async function loadfeesStep(ws, token) {
    let loadfeesB2b = objOfB.loadfeesB2b;
    loadfeesB2b = await processlsB2b(loadfeesB2b, state.currentPersonIndex, state.applicationDetails, OFFICE_ID, SERVICE_TYPE);
    //console.dir(loadfeesB2b, { depth: null, color: true });
    state.applicationDetails.path =  loadfeesB2b.b64
    await sendRequest(ws, "loadfees", objOfJsons.loadfeesj, loadfeesB2b.a, token, "LOAD FEES");
}

async function addfeesStep(ws, token) {
    let addfeesB2b = objOfB.addfeesB2b;
    addfeesB2b.$values[0].PaymentDate = getEthiopianDateISO();
    addfeesB2b.$values[0].AmountTendered = SERVICE_TYPE === 915 ? 20000 : 5000;
    addfeesB2b.$values[0].tgFeeId = SERVICE_TYPE === 915 ? 55 : 53;
    addfeesB2b.$values[0].FeeDescription = SERVICE_TYPE === 915
        ? "APPLICATION FEE FOR NORMAL PASSPORT (FIVE DAY SERVICE)"
        : "APPLICATION FEE FOR NORMAL PASSPORT";
    addfeesB2b.$values[0].FeeAmount = SERVICE_TYPE === 915 ? 20000 : 5000;
    addfeesB2b.$values[0].InstructionTgFinancialDocumentId = state.applicationDetails.Reference.slice(2, 4) + state.applicationDetails.Reference.slice(5, -2);
    addfeesB2b.$values[0].ReceiptTgFinancialDocumentId = state.applicationDetails.Reference.slice(2, 4) + state.applicationDetails.Reference.slice(5, -2);
    addfeesB2b.$values[0].tgApplicationId = state.applicationDetails.apid;
    addfeesB2b.$values[0].EntityId = state.applicationDetails.enid;

    await sendRequest(ws, "addfees", objOfJsons.addfeesj, addfeesB2b, token, "ADD FEES");
}

async function updatepaydocumentStep(ws, token) {
    let updatepaydocumentB2b = objOfB.updatepaymentB2b;
    updatepaydocumentB2b.$values[0].DocumentNumber = state.applicationDetails.Reference;
    updatepaydocumentB2b.$values[0].DocumentObject = state.applicationDetails.path// to be reviewed 
    
    await sendRequest(ws, "updatepaydocument", objOfJsons.updatepaydocumentj, updatepaydocumentB2b, token, "UPDATE PAYMENT DOCUMENT");
}

async function updatesupportdocStep(ws, token) {
    let updatesupportdocB2b = objOfB.updatesupportdocB2b;
    updatesupportdocB2b.$values[0].tgPersonId = state.applicationDetails.enid;
    updatesupportdocB2b.$values[0].tgApplicationId = state.applicationDetails.apid;
    const baseDir = path.join(BASE_DIR, 'cirt');
    const filePath = path.join(baseDir, `${state.currentPersonIndex}.jpg`);
    const b = readFileSync(filePath, 'base64');
    //console.log("here",b)
    updatesupportdocB2b.$values[0].DocumentObject = b
    
    updatesupportdocB2b.$values[0].CreatedDate = getEthiopianDateISO(5000); //right after start date like 20 seconds

    await sendRequest(ws, "updatesupportdoc", objOfJsons.updatesupportdocumentj, updatesupportdocB2b, token, "UPDATE SUPPORT DOC");
}

async function updatesupportdocStep2(ws, token) {
    let updatesupportdocB2b2 = objOfB.updatesupportdocB2b2;
    updatesupportdocB2b2.$values[0].tgPersonId = state.applicationDetails.enid;
    updatesupportdocB2b2.$values[0].tgApplicationId = state.applicationDetails.apid;
    
    await sendRequest(ws, "updatesupportdoc2", objOfJsons.updatesupportingdocumentj2, updatesupportdocB2b2, token, "UPDATE SUPPORT DOC 2");
}

async function updatesupportdocStep3(ws, token) {
    let updatesupportdocB2b3 = objOfB.updatesupportdocB2b3;
    updatesupportdocB2b3.$values[0].tgPersonId = state.applicationDetails.enid;
    updatesupportdocB2b3.$values[0].tgApplicationId = state.applicationDetails.apid;
    await sendRequest(ws, "updatesupportdoc3", objOfJsons.updatesupportingdocumentj3, updatesupportdocB2b3, token, "UPDATE SUPPORT DOC 3");
}

async function loadinvoicestep(ws, token) {
    let loadinvoiceB2b = objOfB.loadinvoiceB2b;
    loadinvoiceB2b = await processInvoice(loadinvoiceB2b, state.currentPersonIndex, state.applicationDetails, OFFICE_ID, SERVICE_TYPE);
    await sendRequest(ws, "loadinvoice", objOfJsons.loadinvoicej, loadinvoiceB2b, token, "LOAD INVOICE");
}

async function payporatalStep(ws, token) {
    let payportalB2b = objOfB.payportalB2b;
    let person = people[state.currentPersonIndex];
    payportalB2b.$values[0].FirstName = person.FirstName;
    payportalB2b.$values[0].LastName = person.Surname;
    payportalB2b.$values[0].Phone = person.ContactNumber.replace("_", " ");
    payportalB2b.$values[0].Amount = SERVICE_TYPE === 915 ? 20000 : 5000;
    payportalB2b.$values[0].OrderId = state.applicationDetails.Reference;
    payportalB2b.$values[0].CustomOrderCode = state.applicationDetails.apid;
    payportalB2b.$values[0].FinancialInvoiceDTOList[0].tgFeeDTOList[0].tgFeeId = SERVICE_TYPE === 915 ? 55 : 53;

    await sendRequest(ws, "payportal", objOfJsons.payportalj, payportalB2b, token, "PAY PORTAL");
}

// --- Response Handlers ---


export const handlers = {
    "login": async (data, ws) => {
        // await supdocStep(ws, data.Token);
        state.applicationDetails.ApplicationStartDateISO = getApplicationStartDateISO();
        // Assuming 'data' is your JSON object
        let b2bDecrypted = decryptResponseB2B(data);
        state.applicationDetails.tgp = b2bDecrypted.$values[0].tgPersonId
        console.log("Person ID:", state.applicationDetails.tgp)
        //console.log("should start with 6",state.applicationDetails.tgp)
       
        if (checkValidationErrors(b2bDecrypted)) return false;

        await portallockStep(ws, data.Token);
        return true;
    },
    "supdoc": async (data, ws) => {
        for (let i = 0; i < state.oneHourSlots.length; i++) {
            await appStep(ws, data.Token, i);
        }
        return true;
    },
    "app": async (data, ws) => {
        let b2bDecrypted = decryptResponseB2B(data);

        if (checkValidationErrors(b2bDecrypted)) return false;
        
        const timeSlotCounts = b2bDecrypted.$values.reduce((acc, appointment) => {
            const key = `${appointment.StartTime} - ${appointment.EndTime}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        
        state.alltimeSlotCounts = [...state.alltimeSlotCounts, timeSlotCounts];
        await appendFile('./URGENT/booked.txt', `${JSON.stringify(timeSlotCounts)}\n`);
        
        state.counter += 1;
        if (state.counter === 9) {
            await portallockStep(ws, data.Token);
        }
        return true;
    },
    "portallock": async (data, ws) => {
        // console.log("Portal lock response received, process completed for this cycle.");
        let b2bDecrypted = decryptResponseB2B(data);
        if (checkValidationErrors(b2bDecrypted)) return false;

        state.applicationDetails = {
            ...state.applicationDetails,
            ...b2bDecrypted
        };
        //console.log(state.applicationDetails)

        if (GIVEN_SEQUENCE) {
            state.applicationDetails.Reference = getReferenceFromGivenSequence();
            await passaveStep(ws, data.Token);
            return true;
        }

        await loadsequenceStep(ws, data.Token);
        return true;
    },
    "loadsequence": async (data, ws) => {
        // console.log("Load sequence response received.");
        let b2bDecrypted = decryptResponseB2B(data);

        if (checkValidationErrors(b2bDecrypted)) return false;
        
        // console.log("here is the current value", b2bDecrypted.$values[0].CurrentValue);
        const entityId = b2bDecrypted.$values[0].EntityId;
        const abbreviation = getActiveOffices().find(o => o.tgSystemOrganisationId === OFFICE_ID)?.Abbreviation;
        console.log("Office Abbreviation:", abbreviation);
        
        const generatedBarcode = generateBarcode({
            n: abbreviation,
            l: SERVICE_TYPE === 915 ? "4" : "5",
            sequence: b2bDecrypted.$values[0].CurrentValue
        });
        console.dir(b2bDecrypted.$values[0].CurrentValue,{color:true,depth:null})
        console.log("Reference:", generatedBarcode);
        state.applicationDetails.Reference = generatedBarcode;
        
        await passaveStep(ws, data.Token);
        return true;
    },
    "passave": async (data, ws) => {
        let passaveDecrypted = decryptResponseB2B(data);

        if (checkValidationErrors(passaveDecrypted)) return false;
        
        let apid = passaveDecrypted.$values[0].tgApplicationId;
        let enid = passaveDecrypted.$values[0].EntityId;
        state.applicationDetails.apid = apid;
        state.applicationDetails.enid = enid;
        
        state.applicationDetails.CreatedDate = passaveDecrypted.$values[0].CreatedDate;
        state.applicationDetails.TgUserAuditDetailId = passaveDecrypted.$values[0].TgUserAuditDetailId;
        state.applicationDetails.CreatedBySystemUserId = passaveDecrypted.$values[0].CreatedBySystemUserId;
        state.applicationDetails.AssignedSystemOrganisationId = passaveDecrypted.$values[0].AssignedSystemOrganisationId;

        await loadfeesStep( ws, data.Token);
        return true;
    },
    "loadfees": async (data, ws) => {
        // console.log("Load fees response received, all steps completed for this cycle.");
        let b2bDecrypted = decryptResponseB2B(data);

        if (checkValidationErrors(b2bDecrypted)) return false;
        
        state.applicationDetails.fees = b2bDecrypted.$values[0].online_tgFeeDTOList.$values[0].FeeBaseAmount;
        // console.dir(state.applicationDetails, { depth: null, color: true });
        
        await addfeesStep(ws, data.Token);
        return true;
    },
    "addfees": async (data, ws) => {
        // console.dir("Add fees response received, all steps completed for this cycle.");
        let b2bDecrypted = decryptResponseB2B(data);
        if (checkValidationErrors(b2bDecrypted)) return false;
        
        await updatepaydocumentStep(ws, data.Token);
        return true;
    },
    "updatepaydocument": async (data, ws) => {
        // console.dir("Update payment document response received, all steps completed for this cycle.", { depth: null, color: true });
        await updatesupportdocStep(ws, data.Token);
        return true;
    },
    "updatesupportdoc": async (data, ws) => {
        // console.dir("Update support document response received, all steps completed for this cycle.", { depth: null, color: true });
        await updatesupportdocStep2(ws, data.Token);
        return true;
    },
    "updatesupportdoc2": async (data, ws) => {
        await updatesupportdocStep3(ws, data.Token);
        return true;
    },
    "updatesupportdoc3": async (data, ws) => {
        await loadinvoicestep(ws, data.Token);
        return true;
    },
    "loadinvoice": async (data, ws) => {
        // console.dir("Load invoice response received, all steps completed for this cycle.", { depth: null, color: true });
        await payporatalStep(ws, data.Token);
        return true;
    },
    "payportal": async (data, ws) => {
        // console.dir("Pay portal response received, all steps completed for this cycle.", { depth: null, color: true });
        let b2bDecrypted = decryptResponseB2B(data);
        console.dir(b2bDecrypted, { depth: null, color: true });
        if (checkValidationErrors(b2bDecrypted)) return false;

        state.currentPersonIndex++;
        if (state.currentPersonIndex < state.endPersonIndex) {
            state.currentStep = 0;
            console.log(`Cycle completed. Starting next person index: ${state.currentPersonIndex}`);
            await loginStep(ws);
        } else {
            console.log("All requested bookings completed.");
        }
        return true;
    }
};

function checkValidationErrors(b2bDecrypted) {
    if (b2bDecrypted?.$values?.some(item => item.ValidationErrors?.$values?.length > 0)) {
        const errors = b2bDecrypted.$values
            .filter(v => v.ValidationErrors?.$values?.length > 0)
            .flatMap(v => v.ValidationErrors.$values);
        console.log("Validation Errors Found:", JSON.stringify(errors, null, 2));
        return true;
    }
    return false;
}
