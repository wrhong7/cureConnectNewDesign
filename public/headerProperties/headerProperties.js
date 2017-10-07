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
  $(".dashboardButton").css("display", "none");

  // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
   //  console.log("nonMobile");
  // } else {
  	// console.log("mobile");
   //  $(".howItWorks").css("display", "inline-block");
	// }

	$(".headerLoginSection").empty();
	showNonUserDashboard();
	$(".headerLoginSection").append(	
		'<div class="headerButtonContainer">'+ 
			'<div class="headerForEmployersButton button" onclick="moveToEmployerSection()">Employer\'s Section</div>'+
			'<div class="loginButton headerButtons button" onclick="moveToLoginPage()">Login</div>' +
			'<div class="registerationButton headerButtons button" onclick="goToRegisterationSection()">' +
				'Sign Up' +
			'</div>' +
		'</div>'
	);
}

function addUserHeader(userName) {
  $(".headerLoginSection").empty();
  $(".dashboardButton").css("display", "inline-block");
  $(".howItWorks").css("display", "none");
	showUserDashboard();
	if (userName === null) {
		$(".headerLoginSection").append(
			'<div class="userLoginCredentials">' +
				'<div class="welcomeAndName">Welcome</div>'+
				'<div class="userProfileButton button">Profile</div>'+
				'<div class="userLogOutButton button" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);
	} else {
		console.log("this has been rendered")
		firstNameOnly = userName.substr(0,userName.indexOf(' '));
		$(".headerLoginSection").append(
			'<div class="userLoginCredentials">' +
				'<div class="welcomeAndName">Hi '+firstNameOnly+'<br></div>'+
				'<div class="userProfileButton button">Profile</div>' +
				'<div class="userLogOutButton button" onclick="logOutButtonClicked()">Log Out</div>' +
			'</div>'
		);	
	}
}