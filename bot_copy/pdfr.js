import axios from 'axios'
import { people } from "./ppl.js";
import { regions } from './regions.js';
import { off as offOld } from "./office.js";
import { off as offNew } from "./offices_new.js";
import { readFileSync } from 'fs';

function getActiveOffices(serviceType) {
    return serviceType === 915 ? offNew : offOld;
}

function getServiceLabelReplacement(serviceType) {
    if (serviceType === 918) return "NORMAL SERVICE";
    if (serviceType === 915) return "5 DAY SERVICE (URGENT)";
    return null;
}

export async function pdfclient(inputPdfPath, index, other,idd) {
    const person = people[index]
    const activeOffices = getActiveOffices(other.serviceType);

    // ... (Your existing variable definitions for names/dates keep exact same) ...
    const d = new Date(person.BirthDate);
    const bd = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
    const cdi = person.ContactNumber.replace("_", " ")
    const lookupValue = regions.find(item => item.tgLocalityLookupId === person.MainRegionLookupId)?.LookupDescription;
    const PhysicalAddressLine1 = activeOffices.find(item => item.tgSystemOrganisationId === idd)?.PhysicalAddressLine1
    const offf = activeOffices.find(item => item.tgSystemOrganisationId === idd)?.OrganisationName

    // ... (Your existing batchChanges array) ...
    const batchChanges = [
        { "old": "ABEBE", "new": person.FirstName, "english": true, "limit": 30 },
        { "old": "KEBEDE", "new": person.MiddleName, "english": true, "limit": 30 },
        { "old": "LEMUA", "new": person.Surname, "english": true, "limit": 30 },
        { "old": "አበበ", "new": person.FirstNamesAmharic, "english": false, "limit": 30 },
        { "old": "ከበደ", "new": person.MiddleNameAmharic, "english": false, "limit": 30 },
        { "old": "አለሙ", "new": person.SurnameAmharic, "english": false, "limit": 30 },
        { "old": "55555555555555555", "new": person.id, "english": true, "limit": 30 },
        { "old": "WOLDIA", "new": person.CityOfBirth, "english": true, "limit": 30 },
        { "old": "08/02/2001 ", "new": bd, "english": true, "limit": 30 },
        { "old": "+251 914352657", "new": cdi, "english": true, "limit": 30 },
        { "old": "AMHARA KOMBOLCHA KEBELE 3", "new": lookupValue + " " + person.MainCity + " " + person.MainAddressLine1, "english": true, "limit": 45 },
        { "old": "offadd", "new": PhysicalAddressLine1, "english": true, "limit": 22 },
        { "old": "AAPP4260B9F0B2P", "new": other.Reference, "english": true, "limit": 30 },
         { "old": "02/06/2018", "new": other.nspEthiopianAppointmentDate.split(" ")[0], "english": true, "limit": 30 },
        { "old": "09/02/2026", "new": new Date(other.AppointmentDate).toLocaleDateString('en-GB'), "english": true, "limit": 30 },
        { "old": "08/02/2026", "new": new Date(other.ApplicationStartDateISO).toLocaleString('en-GB', { hour12: true }).replace(',', ' ').toUpperCase(), "english": true, "limit": 30 },
        { "old": "16:00:00 - 17:00:00", "new": [other.startTime, other.endTime].map(t => new Date("1/1/2000 " + t).toLocaleTimeString('en-GB', { hour12: false })).join(' - '), "english": true, "limit": 30 },
        { "old": "yooo", "new": offf, "english": true, "limit": 30 },
    ];
    const serviceLabelReplacement = getServiceLabelReplacement(other.serviceType);
    if (serviceLabelReplacement) batchChanges.push({ "old": "5 DAY SERVICE", "new": serviceLabelReplacement, "english": true, "limit": 30 });
    if (other.serviceType === 915) batchChanges.push({ "old": "5,000.00", "new": "20,000.00", "english": true, "limit": 30, "mask_inset_top": 4 });
    person.GenderlookupId ==468 ?batchChanges.push({ "old": "MALE", "new": "FEMALE", "english": true, "limit": 30 }):null;

    const url = 'http://127.0.0.1:5000/process_pdf';

    try {
        // 1. AWAIT the Axios response
         const response = await axios.post(url, {
            input_file_path: inputPdfPath,
            changes: batchChanges,
            barcode_value: other.Reference ,//other.Reference // Pass the Reference for barcode generation
            fullName:`${person.FirstName} ${person.MiddleName} ${person.Surname}`,
            type:"toBeSent",
            id:person.id
        });

        console.log('✅ Server Response:', response.data);

        // 2. Read file and RETURN the base64 string
        const base64String = readFileSync(response.data.output_file, 'base64');
        return base64String;

    } catch (error) {
        console.error('❌ Error:', error.message);
        return null; // Return null if it fails
    }
}

