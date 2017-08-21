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
	$(".headerLoginSection").empty();
	showNonUserDashboard();
	$(".headerLoginSection").append(	
		'<div class="headerButtonContainer">'+ 
			'<div class="loginButton headerButtons" onclick="moveToLoginPage()">Login</div>' + 
			'<div class="registerationButton headerButtons" onclick="goToRegisterationSection()">' +
				'Sign Up' +
			'</div>' +
		'</div>'
	);
}

function addUserHeader(userName) {
	$(".headerLoginSection").empty();

	showUserDashboard()
	if (userName === null) {
		$(".headerLoginSection").append(
			'<div class="">' +
				'Welcome<br><div>Profile</div><div onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);
	} else {
		$(".headerLoginSection").append(
			'<div class="">' +
				'Welcome '+userName+'<br><div>Profile</div>' +
				'<div onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);	
	}


}