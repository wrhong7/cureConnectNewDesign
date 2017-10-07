var professionalFields = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists", "doctor", "nurse", "recruiter", "psychologist", "physical therapists"];

function searchButtonClicked() {
  localStorage['searchPosition'] = $("#professionalFields").val();
  localStorage['zipCode'] = $(".searchZipcodeInputBox").val();
  location.href = "search/Results.html";
}

$(document).ready(function() {
  $("#professionalFields").select2();
  $("#zipCodeEntry").select2();

  $("#professionalFields").select2({
    placeholder: "Relevant Field(s)"
  });

  $("#zipCodeEntry").select2({
    placeholder: "Zip Code"
  });

  professionalFields.forEach(function(profession) {
    $("#professionalFields").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  // professionalFields.forEach(function(profession) {
  //   $("#zipCodeEntry").append(
  //     "<option value="+profession+">"+profession+"</option>"
  //   )
  // })

});