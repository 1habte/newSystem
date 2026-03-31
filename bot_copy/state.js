export const state = {
  currentPersonIndex: 0,
  endPersonIndex: 0,
  currentStep: 0,
  totalSteps: 12,
  alltimeSlotCounts: [],
  counter: 0,
  applicationDetails: {},
  objOfIds: {
    "app": [],
    "login": [],
    "supdoc": [],
    "portallock": [],
    "loadsequence": [],
    "passave": [],
    "loadfees": [],
    "addfees": [],
    "updatepaydocument": [],
    "updatesupportdoc": [],
    "loadinvoice": [],
    "payportal": [],
  },
  oneHourSlots: [
    { "StartTime": "08:00 AM", "EndTime": "09:00 AM" },
    { "StartTime": "09:00 AM", "EndTime": "10:00 AM" },
    { "StartTime": "10:00 AM", "EndTime": "11:00 AM" },
    { "StartTime": "11:00 AM", "EndTime": "12:00 PM" },
    { "StartTime": "12:00 PM", "EndTime": "01:00 PM" },
    { "StartTime": "01:00 PM", "EndTime": "02:00 PM" },
    { "StartTime": "02:00 PM", "EndTime": "03:00 PM" },
    { "StartTime": "03:00 PM", "EndTime": "04:00 PM" },
    { "StartTime": "04:00 PM", "EndTime": "05:00 PM" }
  ]
};
