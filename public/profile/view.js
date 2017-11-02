function goToChangeProfileSection() {

	if (userType == "professional") {
		location.href="/userRegistration/resume/upload.html"
	} else if (userType = "hospitalRecruiter") {
		location.href="/userRegistration/hospitalRecruiters/basicInfo.html"
	}

}

function accountSettingTabClicked() {
	$(".centralSection2").css("display","none");
	$(".centralSection1").css("display","inline-block");
	$(".accountSettingTab").css("background-color", "#E9EBEE");
	$(".changePasswordTab").css("background-color", "white");
}

function changePasswordTabClicked() {
	$(".centralSection1").css("display","none");
	$(".centralSection2").css("display","inline-block");
	$(".accountSettingTab").css("background-color", "white");
	$(".changePasswordTab").css("background-color", "#E9EBEE");
}