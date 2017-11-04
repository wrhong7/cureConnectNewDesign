recruitingSpecialty = ["Doctors", "Researchers", "Residents", "Nurse Practitioners", "Nurses", "Surgeons", "Hospital Admins"];

function loadEnteredInformationFromServer() {
  currentUser = firebase.auth().currentUser.uid;
  firebaseDB = firebase.database();
  url = "usersDB/hospitalRecruiter/"+currentUser;

  userProfileInfo = firebase.database().ref(url);
  userProfileInfo.on('value', function(data) {
    recruiterProfileURL = 'usersDB/hospitalRecruiter/'+currentUser+'/recruiterProfile';
    recruiterData = firebase.database().ref(recruiterProfileURL);
    recruiterData.on('value', function(data) {
      recruiterAttributes = data.val();

      if (recruiterAttributes != null) {
        recruiterAttributesObjectKeys = Object.keys(recruiterAttributes);

        recruiterAttributesObjectKeys.forEach(function(objectKey) {

          if (objectKey == "recruitingSpecialty") {
            array = recruiterAttributes["recruitingSpecialty"];
            $("#recruitingSpecialty").val(array).trigger("change");
          }
          if (objectKey == "hospitalAddress") {
            $(".hospitalAddress").val(recruiterAttributes["hospitalAddress"]);
          }
          if (objectKey == "hospitalLocation") {
            $(".hospitalLocation").val(recruiterAttributes["hospitalLocation"]);
          }
          if (objectKey == "hospitalName") {
            $(".hospitalName").val(recruiterAttributes["hospitalName"]);
          }
          if (objectKey == "hospitalZipCode") {
            $(".hospitalZipCode").val(recruiterAttributes["hospitalZipCode"]);
          }
          if (objectKey == "recruiterEmail") {
            $(".recruiterEmail").val(recruiterAttributes["recruiterEmail"]);
          }
          if (objectKey == "recruiterName") {
            $(".recruiterName").val(recruiterAttributes["recruiterName"]);
          }
          if (objectKey == "recruiterTitle") {
            $(".recruiterTitle").val(recruiterAttributes["recruiterTitle"]);
          }

        });
      }
    })
  })
}

function enterInformationAndSubmitToServer() {

  recruiterName = $(".recruiterName").val();
  recruiterEmail= $(".recruiterEmail").val();
  recruiterTitle = $(".recruiterJobTitle").val();
  recruitingSpecialty = $("#recruitingSpecialty").val();
  hospitalName= $(".hospitalName").val();
  hospitalLocation= $(".hospitalLocation").val();
  hospitalZipCode = $(".hospitalZipCode").val();
  hospitalAddress= $(".hospitalAddress").val();

  recruiterProfileObjects = {
    recruiterName: recruiterName,
    recruiterEmail: recruiterEmail,
    recruiterTitle: recruiterTitle,
    recruitingSpecialty: recruitingSpecialty,
    hospitalName: hospitalName,
    hospitalLocation: hospitalLocation,
    hospitalZipCode: hospitalZipCode,
    hospitalAddress: hospitalAddress,
  }

  $.each(recruiterProfileObjects, function(key, value){
    if (value === "" || value === null || value == undefined){
      delete recruiterProfileObjects[key];
    }
  });

  url = 'usersDB/hospitalRecruiter/'+firebase.auth().currentUser.uid+'/recruiterProfile';

  userDB = firebaseDB.ref(url).set(recruiterProfileObjects);

  location.href="/userRegistration/hospitalRecruiters/postJobs.html"
}

$( document ).ready(function() {

  setTimeout(function(){ loadEnteredInformationFromServer(); }, 3000);

  $("#recruitingSpecialty").select2();
  $("#recruitingSpecialty").select2({
    placeholder: "Relevant Field(s)"
  });
  recruitingSpecialty.forEach(function(specialty) {
    $("#recruitingSpecialty").append(
      "<option class="+specialty+"value="+specialty+">"+specialty+"</option>"
    )
  })
});


