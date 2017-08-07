function goToRegisterationSection() {
//Warning -- this home URL needs to be changed
	var homeUrl = 'http://localhost:8080/';	
	if (document.URL == homeUrl) {
	    location.href="userRegisteration/signUp.html"
	} else {
	    location.href="/userRegisteration/signUp.html"
	}
}

function moveToLoginPage() {
	location.href="/userLogInOut/in.html"
	console.log("redirectd")
}

function addNonUserHeader() {
	$(".headerSection").empty();
	showNonUserDashboard();
	$(".headerSection").append(	
		'<div>'+ 
			'<div class="loginButton" onclick="moveToLoginPage()">Login</div>' + 
			'<div class="registerationButton" onclick="goToRegisterationSection()">' +
				'Sign Up' +
			'</div>' +
		'</div>'
	);
}

function addUserHeader(userName) {
	$(".headerSection").empty();
	showUserDashboard()
	if (userName === null) {
		$(".headerSection").append(
			'<div class="">' +
				'Welcome<br><div>Profile</div><div onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);
	} else {
		$(".headerSection").append(
			'<div class="">' +
				'Welcome '+userName+'<br><div>Profile</div>' +
				'<div onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);	
	}


}