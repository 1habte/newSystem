export const objOfB = {
    "appB":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
      "BaseSearchOptions": {
        "$type": "Models.SearchCriteria, Models",
        "Between": {
          "$type": "System.Collections.Generic.Dictionary`2[[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib]], System.Private.CoreLib",
          "AppointmentDate": "'2026-01-14 00:00:00','2026-01-14 23:59:59'"
        }
      },
      "tgSystemOrganisationId": 11,
      "StartTime": "1:00 PM",
      "EndTime": "02:00 PM",
      "tgApplicationTypeId": 10
    }
  ]
},
"loginB2b":{
  "$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values":[
    {"$type":"Models.Core.tgSystemUserLoginPortalDTO, Models","BaseInternalReference":"PRE_LOGIN_DATA_INITIALIZATION","Username":"JojoeB","ValidationPar":"HAB@bil$guy2209te" 
    }
  ]
},
"supdocB2b":{
  "$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values":[
    {"$type":"Models.Core.online_tgSupportingDocumentConditionConfigurationDTO, Models","tgDTO":{"$type":"Models.Core.online_tgApplicationDTO, Models","IsActive":1,"baseSaveAction":"STEP1_SAVE_G2","tgApplicationTypeId":10,"ApplicationStartDate":"2026-02-08T12:48:41.053","ApplicationStatusLookupId":365,"AssignedSystemOrganisationId":0,"PriorityLookupId":918,"CollectionOfficeId":0,"DocumentTypeLookupId":715,"online_tgPersonDTOList":[{"$type":"Models.Core.online_tgPersonDTO, Models","FirstName":"ABEBE","FirstNamesAmharic":"አበበ","MiddleName":"KEBEDE","MiddleNameAmharic":"ከበደ","Surname":"LEMUA","SurnameAmharic":"አለሙ","EyeColourLookupId":430,"HairColourLookupId":473,"GenderlookupId":469,"NationalityLookupId":538,"PlaceOfBirthLookupId":3,"CityOfBirth":"WOLDIA","BirthDate":"2001-02-08T12:52:16.367","MaritalStatusLookupId":498,"ContactNumber":"+251_914352657","MainRegionLookupId":3,"MainCity":"KOMBOLCHA","MainAddressLine1":"KEBELE 3","nspEthiopianBirthDate":"01/06/1993","online_TGPersonBiometricDTOList":[{"$type":"Models.Core.online_tgPersonBiometricDTO, Models","online_tgPersonBiometricFailureDTOList":[{"$type":"Models.Core.online_tgPersonBiometricFailureDTO, Models"}]}],"online_tgPersonIdentityDTOList":[{"$type":"Models.Core.online_tgPersonIdentityDTO, Models","IdentityTypeLookupId":653,"IdentityNumber":"55555555555555555"},{"$type":"Models.Core.online_tgPersonIdentityDTO, Models","IdentityTypeLookupId":653,"CountryOfIssueLookupId":73,"IdentityDocumentStatusLookupId":483}],"online_TGPersonIssuedDocumentDTOList":[{"$type":"Models.Core.online_tgPersonIssuedDocumentDTO, Models","DocumentTypeLookupId":491,"IssuingAuthority":"IMMIGRATION AND CITIZENSHIP SERVICE","ReasonForIssueLookupId":2,"PersonalizedDocumentStatusLookupId":489,"IssuingCountryLookupId":73,"online_tgPersonIssuedDocumentCountryDTOList":[{"$type":"Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"}]},{"$type":"Models.Core.online_tgPersonIssuedDocumentDTO, Models","DocumentTypeLookupId":715,"IssuingAuthority":"IMMIGRATION AND CITIZENSHIP SERVICE","PersonalizedDocumentStatusLookupId":677,"IssuingCountryLookupId":73,"online_tgPersonIssuedDocumentCountryDTOList":[{"$type":"Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"}]}],"online_TGPersonRelationDTOList":[{"$type":"Models.Core.online_tgPersonRelationDTO, Models","nspMarriageDate":"","nspCanRemove":"false"}],"online_TGPersonSupportingDocumentDTOList":[],"online_TGPersonWorkDetailDTOList":[{"$type":"Models.Core.online_tgPersonWorkDetailDTO, Models"}]}],"online_tgApplicationAppointmentDTOList":[{"$type":"Models.Core.online_tgApplicationAppointmentDTO, Models"}],"online_tgApplicationPageNotesDTOList":[{"$type":"Models.Core.online_tgApplicationPageNotesDTO, Models"}],"online_tgApplicationStatusRemarkDTOList":[{"$type":"Models.Core.online_tgApplicationStatusRemarkDTO, Models"}],"online_tgApplicationFeeDTOList":[{"$type":"Models.Core.online_tgApplicationFeeDTO, Models"}],"online_tgSystemOrganisationDTOList":[{"$type":"Models.Core.online_tgSystemOrganisationDTO, Models"}],"online_tgSystemOrganisationHoursDTOList":[],"online_tgApplicationPaymentDTOList":[{"$type":"Models.Core.online_tgApplicationPaymentDTO, Models"}],"tgFeeDTOList":[]}}
  ]
},
"portallockB2b":{
  "$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values":[
    {"$type":"Models.Core.online_tgApplicationAppointmentDTO, Models",
      "baseSaveAction":"LOCKING",
      "tgSystemOrganisationId":11,
      "AppointmentDate":"2026-02-12T12:54:25.122",
      "StartTime":"12:00 PM",
      "EndTime":"01:00 PM",
      "AppointmentStatusLookupId":372,
      "tgApplicationTypeId":10,
      "tgPersonId":652987543638297,
      "rescheduleCount":0,
      "nspEthiopianAppointmentDate":"2018-04-03 00:00:00.000"}]},
