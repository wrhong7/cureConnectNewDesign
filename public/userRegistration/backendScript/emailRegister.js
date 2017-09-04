function userTypeSelected() {
	userType = $(".userTypeSelection").val();
	localStorage.setItem('userType', userType);
	location.href="credential.html"; 
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function addErrorMessage(errorMessage) {
	$(".errorMessageSection").empty();
	$(".errorMessageSection").append(errorMessage);
}

function triggerRegErrorMessage(errorMessage) {
	if (errorMessage == "pwMatching") {
		addErrorMessage("Passwords are not matching");
	} else if (errorMessage == "auth/weak-password") {
		addErrorMessage("Password needs to be more complicated");
	} else if (errorMessage == "auth/email-already-in-use") {
		addErrorMessage("This email has been registered<br><u>Click here</u> to reset password");
	} else if (errorMessage == "emailNotValid") {
		addErrorMessage("Email is not valid");
	}
}

function emailPWRegisteration() {
	userType = localStorage.getItem('userType');
	console.log(userType)
	var emailEntered = $(".userEmail").val();
	var pwEntered = $(".userPW").val();
	var pwConfirmation = $(".userPWConfirmation").val();
	var emailCheck = validateEmail(emailEntered);

	if (emailCheck == true) {
		if (pwEntered == pwConfirmation) {
			firebase.auth().createUserWithEmailAndPassword(emailEntered, pwEntered).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				console.log(errorCode)
				var errorMessage = error.message;
				triggerRegErrorMessage(errorCode);
				// ...
			}).then(function() {

				firebaseDB = firebase.database();

				userDB = firebaseDB.ref('usersDB/allUsers/'+firebase.auth().currentUser.uid).set({
					userProfile: {
						userID: firebase.auth().currentUser.uid,
						userEmail: firebase.auth().currentUser.email,
						userName: firebase.auth().currentUser.displayName,
						userType: userType,
						completionStatus: "preCompletion"
					}
				});

				if (userType == "professional") {
					//this database is configured to mirror one another in order to leverage on analytics at the later stage
					userDB = firebaseDB.ref('usersDB/professional/'+firebase.auth().currentUser.uid).set({
						userProfile: {
							userID: firebase.auth().currentUser.uid,
							userEmail: firebase.auth().currentUser.email,
							userName: firebase.auth().currentUser.displayName,
							userType: userType,
							completionStatus: "preCompletion"
						}
					});
				} else if (userType == "hospitalRecruiter") {
					userDB = firebaseDB.ref('usersDB/hospitalRecruiter/'+firebase.auth().currentUser.uid).set({
						userProfile: {
							userID: firebase.auth().currentUser.uid,
							userEmail: firebase.auth().currentUser.email,
							userName: firebase.auth().currentUser.displayName,
							userType: userType,
							completionStatus: "preCompletion"
						}
					});
				} else if (userType == "independentRecruiter") {
					userDB = firebaseDB.ref('usersDB/independentRecruiter/'+firebase.auth().currentUser.uid).set({
						userProfile: {
							userID: firebase.auth().currentUser.uid,
							userEmail: firebase.auth().currentUser.email,
							userName: firebase.auth().currentUser.displayName,
							userType: userType,
							completionStatus: "preCompletion"
						}
					});
				}
			}).then(function(){
				pageRedirectionBasedOnUserType(userType)
			});		
		} else {
			triggerRegErrorMessage("pwMatching");
		}
	} else {
		triggerRegErrorMessage("emailNotValid");
	}
}







