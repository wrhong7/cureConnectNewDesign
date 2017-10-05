var selectedFieldsEntryDict = {
  emailApplicationScheduled: false,
  emailInterviewScheduled: false,
  emailMessagesReceived: false,
  emailJobRecommendation: false,
  messageApplicationReceived: false,
  messageInterviewScheduled: false,
  messageMessageReceived: false,
  messageJobRecommendation: false
}

function selectThisField(id) {
  console.log(id)
  if (selectedFieldsEntryDict[id] == true){
    $("#"+id).css("background-color", "white");
    selectedFieldsEntryDict[id] = false;
  } else {
    $("#"+id).css("background-color", "#009EB3");
    selectedFieldsEntryDict[id] = true;
  }
}

function sendConfCodeButtonClicked() {
  phoneNumberEntered = $(".phoneConfirmation").val();
  x = phoneNumberEntered.replace(/-/g, '');
  console.log(x);
  $(".phoneConfirmation").val('');
  $(".phoneConfirmation").attr("placeholder", "Please enter your confirmation code here")
  $(".enterMobilePhoneButton").css("display", "none");
  $(".submitCodeButton").css("display", "inline");
  $(".sendCodeButton").css("display", "inline");
}

$( document ).ready(function() {
  setTimeout(function(){
    $(".emailConfirmation").val(firebase.auth().currentUser.email);
  }, 3000);
});
