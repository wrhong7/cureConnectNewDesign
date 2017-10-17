var emailContactInfo = {
  email: "wjh261@stern.nyu.edu",
  appReceivedNotification: true,
  interviewScheduledNotification: true,
  messageReceivedNotification: true,
  candidateRecommendationNotification: true,
};

var cellContactInfo = {
  cell: "3476107626",
  appReceivedNotification: true,
  interviewScheduledNotification: true,
  messageReceivedNotification: true,
  candidateRecommendationNotification: true,
};

function selectionButtonClicked(emailOrCell, buttonType) {
  emailOrCell === "email" ?
    emailContactInfo[buttonType] = !emailContactInfo[buttonType] :
    cellContactInfo[buttonType] = !cellContactInfo[buttonType];
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
