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

function changeButtonColor(emailOrCell, buttonType) {
  classNameToBeChanged = "."+emailOrCell+buttonType;
  console.log(classNameToBeChanged);
  contactInfo = emailOrCell == "email" ?
    emailContactInfo : cellContactInfo;

  contactInfo[buttonType] ?
    $(classNameToBeChanged).css("background-color", "#EC4545") :
    $(classNameToBeChanged).css("background-color", "white") ;

  contactInfo[buttonType] ?
    $(classNameToBeChanged).css("color", "white") :
    $(classNameToBeChanged).css("color", "#16436A") ;

  contactInfo[buttonType] ?
    $(classNameToBeChanged).css("border-color", "#EC4545") :
    $(classNameToBeChanged).css("border-color", "#16436A") ;
}

function selectionButtonClicked(emailOrCell, buttonType) {
  emailOrCell === "email" ?
    emailContactInfo[buttonType] = !emailContactInfo[buttonType] :
    cellContactInfo[buttonType] = !cellContactInfo[buttonType];
  changeButtonColor(emailOrCell, buttonType);
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

$(document).ready(function () {
  setTimeout(function () {
    $(".emailConfirmation").val(firebase.auth().currentUser.email);
  }, 3000);
});
