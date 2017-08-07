function restorePWClicked() {

	var emailEntered = $(".emailPWReset").val()

	var auth = firebase.auth();

	console.log(emailEntered)
	
	var emailAddress = emailEntered;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	  // Email sent.
	}).catch(function(error) {
	  // An error happened.
	});

}


