const { v4: uuidv4 } = require("uuid");
const { toLocalISOString } = require("./utils");
const loadTgSupportingDocs = (appStartDate) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `loadTGSupportingDocumentConfigurationDTOList | ${uuidv4()}`,
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
                ApplicationStartDate: appStartDate,
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                PriorityLookupId: 915,
                CollectionOfficeId: 0,
                DocumentTypeLookupId: 715,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    FirstName: "CHALA",
                    FirstNamesAmharic: "ጫላ",
                    MiddleName: "CHUBE",
                    MiddleNameAmharic: "ጩቤ",
                    Surname: "CHEBETE",
                    SurnameAmharic: "ጨበጠ",
                    Height: "182",
                    GenderlookupId: userData.GenderlookupId,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                    CityOfBirth: userData.CityOfBirth,
                    BirthDate: "2001-01-01T00:00:00.000",
                    MaritalStatusLookupId: userData.MaritalStatusLookupId,
                    ContactNumber: "+251_952417852",
                    EmailAddress: "garbageorg@gmail.com",
                    MainRegionLookupId: userData.MainRegionLookupId,
                    MainCity: userData.MainCity,
                    MainAddressLine1: userData.MainAddressLine1,
                    nspEthiopianBirthDate: "23/04/1993",
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
                        IdentityNumber: "322135468451289657",
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
        version: "1.0.1.108",
      },
    ],
  };
};

