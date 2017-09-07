var professionalFields = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists"]

$(document).ready(function() {
  $("#professionalFields").select2();
  $("#zipCodeEntry").select2();

  $("#professionalFields").select2({
    placeholder: "Enter Keywords and Select as many as possible "
  });

  $("#zipCodeEntry").select2({
    placeholder: "Zip Code"
  });

  professionalFields.forEach(function(profession) {
    $("#professionalFields").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  professionalFields.forEach(function(profession) {
    $("#zipCodeEntry").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

});