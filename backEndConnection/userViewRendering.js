function renderNonUserView() {
	addNonUserHeader();
	$(".nonUserView").css("cssText", "display: inline-block;");
	$(".userView").css("cssText", "display: none;");
}

function renderUserView() {
	addUserHeader("Won Jun");
	$(".nonUserView").css("cssText", "display: none;");
	$(".userView").css("cssText", "display: inline-block;");
}