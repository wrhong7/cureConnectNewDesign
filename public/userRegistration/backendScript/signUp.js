function highlightOptionButton(selector) {
	$(".optionHealthcareProfessonal").css("background-color", "#E4F5FE");
	$(".optionHospitalRecruiter").css("background-color", "#E4F5FE");
	$(".optionIndepndentRecruiter").css("background-color", "#E4F5FE");
	$(selector).css("background-color", "#A4DEE0");
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
		window.location.href="/userRegistration/resume/upload.html"
	} else if (userType == "hospitalRecruiter") {
		window.location.href="/userRegistration/hospitalRecruiters/basicInfo.html"
	} else if (userType == "independentRecruiter") {
		window.location.href="/userRegistration/independentRecruiters/recruitingAgencyInfo.html"
	}	
}