//Resume Uploader:
var resumePDFBinary;

function viewServerResume() {
  $(".uploadResumeButtonContainer").css("margin-top", "1vh");
  $(".uploadResumeButtonContainer").css("margin-bottom", "1vh");
  $(".uploadResumeButton").empty();
  $(".uploadResumeButton").append('Replace Resume');
  $(".resumeContainer").append(
    '<object class="csviFrameSizeAdjustment" data='+resumePDFBinary+' type="application/pdf" height="100%" width="100%"></object>'
  );
}

function convertToBase64() {
  //Read File
  var selectedFile = document.getElementById("file").files;
  //Check File is not Empty
  if (selectedFile.length > 0) {
    // Select the very first file from list
    var fileToLoad = selectedFile[0];
    // FileReader function for read the file.
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      resumePDFBinary = base64;

      // $(".resumeContainer").replaceWith(
      //   '<div class=\"resumeContainer\">'+
      //     '<div class="replaceResumeSection">'+
      //       '<input class="inputFile" name="file" type="file" id="file" onchange="convertToBase64();" />'+
      //       '<label for="file" class="attachFile">Replace Resume</label>'+
      //     '</div>'+
      //   '</div>'
      // );

      // $(".resumeContainer").append(
      //   '<iframe src='+base64+' class="resumeiFrame"></iframe>'
      // );

      $(".uploadResumeButtonContainer").css("margin-top", "1vh");
      $(".uploadResumeButtonContainer").css("margin-bottom", "1vh");
      $(".uploadResumeButton").empty();
      $(".uploadResumeButton").append('Replace Resume');
      $(".resumeContainer").append(
        '<object class="csviFrameSizeAdjustment" data='+base64+' type="application/pdf" height="100%" width="100%"></object>'
      );
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  }
}

//there should be two functions; post and load whatever they have put in before.

function loadEnteredInformationFromServer() {
  currentUser = firebase.auth().currentUser.uid;
  firebaseDB = firebase.database();
  url = "usersDB/professional/"+currentUser;

  userProfileInfo = firebase.database().ref(url);


  userProfileInfo.on('value', function(data) {
      userProfileURL = url + "/professionalProfile"
      jobPostingData = firebase.database().ref(userProfileURL);
      jobPostingData.on('value', function(data) {
        userAttributes = data.val();
        
        if (userAttributes != null) {

          userAttributesObjectKeys = Object.keys(userAttributes);
        
          userAttributesObjectKeys.forEach(function(objectKey) {
            if (objectKey=="userResume") {
              resumePDFBinary = userAttributes["userResume"];
              viewServerResume();
            }
            if (objectKey == "userLanguages") {
              languageArray = userAttributes["userLanguages"];
              $("#languages").val(languageArray).trigger("change");
            }
            if (objectKey == "userProfession") {
              array = userAttributes["userProfession"];
              $("#medicalProfession").val(array).trigger("change");
            }
            if (objectKey == "userYearsOfExperience") {
              array = userAttributes["userYearsOfExperience"];
              $("#yearsOfExperience").val(array).trigger("change");
            }
            if (objectKey == "userLicenses") {
              array = userAttributes["userLicenses"];
              $("#certifiedLicenses").val(array).trigger("change");
            }
            if (objectKey == "userLicenseStates") {
              array = userAttributes["userLicenseStates"];
              $("#certifiedStates").val(array).trigger("change");
            }
            if (objectKey == "userWorkAuthorization") {
              array = userAttributes["userWorkAuthorization"];
              $("#workAuthorization").val(array).trigger("change");
            }
            if (objectKey == "userName") {
              $(".candidateName").val(userAttributes["userName"]);
            }
            if (objectKey == "userZipCode") {
              $(".zipcodeEntry").val(userAttributes["userZipCode"]);
            }
          });      
        }
      })
  })
}

//1. this needs to be loaded every time when page is fully loaded
//2. this information needs to fill up the user registeration section
//3. every time the next button gets clicked, this button should be clicked and moved on.

function enterInformationAndSubmitToServer() {

  resumeBinary = resumePDFBinary;
  userName = $(".candidateName").val();
  userZipCode= $(".zipcodeEntry").val();
  userProfession = $("#medicalProfession").val();
  userYearsOfExperience = $("#yearsOfExperience").val();
  userLicenses= $("#certifiedLicenses").val();
  userLicenseStates= $("#certifiedStates").val();
  userLanguages = $("#languages").val();
  userWorkAuthorization= $("#workAuthorization").val();

  userProfessionalProfileObjects = {
    resumeBinary: resumeBinary,
    userName: userName,
    userZipCode: userZipCode,
    userProfession: userProfession,
    userYearsOfExperience: userYearsOfExperience,
    userLicenses: userLicenses,
    userLicenseStates: userLicenseStates,
    userLanguages: userLanguages,
    userWorkAuthorization: userWorkAuthorization,
  }

  $.each(userProfessionalProfileObjects, function(key, value){
    if (value === "" || value === null || value == undefined){
      delete userProfessionalProfileObjects[key];
    }
  });

  url = 'usersDB/professional/'+firebase.auth().currentUser.uid+'/professionalProfile';

  userDB = firebaseDB.ref(url).set(userProfessionalProfileObjects);

  location.href="/userRegistration/preference/selection.html";
}

var medicalProfession = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists"];
var yearsOfExperience = ["1-2 Years", "3-5 Years", "5-7 Years", "7+ Years"];
var currentEmployerLocation = ["Dallas Metropolitan Area", "New York Metropolitan Area"];
var certifiedLicenses = ["RN Nursing License", "APN Acute Pain Nurse", "APRN Advanced Nurse Practitioner"];
var certifiedStates = ["NC North Carolina", "SC South Carolina", "TX Texas"];
var languages = ["Russian", "Korean", "Polish", "Spanish", "French"];
var workAuthorization = ["US Citizen or Permanent Resident", "No Sponsorship Required", "Sponsorship Required"];

$(document).ready(function() {

  setTimeout(function(){ loadEnteredInformationFromServer(); }, 4500);

  $("#medicalProfession").select2();
  $("#medicalProfession").select2({
    placeholder: "Relevant Field(s)"
  });

  $("#yearsOfExperience").select2();
  $("#yearsOfExperience").select2({
    placeholder: "i.e. 2-5 Years"
  });

  $("#certifiedLicenses").select2();
  $("#certifiedLicenses").select2({
    placeholder: "i.e. RN Nursing License"
  });

  $("#certifiedStates").select2();
  $("#certifiedStates").select2({
    placeholder: "i.e. NC North Carolina"
  });

  $("#languages").select2();
  $("#languages").select2({
    placeholder: "i.e. Korean"
  });

  $("#workAuthorization").select2();
  $("#workAuthorization").select2({
    placeholder: "i.e. US Citizen"
  });

  medicalProfession.forEach(function(profession) {
    $("#medicalProfession").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

  yearsOfExperience.forEach(function(profession) {
    $("#yearsOfExperience").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

  certifiedLicenses.forEach(function(profession) {
    $("#certifiedLicenses").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

  certifiedStates.forEach(function(profession) {
    $("#certifiedStates").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

  languages.forEach(function(profession) {
    $("#languages").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

  workAuthorization.forEach(function(profession) {
    $("#workAuthorization").append(
      "<option class="+profession+"value="+profession+">"+profession+"</option>"
    )
  })

});

