function highlightOptionButton(selector) {
	$(".optionHealthcareProfessonal").css("background-color", "#F3F3F3");
	$(".optionHospitalRecruiter").css("background-color", "#F3F3F3");
	$(".optionIndepndentRecruiter").css("background-color", "#F3F3F3");
	$(selector).css("background-color", "#e56262");
}	

function clickAccountType(accountType) {
	if (accountType == "healthcareProfessional") {
		$(".userTypeSelection").val("professional");
		highlightOptionButton(".optionHealthcareProfessonal");
	} else if (accountType == "hospitalRecruiter") {
		$(".userTypeSelection").val("hospitalRecruiter");
		highlightOptionButton(".optionHospitalRecruiter");
	} else if (accountType == "independentRecruiter") {
		$(".userTypeSelection").val("independentRecruiter");
		highlightOptionButton(".optionIndepndentRecruiter");
	}
}

function pageRedirectionBasedOnUserType(userType) {
	if (userType == "professional") {
		window.location.href="/userRegisteration/resume/upload"
	} else if (userType == "hospitalRecruiter") {
		window.location.href="/userRegisteration/hospitalRecruiters/basicInfo"
	} else if (userType == "independentRecruiter") {
		window.location.href="/userRegisteration/independentRecruiters/recruitingAgencyInfo"
	}	
}