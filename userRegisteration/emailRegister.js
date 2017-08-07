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
	var emailEntered = $(".userEmail").val();
	var pwEntered = $(".userPW").val();
	var pwConfirmation = $(".userPWConfirmation").val();
	var emailCheck = validateEmail(emailEntered);

	console.log(userType);

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
				userDB = firebaseDB.ref(firebase.auth().currentUser.uid).set({
					userProfile: {
						userID: firebase.auth().currentUser.uid,
						userEmail: firebase.auth().currentUser.email,
						userName: firebase.auth().currentUser.displayName	
					}
				});

				console.log("the user has been registered")

			}).then(function(){
				window.location.href = "/index.html";
			});		
		} else {
			triggerRegErrorMessage("pwMatching");
		}
	} else {
		triggerRegErrorMessage("emailNotValid");
	}
}







