var selectedFields = {
  optionFullTime: false,
  optionPartTime: false,
  optionDayShift: false,
  optionNightShift: false,
  optionIndividuallyOwnedClinics: false,
  optionCommunityClinic: false,
  optionRegionalComplexHospital: false,
  optionRegionalSpecialtyHospital: false,
  optionLargeHospital: false,
  optionOnCall: false,
  optionWeekendDuty: false,
  optionMandatoryOvertime: false,
  optionNightDuty: false,
  optionHighPatientRatio: false,
  optionTwelveHourWorkday: false,
  optionPrivatePayers: false,
  optionToBeAdded: false
}

function selectThisField(id) {
  console.log(id)
  if (selectedFields[id] == true){
    $("#"+id).css("background-color", "red");
    selectedFields[id] = false;
  } else {
    $("#"+id).css("background-color", "green");
    selectedFields[id] = true;
  }

}