export async function pdfclient2(inputPdfPath, index, other,idd) {
    const person = people[index]
    const activeOffices = getActiveOffices(other.serviceType);

    const offf = activeOffices.find(item => item.tgSystemOrganisationId === idd)?.OrganisationName
    const cdi = person.ContactNumber.replace("_", " ")

    // ... (Your existing batchChanges array) ...
    const batchChanges = [
        { "old": "ABEBE", "new": `${person.FirstName} ${person.MiddleName} ${person.Surname}`, "english": true, "limit": 30 },
        { "old": "5 DAY SERVICE", "new": "NORMAL SERVICE", "english": true, "limit": 30 },
        { "old": "አበበ", "new": `${person.FirstNamesAmharic} ${person.MiddleNameAmharic} ${person.SurnameAmharic}`, "english": false, "limit": 30 },
        { "old": "55555555555555555", "new": person.id, "english": true, "limit": 30 },
        { "old": "AAPP4260B9F0B2P", "new": other.Reference, "english": true, "limit": 30 },
        { "old": "5 DAY SERVICE", "new": "NORMAL SERVICE", "english": true, "limit": 30 },
        { "old": "08/02/2026", "new": new Date(other.ApplicationStartDateISO).toLocaleString('en-GB', { hour12: true }).replace(',', ' ').toUpperCase(), "english": true, "limit": 30 },
        { "old": "yooo", "new": offf, "english": true, "limit": 30 },
        
    ];
    const serviceLabelReplacement2 = getServiceLabelReplacement(other.serviceType);
    const finalChanges = serviceLabelReplacement2
        ? batchChanges.map(change => change.old === "5 DAY SERVICE" ? { ...change, new: serviceLabelReplacement2 } : change)
        : batchChanges.filter(change => change.old !== "5 DAY SERVICE");
    if (other.serviceType === 915) finalChanges.push({ "old": "5,000.00", "new": "20,000.00", "english": true, "limit": 30, "mask_inset_top": 4 });

    const url = 'http://127.0.0.1:5000/process_pdf';

    try {
        // 1. AWAIT the Axios response
         const response = await axios.post(url, {
            input_file_path: inputPdfPath,
            changes: finalChanges,
            barcode_value: other.Reference ,//other.Reference // Pass the Reference for barcode generation
            fullName:`${person.FirstName} ${person.MiddleName} ${person.Surname}`,
            type:"Reciept",
            id:person.id
        });

        console.log('✅ Server Response:', response.data);

        // 2. Read file and RETURN the base64 string
        const base64String = readFileSync(response.data.output_file, 'base64');
        return base64String;

    } catch (error) {
        console.error('❌ Error:', error.message);
        return null; // Return null if it fails
    }
}