"loadsequenceB2b":{"$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib","$values":[{"$type":"Models.Core.online_tgSequenceDTO, Models","SequenceName":"APPLICATION_BARCODE","Increment":1,"EntityType":"TGSystemOrganisation","EntityId":11}]},
"passportsaveB2b":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_tgApplicationDTO, Models",
      "IsActive": 1,
      "DataOwnerLookupId": 0,
      "baseSaveAction": "STEP1_SAVE_G1",
      "tgApplicationTypeId": 10,
      "ApplicationStartDate": "2026-02-08T12:48:41.053",
      "ApplicationStatusLookupId": 365,
      "AssignedSystemOrganisationId": 0,
      "Reference": "AAPP4260B9F0B2P",
     // "PriorityLookupId": 918,
      "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
      "CollectionOfficeId": 11,
      "DocumentTypeLookupId": 715,
      "EnrolmentOfficeId": 11,
      "EntityRequiresUpdate": 0,
      "online_tgPersonDTOList": [
        {
          "$type": "Models.Core.online_tgPersonDTO, Models",
          "FirstName": "ABEBE",
          "FirstNamesAmharic": "አበበ",
          "MiddleName": "KEBEDE",
          "MiddleNameAmharic": "ከበደ",
          "Surname": "LEMUA",
          "SurnameAmharic": "አለሙ",
          "EyeColourLookupId": 430,
          "HairColourLookupId": 473,
          "GenderlookupId": 469,
          "NationalityLookupId": 538,
          "PlaceOfBirthLookupId": 3,
          "CityOfBirth": "WOLDIA",
          "BirthDate": "2001-02-08T12:52:16.367",
          "MaritalStatusLookupId": 498,
          "PersonStatusLookupId": 672,
          "ContactNumber": "+251_914352657",
          "MainRegionLookupId": 3,
          "MainCity": "KOMBOLCHA",
          "MainAddressLine1": "KEBELE 3",
          "nspEthiopianBirthDate": "01/06/1993",
          "online_TGCommunicationDTOList": [
            {
              "$type": "Models.Core.online_tgCommunicationDTO, Models",
              "tgCommunicationTemplateId": 8,
              "tgCommunicationTriggerId": 2,
              "Subject": "Application for: [@@TRANSACTION_TYPE]",
              "Medium": "SMS",
              "CommunicationText": "[@@FULL_NAMES]፣ ማመልከቻዎ ለኢሚግሬሽንና የዜግነት አገልግሎት ደርሷል፡፡ የማመልከቻዎ ባር ኮድ እንደሚከተለዉ ነው፡- [@@APPLICATION_BARCODE] እባክዎ ሂደቱ እንዳይሰረዝ ክፍያዎን በ 3 ሰአታት ውስጥ ያጠናቅቁ።",
              "RecipientEntity": "tgPersonDTO",
              "RecipientAddress": "+251914352657",
              "SenderEntity": "tgPersonDTO",
              "CommunicationStatusLookupId": 395,
              "tgDTO": {
                "$type": "Models.Core.online_tgApplicationDTO, Models",
                "tgApplicationTypeId": 10,
                "ApplicationStartDate": "2026-02-08T12:48:41.053",
                "ApplicationStatusLookupId": 365,
                "AssignedSystemOrganisationId": 0,
                "Reference": "AAPP4260B9F0B2P",
                "PriorityLookupId": 918,
                "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
                "CollectionOfficeId": 11,
                "DocumentTypeLookupId": 715,
                "EnrolmentOfficeId": 11,
                "EntityRequiresUpdate": 0,
                "online_tgPersonDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonDTO, Models",
                    "FirstName": "ABEBE",
                    "FirstNamesAmharic": "አበበ",
                    "MiddleName": "KEBEDE",
                    "MiddleNameAmharic": "ከበደ",
                    "Surname": "LEMUA",
                    "SurnameAmharic": "አለሙ",
                    "EyeColourLookupId": 430,
                    "HairColourLookupId": 473,
                    "GenderlookupId": 469,
                    "NationalityLookupId": 538,
                    "PlaceOfBirthLookupId": 3,
                    "CityOfBirth": "WOLDIA",
                    "BirthDate": "2001-02-08T12:52:16.367",
                    "MaritalStatusLookupId": 498,
                    "PersonStatusLookupId": 672,
                    "ContactNumber": "+251_914352657",
                    "MainRegionLookupId": 3,
                    "MainCity": "KOMBOLCHA",
                    "MainAddressLine1": "KEBELE 3",
                    "nspEthiopianBirthDate": "01/06/1993",
                    "online_tgPersonIdentityDTOList": [
                      {
                        "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                        "IdentityTypeLookupId": 653,
                        "IdentityNumber": "55555555555555555"
                      }
                    ],
                    "online_TGPersonRelationDTOList": [],
                    "online_TGPersonWorkDetailDTOList": [
                      {
                        "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
                      }
                    ]
                  }
                ],
                "online_tgApplicationAppointmentDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
                    "tgApplicationAppointmentId": 536227440087006,
                    "tgSystemOrganisationId": 11,
                    "AppointmentDate": "2026-02-09T12:54:25.122",
                    "StartTime": "04:00 PM",
                    "EndTime": "05:00 PM",
                    "AppointmentStatusLookupId": 372,
                    "tgApplicationTypeId": 10,
                    "tgPersonId": 652987543638297,
                    "rescheduleCount": 0,
                    "nspEthiopianAppointmentDate": "02/06/2018"
                  }
                ],
                "online_tgApplicationPageNotesDTOList": [],
                "online_tgApplicationStatusRemarkDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationStatusRemarkDTO, Models"
                  }
                ],
                "online_tgApplicationFeeDTOList": [],
                "online_tgSystemOrganisationDTOList": [],
                "online_tgOrganisationDTOList": [],
                "online_tgSystemOrganisationHoursDTOList": [],
                "online_tgApplicationPaymentDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationPaymentDTO, Models",
                    "baseExcludeList": {
                      "$type": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                      "$values": [
                        "DocumentObject"
                      ]
                    }
                  }
                ],
                "tgFeeDTOList": []
              }
            },
            {
              "$type": "Models.Core.online_tgCommunicationDTO, Models",
              "tgCommunicationTemplateId": 7,
              "tgCommunicationTriggerId": 2,
              "Subject": "Application for: [@@TRANSACTION_TYPE]",
              "Medium": "SMS",
              "CommunicationText": "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
              "RecipientEntity": "tgPersonDTO",
              "RecipientAddress": "+251914352657",
              "SenderEntity": "tgPersonDTO",
              "CommunicationStatusLookupId": 395,
              "tgDTO": {
                "$type": "Models.Core.online_tgApplicationDTO, Models",
                "tgApplicationTypeId": 10,
                "ApplicationStartDate": "2026-02-08T12:48:41.053",
                "ApplicationStatusLookupId": 365,
                "AssignedSystemOrganisationId": 0,
                "Reference": "AAPP4260B9F0B2P",
                "PriorityLookupId": 918,
                "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
                "CollectionOfficeId": 11,
                "DocumentTypeLookupId": 715,
                "EnrolmentOfficeId": 11,
                "EntityRequiresUpdate": 0,
                "online_tgPersonDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonDTO, Models",
                    "FirstName": "ABEBE",
                    "FirstNamesAmharic": "አበበ",
                    "MiddleName": "KEBEDE",
                    "MiddleNameAmharic": "ከበደ",
                    "Surname": "LEMUA",
                    "SurnameAmharic": "አለሙ",
                    "EyeColourLookupId": 430,
                    "HairColourLookupId": 473,
                    "GenderlookupId": 469,
                    "NationalityLookupId": 538,
                    "PlaceOfBirthLookupId": 3,
                    "CityOfBirth": "WOLDIA",
                    "BirthDate": "2001-02-08T12:52:16.367",
                    "MaritalStatusLookupId": 498,
                    "PersonStatusLookupId": 672,
                    "ContactNumber": "+251_914352657",
                    "MainRegionLookupId": 3,
                    "MainCity": "KOMBOLCHA",
                    "MainAddressLine1": "KEBELE 3",
                    "nspEthiopianBirthDate": "01/06/1993",
                    "online_tgPersonIdentityDTOList": [
                      {
                        "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                        "IdentityTypeLookupId": 653,
                        "IdentityNumber": "55555555555555555"
                      }
                    ],
                    "online_TGPersonRelationDTOList": [],
                    "online_TGPersonWorkDetailDTOList": [
                      {
                        "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
                      }
                    ]
                  }
                ],
                "online_tgApplicationAppointmentDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
                    "tgApplicationAppointmentId": 536227440087006,
                    "tgSystemOrganisationId": 11,
                    "AppointmentDate": "2026-02-09T12:54:25.122",
                    "StartTime": "04:00 PM",
                    "EndTime": "05:00 PM",
                    "AppointmentStatusLookupId": 372,
                    "tgApplicationTypeId": 10,
                    "tgPersonId": 652987543638297,
                    "rescheduleCount": 0,
                    "nspEthiopianAppointmentDate": "02/06/2018"
                  }
                ],
                "online_tgApplicationPageNotesDTOList": [],
                "online_tgApplicationStatusRemarkDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationStatusRemarkDTO, Models"
                  }
                ],
                "online_tgApplicationFeeDTOList": [],
                "online_tgSystemOrganisationDTOList": [],
                "online_tgOrganisationDTOList": [],
                "online_tgSystemOrganisationHoursDTOList": [],
                "online_tgApplicationPaymentDTOList": [
                  {
                    "$type": "Models.Core.online_tgApplicationPaymentDTO, Models",
                    "baseExcludeList": {
                      "$type": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                      "$values": [
                        "DocumentObject"
                      ]
                    }
                  }
                ],
                "tgFeeDTOList": []
              }
            }
          ],
          "online_tgPersonIdentityDTOList": [
            {
              "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
              "IdentityTypeLookupId": 653,
              "IdentityNumber": "55555555555555555"
            }
          ],
          "online_TGPersonIssuedDocumentDTOList": [
            {
              "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
              "DocumentTypeLookupId": 491,
              "DocumentObject": "JVBERi0xLjUKJcKlwrHDqwolIGh0dHBzOi8vZ2l0aHViLmNvbS... [TRUNCATED_PDF_DATA] ...24KJSVFT0YK",
              "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
              "ReasonForIssueLookupId": 2,
              "PersonalizedDocumentStatusLookupId": 489,
              "IssuingCountryLookupId": 73,
              "online_tgPersonIssuedDocumentCountryDTOList": [
                {
                  "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                }
              ]
            },
            {
              "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
              "DocumentTypeLookupId": 715,
              "IssueDate": "2026-02-08T12:55:29.491",
              "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
              "PlaceOfPrinting": "ePass Online Web Portal",
              "PersonalizedDocumentStatusLookupId": 677,
              "IssuingCountryLookupId": 73,
              "online_tgPersonIssuedDocumentCountryDTOList": [
                {
                  "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                }
              ]
            }
          ],
          "online_TGPersonRelationDTOList": [],
          "online_TGPersonWorkDetailDTOList": [
            {
              "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
            }
          ]
        }
      ],
      "online_tgApplicationAppointmentDTOList": [
        {
          "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
          "IsActive": 1,
          "RecordStatus_LookupValue_Id": 728,
          "CreatedDate": "2026-02-08T11:55:13.000",
          "TgUserAuditDetailId": 1,
          "CreatedBySystemUserId": 1,
          "DataOwnerLookupId": 1,
          "baseSaveAction": "LOCKING",
          "tgApplicationAppointmentId": 536227440087006,
          "tgSystemOrganisationId": 11,
          "AppointmentDate": "2026-02-09T12:54:25.122",
          "StartTime": "04:00 PM",
          "EndTime": "05:00 PM",
          "AppointmentStatusLookupId": 372,
          "tgApplicationTypeId": 10,
          "tgPersonId": 652987543638297,
          "rescheduleCount": 0,
          "nspEthiopianAppointmentDate": "02/06/2018"
        }
      ],
      "online_tgApplicationStatusRemarkDTOList": [],
      "online_tgSystemOrganisationHoursDTOList": [],
      "online_tgApplicationPaymentDTOList": [
        {
          "$type": "Models.Core.online_tgApplicationPaymentDTO, Models"
        }
      ],
      "tgFeeDTOList": []
    }
  ]
},
"loadfeesB2b":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_financialInvoiceDTO, Models",
      "tgDTO": {
        "$type": "Models.Core.online_tgApplicationDTO, Models",
        "IsActive": 1,
        "DataOwnerLookupId": 0,
        "baseSaveAction": "STEP1_SAVE_G1",
        "tgApplicationTypeId": 10,
        "ApplicationStartDate": "2026-02-08T12:48:41.053",
        "ApplicationStatusLookupId": 365,
        "AssignedSystemOrganisationId": 0,
        "Reference": "AAPP4260B9F0B2P",
        "PriorityLookupId": 918,
        "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
        "CollectionOfficeId": 11,
        "DocumentTypeLookupId": 715,
        "EnrolmentOfficeId": 11,
        "EntityRequiresUpdate": 0,
        "online_tgPersonDTOList": [
          {
            "$type": "Models.Core.online_tgPersonDTO, Models",
            "FirstName": "ABEBE",
            "FirstNamesAmharic": "አበበ",
            "MiddleName": "KEBEDE",
            "MiddleNameAmharic": "ከበደ",
            "Surname": "LEMUA",
            "SurnameAmharic": "አለሙ",
            "EyeColourLookupId": 430,
            "HairColourLookupId": 473,
            "GenderlookupId": 469,
            "NationalityLookupId": 538,
            "PlaceOfBirthLookupId": 3,
            "CityOfBirth": "WOLDIA",
            "BirthDate": "2001-02-08T12:52:16.367",
            "MaritalStatusLookupId": 498,
            "PersonStatusLookupId": 672,
            "ContactNumber": "+251_914352657",
            "MainRegionLookupId": 3,
            "MainCity": "KOMBOLCHA",
            "MainAddressLine1": "KEBELE 3",
            "nspEthiopianBirthDate": "01/06/1993",
            "online_TGCommunicationDTOList": [
              {
                "$type": "Models.Core.online_tgCommunicationDTO, Models",
                "tgCommunicationTemplateId": 8,
                "tgCommunicationTriggerId": 2,
                "Subject": "Application for: [@@TRANSACTION_TYPE]",
                "Medium": "SMS",
                "CommunicationText": "[@@FULL_NAMES]፣ ማመልከቻዎ ለኢሚግሬሽንና የዜግነት አገልግሎት ደርሷል፡፡ የማመልከቻዎ ባር ኮድ እንደሚከተለዉ ነው፡- [@@APPLICATION_BARCODE] እባክዎ ሂደቱ እንዳይሰረዝ ክፍያዎን በ 3 ሰአታት ውስጥ ያጠናቅቁ።",
                "RecipientEntity": "tgPersonDTO",
                "RecipientAddress": "+251914352657",
                "SenderEntity": "tgPersonDTO",
                "CommunicationStatusLookupId": 395,
                "tgDTO": {
                  "$type": "Models.Core.online_tgApplicationDTO, Models",
                  "tgApplicationTypeId": 10,
                  "ApplicationStartDate": "2026-02-08T12:48:41.053",
                  "ApplicationStatusLookupId": 365,
                  "AssignedSystemOrganisationId": 0,
                  "Reference": "AAPP4260B9F0B2P",
                  "PriorityLookupId": 918,
                  "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
                  "CollectionOfficeId": 11,
                  "DocumentTypeLookupId": 715,
                  "EnrolmentOfficeId": 11,
                  "EntityRequiresUpdate": 0,
                  "online_tgPersonDTOList": [
                    {
                      "$type": "Models.Core.online_tgPersonDTO, Models",
                      "FirstName": "ABEBE",
                      "FirstNamesAmharic": "አበበ",
                      "MiddleName": "KEBEDE",
                      "MiddleNameAmharic": "ከበደ",
                      "Surname": "LEMUA",
                      "SurnameAmharic": "አለሙ",
                      "EyeColourLookupId": 430,
                      "HairColourLookupId": 473,
                      "GenderlookupId": 469,
                      "NationalityLookupId": 538,
                      "PlaceOfBirthLookupId": 3,
                      "CityOfBirth": "WOLDIA",
                      "BirthDate": "2001-02-08T12:52:16.367",
                      "MaritalStatusLookupId": 498,
                      "PersonStatusLookupId": 672,
                      "ContactNumber": "+251_914352657",
                      "MainRegionLookupId": 3,
                      "MainCity": "KOMBOLCHA",
                      "MainAddressLine1": "KEBELE 3",
                      "nspEthiopianBirthDate": "01/06/1993",
                      "online_tgPersonIdentityDTOList": [
                        {
                          "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                          "IdentityTypeLookupId": 653,
                          "IdentityNumber": "55555555555555555"
                        }
                      ],
                      "online_TGPersonRelationDTOList": [],
                      "online_TGPersonWorkDetailDTOList": [
                        {
                          "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
                        }
                      ]
                    }
                  ],
                  "online_tgApplicationAppointmentDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
                      "tgApplicationAppointmentId": 536227440087006,
                      "tgSystemOrganisationId": 11,
                      "AppointmentDate": "2026-02-09T12:54:25.122",
                      "StartTime": "04:00 PM",
                      "EndTime": "05:00 PM",
                      "AppointmentStatusLookupId": 372,
                      "tgApplicationTypeId": 10,
                      "tgPersonId": 652987543638297,
                      "rescheduleCount": 0,
                      "nspEthiopianAppointmentDate": "02/06/2018"
                    }
                  ],
                  "online_tgApplicationPageNotesDTOList": [],
                  "online_tgApplicationStatusRemarkDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationStatusRemarkDTO, Models"
                    }
                  ],
                  "online_tgApplicationFeeDTOList": [],
                  "online_tgSystemOrganisationDTOList": [],
                  "online_tgOrganisationDTOList": [],
                  "online_tgSystemOrganisationHoursDTOList": [],
                  "online_tgApplicationPaymentDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationPaymentDTO, Models",
                      "baseExcludeList": {
                        "$type": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                        "$values": [
                          "DocumentObject"
                        ]
                      }
                    }
                  ],
                  "tgFeeDTOList": []
                }
              },
              {
                "$type": "Models.Core.online_tgCommunicationDTO, Models",
                "tgCommunicationTemplateId": 7,
                "tgCommunicationTriggerId": 2,
                "Subject": "Application for: [@@TRANSACTION_TYPE]",
                "Medium": "SMS",
                "CommunicationText": "Your application for a new document has been submitted successfully and all required supporting documents have been received.<br/><br/>Kind Regards,<br/><br/>Ethiopia Immigration and Citizenship Service",
                "RecipientEntity": "tgPersonDTO",
                "RecipientAddress": "+251914352657",
                "SenderEntity": "tgPersonDTO",
                "CommunicationStatusLookupId": 395,
                "tgDTO": {
                  "$type": "Models.Core.online_tgApplicationDTO, Models",
                  "tgApplicationTypeId": 10,
                  "ApplicationStartDate": "2026-02-08T12:48:41.053",
                  "ApplicationStatusLookupId": 365,
                  "AssignedSystemOrganisationId": 0,
                  "Reference": "AAPP4260B9F0B2P",
                  "PriorityLookupId": 918,
                  "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
                  "CollectionOfficeId": 11,
                  "DocumentTypeLookupId": 715,
                  "EnrolmentOfficeId": 11,
                  "EntityRequiresUpdate": 0,
                  "online_tgPersonDTOList": [
                    {
                      "$type": "Models.Core.online_tgPersonDTO, Models",
                      "FirstName": "ABEBE",
                      "FirstNamesAmharic": "አበበ",
                      "MiddleName": "KEBEDE",
                      "MiddleNameAmharic": "ከበደ",
                      "Surname": "LEMUA",
                      "SurnameAmharic": "አለሙ",
                      "EyeColourLookupId": 430,
                      "HairColourLookupId": 473,
                      "GenderlookupId": 469,
                      "NationalityLookupId": 538,
                      "PlaceOfBirthLookupId": 3,
                      "CityOfBirth": "WOLDIA",
                      "BirthDate": "2001-02-08T12:52:16.367",
                      "MaritalStatusLookupId": 498,
                      "PersonStatusLookupId": 672,
                      "ContactNumber": "+251_914352657",
                      "MainRegionLookupId": 3,
                      "MainCity": "KOMBOLCHA",
                      "MainAddressLine1": "KEBELE 3",
                      "nspEthiopianBirthDate": "01/06/1993",
                      "online_tgPersonIdentityDTOList": [
                        {
                          "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                          "IdentityTypeLookupId": 653,
                          "IdentityNumber": "55555555555555555"
                        }
                      ],
                      "online_TGPersonRelationDTOList": [],
                      "online_TGPersonWorkDetailDTOList": [
                        {
                          "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
                        }
                      ]
                    }
                  ],
                  "online_tgApplicationAppointmentDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationAppointmentDTO, Models",
                      "tgApplicationAppointmentId": 536227440087006,
                      "tgSystemOrganisationId": 11,
                      "AppointmentDate": "2026-02-09T12:54:25.122",
                      "StartTime": "04:00 PM",
                      "EndTime": "05:00 PM",
                      "AppointmentStatusLookupId": 372,
                      "tgApplicationTypeId": 10,
                      "tgPersonId": 652987543638297,
                      "rescheduleCount": 0,
                      "nspEthiopianAppointmentDate": "02/06/2018"
                    }
                  ],
                  "online_tgApplicationPageNotesDTOList": [],
                  "online_tgApplicationStatusRemarkDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationStatusRemarkDTO, Models"
                    }
                  ],
                  "online_tgApplicationFeeDTOList": [],
                  "online_tgSystemOrganisationDTOList": [],
                  "online_tgOrganisationDTOList": [],
                  "online_tgSystemOrganisationHoursDTOList": [],
                  "online_tgApplicationPaymentDTOList": [
                    {
                      "$type": "Models.Core.online_tgApplicationPaymentDTO, Models",
                      "baseExcludeList": {
                        "$type": "System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib",
                        "$values": [
                          "DocumentObject"
                        ]
                      }
                    }
                  ],
                  "tgFeeDTOList": []
                }
              }
            ],
            "online_tgPersonIdentityDTOList": [
              {
                "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                "IdentityTypeLookupId": 653,
                "IdentityNumber": "55555555555555555"
              }
            ],
            "online_TGPersonIssuedDocumentDTOList": [
              {
                "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                "DocumentTypeLookupId": 491,
                "DocumentObject": "JVBERi0xLjUKJcKlwrHDqwolIGh0...",
                "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
                "ReasonForIssueLookupId": 2,
                "PersonalizedDocumentStatusLookupId": 489,
                "IssuingCountryLookupId": 73,
                "online_tgPersonIssuedDocumentCountryDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                  }
                ]
              },
              {
                "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                "DocumentTypeLookupId": 715,
                "IssueDate": "2026-02-08T12:55:29.491",
                "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
                "PlaceOfPrinting": "ePass Online Web Portal",
                "PersonalizedDocumentStatusLookupId": 677,
                "IssuingCountryLookupId": 73,
                "online_tgPersonIssuedDocumentCountryDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                  }
                ]
              }
            ],
            "online_TGPersonRelationDTOList": [],
            "online_TGPersonWorkDetailDTOList": [
              {
                "$type": "Models.Core.online_tgPersonWorkDetailDTO, Models"
              }
            ]
          }
        ],
        "online_tgSystemOrganisationHoursDTOList": [],
        "tgFeeDTOList": []
      }
    }
  ]
},

