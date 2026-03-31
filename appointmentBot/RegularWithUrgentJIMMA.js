const ImmigrationClient = require("./utils/client");
const payloads = require("./utils/payloads");
const { generatePassportToken } = require("./utils/barcodeGenerator");
const { generateAndProcessPdfs } = require("./services/pdfService");
const {
  fullyPopulatedSaveDTO,
  addFeeToApplicationPayment,
  orderPortalPayment,
  lockSlot,
  updatePaymentInstructionDocument,
  updateSupportingocsBirthCert,
  loadFinancialInvoicePayload,
  loadFeesHash3,
} = require("./utils/PAYLOADS_REGULAR_WITH_URGENT");
// const { governmentId, birthCertificate } = require("./utils/base64Files");
const { personalPDF, paymentPDF } = require("./utils/Base64_Sample_PDFS");
const { toLocalISOString, localeDateFormat } = require("./utils/utils");

// load personal data
const userData = require("./utils/personalData");
const loginCredentials = require("./utils/loginCredentials");
async function continueAfterLock() {
  const client = new ImmigrationClient();
  await client.connect();

  try {
    // --- 1. LOGIN ---
    console.log(`--- Logging in ${userData.FirstName} ---`);
    const loginDto = payloads.loginPayload(loginCredentials);
    const loginResp = await client.send(loginDto);

    if (!loginResp.Token) throw new Error("Login failed");
    client.setToken(loginResp.Token);

    const loggedInData = loginResp.decryptedData.$values[0];
    userData.tgPersonId = loggedInData.tgPersonId;
    userData.createdBySystemUserId = loggedInData.tgOnlineAccountId;
    console.log(`✅ Logged in. PersonID: ${userData.tgPersonId}`);

    // --- 2. SKIP REGISTRATION & LOCKING ---
    // seq = 18796 (BD BEGINNING);
    let seq = 36155;
    console.log(`--- Skipping Registration ---`);
    for (let i = 0; i <= 20; i++) {
      // --- 3. LOCK A SLOT
      const lockDTO = lockSlot(userData);
      console.log(`LOCKING A SLOT... ${JSON.stringify(lockDTO, null, 2)}`);
      const lockResponse = await client.send(lockDTO);
      const lockedData = lockResponse.decryptedData?.$values?.[0];

      if (
        lockedData &&
        lockedData.tgApplicationAppointmentId &&
        (!lockedData.ValidationErrors?.$values ||
          lockedData.ValidationErrors.$values.length === 0)
      ) {
        userData.tgApplicationAppId = lockedData.tgApplicationAppointmentId;
        console.log(`✅ Locked (ID: ${lockedData.tgApplicationAppointmentId})`);
        // --- 4. CONTINUE WITH THE REST OF THE CYCLE ---
        userData.lockedCreatedDate = lockedData.CreateDate + ".000";
        console.log(
          `APPLICATION START DATE: ${userData.applicationStartDate} `,
        );

        // C. GENERATE REFERENCE
        // console.log(`--- Generating Reference Sequence ---`);
        // const seqDto = payloads.loadSequencePayload(userData.officeId);
        // const seqResp = await client.send(seqDto);
        // const seq = seqResp.decryptedData?.$values?.[0]?.CurrentValue;

        // if (!seq) throw new Error("Sequence fetch failed.");

        reference = generatePassportToken(
          userData.RegionCode,
          userData.Urgency,
          seq,
        );
        userData.reference = reference;
        console.log(`🧾 Generated Ref: ${userData.reference} (Seq: ${seq})`);

        // GENERATE DYNAMIC PDFs
        const userDataForPDF = {
          applicationStartDate: localeDateFormat(userData.applicationStartDate),
          appointmentDate: localeDateFormat(userData.appointmentDate),
          nspEthiopianAppointmentDate: userData.nspEthiopianAppointmentDate,
          FirstNamesAmharic: userData.FirstNamesAmharic,
          MiddleNameAmharic: userData.MiddleNameAmharic,
          SurnameAmharic: userData.SurnameAmharic,
          FirstName: userData.FirstName,
          MiddleName: userData.MiddleName,
          Surname: userData.Surname,
          birthDate: localeDateFormat(userData.BirthDate),
          birthCertificateId: userData.birthCertificateId,
          Gender: userData.Gender,
          Height: userData.Height,
          ContactNumber: userData.ContactNumber,
          EmailAddress: userData.EmailAddress,
          CityOfBirth: userData.CityOfBirth,
          MainAddress: userData.PhysicalAddressLine1,
          AppointmentTime:
            userData.startTime.split(" ")[0] +
            ":00" +
            " - " +
            userData.endTime.split(" ")[0] +
            ":00",
        };
        console.log(`📄 Generating dynamic PDFs for ${userData.FirstName}...`);
        // const { personalPDF, paymentPDF } = await generateAndProcessPdfs(
        //   userDataForPDF,
        //   userData.reference,
        //   seq,
        // );

        // F. SAVE APPLICATION
        const saveDto = fullyPopulatedSaveDTO(userData, personalPDF);
        console.log(
          `NEW_PASSPORT_PORTAL_SAVE DTO ${JSON.stringify(saveDto, null, 2)}`,
        );
        console.log(`📤 Sending NEW_PASSPORT_PORTAL_SAVE...`);
        const saveResp = await client.send(saveDto, 150000);
        const appData = saveResp?.decryptedData?.$values?.[0];

        if (appData && appData.Reference === userData.reference) {
          console.log(
            `🎉 SUCCESS! Application saved. Reference ID: ${appData.Reference}`,
          );
          userData.tgApplicationId = appData.tgApplicationId;
          userData.tgPersonIdNew = appData.EntityId;
          userData.tgPersonIdentityId =
            appData.online_tgPersonDTOList.$values[0].online_tgPersonIdentityDTOList.$values[0].tgPersonIdentityId;
          const loadFeesDTO = loadFeesHash3(userData, personalPDF);
          console.log(`LOAD FEES HASH 3`);
          await client.send(loadFeesDTO);
          // G. ADD FEE TO APPLICATION PAYMENT
          userData.shortenedReference = `PP${userData.reference.substring(5, 7)}${userData.reference.substring(7, 13)}`;
          const addFeeDto = addFeeToApplicationPayment(userData);
          console.log(`📤 Sending ADD_FEE_TO_APPLICATION_PAYMENT...`);
          await client.send(addFeeDto, 15000);

          const updatePaymentInstructionDTO = updatePaymentInstructionDocument(
            userData,
            paymentPDF,
          );
          console.log(`UPDATING PAYMENT INSTRUCTION DOC ...`);
          await client.send(updatePaymentInstructionDTO);

          // UPDATE SUPPORTING DOCS
          // const GOVSupportingDocsDTO = updateSupportingDocsGOV(
          //   userData,
          //   governmentId,
          // );
          // console.log(`updating supporting docs GOVERNMENT ID`);
          // await client.send(GOVSupportingDocsDTO);

          const BirthSupportingDocsDTO = updateSupportingocsBirthCert(userData);
          console.log(`updating supporting docs BIRTH CERTIFICATE`);
          await client.send(BirthSupportingDocsDTO);
          // load financial docs
          const financialInvoiceDTO = loadFinancialInvoicePayload(
            userData,
            personalPDF,
          );
          console.log(`load financial invoice`);
          await client.send(financialInvoiceDTO);
          // I. PAYMENT ORDER PORTAL
          const paymentOrderDto = orderPortalPayment(userData);
          console.log(`💰 Sending payment-order-portal...`);
          const paymentOrderResp = await client.send(paymentOrderDto, 150000);
          const paymentData = paymentOrderResp?.decryptedData?.$values?.[0];

          if (paymentData && paymentData.RedirectURL) {
            console.log(`💳 Payment URL: ${paymentData.RedirectURL}`);
          } else {
            console.log(`❌ Payment order failed.`);
          }
        } else {
          console.log(`❌ Save returned invalid data.`);
        }
      }
      seq++;
    }
  } catch (error) {
    console.error(`\n❌ Critical System Error: ${error.message}`);
  } finally {
    client.close();
  }
}

continueAfterLock();
