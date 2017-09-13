var professionalFields = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists"];

function fetchSearchResults(searchPosition, zipCode) {
  console.log(searchPosition)
  $("#professionalFields").val(searchPosition);
  $(".searchZipcodeInputBox").val(zipCode);
}

$(document).ready(function() {

  $("#professionalFields").select2();

  professionalFields.forEach(function(profession) {
    $("#professionalFields").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  neighboringZipcodes = ["10001", "10003", "10128", "10028"]
  jobPostingToBeFetched = [];

  fetchSearchResults(localStorage['searchPosition'], localStorage['zipCode']);

  firebase.initializeApp(config);
  firebaseDB = firebase.database();
  neighboringZipcodes.forEach(function(individualZipCode) {
    jobPostingData = firebase.database().ref('jobsDB/'+individualZipCode);
    jobPostingData.on('value', function(data) {
      var keyArray = Object.keys(data.val());
        keyArray.forEach(function(individualKey) {
          jobPostingData = firebase.database().ref('jobsDB/'+individualZipCode+"/"+individualKey);
          jobPostingData.on('value', function(data) {
            console.log(data.val());
          })
        })
    })
  })

  axios.get('https://accesscontrolalloworiginall.herokuapp.com/https://www.zipcodeapi.com/rest/F2OcoqDBV22ksHguZeCcTsWQiTxYNpUssIFR9is4lupNcFibTVoNnlDGebF1Azu3/radius.json/10128/100/km')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  // jobPostingData = firebase.database().ref('jobsDB/zipcodes');
  // jobPostingData.on('value', function(data) {
  //
  //
  // })

  // userData.on('value', function(data) {
  //   var userDataDecrypted = data.val();
  //   if (userDataDecrypted == null) {
  //     console.log("force move the user to register section")
  //     //There might be a weird case where a user will fail to register with google
  //     //but directly logs in with google, a case in which registeraton is not complete.
  //     //for this case, we will force user to register by redirecting them.
  //   } else {
  //     userType = userDataDecrypted["userProfile"].userType;
  //     userCompletionStatus = userDataDecrypted["userProfile"].completionStatus;
  //     if (userInfomation == null) {
  //       userName = userDataDecrypted["userProfile"].userName;
  //       console.log(userName);
  //       renderUserView(userName, userType, userCompletionStatus);
  //     } else {
  //       renderUserView(userInfomation.displayName, userType, userCompletionStatus);
  //     }
  //   }
  // })



  // //Backend database is loaded after the firebase has been fully connected
	// window.onload = function() {
	// 	setTimeout(function(){
	// 		if (document.readyState === 'complete') {
	// 		    // if userid is not, render addNonUserHeader() to add the header to all main pages
	// 	   		// if userid is verified, render addUserHeader(user information details) to add the header
	// 			userInfomation = firebase.auth().currentUser;
  //
	// 			if (userInfomation === null) {
	// 				renderNonUserView();
	// 			} else {
	// 			//There is one case
	// 				// var userData;
	// 				userData = firebase.database().ref('usersDB/allUsers/'+userInfomation.uid);
	// 				userData.on('value', function(data) {
	// 					var userDataDecrypted = data.val();
	// 					if (userDataDecrypted == null) {
	// 						console.log("force move the user to register section")
	// 						//There might be a weird case where a user will fail to register with google
	// 						//but directly logs in with google, a case in which registeraton is not complete.
	// 						//for this case, we will force user to register by redirecting them.
	// 					} else {
	// 						userType = userDataDecrypted["userProfile"].userType;
	// 						userCompletionStatus = userDataDecrypted["userProfile"].completionStatus;
	// 						renderUserView(userInfomation.displayName, userType, userCompletionStatus);
	// 					}
  //
	// 				})
	// 			}
	// 		}
	// 	}, 2000);
  //
	// }
});