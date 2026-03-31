const { getFormattedDate } = require("./utils");
// const { generateApplicationPdfBase64 } = require("./Save_Details");

// ... (loginPayload, appointmentSearchPayload, appointmentSlotPayload, lockAppointmentPayload remain the same as previous) ...

const { v4: uuidv4 } = require("uuid");

const loginPayload = (personalData) => {
  const requestId = `LOGIN_REQUEST_ONLINE #2 | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.tgSystemUserLoginPortalDTO, Models",
              BaseInternalReference: "PRE_LOGIN_DATA_INITIALIZATION",
              Username: personalData.Username,
              ValidationPar: personalData.Password,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};

const loadTGSupportingDocumentConfigurationPayload = (personalData) => {
  const personalInfo = personalData;
  const appDate = new Date().toISOString().slice(0, 23);
  const requestId = `loadTGSupportingDocumentConfigurationDTOList | ${uuidv4()}`;

  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type:
                "Models.Core.online_tgSupportingDocumentConditionConfigurationDTO, Models",
              tgDTO: {
                $type: "Models.Core.online_tgApplicationDTO, Models",
                IsActive: 1,
                baseSaveAction: "STEP1_SAVE_G2",
                tgApplicationTypeId: 10,
                ApplicationStartDate: appDate,
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                PriorityLookupId: 915,
                CollectionOfficeId: 0,
                DocumentTypeLookupId: 715,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    FirstName: personalInfo.FirstName,
                    FirstNamesAmharic: personalInfo.FirstNamesAmharic,
                    MiddleName: personalInfo.MiddleName,
                    MiddleNameAmharic: personalInfo.MiddleNameAmharic,
                    Surname: personalInfo.Surname,
                    SurnameAmharic: personalInfo.SurnameAmharic,
                    Height: personalInfo.Height,
                    GenderlookupId: personalInfo.GenderlookupId,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: personalInfo.PlaceOfBirthLookupId,
                    CityOfBirth: personalInfo.CityOfBirth,
                    BirthDate: personalInfo.BirthDate,
                    MaritalStatusLookupId: personalInfo.MaritalStatusLookupId,
                    ContactNumber: personalInfo.ContactNumber,
                    EmailAddress: personalInfo.EmailAddress,
                    MainRegionLookupId: personalInfo.MainRegionLookupId,
                    MainCity: personalInfo.MainCity,
                    MainAddressLine1: personalInfo.MainAddressLine1,
                    nspEthiopianBirthDate: personalInfo.nspEthiopianBirthDate,
                    online_TGPersonBiometricDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonBiometricDTO, Models",
                        online_tgPersonBiometricFailureDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonBiometricFailureDTO, Models",
                          },
                        ],
                      },
                    ],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IdentityTypeLookupId: 653,
                        IdentityNumber: personalInfo.IdentityNumber,
                      },
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IdentityTypeLookupId: 653,
                        CountryOfIssueLookupId: 73,
                        IdentityDocumentStatusLookupId: 483,
                      },
                    ],
                    online_TGPersonIssuedDocumentDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 491,
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        ReasonForIssueLookupId: 2,
                        PersonalizedDocumentStatusLookupId: 489,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 715,
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        PersonalizedDocumentStatusLookupId: 677,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                    ],
                    online_TGPersonRelationDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonRelationDTO, Models",
                        nspMarriageDate: "",
                        nspCanRemove: "false",
                      },
                    ],
                    online_TGPersonSupportingDocumentDTOList: [],
                    online_TGPersonWorkDetailDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonWorkDetailDTO, Models",
                      },
                    ],
                  },
                ],
                online_tgApplicationAppointmentDTOList: [
                  {
                    $type:
                      "Models.Core.online_tgApplicationAppointmentDTO, Models",
                  },
                ],
                online_tgApplicationPageNotesDTOList: [
                  {
                    $type:
                      "Models.Core.online_tgApplicationPageNotesDTO, Models",
                  },
                ],
                online_tgApplicationStatusRemarkDTOList: [
                  {
                    $type:
                      "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
                  },
                ],
                online_tgApplicationFeeDTOList: [
                  {
                    $type: "Models.Core.online_tgApplicationFeeDTO, Models",
                  },
                ],
                online_tgSystemOrganisationDTOList: [
                  {
                    $type: "Models.Core.online_tgSystemOrganisationDTO, Models",
                  },
                ],
                online_tgSystemOrganisationHoursDTOList: [],
                online_tgApplicationPaymentDTOList: [
                  {
                    $type: "Models.Core.online_tgApplicationPaymentDTO, Models",
                  },
                ],
                tgFeeDTOList: [],
              },
            },
          ],
        },
        baseInternalReference: "PRE_LOGIN_DATA_INITIALIZATION",
        version: "1.0.1.106",
      },
    ],
  };
};

const appointmentSearchPayload = (startDateStr, endDateStr, officeId) => {
  const requestId = `portal-appointments | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 0,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgApplicationAppointmentDTO, Models",
              BaseSearchOptions: {
                $type: "Models.SearchCriteria, Models",
                Between: {
                  $type:
                    "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                  AppointmentDate: `'${startDateStr}','${endDateStr}'`,
                },
              },
              tgSystemOrganisationId: officeId,
            },
          ],
        },
        baseInternalReference: "PRE_LOGIN_DATA_INITIALIZATION",
        version: "1.0.1.106",
      },
    ],
  };
};

