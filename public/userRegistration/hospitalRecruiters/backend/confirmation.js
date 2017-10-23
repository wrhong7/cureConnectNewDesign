var emailContactInfo = {
  // email: "wjh261@stern.nyu.edu",
  appReceivedNotification: true,
  interviewScheduledNotification: true,
  messageReceivedNotification: true,
  candidateRecommendationNotification: true,
};

var cellContactInfo = {
  // cell: "3476107626",
  appReceivedNotification: true,
  interviewScheduledNotification: true,
  messageReceivedNotification: true,
  candidateRecommendationNotification: true,
};

function loadCellPhoneNumberAndUpdateOnThePage() {
  if (cellContactInfo["cell"] != null) {
    cellNumber = cellContactInfo["cell"];
    cellNumberReorganized = cellNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    $(".phoneConfirmation").val(cellNumberReorganized);
  }
}

function loadContactInformationFromServer(emailOrCell) {
  currentUser = firebase.auth().currentUser.uid;
  firebaseDB = firebase.database();
  url = "usersDB/hospitalRecruiter/"+currentUser;

  userProfileInfo = firebase.database().ref(url);
  userProfileInfo.on('value', function(data) {

    recruiterProfileURL = emailOrCell == "email" ?
      'usersDB/hospitalRecruiter/'+currentUser+'/emailContactInfo' :
      'usersDB/hospitalRecruiter/'+currentUser+'/cellContactInfo';

    dictToBeChanged = emailOrCell == "email" ?
      emailContactInfo : cellContactInfo;

    recruiterData = firebase.database().ref(recruiterProfileURL);

    recruiterData.on('value', function(data) {
      recruiterAttributes = data.val();

      if (recruiterAttributes != null) {
        if (emailOrCell == "email") {
          emailContactInfo = recruiterAttributes;
        }

        if (emailOrCell == "cell") {
          cellContactInfo = recruiterAttributes;
        }
      }



      if (recruiterAttributes != null) {
        recruiterAttributesObjectKeys = Object.keys(recruiterAttributes);
        recruiterAttributesObjectKeys.forEach(function(objectKey) {
          if (objectKey == "email") {
            dictToBeChanged["email"] = recruiterAttributes[objectKey];
          }
          if (objectKey == "cell") {
            dictToBeChanged["cell"] = recruiterAttributes[objectKey];
          }
          if (objectKey == "appReceivedNotification") {
            dictToBeChanged["appReceivedNotification"] = recruiterAttributes[objectKey];
            changeButtonColor(emailOrCell, "appReceivedNotification");
          }
          if (objectKey == "interviewScheduledNotification") {
            dictToBeChanged["interviewScheduledNotification"] = recruiterAttributes[objectKey];
            changeButtonColor(emailOrCell, "interviewScheduledNotification");
          }
          if (objectKey == "messageReceivedNotification") {
            dictToBeChanged["messageReceivedNotification"] = recruiterAttributes[objectKey];
            changeButtonColor(emailOrCell, "messageReceivedNotification");
          }
          if (objectKey == "candidateRecommendationNotification") {
            dictToBeChanged["candidateRecommendationNotification"] = recruiterAttributes[objectKey];
            changeButtonColor(emailOrCell, "candidateRecommendationNotification");
            console.log(dictToBeChanged);
          }
        });
      }

    });

  })
  setTimeout(function(){ loadCellPhoneNumberAndUpdateOnThePage(); }, 300);

}

function submitContactInformationToServer() {

  //pinging updated email and cell phone number to the database

  emailContactInfo["email"] = $(".emailConfirmation").val();
  cellContactInfo["cell"] = $(".phoneConfirmation").val();

  emailUrl = 'usersDB/hospitalRecruiter/'+firebase.auth().currentUser.uid+'/emailContactInfo';
  cellUrl = 'usersDB/hospitalRecruiter/'+firebase.auth().currentUser.uid+'/cellContactInfo';

  userDB = firebaseDB.ref(emailUrl).set(emailContactInfo);
  userDB = firebaseDB.ref(cellUrl).set(cellContactInfo);

  location.href="/"
}

function changeButtonColor(emailOrCell, buttonType) {
  classNameToBeChanged = "."+emailOrCell+buttonType;
  contactInfo = emailOrCell == "email" ?
    emailContactInfo : cellContactInfo;

  contactInfo[buttonType] ?
    $(classNameToBeChanged).css("background-color", "#92CC47") :
    $(classNameToBeChanged).css("background-color", "white") ;

  contactInfo[buttonType] ?
    $(classNameToBeChanged).css("color", "white") :
    $(classNameToBeChanged).css("color", "#16436A") ;

  // contactInfo[buttonType] ?
  //   $(classNameToBeChanged).css("border-color", "#EC4545") :
  //   $(classNameToBeChanged).css("border-color", "#16436A") ;
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

$(document).ready(function() {
  emailObjectKeys = Object.keys(emailContactInfo);
  cellObjectKeys = Object.keys(cellContactInfo);

  emailObjectKeys.splice(0,1);
  cellObjectKeys.splice(0,1);

  setTimeout(function() {
    $(".emailConfirmation").val(firebase.auth().currentUser.email);
    loadContactInformationFromServer("email");
    loadContactInformationFromServer("cell");
  }, 5000);
});
