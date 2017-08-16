function showNonUserDashboard() {
	$(".nonUserView").css("cssText", "display: inline-block;");
	$(".userView").css("cssText", "display: none;");
}

function emptyOutUserDashboard() {
	$(".userView").css("cssText", "display: none;");
	$(".postCompletionView").css("cssText", "display: none;");
	$(".preCompletionView").css("cssText", "display: none;");
	$(".professionalPreCompletionView").css("cssText", "display: none;");
	$(".hospitalRecruiterPreCompletionView").css("cssText", "display: none;");
	$(".independentRecruiterPreCompletionView").css("cssText", "display: none;");
	$(".professionalCompletionView").css("cssText", "display: none;");
	$(".hospitalRecruiterCompletionView").css("cssText", "display: none;");
	$(".independentRecruiterCompletionView").css("cssText", "display: none;");
}

function showUserDashboard(userType, profileCompletionStatus) {
	$(".nonUserView").css("cssText", "display: none;");
	$(".userView").css("cssText", "display: inline-block;");

	console.log(userType, profileCompletionStatus)

	if (profileCompletionStatus == "preCompletion") {
		$(".postCompletionView").css("cssText", "display: none;");
		$(".preCompletionView").css("cssText", "display: inline-block;");
		if (userType == "professional") {
			$(".professionalPreCompletionView").css("cssText", "display: inline-block;");
		} else if (userType == "hospitalRecruiter") {
			$(".hospitalRecruiterPreCompletionView").css("cssText", "display: inline-block;");
		} else if (userType == "independentRecruiter") {
			$(".independentRecruiterPreCompletionView").css("cssText", "display: inline-block;");
		}
	} else if (profileCompletionStatus == "postCompletion") {
		$(".preCompletionView").css("cssText", "display: none;");
		$(".postCompletionView").css("cssText", "display: inline-block;");
		if (userType == "professional") {
			$(".professionalCompletionView").css("cssText", "display: inline-block;");
		} else if (userType == "hospitalRecruiter") {
			$(".hospitalRecruiterCompletionView").css("cssText", "display: inline-block;");
		} else if (userType == "independentRecruiter") {
			$(".independentRecruiterCompletionView").css("cssText", "display: inline-block;");
		}
	}
}

function renderNonUserView() {
	addNonUserHeader();
	showNonUserDashboard();
}

function renderUserView(userName, userType, profileCompletionStatus) {
	addUserHeader(userName);
	showUserDashboard(userType, profileCompletionStatus);
}