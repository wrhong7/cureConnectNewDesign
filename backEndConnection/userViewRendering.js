function showNonUserDashboard() {
	$(".nonUserView").css("cssText", "display: inline-block;");
	$(".userView").css("cssText", "display: none;");
}

function showUserDashboard() {
	$(".nonUserView").css("cssText", "display: none;");
	$(".userView").css("cssText", "display: inline-block;");	
}


function renderNonUserView() {
	addNonUserHeader();
	showNonUserDashboard();
}

function renderUserView(userName, userType, profileCompletionStatus) {
	console.log(userType)
	addUserHeader(userName);
	showUserDashboard();
}