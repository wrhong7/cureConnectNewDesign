function emptyMessageSection() {
	$(".forgotPasswordErrorMessageSection").empty();
}

function restorePWClicked() {
	var emailEntered = $(".emailPWReset").val()
	var auth = firebase.auth();
	var emailAddress = emailEntered;
	auth.sendPasswordResetEmail(emailAddress).then(function() {
		emptyMessageSection();
		$(".forgotPasswordErrorMessageSection").append("Please check your email ("+emailAddress+")");
	}).catch(function(error) {
		if (error.code == "auth/invalid-email") {
			emptyMessageSection();
			$(".forgotPasswordErrorMessageSection").append("Please enter a valid email address.");
		} else if (error.code == "auth/user-not-found") {
			emptyMessageSection();
			$(".forgotPasswordErrorMessageSection").append("We do not have this account registered.");
		}
	});

}