export async function pdfclient3(inputPdfPath, index, other,idd) {
    const person = people[index]
    const activeOffices = getActiveOffices(other.serviceType);

    // ... (Your existing variable definitions for names/dates keep exact same) ...
    const d = new Date(person.BirthDate);
    const bd = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
    const cdi = person.ContactNumber.replace("_", " ")
    const lookupValue = regions.find(item => item.tgLocalityLookupId === person.MainRegionLookupId)?.LookupDescription;
    const PhysicalAddressLine1 = activeOffices.find(item => item.tgSystemOrganisationId === idd)?.PhysicalAddressLine1
    const offf = activeOffices.find(item => item.tgSystemOrganisationId === idd)?.OrganisationName

    // ... (Your existing batchChanges array) ...
    const batchChanges = [
        { "old": "ABEBE", "new": person.FirstName, "english": true, "limit": 30 },
        { "old": "5 DAY SERVICE", "new": "NORMAL SERVICE", "english": true, "limit": 30 },
        { "old": "KEBEDE", "new": person.MiddleName, "english": true, "limit": 30 },
        { "old": "yooo", "new": offf, "english": true, "limit": 30 },
        { "old": "LEMUA", "new": person.Surname, "english": true, "limit": 30 },
        { "old": "አበበ", "new": person.FirstNamesAmharic, "english": false, "limit": 30 },
        { "old": "ከበደ", "new": person.MiddleNameAmharic, "english": false, "limit": 30 },
        { "old": "አለ", "new": person.SurnameAmharic, "english": false, "limit": 30 },
        { "old": "55555555555555555", "new": person.id, "english": true, "limit": 30 },
        { "old": "WOLDIA", "new": person.CityOfBirth, "english": true, "limit": 30 },
        { "old": "08/02/2001 ", "new": bd, "english": true, "limit": 30 },
        { "old": "+251 914352657", "new": cdi, "english": true, "limit": 30 },
        { "old": "offadd", "new": PhysicalAddressLine1, "english": true, "limit": 22 },
        { "old": "AAPP4260B9F0B2P", "new": other.Reference, "english": true, "limit": 30 },
        { "old": "02/06/2018", "new": other.nspEthiopianAppointmentDate.split(" ")[0], "english": true, "limit": 30 },
        { "old": "09/02/2026", "new": new Date(other.AppointmentDate).toLocaleDateString('en-GB'), "english": true, "limit": 30 },
         { "old": "AMHARA KOMBOLCHA KEBELE 3", "new": lookupValue + " " + person.MainCity + " " + person.MainAddressLine1, "english": true, "limit": 45 },
        { "old": "08/02/2026", "new": new Date(other.ApplicationStartDateISO).toLocaleString('en-GB', { hour12: true }).replace(',', ' ').toUpperCase(), "english": true, "limit": 30 },
        { "old": "16:00:00 - 17:00:00", "new": [other.startTime, other.endTime].map(t => new Date("1/1/2000 " + t).toLocaleTimeString('en-GB', { hour12: false })).join(' - '), "english": true, "limit": 30 },
    ];
    const serviceLabelReplacement3 = getServiceLabelReplacement(other.serviceType);
    const finalChanges = serviceLabelReplacement3
        ? batchChanges.map(change => change.old === "5 DAY SERVICE" ? { ...change, new: serviceLabelReplacement3 } : change)
        : batchChanges.filter(change => change.old !== "5 DAY SERVICE");
    if (other.serviceType === 915) finalChanges.push({ "old": "5,000.00", "new": "20,000.00", "english": true, "limit": 30, "mask_inset_top": 4 });
    person.GenderlookupId ==468 ?finalChanges.push({ "old": "MALE", "new": "FEMALE", "english": true, "limit": 30 }):null;

    const url = 'http://127.0.0.1:5000/process_pdf';

    try {
        // 1. AWAIT the Axios response
        const response = await axios.post(url, {
            input_file_path: inputPdfPath,
            changes: finalChanges,
            barcode_value: other.Reference ,//other.Reference // Pass the Reference for barcode generation
            fullName:`${person.FirstName} ${person.MiddleName} ${person.Surname}`,
            type:"toBeGiven",
            id:person.id
        });

        console.log('✅ Server Response:', response.data);

        // 2. Read file and RETURN the base64 string
        const base64String = readFileSync(response.data.output_file, 'base64');
        return base64String;

    } catch (error) {
        console.error('❌ Error:', error.message);
        return null; // Return null if it fails
    }
}
