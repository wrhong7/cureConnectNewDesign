//Resume Uploader:
var resumePDFBinary;

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

var medicalProfession = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists"];
var yearsOfExperience = ["1-2 Years", "3-5 Years", "5-7 Years", "7+ Years"];
var currentEmployerLocation = ["Dallas Metropolitan Area", "New York Metropolitan Area"];
var certifiedLicenses = ["RN Nursing License", "APN Acute Pain Nurse", "APRN Advanced Nurse Practitioner"];
var certifiedStates = ["NC North Carolina", "SC South Carolina", "TX Texas"];
var languages = ["Russian", "Korean", "Polish", "Spanish", "French"];
var workAuthorization = ["US Citizen or Permanent Resident", "No Sponsorship Required", "Sponsorship Required"];

$(document).ready(function() {
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
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  yearsOfExperience.forEach(function(profession) {
    $("#yearsOfExperience").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  certifiedLicenses.forEach(function(profession) {
    $("#certifiedLicenses").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  certifiedStates.forEach(function(profession) {
    $("#certifiedStates").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  languages.forEach(function(profession) {
    $("#languages").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  workAuthorization.forEach(function(profession) {
    $("#workAuthorization").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

});

