function showNonUserDashboard() {
	$(".howItWorks").css("display", "inline-block");
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

	if (profileCompletionStatus == "preCompletion") {
		//if user is not fully registered, they should be redirected to the registeration section.
		//Depending on the user, user should be redirected to either the recruiter or professional registeration section.
		console.log("This user did not finish the registeration")

		// $(".postCompletionView").css("cssText", "display: none;");
		// $(".preCompletionView").css("cssText", "display: inline-block;");
		if (userType == "professional") {
			$(".finishRegisterationForProfessionals").css("cssText", "display: inline-block;");
		} else if (userType == "hospitalRecruiter") {
			$(".finishRegisterationForRecruiters").css("cssText", "display: inline-block;");
		} else if (userType == "independentRecruiter") {
			$(".independentRecruiterPreCompletionView").css("cssText", "display: inline-block;");
		}
	} else if (profileCompletionStatus == "postCompletion") {
		//if user profile is completed, they should be allowed to click each one's dashbaord.


    // dashboardForRecruiters
    // dashboardForProfessionals

		$(".preCompletionView").css("cssText", "display: none;");
		$(".postCompletionView").css("cssText", "display: inline-block;");
		if (userType == "professional") {
			$(".dashboardForProfessionals").css("cssText", "display: inline-block;");
		} else if (userType == "hospitalRecruiter") {
			$(".dashboardForRecruiters").css("cssText", "display: inline-block;");
		} else if (userType == "independentRecruiter") {
			$(".independentRecruiterCompletionView").css("cssText", "display: inline-block;");
		}
	}
}

function renderNonUserView() {
	$(".bufferForSignUpMessage").css("display", "none")
	addNonUserHeader();
	showNonUserDashboard();
}

function renderUserView(userName, userType, profileCompletionStatus) {
	addUserHeader(userName);
	showUserDashboard(userType, profileCompletionStatus);
}
