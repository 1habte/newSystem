export const REGION_MAP = {
  'ADDIS ABABA': 1,
  'AFAR': 2,
  'AMHARA': 3,
  'BENISHANGUL GUMUZ': 4,
  'CENTRAL ETHIOPIA PEOPLE REGION': 5,
  'DIRE DAWA ASTEDADAR': 6,
  'SOMALI': 7,
  'GAMBELA': 8,
  'HARERI': 9,
  'OROMIA': 10,
  'SIDAMA': 12,
  'SOUTH ETHIOPIA PEOPLE REGION': 14,
  'SOUTH WEST ETHIOPIA PEOPLE': 15,
  'TIGRAY': 16
};

/**
 * Formats raw person data into the strict JSON schema required by the ICS system.
 * @param {Object} rawData - The raw input data for a person.
 * @returns {Array} A single-object JSON array matching the exact schema.
 */
export function formatPersonRecord(rawData) {
  const birthRegionId = REGION_MAP[(rawData.PlaceOfBirth || '').toUpperCase()] || "";
  const mainRegionId = REGION_MAP[(rawData.MainRegion || '').toUpperCase()] || "";

  // Oromia normalization rule: default to JIMMA if city is missing
  let mainCity = (rawData.MainCity || '').toUpperCase();
  if (mainRegionId === 10 && !mainCity) {
    mainCity = 'JIMMA';
  }

  // Phone number normalization to +251_9XXXXXXXX
  let phone = (rawData.ContactNumber || '').replace(/[^\d]/g, '');
  if (phone.startsWith('2519')) phone = '+251_' + phone.slice(3);
  else if (phone.startsWith('09')) phone = '+251_' + phone.slice(1);
  else if (phone.startsWith('9')) phone = '+251_' + phone;

  return [
    {
      "FirstName": (rawData.FirstName || "").toUpperCase(),
      "FirstNamesAmharic": rawData.FirstNamesAmharic || "",
      "MiddleName": (rawData.MiddleName || "").toUpperCase(),
      "MiddleNameAmharic": rawData.MiddleNameAmharic || "",
      "Surname": (rawData.Surname || "").toUpperCase(),
      "SurnameAmharic": rawData.SurnameAmharic || "",
      "EyeColourLookupId": 430,
      "HairColourLookupId": 473,
      "GenderlookupId": (rawData.Gender || '').toLowerCase() === 'female' ? 468 : 469,
      "NationalityLookupId": 538,
      "PlaceOfBirthLookupId": birthRegionId,
      "CityOfBirth": (rawData.CityOfBirth || "").toUpperCase(),
      "BirthDate": rawData.BirthDateISO || "", 
      "MaritalStatusLookupId": 498,
      "ContactNumber": phone,
      "MainRegionLookupId": mainRegionId,
      "MainCity": mainCity,
      "MainAddressLine1": (rawData.MainAddressLine1 || "").toUpperCase(),
      "nspEthiopianBirthDate": rawData.nspEthiopianBirthDate || "",
      "id": rawData.id || ""
    }
  ];
}