const appointmentSlotPayload = (dateStr, officeId, startTime, endTime) => {
  const requestId = `portal-appointments-${dateStr}T00:00:00.000-16:00 | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 0,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgApplicationAppointmentDTO, Models",
              BaseSearchOptions: {
                $type: "Models.SearchCriteria, Models",
                Between: {
                  $type:
                    "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                  AppointmentDate: `'${dateStr} 00:00:00','${dateStr} 23:59:59'`,
                },
              },
              tgSystemOrganisationId: officeId,
              tgApplicationTypeId: 10,
            },
          ],
        },
        baseInternalReference: "PRE_LOGIN_DATA_INITIALIZATION",
        StartTime: startTime,
        EndTime: endTime,
        version: "1.0.1.106",
      },
    ],
  };
};

const lockAppointmentPayload = (slotData, personId) => {
  // Correct the date format to include milliseconds
  const requestId = `portal-appointment-lock | ${uuidv4()}`;

  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgApplicationAppointmentDTO, Models",
              baseSaveAction: "LOCKING",
              tgSystemOrganisationId: slotData.tgSystemOrganisationId,
              AppointmentDate: slotData.AppointmentDate,
              StartTime: slotData.StartTime,
              EndTime: slotData.EndTime,
              AppointmentStatusLookupId: 372,
              tgApplicationTypeId: 10,
              tgPersonId: personId,
              rescheduleCount: 0,
              nspEthiopianAppointmentDate: slotData.nspEthiopianAppointmentDate,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};

//Application barcode

const loadSequencePayload = (officeId = 86) => {
  const requestId = `load-sequence | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgSequenceDTO, Models",
              SequenceName: "APPLICATION_BARCODE",
              Increment: 1,
              EntityType: "TGSystemOrganisation",
              EntityId: officeId,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
// Health Check payload

const healthCheckPayload = () => {
  const requestId = `HEALTH_CHECK | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 1,
        priority: false,
        project: 0,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.HealthCheckDTO, Models",
              DatabaseHealthList: null,
              EnrollmentService: null,
              DocumentService: null,
              SystemAdministrationService: null,
              LoginService: null,
              HistoryAndAuditService: null,
              ConfigService: null,
              WorkflowService: null,
              NotificationService: null,
              PaymentService: null,
              BiometricService: null,
              SyncService: null,
              ABIS_Service: null,
              GatewayDMZApi: null,
              GatewayMZApi: null,
              LegacyDataService: null,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
// The Main Save Payload
const saveApplicationPayload = (userCredentials, documentObject) => {
  const requestId = `NEW_PASSPORT_PORTAL_SAVE | ${uuidv4()}`;
  const createNestedCommTgDTO = () => ({
    $type: "Models.Core.online_tgApplicationDTO, Models",
    tgApplicationTypeId: 10,
    ApplicationStartDate: userCredentials.ApplicationStartDate,
    ApplicationStatusLookupId: 365,
    AssignedSystemOrganisationId: 0,
    Reference: userCredentials.reference,
    PriorityLookupId: 918,
    Remark: `APPLICATION FOR NORMAL PASSPORT - ${userCredentials.FirstName} ${userCredentials.MiddleName} ${userCredentials.Surname}`,
    CollectionOfficeId: userCredentials.collectionOffice,
    DocumentTypeLookupId: 715,
    EnrolmentOfficeId: userCredentials.collectionOffice,
    EntityRequiresUpdate: 0,
    online_tgPersonDTOList: [
      {
        $type: "Models.Core.online_tgPersonDTO, Models",
        FirstName: userCredentials.FirstName,
        FirstNamesAmharic: userCredentials.FirstNamesAmharic,
        MiddleName: userCredentials.MiddleName,
        MiddleNameAmharic: userCredentials.MiddleNameAmharic,
        Surname: userCredentials.Surname,
        SurnameAmharic: userCredentials.SurnameAmharic,
        Height: userCredentials.Height,
        GenderlookupId: userCredentials.GenderlookupId,
        NationalityLookupId: 538,
        PlaceOfBirthLookupId: userCredentials.PlaceOfBirthLookupId,
        CityOfBirth: userCredentials.CityOfBirth,
        BirthDate: userCredentials.BirthDate,
        MaritalStatusLookupId: userCredentials.MaritalStatusLookupId,
        PersonStatusLookupId: 672,
        ContactNumber: userCredentials.ContactNumber,
        EmailAddress: userCredentials.EmailAddress,
        MainRegionLookupId: userCredentials.MainRegionLookupId,
        MainCity: userCredentials.MainCity,
        MainAddressLine1: userCredentials.MainAddressLine1,
        nspEthiopianBirthDate: userCredentials.nspEthiopianBirthDate,
        online_tgPersonIdentityDTOList: [
          {
            $type: "Models.Core.online_tgPersonIdentityDTO, Models",
            IdentityTypeLookupId: 653,
            IdentityNumber: userCredentials.IdentityNumber,
          },
        ],
        online_TGPersonRelationDTOList: [],
        online_TGPersonWorkDetailDTOList: [
          {
            $type: "Models.Core.online_tgPersonWorkDetailDTO, Models",
          },
        ],
      },
    ],
    online_tgApplicationAppointmentDTOList: [
      {
        $type: "Models.Core.online_tgApplicationAppointmentDTO, Models",
        tgApplicationAppointmentId: userCredentials.tgApplicationAppointmentId,
        tgSystemOrganisationId: userCredentials.collectionOffice,
        AppointmentDate: userCredentials.AppointmentDate,
        StartTime: userCredentials.StartTime,
        EndTime: userCredentials.EndTime,
        AppointmentStatusLookupId: 372,
        tgApplicationTypeId: 10,
        tgPersonId: userCredentials.tgPersonId,
        rescheduleCount: 0,
        nspEthiopianAppointmentDate:
          userCredentials.nspEthiopianAppointmentDate,
      },
    ],
    online_tgApplicationPageNotesDTOList: [],
    online_tgApplicationStatusRemarkDTOList: [
      {
        $type: "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
      },
    ],
    online_tgApplicationFeeDTOList: [],
    online_tgSystemOrganisationDTOList: [],
    online_tgOrganisationDTOList: [],
    online_tgSystemOrganisationHoursDTOList: [],
    online_tgApplicationPaymentDTOList: [
      {
        $type: "Models.Core.online_tgApplicationPaymentDTO, Models",
        baseExcludeList: {
          $type:
            "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
          $values: ["DocumentObject"],
        },
      },
    ],
    tgFeeDTOList: [],
  });

  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 2,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgApplicationDTO, Models",
              IsActive: 1,
              DataOwnerLookupId: 0,
              baseSaveAction: "STEP1_SAVE_G1",
              tgApplicationTypeId: 10,
              ApplicationStartDate: userCredentials.ApplicationStartDate,
              ApplicationStatusLookupId: 365,
              AssignedSystemOrganisationId: 0,
              Reference: userCredentials.reference,
              PriorityLookupId: 918,
              Remark: `APPLICATION FOR NORMAL PASSPORT - ${userCredentials.FirstName} ${userCredentials.MiddleName} ${userCredentials.Surname}`,
              CollectionOfficeId: userCredentials.collectionOffice,
              DocumentTypeLookupId: 715,
              EnrolmentOfficeId: userCredentials.collectionOffice,
              EntityRequiresUpdate: 0,
              online_tgPersonDTOList: [
                {
                  $type: "Models.Core.online_tgPersonDTO, Models",
                  FirstName: userCredentials.FirstName,
                  FirstNamesAmharic: userCredentials.FirstNamesAmharic,
                  MiddleName: userCredentials.MiddleName,
                  MiddleNameAmharic: userCredentials.MiddleNameAmharic,
                  Surname: userCredentials.Surname,
                  SurnameAmharic: userCredentials.SurnameAmharic,
                  Height: userCredentials.Height,
                  GenderlookupId: userCredentials.GenderlookupId,
                  NationalityLookupId: 538,
                  PlaceOfBirthLookupId: userCredentials.PlaceOfBirthLookupId,
                  CityOfBirth: userCredentials.CityOfBirth,
                  BirthDate: userCredentials.BirthDate,
                  MaritalStatusLookupId: userCredentials.MaritalStatusLookupId,
                  PersonStatusLookupId: 672,
                  ContactNumber: userCredentials.ContactNumber,
                  EmailAddress: userCredentials.EmailAddress,
                  MainRegionLookupId: userCredentials.MainRegionLookupId,
                  MainCity: userCredentials.MainCity,
                  MainAddressLine1: userCredentials.MainAddressLine1,
                  nspEthiopianBirthDate: userCredentials.nspEthiopianBirthDate,
                  online_TGCommunicationDTOList: [
                    {
                      $type: "Models.Core.online_tgCommunicationDTO, Models",
                      tgCommunicationTemplateId: 6,
                      tgCommunicationTriggerId: 2,
                      Subject: "Application for: [@@TRANSACTION_TYPE]",
                      Medium: "EMAIL",
                      CommunicationText:
                        "የአዲስ ሰነድ ለማግኘት ያቀረቡት ማመልከቻ በተሳካ ሁኔታ ቀርቧል፣ እንዲሁም የሚያስፈልጉት ሁሉም ደጋፊ ሰነዶች ደርሰዋል። <br/><br/>የአገልግሉት ክፍያ አሁን መጠናቀቅ አለበት። ያስተውሉ ክፍያው በአርባ ስምንት (48) ሰዓት ውስጥ ካልተጠናቀቀ አገልግሎቱ ይሰረዛል።<br/><br/>በቀጠሮው ቀን እና ሰዓት እርስዎ በመረጡት የኢትዮጵያ የኢሚግሬሽን እና የዜግነት አገልግሎት ቢሮ ካልተገኙ፣ በቀጠሮው ዘግይተው በመድረስዎ የቅጣት ክፍያ እንደሚከፈሉ ልብ ይበሉ።<br/><br/>የቀጠሮ ዝርዝር፡<br/><br/>የቢሮ ስም፡  [@@OFFICE_ADDRESS] <br/><br/>የቢሮ አድራሻ፡ [@@OFFICE_ADDRESS]<br/><br/>የቀጠሮ ቀንና ሰአት፡ [@@APPOINTMENT_DATE_TIME]<br/><br/> ከታች የተያያዙትን የክፍያና የቀጠሮ ዝርዝር ሰነድ ይመልከቱ ከሰላምታ ጋር፣<br/><br/> የኢትዮጵያ የኢሚግሬሽንና ዜግነት አገልግሎት፡፡",
                      RecipientEntity: "tgPersonDTO",
                      RecipientAddress: userCredentials.EmailAddress,
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: createNestedCommTgDTO(),
                    },
                    {
                      $type: "Models.Core.online_tgCommunicationDTO, Models",
                      tgCommunicationTemplateId: 5,
                      tgCommunicationTriggerId: 2,
                      Subject: "Application for: [@@TRANSACTION_TYPE]",
                      Medium: "EMAIL",
                      CommunicationText:
                        "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Payment for the transaction must now be completed. If payment for the transaction is not completed within forty-eight (48) hours, the transaction will automatically be cancelled.<br/><br/>Please note that if you do not visit the ICS office selected by you on the date and time of the appointment, penalty fees shall be charged for arriving late for the appointment.<br/><br/>Appointment Detail:<br/><br/>Office Name: [@@OFFICE_NAME]<br/><br/>Office Address: [@@OFFICE_ADDRESS]<br/><br/>Appointment Date and Time: [@@APPOINTMENT_DATE_TIME]<br/><br/>Find attached documentation containing the detail of the transaction and the appointment detail.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
                      RecipientEntity: "tgPersonDTO",
                      RecipientAddress: userCredentials.EmailAddress,
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: createNestedCommTgDTO(),
                    },
                    {
                      $type: "Models.Core.online_tgCommunicationDTO, Models",
                      tgCommunicationTemplateId: 8,
                      tgCommunicationTriggerId: 2,
                      Subject: "Application for: [@@TRANSACTION_TYPE]",
                      Medium: "SMS",
                      CommunicationText:
                        "[@@FULL_NAMES]፣ ማመልከቻዎ ለኢሚግሬሽንና የዜግነት አገልግሎት ደርሷል፡፡ የማመልከቻዎ ባር ኮድ እንደሚከተለዉ ነው፡- [@@APPLICATION_BARCODE] እባክዎ ሂደቱ እንዳይሰረዝ ክፍያዎን በ 3 ሰአታት ውስጥ ያጠናቅቁ።",
                      RecipientEntity: "tgPersonDTO",
                      // Notice the replace here. SMS endpoints usually crash if the underscore is passed!
                      RecipientAddress: (
                        userCredentials.ContactNumber || ""
                      ).replace("_", ""),
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: createNestedCommTgDTO(),
                    },
                    {
                      $type: "Models.Core.online_tgCommunicationDTO, Models",
                      tgCommunicationTemplateId: 7,
                      tgCommunicationTriggerId: 2,
                      Subject: "Application for: [@@TRANSACTION_TYPE]",
                      Medium: "SMS",
                      CommunicationText:
                        "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
                      RecipientEntity: "tgPersonDTO",
                      RecipientAddress: (
                        userCredentials.ContactNumber || ""
                      ).replace("_", ""),
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: createNestedCommTgDTO(),
                    },
                  ],
                  online_tgPersonIdentityDTOList: [
                    {
                      $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                      IdentityTypeLookupId: 653,
                      IdentityNumber: userCredentials.IdentityNumber,
                    },
                  ],
                  online_TGPersonIssuedDocumentDTOList: [
                    {
                      $type:
                        "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                      DocumentTypeLookupId: 491,
                      DocumentObject: documentObject,
                      IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                      ReasonForIssueLookupId: 2,
                      PersonalizedDocumentStatusLookupId: 489,
                      IssuingCountryLookupId: 73,
                      online_tgPersonIssuedDocumentCountryDTOList: [
                        {
                          $type:
                            "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                        },
                      ],
                    },
                    {
                      $type:
                        "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                      DocumentTypeLookupId: 715,
                      IssueDate: userCredentials.IssueDate,
                      IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                      PlaceOfPrinting: "ePass Online Web Portal",
                      PersonalizedDocumentStatusLookupId: 677,
                      IssuingCountryLookupId: 73,
                      online_tgPersonIssuedDocumentCountryDTOList: [
                        {
                          $type:
                            "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                        },
                      ],
                    },
                  ],
                  online_TGPersonRelationDTOList: [],
                  online_TGPersonWorkDetailDTOList: [
                    {
                      $type: "Models.Core.online_tgPersonWorkDetailDTO, Models",
                      // Note: I removed OccupationLookupId from here to perfectly match the standard DTO
                    },
                  ],
                },
              ],
              online_tgApplicationAppointmentDTOList: [
                {
                  $type:
                    "Models.Core.online_tgApplicationAppointmentDTO, Models",
                  IsActive: 1,
                  RecordStatus_LookupValue_Id: 728,
                  CreatedDate: userCredentials.ApplicationStartDate,
                  TgUserAuditDetailId: 1,
                  CreatedBySystemUserId: 1,
                  DataOwnerLookupId: 1,
                  baseSaveAction: "LOCKING",
                  tgApplicationAppointmentId:
                    userCredentials.tgApplicationAppointmentId,
                  tgSystemOrganisationId: userCredentials.collectionOffice,
                  AppointmentDate: userCredentials.AppointmentDate,
                  StartTime: userCredentials.StartTime,
                  EndTime: userCredentials.EndTime,
                  AppointmentStatusLookupId: 372,
                  tgApplicationTypeId: 10,
                  tgPersonId: userCredentials.tgPersonId,
                  rescheduleCount: 0,
                  nspEthiopianAppointmentDate:
                    userCredentials.nspEthiopianAppointmentDate,
                },
              ],
              online_tgApplicationStatusRemarkDTOList: [],
              online_tgSystemOrganisationHoursDTOList: [],
              online_tgApplicationPaymentDTOList: [
                {
                  $type: "Models.Core.online_tgApplicationPaymentDTO, Models",
                },
              ],
              tgFeeDTOList: [],
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
const feeRequestPayload = (applicationData) => ({
  $type: "Models.Core.online_financialInvoiceDTO, Models",
  tgDTO: applicationData,
});

const updatePaymentInstructionDocumentPayload = (
  documentNumber,
  documentObject,
) => {
  const requestId = `UPDATE_PAYMENT_INSTRUCTION_DOCUMENT | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 2,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgFinancialDocumentDTO, Models",
              DocumentNumber: documentNumber,
              DocumentTypeLookupId: 492,
              DocumentStatusLookupId: 449,
              DocumentObject: documentObject,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};

const paymentOrderPortalPayload = (personalData, customerCode, orderId) => {
  const requestId = `payment-order-portal | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 2,
        priority: false,
        project: 100,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.requestOrderDTO, Models",
              FirstName: personalData.FirstName,
              LastName: personalData.Surname,
              Email: personalData.EmailAddress,
              Phone: personalData.ContactNumber.replace("_", " "),
              Amount: 20000,
              Currency: "ETB",
              Country: "ETH",
              PaymentTypeId: 1,
              CustomOrderCode: customerCode,
              MerchantCode: 181826,
              isExpiryFromMerchant: false,
              ExpiryTimeStamp: 0,
              tgApplicationTypeName: "NEW_PASSPORT",
              OrderId: orderId,
              PaymentStatusLookupId: 449,
              InstructiontgFinancialDocumentId: 1,
              paymentPlatform: 0,
              FinancialInvoiceDTOList: [
                {
                  $type: "Models.Core.financialInvoiceDTO, Models",
                  tgFeeDTOList: [
                    {
                      $type: "Models.Core.tgFeeDTO, Models",
                      tgFeeId: 55,
                    },
                  ],
                },
              ],
              ApplicationTypeId: 10,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
const loadFeesHash3 = (userData, documentObject) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `LOAD_FEES #3 | ${uuidv4()}`,
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_financialInvoiceDTO, Models",
              tgDTO: {
                $type: "Models.Core.online_tgApplicationDTO, Models",
                IsActive: 1,
                DataOwnerLookupId: 0,
                baseSaveAction: "STEP1_SAVE_G1",
                tgApplicationTypeId: 10,
                ApplicationStartDate: "2026-03-03T14:43:45.091",
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                Reference: "BTPP526007E7C9P",
                PriorityLookupId: 918,
                Remark:
                  "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                CollectionOfficeId: 11,
                DocumentTypeLookupId: 715,
                EnrolmentOfficeId: 11,
                EntityRequiresUpdate: 0,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    FirstName: "MOGNHODE",
                    FirstNamesAmharic: "ሞኝሆዴ",
                    MiddleName: "NEGEDE",
                    MiddleNameAmharic: "ነገደ",
                    Surname: "ALEMU",
                    SurnameAmharic: "አለሙ",
                    Height: "178",
                    EyeColourLookupId: 430,
                    HairColourLookupId: 473,
                    GenderlookupId: 469,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: 10,
                    CityOfBirth: "GECHI",
                    BirthDate: "2000-02-28T00:00:00.000",
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: "+251_963528752",
                    EmailAddress: "MOGNHODE123@gmail.com",
                    MainRegionLookupId: 10,
                    MainCity: "BUNO BEDELE",
                    MainAddressLine1: "BUNO BEDELE, OROMIA",
                    nspEthiopianBirthDate: "20/06/1992",
                    online_TGCommunicationDTOList: [
                      {
                        $type: "Models.Core.online_tgCommunicationDTO, Models",
                        tgCommunicationTemplateId: 6,
                        tgCommunicationTriggerId: 2,
                        Subject: "Application for: [@@TRANSACTION_TYPE]",
                        Medium: "EMAIL",
                        CommunicationText:
                          "የአዲስ ሰነድ ለማግኘት ያቀረቡት ማመልከቻ በተሳካ ሁኔታ ቀርቧል፣ እንዲሁም የሚያስፈልጉት ሁሉም ደጋፊ ሰነዶች ደርሰዋል። <br/><br/>የአገልግሉት ክፍያ አሁን መጠናቀቅ አለበት። ያስተውሉ ክፍያው በአርባ ስምንት (48) ሰዓት ውስጥ ካልተጠናቀቀ አገልግሎቱ ይሰረዛል።<br/><br/>በቀጠሮው ቀን እና ሰዓት እርስዎ በመረጡት የኢትዮጵያ የኢሚግሬሽን እና የዜግነት አገልግሎት ቢሮ ካልተገኙ፣ በቀጠሮው ዘግይተው በመድረስዎ የቅጣት ክፍያ እንደሚከፈሉ ልብ ይበሉ።<br/><br/>የቀጠሮ ዝርዝር፡<br/><br/>የቢሮ ስም፡  [@@OFFICE_ADDRESS] <br/><br/>የቢሮ አድራሻ፡ [@@OFFICE_ADDRESS]<br/><br/>የቀጠሮ ቀንና ሰአት፡ [@@APPOINTMENT_DATE_TIME]<br/><br/> ከታች የተያያዙትን የክፍያና የቀጠሮ ዝርዝር ሰነድ ይመልከቱ ከሰላምታ ጋር፣<br/><br/> የኢትዮጵያ የኢሚግሬሽንና ዜግነት አገልግሎት፡፡",
                        RecipientEntity: "tgPersonDTO",
                        RecipientAddress: "MOGNHODE123@gmail.com",
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: "2026-03-03T14:43:45.091",
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: "BTPP526007E7C9P",
                          PriorityLookupId: 918,
                          Remark:
                            "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                          CollectionOfficeId: 11,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: 11,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: "MOGNHODE",
                              FirstNamesAmharic: "ሞኝሆዴ",
                              MiddleName: "NEGEDE",
                              MiddleNameAmharic: "ነገደ",
                              Surname: "ALEMU",
                              SurnameAmharic: "አለሙ",
                              Height: "178",
                              EyeColourLookupId: 430,
                              HairColourLookupId: 473,
                              GenderlookupId: 469,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId: 10,
                              CityOfBirth: "GECHI",
                              BirthDate: "2000-02-28T00:00:00.000",
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: "+251_963528752",
                              EmailAddress: "MOGNHODE123@gmail.com",
                              MainRegionLookupId: 10,
                              MainCity: "BUNO BEDELE",
                              MainAddressLine1: "BUNO BEDELE, OROMIA",
                              nspEthiopianBirthDate: "20/06/1992",
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: "10405068632478525",
                                },
                              ],
                              online_TGPersonRelationDTOList: [],
                              online_TGPersonWorkDetailDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonWorkDetailDTO, Models",
                                },
                              ],
                            },
                          ],
                          online_tgApplicationAppointmentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationAppointmentDTO, Models",
                              tgApplicationAppointmentId: 412650217750879,
                              tgSystemOrganisationId: 11,
                              AppointmentDate: "2026-07-08T00:00:00.000",
                              StartTime: "09:00 AM",
                              EndTime: "10:00 AM",
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: 753389456828313,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate: "01/11/2018",
                            },
                          ],
                          online_tgApplicationPageNotesDTOList: [],
                          online_tgApplicationStatusRemarkDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
                            },
                          ],
                          online_tgApplicationFeeDTOList: [],
                          online_tgSystemOrganisationDTOList: [],
                          online_tgOrganisationDTOList: [],
                          online_tgSystemOrganisationHoursDTOList: [],
                          online_tgApplicationPaymentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationPaymentDTO, Models",
                              baseExcludeList: {
                                $type:
                                  "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                                $values: ["DocumentObject"],
                              },
                            },
                          ],
                          tgFeeDTOList: [],
                        },
                      },
                      {
                        $type: "Models.Core.online_tgCommunicationDTO, Models",
                        tgCommunicationTemplateId: 5,
                        tgCommunicationTriggerId: 2,
                        Subject: "Application for: [@@TRANSACTION_TYPE]",
                        Medium: "EMAIL",
                        CommunicationText:
                          "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Payment for the transaction must now be completed. If payment for the transaction is not completed within forty-eight (48) hours, the transaction will automatically be cancelled.<br/><br/>Please note that if you do not visit the ICS office selected by you on the date and time of the appointment, penalty fees shall be charged for arriving late for the appointment.<br/><br/>Appointment Detail:<br/><br/>Office Name: [@@OFFICE_NAME]<br/><br/>Office Address: [@@OFFICE_ADDRESS]<br/><br/>Appointment Date and Time: [@@APPOINTMENT_DATE_TIME]<br/><br/>Find attached documentation containing the detail of the transaction and the appointment detail.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
                        RecipientEntity: "tgPersonDTO",
                        RecipientAddress: "MOGNHODE123@gmail.com",
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: "2026-03-03T14:43:45.091",
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: "BTPP526007E7C9P",
                          PriorityLookupId: 918,
                          Remark:
                            "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                          CollectionOfficeId: 11,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: 11,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: "MOGNHODE",
                              FirstNamesAmharic: "ሞኝሆዴ",
                              MiddleName: "NEGEDE",
                              MiddleNameAmharic: "ነገደ",
                              Surname: "ALEMU",
                              SurnameAmharic: "አለሙ",
                              Height: "178",
                              EyeColourLookupId: 430,
                              HairColourLookupId: 473,
                              GenderlookupId: 469,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId: 10,
                              CityOfBirth: "GECHI",
                              BirthDate: "2000-02-28T00:00:00.000",
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: "+251_963528752",
                              EmailAddress: "MOGNHODE123@gmail.com",
                              MainRegionLookupId: 10,
                              MainCity: "BUNO BEDELE",
                              MainAddressLine1: "BUNO BEDELE, OROMIA",
                              nspEthiopianBirthDate: "20/06/1992",
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: "10405068632478525",
                                },
                              ],
                              online_TGPersonRelationDTOList: [],
                              online_TGPersonWorkDetailDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonWorkDetailDTO, Models",
                                },
                              ],
                            },
                          ],
                          online_tgApplicationAppointmentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationAppointmentDTO, Models",
                              tgApplicationAppointmentId: 412650217750879,
                              tgSystemOrganisationId: 11,
                              AppointmentDate: "2026-07-08T00:00:00.000",
                              StartTime: "09:00 AM",
                              EndTime: "10:00 AM",
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: 753389456828313,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate: "01/11/2018",
                            },
                          ],
                          online_tgApplicationPageNotesDTOList: [],
                          online_tgApplicationStatusRemarkDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
                            },
                          ],
                          online_tgApplicationFeeDTOList: [],
                          online_tgSystemOrganisationDTOList: [],
                          online_tgOrganisationDTOList: [],
                          online_tgSystemOrganisationHoursDTOList: [],
                          online_tgApplicationPaymentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationPaymentDTO, Models",
                              baseExcludeList: {
                                $type:
                                  "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                                $values: ["DocumentObject"],
                              },
                            },
                          ],
                          tgFeeDTOList: [],
                        },
                      },
                      {
                        $type: "Models.Core.online_tgCommunicationDTO, Models",
                        tgCommunicationTemplateId: 8,
                        tgCommunicationTriggerId: 2,
                        Subject: "Application for: [@@TRANSACTION_TYPE]",
                        Medium: "SMS",
                        CommunicationText:
                          "[@@FULL_NAMES]፣ ማመልከቻዎ ለኢሚግሬሽንና የዜግነት አገልግሎት ደርሷል፡፡ የማመልከቻዎ ባር ኮድ እንደሚከተለዉ ነው፡- [@@APPLICATION_BARCODE] እባክዎ ሂደቱ እንዳይሰረዝ ክፍያዎን በ 3 ሰአታት ውስጥ ያጠናቅቁ።",
                        RecipientEntity: "tgPersonDTO",
                        RecipientAddress: "+251963528752",
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: "2026-03-03T14:43:45.091",
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: "BTPP526007E7C9P",
                          PriorityLookupId: 918,
                          Remark:
                            "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                          CollectionOfficeId: 11,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: 11,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: "MOGNHODE",
                              FirstNamesAmharic: "ሞኝሆዴ",
                              MiddleName: "NEGEDE",
                              MiddleNameAmharic: "ነገደ",
                              Surname: "ALEMU",
                              SurnameAmharic: "አለሙ",
                              Height: "178",
                              EyeColourLookupId: 430,
                              HairColourLookupId: 473,
                              GenderlookupId: 469,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId: 10,
                              CityOfBirth: "GECHI",
                              BirthDate: "2000-02-28T00:00:00.000",
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: "+251_963528752",
                              EmailAddress: "MOGNHODE123@gmail.com",
                              MainRegionLookupId: 10,
                              MainCity: "BUNO BEDELE",
                              MainAddressLine1: "BUNO BEDELE, OROMIA",
                              nspEthiopianBirthDate: "20/06/1992",
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: "10405068632478525",
                                },
                              ],
                              online_TGPersonRelationDTOList: [],
                              online_TGPersonWorkDetailDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonWorkDetailDTO, Models",
                                },
                              ],
                            },
                          ],
                          online_tgApplicationAppointmentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationAppointmentDTO, Models",
                              tgApplicationAppointmentId: 412650217750879,
                              tgSystemOrganisationId: 11,
                              AppointmentDate: "2026-07-08T00:00:00.000",
                              StartTime: "09:00 AM",
                              EndTime: "10:00 AM",
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: 753389456828313,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate: "01/11/2018",
                            },
                          ],
                          online_tgApplicationPageNotesDTOList: [],
                          online_tgApplicationStatusRemarkDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
                            },
                          ],
                          online_tgApplicationFeeDTOList: [],
                          online_tgSystemOrganisationDTOList: [],
                          online_tgOrganisationDTOList: [],
                          online_tgSystemOrganisationHoursDTOList: [],
                          online_tgApplicationPaymentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationPaymentDTO, Models",
                              baseExcludeList: {
                                $type:
                                  "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                                $values: ["DocumentObject"],
                              },
                            },
                          ],
                          tgFeeDTOList: [],
                        },
                      },
                      {
                        $type: "Models.Core.online_tgCommunicationDTO, Models",
                        tgCommunicationTemplateId: 7,
                        tgCommunicationTriggerId: 2,
                        Subject: "Application for: [@@TRANSACTION_TYPE]",
                        Medium: "SMS",
                        CommunicationText:
                          "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
                        RecipientEntity: "tgPersonDTO",
                        RecipientAddress: "+251963528752",
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: "2026-03-03T14:43:45.091",
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: "BTPP526007E7C9P",
                          PriorityLookupId: 918,
                          Remark:
                            "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                          CollectionOfficeId: 11,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: 11,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: "MOGNHODE",
                              FirstNamesAmharic: "ሞኝሆዴ",
                              MiddleName: "NEGEDE",
                              MiddleNameAmharic: "ነገደ",
                              Surname: "ALEMU",
                              SurnameAmharic: "አለሙ",
                              Height: "178",
                              EyeColourLookupId: 430,
                              HairColourLookupId: 473,
                              GenderlookupId: 469,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId: 10,
                              CityOfBirth: "GECHI",
                              BirthDate: "2000-02-28T00:00:00.000",
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: "+251_963528752",
                              EmailAddress: "MOGNHODE123@gmail.com",
                              MainRegionLookupId: 10,
                              MainCity: "BUNO BEDELE",
                              MainAddressLine1: "BUNO BEDELE, OROMIA",
                              nspEthiopianBirthDate: "20/06/1992",
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: "10405068632478525",
                                },
                              ],
                              online_TGPersonRelationDTOList: [],
                              online_TGPersonWorkDetailDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonWorkDetailDTO, Models",
                                },
                              ],
                            },
                          ],
                          online_tgApplicationAppointmentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationAppointmentDTO, Models",
                              tgApplicationAppointmentId: 412650217750879,
                              tgSystemOrganisationId: 11,
                              AppointmentDate: "2026-07-08T00:00:00.000",
                              StartTime: "09:00 AM",
                              EndTime: "10:00 AM",
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: 753389456828313,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate: "01/11/2018",
                            },
                          ],
                          online_tgApplicationPageNotesDTOList: [],
                          online_tgApplicationStatusRemarkDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationStatusRemarkDTO, Models",
                            },
                          ],
                          online_tgApplicationFeeDTOList: [],
                          online_tgSystemOrganisationDTOList: [],
                          online_tgOrganisationDTOList: [],
                          online_tgSystemOrganisationHoursDTOList: [],
                          online_tgApplicationPaymentDTOList: [
                            {
                              $type:
                                "Models.Core.online_tgApplicationPaymentDTO, Models",
                              baseExcludeList: {
                                $type:
                                  "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                                $values: ["DocumentObject"],
                              },
                            },
                          ],
                          tgFeeDTOList: [],
                        },
                      },
                    ],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IdentityTypeLookupId: 653,
                        IdentityNumber: "10405068632478525",
                      },
                    ],
                    online_TGPersonIssuedDocumentDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 491,
                        DocumentObject: documentObject,
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        ReasonForIssueLookupId: 2,
                        PersonalizedDocumentStatusLookupId: 489,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 715,
                        IssueDate: "2026-03-03T14:48:08.163",
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        PlaceOfPrinting: "ePass Online Web Portal",
                        PersonalizedDocumentStatusLookupId: 677,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                    ],
                    online_TGPersonRelationDTOList: [],
                    online_TGPersonWorkDetailDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonWorkDetailDTO, Models",
                      },
                    ],
                  },
                ],
                online_tgSystemOrganisationHoursDTOList: [],
                tgFeeDTOList: [],
              },
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
const loadFinancialInvoicePayload = (userData, documentObject) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: "Load Financial Invoice | a4ac68db-bc21-4cfc-865c-3ae20d1b0916",
        callType: 1,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_financialInvoiceDTO, Models",
              tgDTO: {
                $type: "Models.Core.online_tgApplicationDTO, Models",
                IsActive: 1,
                RecordStatus_LookupValue_Id: 728,
                CreatedDate: "2026-03-03T13:48:10.000",
                TgUserAuditDetailId: 1,
                CreatedBySystemUserId: 714526442646412,
                DataOwnerLookupId: 11,
                baseSaveAction: "STEP1_SAVE_G1",
                tgApplicationId: 418948308376353,
                EntityType: "tgPersonDTO",
                EntityId: 134989706059401,
                tgApplicationTypeId: 10,
                ApplicationStartDate: "2026-03-03T14:43:45.091",
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                Reference: "BTPP526007E7C9P",
                PriorityLookupId: 918,
                Remark:
                  "APPLICATION FOR NORMAL PASSPORT - MOGNHODE NEGEDE ALEMU",
                CollectionOfficeId: 11,
                DocumentTypeLookupId: 715,
                EnrolmentOfficeId: 11,
                EntityRequiresUpdate: 0,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    IsActive: 1,
                    RecordStatus_LookupValue_Id: 728,
                    CreatedDate: "2026-03-03T13:48:10.000",
                    TgUserAuditDetailId: 1,
                    CreatedBySystemUserId: 714526442646412,
                    DataOwnerLookupId: 11,
                    tgPersonId: 134989706059401,
                    FirstName: "MOGNHODE",
                    FirstNamesAmharic: "ሞኝሆዴ",
                    MiddleName: "NEGEDE",
                    MiddleNameAmharic: "ነገደ",
                    Surname: "ALEMU",
                    SurnameAmharic: "አለሙ",
                    Height: "178",
                    EyeColourLookupId: 430,
                    HairColourLookupId: 473,
                    GenderlookupId: 469,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: 10,
                    CityOfBirth: "GECHI",
                    BirthDate: "2000-02-28T00:00:00.000",
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: "+251_963528752",
                    EmailAddress: "MOGNHODE123@gmail.com",
                    MainRegionLookupId: 10,
                    MainCity: "BUNO BEDELE",
                    MainAddressLine1: "BUNO BEDELE, OROMIA",
                    online_TGCommunicationDTOList: [],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IsActive: 1,
                        RecordStatus_LookupValue_Id: 728,
                        CreatedDate: "2026-03-03T13:48:10.000",
                        TgUserAuditDetailId: 1,
                        CreatedBySystemUserId: 714526442646412,
                        DataOwnerLookupId: 11,
                        tgPersonIdentityId: 115787239321251,
                        tgPersonId: 134989706059401,
                        IdentityTypeLookupId: 653,
                        IdentityNumber: "10405068632478525",
                      },
                    ],
                    online_TGPersonIssuedDocumentDTOList: [
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 491,
                        DocumentObject: documentObject,
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        ReasonForIssueLookupId: 2,
                        PersonalizedDocumentStatusLookupId: 489,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                      {
                        $type:
                          "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                        DocumentTypeLookupId: 715,
                        IssueDate: "2026-03-03T14:48:08.163",
                        IssuingAuthority: "IMMIGRATION AND CITIZENSHIP SERVICE",
                        PlaceOfPrinting: "ePass Online Web Portal",
                        PersonalizedDocumentStatusLookupId: 677,
                        IssuingCountryLookupId: 73,
                        online_tgPersonIssuedDocumentCountryDTOList: [
                          {
                            $type:
                              "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models",
                          },
                        ],
                      },
                    ],
                    online_TGPersonRelationDTOList: [],
                    online_TGPersonSupportingDocumentDTOList: [],
                    online_TGPersonWorkDetailDTOList: [],
                  },
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    IsActive: 1,
                    RecordStatus_LookupValue_Id: 728,
                    CreatedDate: "2026-03-03T13:48:10.000",
                    TgUserAuditDetailId: 1,
                    CreatedBySystemUserId: 714526442646412,
                    DataOwnerLookupId: 11,
                    tgPersonId: 134989706059401,
                    FirstName: "MOGNHODE",
                    FirstNamesAmharic: "ሞኝሆዴ",
                    MiddleName: "NEGEDE",
                    MiddleNameAmharic: "ነገደ",
                    Surname: "ALEMU",
                    SurnameAmharic: "አለሙ",
                    Height: "178",
                    EyeColourLookupId: 430,
                    HairColourLookupId: 473,
                    GenderlookupId: 469,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: 10,
                    CityOfBirth: "GECHI",
                    BirthDate: "2000-02-28T00:00:00.000",
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: "+251_963528752",
                    EmailAddress: "MOGNHODE123@gmail.com",
                    MainRegionLookupId: 10,
                    MainCity: "BUNO BEDELE",
                    MainAddressLine1: "BUNO BEDELE, OROMIA",
                    online_TGCommunicationDTOList: [],
                    online_TGPersonBiometricDTOList: [],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IsActive: 1,
                        RecordStatus_LookupValue_Id: 728,
                        CreatedDate: "2026-03-03T13:48:10.000",
                        TgUserAuditDetailId: 1,
                        CreatedBySystemUserId: 714526442646412,
                        DataOwnerLookupId: 11,
                        tgPersonIdentityId: 115787239321251,
                        tgPersonId: 134989706059401,
                        IdentityTypeLookupId: 653,
                        IdentityNumber: "10405068632478525",
                      },
                    ],
                    online_TGPersonIssuedDocumentDTOList: [],
                    online_TGPersonRelationDTOList: [],
                    online_TGPersonSupportingDocumentDTOList: [],
                    online_TGPersonWorkDetailDTOList: [],
                  },
                ],
                online_tgOrganisationDTOList: [],
                online_tgSystemOrganisationHoursDTOList: [],
                online_tgApplicationPaymentDTOList: [
                  {
                    $type: "Models.Core.online_tgApplicationPaymentDTO, Models",
                    InstructionTgFinancialDocumentId: "PP26007E7C",
                    ReceiptTgFinancialDocumentId: "PP26007E7C",
                  },
                ],
                CurrentApplicationStatusName: "PAYMENT",
                tgFeeDTOList: [],
              },
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};
const addFeeToApplicationPaymentPayload = (
  entityId,
  tgApplicationId,
  reference,
) => {
  const requestId = `ADD_FEE_TO_APPLICATION_PAYMENT | ${uuidv4()}`;
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: requestId,
        callType: 2,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgApplicationPaymentDTO, Models",
              // Perfectly sliced to remove the "Z" for .NET DateTime matching
              PaymentDate: new Date().toISOString().slice(0, 23),
              AmountTendered: 20000,
              ApplicationWorkflowHistoryId: 123,
              PaymentStatusLookupId: 449,
              tgFeeId: 55,
              FeeDescription:
                "APPLICATION FEE FOR NORMAL PASSPORT (FIVE DAY SERVICE)",
              FeeAmount: 20000,
              InstructionTgFinancialDocumentId: reference,
              ReceiptTgFinancialDocumentId: reference,
              EntityType: "tgPersonDTO",
              EntityId: entityId,
              tgApplicationId: tgApplicationId,
              PaymentReceiptObject: "",
              tgApplicationTypeId: 10,
            },
          ],
        },
        version: "1.0.1.106",
      },
    ],
  };
};

const loadPaymentTypesPayload = () => ({
  $type: "Models.Core.requestPaymentOptionsDTO, Models",
  MerchantCode: 181826,
  ApplicationTypeId: 10,
});

module.exports = {
  loginPayload,
  loadTGSupportingDocumentConfigurationPayload,
  appointmentSearchPayload,
  appointmentSlotPayload,
  lockAppointmentPayload,
  loadSequencePayload,
  healthCheckPayload,
  saveApplicationPayload,
  feeRequestPayload,
  updatePaymentInstructionDocumentPayload,
  paymentOrderPortalPayload,
  addFeeToApplicationPaymentPayload,
  loadPaymentTypesPayload,
  loadFeesHash3,
  loadFinancialInvoicePayload,
};
