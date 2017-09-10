function goToRegisterationSection() {
//Warning -- this home URL needs to be changed
	var homeUrl = 'http://localhost:8080/';	
	if (document.URL == homeUrl) {
	    location.href="userRegistration/signUp.html"
	} else {
	    location.href="/userRegistration/signUp.html"
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
			'<div class="headerForEmployersButton">For Employers</div>'+
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
			'<div class="userLoginCredentials">' +
				'Welcome<br><div class="userProfileButton">Profile</div>'+
				'<div class="userLogOutButton" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);
	} else {
		console.log("this has been rendered")
		$(".headerLoginSection").append(
			'<div class="userLoginCredentials">' +
				'Welcome '+userName+'<br>'+
				'<div class="userProfileButton">Profile</div>' +
				'<div class="userLogOutButton" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);	
	}
}