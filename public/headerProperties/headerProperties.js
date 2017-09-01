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
	console.log("redirect")
}

function moveToEmployerSection() {
  location.href="/for/for.html"
}

function addNonUserHeader() {
	$(".headerLoginSection").empty();
	showNonUserDashboard();
	$(".headerLoginSection").append(	
		'<div class="headerButtonContainer">'+ 
			'<div class="headerForEmployersButton" onclick="moveToEmployerSection()">Employer\'s Section</div>'+
			'<div class="loginButton headerButtons" onclick="moveToLoginPage()">Login</div>' + 
			'<div class="registerationButton headerButtons" onclick="goToRegisterationSection()">' +
				'Sign Up' +
			'</div>' +
		'</div>'
	);
}

function addUserHeader(userName) {
	$(".headerLoginSection").empty();
	showUserDashboard();
	if (userName === null) {
		$(".headerLoginSection").append(
			'<div class="userLoginCredentials">' +
				'<div class="welcomeAndName">Welcome</div>'+
				'<div class="userProfileButton">Profile</div>'+
				'<div class="userLogOutButton" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);
	} else {
		console.log("this has been rendered")
		firstNameOnly = userName.substr(0,userName.indexOf(' '));
		$(".headerLoginSection").append(
			'<div class="userLoginCredentials">' +
				'Hi '+firstNameOnly+'<br>'+
				'<div class="userProfileButton">Profile</div>' +
				'<div class="userLogOutButton" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);	
	}
}