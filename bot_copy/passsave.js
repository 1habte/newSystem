

import { pdfclient } from "./pdfr.js";
import { people } from "./ppl.js";
import { getEthiopianDateISO } from "./utils.js";



// const other = {
//   "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
//   "$values": [
//     {
//       "$type": "Models.ET1240.online_tgApplicationAppointment_ET1240DTO, Models",
//       "tgApplicationAppointmentId": 536227440087006,
//       "tgSystemOrganisationId": 4,
//       "AppointmentDate": "2026-02-09T12:54:25.122",
//       "StartTime": "04:00 PM",
//       "EndTime": "05:00 PM",
//       "AppointmentStatusLookupId": 372,
//       "tgApplicationTypeId": 10,
//       "tgPersonId": 652987543638297,
//       "RescheduleCount": 0,
//       "IsActive": 1,
//       "RecordStatusLookupId": 728,
//       "CreateDate": "2026-02-08T11:55:13",
//       "tgUserAuditDetailId": 1,
//       "CreatedBySystemUserId": 1,
//       "DataOwnerLookupId": 1,
//       "ValidationErrors": {
//         "$type": "System.Collections.Generic.List`1[[Models.IBusinessObjectResult, Models]], System.Private.CoreLib",
//         "$values": []
//       },
//       "BaseSaveAction": "LOCKING",
//       "BaseBusinessObjectId": 573043135131462
//     }
//   ]
// }
export async function processpsB2b(a,index,other, officeId, serviceType, documentOverride = null, personOverride = null) {
const person = personOverride || people[index]
let targetPerson = a.$values[0].online_tgPersonDTOList[0];
for (let key in person) {
    if (key!=="id" && person.hasOwnProperty(key)) {
        targetPerson[key] = person[key];
    }
}
a.$values[0].online_tgPersonDTOList[0].online_tgPersonIdentityDTOList[0].IdentityNumber = person["id"]


a.$values[0].ApplicationStartDate =other.ApplicationStartDateISO
if (serviceType === 915) {
    a.$values[0].PriorityLookupId = serviceType
} else {
    delete a.$values[0].PriorityLookupId
}
a.$values[0].CollectionOfficeId = officeId
a.$values[0].EnrolmentOfficeId = officeId
a.$values[0].Reference = other.Reference
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].RecipientAddress = person.ContactNumber.replace("_","")

a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.ApplicationStartDate =other.ApplicationStartDateISO
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.PriorityLookupId = serviceType
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.CollectionOfficeId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.EnrolmentOfficeId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.Reference = other.Reference

targetPerson = a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgPersonDTOList[0]
for (let key in person) {
    if (key!=="id" && person.hasOwnProperty(key)) {
        targetPerson[key] = person[key];
    }
}

a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgPersonDTOList[0].online_tgPersonIdentityDTOList[0].IdentityNumber = person["id"]
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].AppointmentDate =other.$values[0].AppointmentDate
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].tgApplicationAppointmentId =other.$values[0].tgApplicationAppointmentId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].tgSystemOrganisationId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].tgPersonId =other.$values[0].tgPersonId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].StartTime = other.$values[0].StartTime
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].EndTime =other.$values[0].EndTime
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.online_tgApplicationAppointmentDTOList[0].nspEthiopianAppointmentDate =new Intl.DateTimeFormat('en-GB', { calendar: 'ethiopic', day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(new Date(other.$values[0].AppointmentDate)).replace(' ERA1', '');
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[0].tgDTO.Remark = a.$values[0].Remark.replace(/-\s*.*/, `- ${person.FirstName} ${person.MiddleName} ${person.Surname}`)


a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.ApplicationStartDate =other.ApplicationStartDateISO
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.PriorityLookupId = serviceType
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.CollectionOfficeId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.EnrolmentOfficeId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.Reference = other.Reference
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].RecipientAddress = person.ContactNumber.replace("_","")
// console.log(a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].RecipientAddress)

targetPerson = a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgPersonDTOList[0]
for (let key in person) {
    if (key!=="id" && person.hasOwnProperty(key)) {
        targetPerson[key] = person[key];
    }
}

a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgPersonDTOList[0].online_tgPersonIdentityDTOList[0].IdentityNumber = person["id"]
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].AppointmentDate = other.$values[0].AppointmentDate
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].tgApplicationAppointmentId = other.$values[0].tgApplicationAppointmentId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].tgSystemOrganisationId = officeId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].tgPersonId = other.$values[0].tgPersonId
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].StartTime = other.$values[0].StartTime
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].EndTime = other.$values[0].EndTime
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.online_tgApplicationAppointmentDTOList[0].nspEthiopianAppointmentDate = new Intl.DateTimeFormat('en-GB', { calendar: 'ethiopic', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(other.$values[0].AppointmentDate)).replace(' ERA1', '');
a.$values[0].online_tgPersonDTOList[0].online_TGCommunicationDTOList[1].tgDTO.Remark = a.$values[0].Remark.replace(/-\s*.*/, `- ${person.FirstName} ${person.MiddleName} ${person.Surname}`)

a.$values[0].online_tgApplicationAppointmentDTOList[0].CreatedDate = other.$values[0].CreatedDate

a.$values[0].online_tgPersonDTOList[0].online_tgPersonIdentityDTOList[0].IdentityNumber = person["id"]
const other1 = {
    "ApplicationStartDateISO": other.ApplicationStartDateISO,
    "nspEthiopianAppointmentDate": new Intl.DateTimeFormat('en-GB', { calendar: 'ethiopic', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(other.ApplicationStartDateISO)).replace(' ERA1', ''),
    "Reference": other.Reference,
    "AppointmentDate": other.$values[0].AppointmentDate,
    "startTime": other.$values[0].StartTime,
    "endTime": other.$values[0].EndTime,
    "serviceType": serviceType,

}
const b64 = documentOverride !== null
    ? documentOverride
    : await pdfclient("C:\\Users\\habte\\Videos\\newSystem\\firstpdf.pdf",index,other1,officeId)
//console.log("yooob64", b64)
a.$values[0].online_tgPersonDTOList[0].online_TGPersonIssuedDocumentDTOList[0].DocumentObject = b64
a.$values[0].online_tgPersonDTOList[0].online_TGPersonIssuedDocumentDTOList[1].IssueDate = getEthiopianDateISO()

//console.log(a.$values[0].online_tgApplicationAppointmentDTOList[0])
a.$values[0].online_tgApplicationAppointmentDTOList[0].CreatedDate = other.$values[0].CreatedDate
a.$values[0].online_tgApplicationAppointmentDTOList[0].tgApplicationAppointmentId = other.$values[0].tgApplicationAppointmentId
a.$values[0].online_tgApplicationAppointmentDTOList[0].tgSystemOrganisationId = officeId
a.$values[0].online_tgApplicationAppointmentDTOList[0].AppointmentDate = other.$values[0].AppointmentDate
a.$values[0].online_tgApplicationAppointmentDTOList[0].StartTime = other.$values[0].StartTime
a.$values[0].online_tgApplicationAppointmentDTOList[0].EndTime = other.$values[0].EndTime
a.$values[0].online_tgApplicationAppointmentDTOList[0].tgPersonId = other.$values[0].tgPersonId
a.$values[0].online_tgApplicationAppointmentDTOList[0].nspEthiopianAppointmentDate = new Intl.DateTimeFormat('en-GB', { calendar: 'ethiopic', day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(new Date(other.$values[0].AppointmentDate)).replace(' ERA1', '');

return a
}