"addfeesB2b":{"$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values":[
    {"$type":"Models.Core.online_tgApplicationPaymentDTO, Models",
      "PaymentDate":"2026-02-08T12:55:47.985",
      "AmountTendered":5000,
      "ApplicationWorkflowHistoryId":123,
      "PaymentStatusLookupId":449,
      "tgFeeId":53,
      "FeeDescription":"APPLICATION FEE FOR NORMAL PASSPORT",
      "FeeAmount":5000,
      "InstructionTgFinancialDocumentId":"PP260B9F0B",
      "ReceiptTgFinancialDocumentId":"PP260B9F0B",
      "EntityType":"tgPersonDTO",
      "EntityId":77544857803594,
      "tgApplicationId":975306583899501,
      "PaymentReceiptObject":"",
      "tgApplicationTypeId":10}]},

    "updatepaymentB2b":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_tgFinancialDocumentDTO, Models",
      "DocumentNumber": "AAPP4260B9F0B2P",
      "DocumentTypeLookupId": 492,
      "DocumentStatusLookupId": 449,
      "DocumentObject": "JVBERi..."
    }
  ]
},
"updatesupportdocB2b":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_tgPersonSupportingDocumentDTO, Models",
      "CreatedDate": "2026-02-08T12:54:10.113",
      "tgPersonId": 77544857803594,
      "DocumentTypeLookupId": 813,
      "DocumentStatusLookupId": 775,
      "DocumentCategoryLookupId": 401,
      "DocumentObject": "/9j/4AA...",
      "tgApplicationId": 975306583899501,
      "nspIsMandatory": 1
    }
  ]
},
"loadinvoiceB2b":{
  "$type": "System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values": [
    {
      "$type": "Models.Core.online_financialInvoiceDTO, Models",
      "tgDTO": {
        "$type": "Models.Core.online_tgApplicationDTO, Models",
        "IsActive": 1,
        "RecordStatus_LookupValue_Id": 728,
        "CreatedDate": "2026-02-08T11:55:43.000",
        "TgUserAuditDetailId": 513916317283090,
        "CreatedBySystemUserId": 257671743594753,
        "DataOwnerLookupId": 11,
        "baseSaveAction": "STEP1_SAVE_G1",
        "tgApplicationId": 975306583899501,
        "EntityType": "tgPersonDTO",
        "EntityId": 77544857803594,
        "tgApplicationTypeId": 10,
        "ApplicationStartDate": "2026-02-08T12:48:41.053",
        "ApplicationStatusLookupId": 365,
        "AssignedSystemOrganisationId": 0,
        "Reference": "AAPP4260B9F0B2P",
        "PriorityLookupId": 918,
        "Remark": "APPLICATION FOR NORMAL PASSPORT - ABEBE KEBEDE LEMUA",
        "CollectionOfficeId": 11,
        "DocumentTypeLookupId": 715,
        "EnrolmentOfficeId": 11,
        "EntityRequiresUpdate": 0,
        "online_tgPersonDTOList": [
          {
            "$type": "Models.Core.online_tgPersonDTO, Models",
            "IsActive": 1,
            "RecordStatus_LookupValue_Id": 728,
            "CreatedDate": "2026-02-08T11:55:43.000",
            "TgUserAuditDetailId": 513916317283090,
            "CreatedBySystemUserId": 257671743594753,
            "DataOwnerLookupId": 11,
            "tgPersonId": 77544857803594,
            "FirstName": "ABEBE",
            "FirstNamesAmharic": "አበበ",
            "MiddleName": "KEBEDE",
            "MiddleNameAmharic": "ከበደ",
            "Surname": "LEMUA",
            "SurnameAmharic": "አለሙ",
            "EyeColourLookupId": 430,
            "HairColourLookupId": 473,
            "GenderlookupId": 469,
            "NationalityLookupId": 538,
            "PlaceOfBirthLookupId": 3,
            "CityOfBirth": "WOLDIA",
            "BirthDate": "2001-02-08T12:52:16.367",
            "MaritalStatusLookupId": 498,
            "PersonStatusLookupId": 672,
            "ContactNumber": "+251_914352657",
            "MainRegionLookupId": 3,
            "MainCity": "KOMBOLCHA",
            "MainAddressLine1": "KEBELE 3",
            "online_TGCommunicationDTOList": [],
            "online_tgPersonIdentityDTOList": [ //we are here
              {
                "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                "IsActive": 1,
                "RecordStatus_LookupValue_Id": 728,
                "CreatedDate": "2026-02-08T11:55:43.000",
                "TgUserAuditDetailId": 513916317283090,
                "CreatedBySystemUserId": 257671743594753,
                "DataOwnerLookupId": 11,
                "tgPersonIdentityId": 808580117225478,
                "tgPersonId": 77544857803594,
                "IdentityTypeLookupId": 653,
                "IdentityNumber": "55555555555555555"
              }
            ],
            "online_TGPersonIssuedDocumentDTOList": [
              {
                "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                "DocumentTypeLookupId": 491,
                "DocumentObject": "JVBERi...",
                "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
                "ReasonForIssueLookupId": 2,
                "PersonalizedDocumentStatusLookupId": 489,
                "IssuingCountryLookupId": 73,
                "online_tgPersonIssuedDocumentCountryDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                  }
                ]
              },
              {
                "$type": "Models.Core.online_tgPersonIssuedDocumentDTO, Models",
                "DocumentTypeLookupId": 715,
                "IssueDate": "2026-02-08T12:55:29.491",
                "IssuingAuthority": "IMMIGRATION AND CITIZENSHIP SERVICE",
                "PlaceOfPrinting": "ePass Online Web Portal",
                "PersonalizedDocumentStatusLookupId": 677,
                "IssuingCountryLookupId": 73,
                "online_tgPersonIssuedDocumentCountryDTOList": [
                  {
                    "$type": "Models.Core.online_tgPersonIssuedDocumentCountryDTO, Models"
                  }
                ]
              }
            ],
            "online_TGPersonRelationDTOList": [],
            "online_TGPersonSupportingDocumentDTOList": [],
            "online_TGPersonWorkDetailDTOList": []
          },
          {
            "$type": "Models.Core.online_tgPersonDTO, Models",
            "IsActive": 1,
            "RecordStatus_LookupValue_Id": 728,
            "CreatedDate": "2026-02-08T11:55:43.000",
            "TgUserAuditDetailId": 513916317283090,
            "CreatedBySystemUserId": 257671743594753,
            "DataOwnerLookupId": 11,
            "tgPersonId": 77544857803594,
            "FirstName": "ABEBE",
            "FirstNamesAmharic": "አበበ",
            "MiddleName": "KEBEDE",
            "MiddleNameAmharic": "ከበደ",
            "Surname": "LEMUA",
            "SurnameAmharic": "አለሙ",
            "EyeColourLookupId": 430,
            "HairColourLookupId": 473,
            "GenderlookupId": 469,
            "NationalityLookupId": 538,
            "PlaceOfBirthLookupId": 3,
            "CityOfBirth": "WOLDIA",
            "BirthDate": "2001-02-08T12:52:16.367",
            "MaritalStatusLookupId": 498,
            "PersonStatusLookupId": 672,
            "ContactNumber": "+251_914352657",
            "MainRegionLookupId": 3,
            "MainCity": "KOMBOLCHA",
            "MainAddressLine1": "KEBELE 3",
            "online_TGCommunicationDTOList": [],
            "online_TGPersonBiometricDTOList": [],
            "online_tgPersonIdentityDTOList": [
              {
                "$type": "Models.Core.online_tgPersonIdentityDTO, Models",
                "IsActive": 1,
                "RecordStatus_LookupValue_Id": 728,
                "CreatedDate": "2026-02-08T11:55:43.000",
                "TgUserAuditDetailId": 513916317283090,
                "CreatedBySystemUserId": 257671743594753,
                "DataOwnerLookupId": 11,
                "tgPersonIdentityId": 808580117225478,
                "tgPersonId": 77544857803594,
                "IdentityTypeLookupId": 653,
                "IdentityNumber": "55555555555555555"
              }
            ],
            "online_TGPersonIssuedDocumentDTOList": [],
            "online_TGPersonRelationDTOList": [],
            "online_TGPersonSupportingDocumentDTOList": [],
            "online_TGPersonWorkDetailDTOList": []
          }
        ],
        "online_tgOrganisationDTOList": [],
        "online_tgSystemOrganisationHoursDTOList": [],
        "online_tgApplicationPaymentDTOList": [
          {
            "$type": "Models.Core.online_tgApplicationPaymentDTO, Models",
            "InstructionTgFinancialDocumentId": "PP260B9F0B",
            "ReceiptTgFinancialDocumentId": "PP260B9F0B"
          }
        ],
        "CurrentApplicationStatusName": "PAYMENT",
        "tgFeeDTOList": []
      }
    }
  ]
},
"payportalB2b":{"$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib",
  "$values":[
    {
      "$type":"Models.Core.requestOrderDTO, Models",
      "FirstName":"ABEBE",
      "LastName":"LEMUA",
      "Email":"noreply@ics.gov.et",
      "Phone":"+251 914352657",
      "Amount":5000,
      "Currency":"ETB",
      "Country":"ETH",
      "PaymentTypeId":1,
      "CustomOrderCode":"975306583899501",
      "MerchantCode":"181826",
      "isExpiryFromMerchant":false,
      "ExpiryTimeStamp":0,
      "tgApplicationTypeName":"NEW_PASSPORT",
      "OrderId":"AAPP4260B9F0B2P",
      "PaymentStatusLookupId":449,
      "InstructiontgFinancialDocumentId":1,
      "paymentPlatform":0,
      "FinancialInvoiceDTOList":[{"$type":"Models.Core.financialInvoiceDTO, Models","tgFeeDTOList":[{"$type":"Models.Core.tgFeeDTO, Models","tgFeeId":53}]}],"ApplicationTypeId":10}]},
"updatesupportdocB2b2":{"$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib","$values":[{"$type":"Models.Core.online_tgPersonSupportingDocumentDTO, Models","tgPersonId":77544857803594,"DocumentTypeLookupId":825,"DocumentCategoryLookupId":406,"tgApplicationId":975306583899501,"nspIsMandatory":0}]},
"updatesupportdocB2b3":{"$type":"System.Collections.Generic.List`1[[Models.IBusinessObject, Models]], System.Private.CoreLib","$values":[{"$type":"Models.Core.online_tgPersonSupportingDocumentDTO, Models","tgPersonId":77544857803594,"DocumentTypeLookupId":825,"DocumentCategoryLookupId":401,"tgApplicationId":975306583899501,"nspIsMandatory":0}]}
}
