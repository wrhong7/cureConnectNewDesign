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
  if (selectedFields[id] == true){
    $("#"+id).css("background-color", "white");
    selectedFields[id] = false;
  } else {
    $("#"+id).css("background-color", "#009EB3");
    selectedFields[id] = true;
  }

}

function updatePreferenceFields() {
  selectedFieldsObjectKeys = Object.keys(selectedFields);
  selectedFieldsObjectKeys.forEach(function(key) {
    if (selectedFields[key] == true) {
      $("#"+key).css("background-color", "#009EB3");
    } else {
      $("#"+key).css("background-color", "white");
    }
  })
}

function loadProfessionalPreferenceFromServer() {
  console.log("rendered")
  currentUser = firebase.auth().currentUser.uid;
  url = "usersDB/professional/"+currentUser+"/userPreference";
  userPreferenceInfo = firebase.database().ref(url);
  userPreferenceInfo.on('value', function(data) {
    recruiterAttributes = data.val();
    if (recruiterAttributes != null) {
      selectedFields = recruiterAttributes;
    }
    updatePreferenceFields();
  })
}

function submitProfessionalPreferenceToServer() {

  //pinging updated professional preference to the database

  preferenceUrl = 'usersDB/professional/'+firebase.auth().currentUser.uid+'/userPreference';

  userDB = firebaseDB.ref(preferenceUrl).set(selectedFields);

  location.href="/userRegistration/contactInfo/entry.html"

}


$(document).ready(function() {
  setTimeout(function() {
    loadProfessionalPreferenceFromServer();
  }, 5000);
});