const lockSlot = (userData) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `portal-appointment-lock | ${uuidv4()}`,
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
              tgSystemOrganisationId: userData.officeId,
              AppointmentDate: userData.appointmentDate,
              StartTime: userData.startTime,
              EndTime: userData.endTime,
              AppointmentStatusLookupId: 372,
              tgApplicationTypeId: 10,
              tgPersonId: userData.tgPersonId,
              rescheduleCount: 0,
              nspEthiopianAppointmentDate: `${userData.lockNspEthiopianAppointmentDate} 00:00:00.000`,
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};
const fullyPopulatedSaveDTO = (userData, documentObject) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `NEW_PASSPORT_PORTAL_SAVE | ${uuidv4()}`,
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
              ApplicationStartDate: userData.applicationStartDate,
              ApplicationStatusLookupId: 365,
              AssignedSystemOrganisationId: 0,
              Reference: userData.reference,
              PriorityLookupId: userData.priorityLookupId,
              Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
              CollectionOfficeId: userData.officeId,
              DocumentTypeLookupId: 715,
              EnrolmentOfficeId: userData.officeId,
              EntityRequiresUpdate: 0,
              online_tgPersonDTOList: [
                {
                  $type: "Models.Core.online_tgPersonDTO, Models",
                  FirstName: userData.FirstName,
                  FirstNamesAmharic: userData.FirstNamesAmharic,
                  MiddleName: userData.MiddleName,
                  MiddleNameAmharic: userData.MiddleNameAmharic,
                  Surname: userData.Surname,
                  SurnameAmharic: userData.SurnameAmharic,
                  Height: userData.Height,
                  GenderlookupId: userData.GenderlookupId,
                  NationalityLookupId: 538,
                  PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                  CityOfBirth: userData.CityOfBirth,
                  BirthDate: userData.BirthDate,
                  MaritalStatusLookupId: userData.MaritalStatusLookupId,
                  PersonStatusLookupId: 672,
                  ContactNumber: userData.ContactNumber,
                  EmailAddress: userData.EmailAddress,
                  MainRegionLookupId: userData.MainRegionLookupId,
                  MainCity: userData.MainCity,
                  MainAddressLine1: userData.MainAddressLine1,
                  nspEthiopianBirthDate: userData.nspEthiopianBirthDate,
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
                      RecipientAddress: userData.EmailAddress,
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: {
                        $type: "Models.Core.online_tgApplicationDTO, Models",
                        tgApplicationTypeId: 10,
                        ApplicationStartDate: userData.applicationStartDate,
                        ApplicationStatusLookupId: 365,
                        AssignedSystemOrganisationId: 0,
                        Reference: userData.reference,
                        PriorityLookupId: userData.priorityLookupId,
                        Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                        CollectionOfficeId: userData.officeId,
                        DocumentTypeLookupId: 715,
                        EnrolmentOfficeId: userData.officeId,
                        EntityRequiresUpdate: 0,
                        online_tgPersonDTOList: [
                          {
                            $type: "Models.Core.online_tgPersonDTO, Models",
                            FirstName: userData.FirstName,
                            FirstNamesAmharic: userData.FirstNamesAmharic,
                            MiddleName: userData.MiddleName,
                            MiddleNameAmharic: userData.MiddleNameAmharic,
                            Surname: userData.Surname,
                            SurnameAmharic: userData.SurnameAmharic,
                            Height: userData.Height,
                            GenderlookupId: userData.GenderlookupId,
                            NationalityLookupId: 538,
                            PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                            CityOfBirth: userData.CityOfBirth,
                            BirthDate: userData.BirthDate,
                            MaritalStatusLookupId:
                              userData.MaritalStatusLookupId,
                            PersonStatusLookupId: 672,
                            ContactNumber: userData.ContactNumber,
                            EmailAddress: userData.EmailAddress,
                            MainRegionLookupId: userData.MainRegionLookupId,
                            MainCity: userData.MainCity,
                            MainAddressLine1: userData.MainAddressLine1,
                            nspEthiopianBirthDate:
                              userData.nspEthiopianBirthDate,
                            online_tgPersonIdentityDTOList: [
                              {
                                $type:
                                  "Models.Core.online_tgPersonIdentityDTO, Models",
                                IdentityTypeLookupId: 653,
                                IdentityNumber: userData.birthCertificateId,
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
                            tgApplicationAppointmentId:
                              userData.tgApplicationAppId,
                            tgSystemOrganisationId: userData.officeId,
                            AppointmentDate: userData.appointmentDate,
                            StartTime: userData.startTime,
                            EndTime: userData.endTime,
                            AppointmentStatusLookupId: 372,
                            tgApplicationTypeId: 10,
                            tgPersonId: userData.tgPersonId,
                            rescheduleCount: 0,
                            nspEthiopianAppointmentDate:
                              userData.nspEthiopianAppointmentDate,
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
                      RecipientAddress: userData.EmailAddress,
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: {
                        $type: "Models.Core.online_tgApplicationDTO, Models",
                        tgApplicationTypeId: 10,
                        ApplicationStartDate: userData.applicationStartDate,
                        ApplicationStatusLookupId: 365,
                        AssignedSystemOrganisationId: 0,
                        Reference: userData.reference,
                        PriorityLookupId: userData.priorityLookupId,
                        Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                        CollectionOfficeId: userData.officeId,
                        DocumentTypeLookupId: 715,
                        EnrolmentOfficeId: userData.officeId,
                        EntityRequiresUpdate: 0,
                        online_tgPersonDTOList: [
                          {
                            $type: "Models.Core.online_tgPersonDTO, Models",
                            FirstName: userData.FirstName,
                            FirstNamesAmharic: userData.FirstNamesAmharic,
                            MiddleName: userData.MiddleName,
                            MiddleNameAmharic: userData.MiddleNameAmharic,
                            Surname: userData.Surname,
                            SurnameAmharic: userData.SurnameAmharic,
                            Height: userData.Height,
                            GenderlookupId: userData.GenderlookupId,
                            NationalityLookupId: 538,
                            PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                            CityOfBirth: userData.CityOfBirth,
                            BirthDate: userData.BirthDate,
                            MaritalStatusLookupId:
                              userData.MaritalStatusLookupId,
                            PersonStatusLookupId: 672,
                            ContactNumber: userData.ContactNumber,
                            EmailAddress: userData.EmailAddress,
                            MainRegionLookupId: userData.MainRegionLookupId,
                            MainCity: userData.MainCity,
                            MainAddressLine1: userData.MainAddressLine1,
                            nspEthiopianBirthDate:
                              userData.nspEthiopianBirthDate,
                            online_tgPersonIdentityDTOList: [
                              {
                                $type:
                                  "Models.Core.online_tgPersonIdentityDTO, Models",
                                IdentityTypeLookupId: 653,
                                IdentityNumber: userData.birthCertificateId,
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
                            tgApplicationAppointmentId:
                              userData.tgApplicationAppId,
                            tgSystemOrganisationId: userData.officeId,
                            AppointmentDate: userData.appointmentDate,
                            StartTime: userData.startTime,
                            EndTime: userData.endTime,
                            AppointmentStatusLookupId: 372,
                            tgApplicationTypeId: 10,
                            tgPersonId: userData.tgPersonId,
                            rescheduleCount: 0,
                            nspEthiopianAppointmentDate:
                              userData.nspEthiopianAppointmentDate,
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
                      RecipientAddress: userData.ContactNumber.replace("_", ""),
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: {
                        $type: "Models.Core.online_tgApplicationDTO, Models",
                        tgApplicationTypeId: 10,
                        ApplicationStartDate: userData.applicationStartDate,
                        ApplicationStatusLookupId: 365,
                        AssignedSystemOrganisationId: 0,
                        Reference: userData.reference,
                        PriorityLookupId: userData.priorityLookupId,
                        Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                        CollectionOfficeId: userData.officeId,
                        DocumentTypeLookupId: 715,
                        EnrolmentOfficeId: userData.officeId,
                        EntityRequiresUpdate: 0,
                        online_tgPersonDTOList: [
                          {
                            $type: "Models.Core.online_tgPersonDTO, Models",
                            FirstName: userData.FirstName,
                            FirstNamesAmharic: userData.FirstNamesAmharic,
                            MiddleName: userData.MiddleName,
                            MiddleNameAmharic: userData.MiddleNameAmharic,
                            Surname: userData.Surname,
                            SurnameAmharic: userData.SurnameAmharic,
                            Height: userData.Height,
                            GenderlookupId: userData.GenderlookupId,
                            NationalityLookupId: 538,
                            PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                            CityOfBirth: userData.CityOfBirth,
                            BirthDate: userData.BirthDate,
                            MaritalStatusLookupId:
                              userData.MaritalStatusLookupId,
                            PersonStatusLookupId: 672,
                            ContactNumber: userData.ContactNumber,
                            EmailAddress: userData.EmailAddress,
                            MainRegionLookupId: userData.MainRegionLookupId,
                            MainCity: userData.MainCity,
                            MainAddressLine1: userData.MainAddressLine1,
                            nspEthiopianBirthDate:
                              userData.nspEthiopianBirthDate,
                            online_tgPersonIdentityDTOList: [
                              {
                                $type:
                                  "Models.Core.online_tgPersonIdentityDTO, Models",
                                IdentityTypeLookupId: 653,
                                IdentityNumber: userData.birthCertificateId,
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
                            tgApplicationAppointmentId:
                              userData.tgApplicationAppId,
                            tgSystemOrganisationId: userData.officeId,
                            AppointmentDate: userData.appointmentDate,
                            StartTime: userData.startTime,
                            EndTime: userData.endTime,
                            AppointmentStatusLookupId: 372,
                            tgApplicationTypeId: 10,
                            tgPersonId: userData.tgPersonId,
                            rescheduleCount: 0,
                            nspEthiopianAppointmentDate:
                              userData.nspEthiopianAppointmentDate,
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
                      RecipientAddress: userData.ContactNumber.replace("_", ""),
                      SenderEntity: "tgPersonDTO",
                      CommunicationStatusLookupId: 395,
                      tgDTO: {
                        $type: "Models.Core.online_tgApplicationDTO, Models",
                        tgApplicationTypeId: 10,
                        ApplicationStartDate: userData.applicationStartDate,
                        ApplicationStatusLookupId: 365,
                        AssignedSystemOrganisationId: 0,
                        Reference: userData.reference,
                        PriorityLookupId: userData.priorityLookupId,
                        Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                        CollectionOfficeId: userData.officeId,
                        DocumentTypeLookupId: 715,
                        EnrolmentOfficeId: userData.officeId,
                        EntityRequiresUpdate: 0,
                        online_tgPersonDTOList: [
                          {
                            $type: "Models.Core.online_tgPersonDTO, Models",
                            FirstName: userData.FirstName,
                            FirstNamesAmharic: userData.FirstNamesAmharic,
                            MiddleName: userData.MiddleName,
                            MiddleNameAmharic: userData.MiddleNameAmharic,
                            Surname: userData.Surname,
                            SurnameAmharic: userData.SurnameAmharic,
                            Height: userData.Height,
                            GenderlookupId: userData.GenderlookupId,
                            NationalityLookupId: 538,
                            PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                            CityOfBirth: userData.CityOfBirth,
                            BirthDate: userData.BirthDate,
                            MaritalStatusLookupId:
                              userData.MaritalStatusLookupId,
                            PersonStatusLookupId: 672,
                            ContactNumber: userData.ContactNumber,
                            EmailAddress: userData.EmailAddress,
                            MainRegionLookupId: userData.MainRegionLookupId,
                            MainCity: userData.MainCity,
                            MainAddressLine1: userData.MainAddressLine1,
                            nspEthiopianBirthDate:
                              userData.nspEthiopianBirthDate,
                            online_tgPersonIdentityDTOList: [
                              {
                                $type:
                                  "Models.Core.online_tgPersonIdentityDTO, Models",
                                IdentityTypeLookupId: 653,
                                IdentityNumber: userData.birthCertificateId,
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
                            tgApplicationAppointmentId:
                              userData.tgApplicationAppId,
                            tgSystemOrganisationId: userData.officeId,
                            AppointmentDate: userData.appointmentDate,
                            StartTime: userData.startTime,
                            EndTime: userData.endTime,
                            AppointmentStatusLookupId: 372,
                            tgApplicationTypeId: 10,
                            tgPersonId: userData.tgPersonId,
                            rescheduleCount: 0,
                            nspEthiopianAppointmentDate:
                              userData.nspEthiopianAppointmentDate,
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
                      IdentityNumber: userData.birthCertificateId,
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
                      IssueDate: toLocalISOString(new Date()),
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
                  CreatedDate: userData.lockedCreatedDate,
                  TgUserAuditDetailId: 1,
                  CreatedBySystemUserId: 1,
                  DataOwnerLookupId: 1,
                  baseSaveAction: "LOCKING",
                  tgApplicationAppointmentId: userData.tgApplicationAppId,
                  tgSystemOrganisationId: userData.officeId,
                  AppointmentDate: userData.appointmentDate,
                  StartTime: userData.startTime,
                  EndTime: userData.endTime,
                  AppointmentStatusLookupId: 372,
                  tgApplicationTypeId: 10,
                  tgPersonId: userData.tgPersonId,
                  rescheduleCount: 0,
                  nspEthiopianAppointmentDate:
                    userData.nspEthiopianAppointmentDate,
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
        version: "1.0.1.108",
      },
    ],
  };
};

const addFeeToApplicationPayment = (userData) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `ADD_FEE_TO_APPLICATION_PAYMENT | ${uuidv4()}`,
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
              PaymentDate: toLocalISOString(new Date()),
              AmountTendered: 5000,
              ApplicationWorkflowHistoryId: 123,
              PaymentStatusLookupId: 449,
              tgFeeId: 53,
              FeeDescription:
                "APPLICATION FEE FOR NORMAL PASSPORT (NORMAL SERVICE)",
              FeeAmount: 5000,
              InstructionTgFinancialDocumentId: userData.shortenedReference,
              ReceiptTgFinancialDocumentId: userData.shortenedReference,
              EntityType: "tgPersonDTO",
              EntityId: userData.tgPersonIdNew,
              tgApplicationId: userData.tgApplicationId,
              PaymentReceiptObject: "",
              tgApplicationTypeId: 10,
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};
const updatePaymentInstructionDocument = (userData, documentObject) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `UPDATE_PAYMENT_INSTRUCTION_DOCUMENT | ${uuidv4()}`,
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
              DocumentNumber: userData.reference,
              DocumentTypeLookupId: 492,
              DocumentStatusLookupId: 449,
              DocumentObject: documentObject,
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};
const updateSupportingDocsGOV = (userData, governmentId) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `UPDATE_SUPPORTING_DOCUMENT | ${uuidv4()}`,
        callType: 2,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgPersonSupportingDocumentDTO, Models",
              CreatedDate: toLocalISOString(new Date()),
              tgPersonId: userData.tgPersonId,
              DocumentTypeLookupId: 829,
              DocumentStatusLookupId: 775,
              DocumentCategoryLookupId: 401,
              DocumentObject: governmentId,
              tgApplicationId: userData.tgApplicationId,
              nspIsMandatory: 1,
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};
const updateSupportingocsBirthCert = (userData) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `UPDATE_SUPPORTING_DOCUMENT | ${uuidv4()}`,
        callType: 2,
        priority: false,
        project: 1,
        responseRequired: true,
        b2bDTOlist: {
          $type:
            "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
          $values: [
            {
              $type: "Models.Core.online_tgPersonSupportingDocumentDTO, Models",
              CreatedDate: toLocalISOString(new Date()),
              tgPersonId: userData.tgPersonIdNew,
              DocumentTypeLookupId: 813,
              DocumentStatusLookupId: 775,
              DocumentCategoryLookupId: 401,
              DocumentObject: userData.birthCertificateBase64,
              tgApplicationId: userData.tgApplicationId,
              nspIsMandatory: 1,
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};
const orderPortalPayment = (userData) => {
  return {
    $type:
      "System.Collections.Generic.List`1[[Models.RequestDTO, Models]], System.Private.CoreLib",
    $values: [
      {
        $type: "Models.RequestDTO, Models",
        id: `payment-order-portal | ${uuidv4()}`,
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
              FirstName: userData.FirstName,
              LastName: userData.Surname,
              Email: userData.EmailAddress,
              Phone: userData.ContactNumber.replace("_", " "),
              Amount: 5000,
              Currency: "ETB",
              Country: "ETH",
              PaymentTypeId: 1,
              CustomOrderCode: userData.tgApplicationId,
              MerchantCode: "181826",
              isExpiryFromMerchant: false,
              ExpiryTimeStamp: 0,
              tgApplicationTypeName: "NEW_PASSPORT",
              OrderId: userData.reference,
              PaymentStatusLookupId: 449,
              InstructiontgFinancialDocumentId: 1,
              paymentPlatform: 0,
              FinancialInvoiceDTOList: [
                {
                  $type: "Models.Core.financialInvoiceDTO, Models",
                  tgFeeDTOList: [
                    {
                      $type: "Models.Core.tgFeeDTO, Models",
                      tgFeeId: 53,
                    },
                  ],
                },
              ],
              ApplicationTypeId: 10,
            },
          ],
        },
        version: "1.0.1.108",
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
                ApplicationStartDate: userData.applicationStartDate,
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                Reference: userData.reference,
                PriorityLookupId: userData.priorityLookupId,
                Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                CollectionOfficeId: userData.officeId,
                DocumentTypeLookupId: 715,
                EnrolmentOfficeId: userData.officeId,
                EntityRequiresUpdate: 0,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    FirstName: userData.FirstName,
                    FirstNamesAmharic: userData.FirstNamesAmharic,
                    MiddleName: userData.MiddleName,
                    MiddleNameAmharic: userData.MiddleNameAmharic,
                    Surname: userData.Surname,
                    SurnameAmharic: userData.SurnameAmharic,
                    Height: userData.Height,
                    GenderlookupId: userData.GenderlookupId,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                    CityOfBirth: userData.CityOfBirth,
                    BirthDate: userData.BirthDate,
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: userData.ContactNumber,
                    EmailAddress: userData.EmailAddress,
                    MainRegionLookupId: userData.MainRegionLookupId,
                    MainCity: userData.MainCity,
                    MainAddressLine1: userData.MainAddressLine1,
                    nspEthiopianBirthDate: userData.nspEthiopianBirthDate,
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
                        RecipientAddress: userData.EmailAddress,
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: userData.applicationStartDate,
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: userData.reference,
                          PriorityLookupId: userData.priorityLookupId,
                          Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                          CollectionOfficeId: userData.officeId,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: userData.officeId,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: userData.FirstName,
                              FirstNamesAmharic: userData.FirstNamesAmharic,
                              MiddleName: userData.MiddleName,
                              MiddleNameAmharic: userData.MiddleNameAmharic,
                              Surname: userData.Surname,
                              SurnameAmharic: userData.SurnameAmharic,
                              Height: userData.Height,

                              GenderlookupId: userData.GenderlookupId,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId:
                                userData.PlaceOfBirthLookupId,
                              CityOfBirth: userData.CityOfBirth,
                              BirthDate: userData.BirthDate,
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: userData.ContactNumber,
                              EmailAddress: userData.EmailAddress,
                              MainRegionLookupId: userData.MainRegionLookupId,
                              MainCity: userData.MainCity,
                              MainAddressLine1: userData.MainAddressLine1,
                              nspEthiopianBirthDate:
                                userData.nspEthiopianBirthDate,
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: userData.birthCertificateId,
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
                              tgApplicationAppointmentId:
                                userData.tgApplicationAppId,
                              tgSystemOrganisationId: userData.officeId,
                              AppointmentDate: userData.appointmentDate,
                              StartTime: userData.startTime,
                              EndTime: userData.endTime,
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: userData.tgPersonId,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate:
                                userData.nspEthiopianAppointmentDate,
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
                        RecipientAddress: userData.EmailAddress,
                        SenderEntity: "tgPersonDTO",
                        CommunicationStatusLookupId: 395,
                        tgDTO: {
                          $type: "Models.Core.online_tgApplicationDTO, Models",
                          tgApplicationTypeId: 10,
                          ApplicationStartDate: userData.applicationStartDate,
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: userData.reference,
                          PriorityLookupId: userData.priorityLookupId,
                          Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                          CollectionOfficeId: userData.officeId,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: userData.officeId,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: userData.FirstName,
                              FirstNamesAmharic: userData.FirstNamesAmharic,
                              MiddleName: userData.MiddleName,
                              MiddleNameAmharic: userData.MiddleNameAmharic,
                              Surname: userData.Surname,
                              SurnameAmharic: userData.SurnameAmharic,
                              Height: userData.Height,

                              GenderlookupId: userData.GenderlookupId,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId:
                                userData.PlaceOfBirthLookupId,
                              CityOfBirth: userData.CityOfBirth,
                              BirthDate: userData.BirthDate,
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: userData.ContactNumber,
                              EmailAddress: userData.EmailAddress,
                              MainRegionLookupId: userData.MainRegionLookupId,
                              MainCity: userData.MainCity,
                              MainAddressLine1: userData.MainAddressLine1,
                              nspEthiopianBirthDate:
                                userData.nspEthiopianBirthDate,
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: userData.birthCertificateId,
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
                              tgApplicationAppointmentId:
                                userData.tgApplicationAppId,
                              tgSystemOrganisationId: userData.officeId,
                              AppointmentDate: userData.appointmentDate,
                              StartTime: userData.startTime,
                              EndTime: userData.endTime,
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: userData.tgPersonId,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate:
                                userData.nspEthiopianAppointmentDate,
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
                          ApplicationStartDate: userData.applicationStartDate,
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: userData.reference,
                          PriorityLookupId: userData.priorityLookupId,
                          Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                          CollectionOfficeId: userData.officeId,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: userData.officeId,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: userData.FirstName,
                              FirstNamesAmharic: userData.FirstNamesAmharic,
                              MiddleName: userData.MiddleName,
                              MiddleNameAmharic: userData.MiddleNameAmharic,
                              Surname: userData.Surname,
                              SurnameAmharic: userData.SurnameAmharic,
                              Height: userData.Height,

                              GenderlookupId: userData.GenderlookupId,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId:
                                userData.PlaceOfBirthLookupId,
                              CityOfBirth: userData.CityOfBirth,
                              BirthDate: userData.BirthDate,
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: userData.ContactNumber,
                              EmailAddress: userData.EmailAddress,
                              MainRegionLookupId: userData.MainRegionLookupId,
                              MainCity: userData.MainCity,
                              MainAddressLine1: userData.MainAddressLine1,
                              nspEthiopianBirthDate:
                                userData.nspEthiopianBirthDate,
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: userData.birthCertificateId,
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
                              tgApplicationAppointmentId:
                                userData.tgApplicationAppId,
                              tgSystemOrganisationId: userData.officeId,
                              AppointmentDate: userData.appointmentDate,
                              StartTime: userData.startTime,
                              EndTime: userData.endTime,
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: userData.tgPersonId,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate:
                                userData.nspEthiopianAppointmentDate,
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
                          ApplicationStartDate: userData.applicationStartDate,
                          ApplicationStatusLookupId: 365,
                          AssignedSystemOrganisationId: 0,
                          Reference: userData.reference,
                          PriorityLookupId: userData.priorityLookupId,
                          Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                          CollectionOfficeId: userData.officeId,
                          DocumentTypeLookupId: 715,
                          EnrolmentOfficeId: userData.officeId,
                          EntityRequiresUpdate: 0,
                          online_tgPersonDTOList: [
                            {
                              $type: "Models.Core.online_tgPersonDTO, Models",
                              FirstName: userData.FirstName,
                              FirstNamesAmharic: userData.FirstNamesAmharic,
                              MiddleName: userData.MiddleName,
                              MiddleNameAmharic: userData.MiddleNameAmharic,
                              Surname: userData.Surname,
                              SurnameAmharic: userData.SurnameAmharic,
                              Height: userData.Height,

                              GenderlookupId: userData.GenderlookupId,
                              NationalityLookupId: 538,
                              PlaceOfBirthLookupId:
                                userData.PlaceOfBirthLookupId,
                              CityOfBirth: userData.CityOfBirth,
                              BirthDate: userData.BirthDate,
                              MaritalStatusLookupId: 498,
                              PersonStatusLookupId: 672,
                              ContactNumber: userData.ContactNumber,
                              EmailAddress: userData.EmailAddress,
                              MainRegionLookupId: userData.MainRegionLookupId,
                              MainCity: userData.MainCity,
                              MainAddressLine1: userData.MainAddressLine1,
                              nspEthiopianBirthDate:
                                userData.nspEthiopianBirthDate,
                              online_tgPersonIdentityDTOList: [
                                {
                                  $type:
                                    "Models.Core.online_tgPersonIdentityDTO, Models",
                                  IdentityTypeLookupId: 653,
                                  IdentityNumber: userData.birthCertificateId,
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
                              tgApplicationAppointmentId:
                                userData.tgApplicationAppId,
                              tgSystemOrganisationId: userData.officeId,
                              AppointmentDate: userData.appointmentDate,
                              StartTime: userData.startTime,
                              EndTime: userData.endTime,
                              AppointmentStatusLookupId: 372,
                              tgApplicationTypeId: 10,
                              tgPersonId: userData.tgPersonId,
                              rescheduleCount: 0,
                              nspEthiopianAppointmentDate:
                                userData.nspEthiopianAppointmentDate,
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
                        IdentityNumber: userData.birthCertificateId,
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
                        IssueDate: toLocalISOString(new Date()),
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
        version: "1.0.1.108",
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
        id: `Load Financial Invoice | ${uuidv4()}`,
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
                CreatedDate: toLocalISOString(new Date()),
                TgUserAuditDetailId: 1,
                CreatedBySystemUserId: userData.createdBySystemUserId,
                DataOwnerLookupId: userData.officeId,
                baseSaveAction: "STEP1_SAVE_G1",
                tgApplicationId: userData.tgApplicationId,
                EntityType: "tgPersonDTO",
                EntityId: userData.tgPersonIdNew,
                tgApplicationTypeId: 10,
                ApplicationStartDate: userData.applicationStartDate,
                ApplicationStatusLookupId: 365,
                AssignedSystemOrganisationId: 0,
                Reference: userData.reference,
                PriorityLookupId: userData.priorityLookupId,
                Remark: `APPLICATION FOR NORMAL PASSPORT - ${userData.FirstName} ${userData.MiddleName} ${userData.Surname}`,
                CollectionOfficeId: userData.officeId,
                DocumentTypeLookupId: 715,
                EnrolmentOfficeId: userData.officeId,
                EntityRequiresUpdate: 0,
                online_tgPersonDTOList: [
                  {
                    $type: "Models.Core.online_tgPersonDTO, Models",
                    IsActive: 1,
                    RecordStatus_LookupValue_Id: 728,
                    CreatedDate: toLocalISOString(new Date()),
                    TgUserAuditDetailId: 1,
                    CreatedBySystemUserId: userData.createdBySystemUserId,
                    DataOwnerLookupId: userData.officeId,
                    tgPersonId: userData.tgPersonIdNew,
                    FirstName: userData.FirstName,
                    FirstNamesAmharic: userData.FirstNamesAmharic,
                    MiddleName: userData.MiddleName,
                    MiddleNameAmharic: userData.MiddleNameAmharic,
                    Surname: userData.Surname,
                    SurnameAmharic: userData.SurnameAmharic,
                    Height: userData.Height,
                    GenderlookupId: userData.GenderlookupId,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                    CityOfBirth: userData.CityOfBirth,
                    BirthDate: userData.BirthDate,
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: userData.ContactNumber,
                    EmailAddress: userData.EmailAddress,
                    MainRegionLookupId: userData.MainRegionLookupId,
                    MainCity: userData.MainCity,
                    MainAddressLine1: userData.MainAddressLine1,
                    online_TGCommunicationDTOList: [],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IsActive: 1,
                        RecordStatus_LookupValue_Id: 728,
                        CreatedDate: toLocalISOString(new Date()),
                        TgUserAuditDetailId: 1,
                        CreatedBySystemUserId: userData.createdBySystemUserId,
                        DataOwnerLookupId: userData.officeId,
                        tgPersonIdentityId: userData.tgPersonIdentityId,
                        tgPersonId: userData.tgPersonIdNew,
                        IdentityTypeLookupId: 653,
                        IdentityNumber: userData.birthCertificateId,
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
                        IssueDate: toLocalISOString(new Date()),
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
                    CreatedDate: toLocalISOString(new Date()),
                    TgUserAuditDetailId: 1,
                    CreatedBySystemUserId: userData.createdBySystemUserId,
                    DataOwnerLookupId: userData.officeId,
                    tgPersonId: userData.tgPersonIdNew,
                    FirstName: userData.FirstName,
                    FirstNamesAmharic: userData.FirstNamesAmharic,
                    MiddleName: userData.MiddleName,
                    MiddleNameAmharic: userData.MiddleNameAmharic,
                    Surname: userData.Surname,
                    SurnameAmharic: userData.SurnameAmharic,
                    Height: userData.Height,
                    GenderlookupId: userData.GenderlookupId,
                    NationalityLookupId: 538,
                    PlaceOfBirthLookupId: userData.PlaceOfBirthLookupId,
                    CityOfBirth: userData.CityOfBirth,
                    BirthDate: userData.BirthDate,
                    MaritalStatusLookupId: 498,
                    PersonStatusLookupId: 672,
                    ContactNumber: userData.ContactNumber,
                    EmailAddress: userData.EmailAddress,
                    MainRegionLookupId: userData.MainRegionLookupId,
                    MainCity: userData.MainCity,
                    MainAddressLine1: userData.MainAddressLine1,
                    online_TGCommunicationDTOList: [],
                    online_TGPersonBiometricDTOList: [],
                    online_tgPersonIdentityDTOList: [
                      {
                        $type: "Models.Core.online_tgPersonIdentityDTO, Models",
                        IsActive: 1,
                        RecordStatus_LookupValue_Id: 728,
                        CreatedDate: toLocalISOString(new Date()),
                        TgUserAuditDetailId: 1,
                        CreatedBySystemUserId: userData.createdBySystemUserId,
                        DataOwnerLookupId: userData.officeId,
                        tgPersonIdentityId: userData.tgPersonIdentityId,
                        tgPersonId: userData.tgPersonIdNew,
                        IdentityTypeLookupId: 653,
                        IdentityNumber: userData.birthCertificateId,
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
                    InstructionTgFinancialDocumentId:
                      userData.shortenedReference,
                    ReceiptTgFinancialDocumentId: userData.shortenedReference,
                  },
                ],
                CurrentApplicationStatusName: "PAYMENT",
                tgFeeDTOList: [],
              },
            },
          ],
        },
        version: "1.0.1.108",
      },
    ],
  };
};

module.exports = {
  loadTgSupportingDocs,
  lockSlot,
  fullyPopulatedSaveDTO,
  addFeeToApplicationPayment,
  updatePaymentInstructionDocument,
  updateSupportingDocsGOV,
  updateSupportingocsBirthCert,
  orderPortalPayment,
  loadFinancialInvoicePayload,
  loadFeesHash3,
};
