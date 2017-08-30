var userInfomation;

var config = {
	apiKey: "AIzaSyBF3JnpTUuSgzRfWWw9EWG9cDMmTgfC46M",
	authDomain: "cureconnectdevenv.firebaseapp.com",
	databaseURL: "https://cureconnectdevenv.firebaseio.com",
	projectId: "cureconnectdevenv",
	storageBucket: "cureconnectdevenv.appspot.com",
	messagingSenderId: "784234563595"
};

var firebaseAuth;

var provider;

var userDB; //setting up the global variable as user data will be loaded after creating a session

var userType; //loaded from DB

function hideEmployerNameForNonUsers() {
	console.log("triggered")
	$(".employerName").empty();
	$(".employerName").append("Employer names are visible after you sign up");
}

function callFirebase() { 

	if (document.readyState === 'complete') {
	    // if userid is not, render addNonUserHeader() to add the header to all main pages
   		// if userid is verified, render addUserHeader(user information details) to add the header
		userInfomation = firebase.auth().currentUser;

		if (userInfomation === null) {
			renderNonUserView();
		} else {
		//There is one case 
			// var userData;
			userData = firebase.database().ref('usersDB/allUsers/'+userInfomation.uid);
			userData.on('value', function(data) {
				var userDataDecrypted = data.val();
				if (userDataDecrypted == null) {
					console.log("force move the user to register section")
					//There might be a weird case where a user will fail to register with google
					//but directly logs in with google, a case in which registeraton is not complete.
					//for this case, we will force user to register by redirecting them.
				} else {
          userType = userDataDecrypted["userProfile"].userType;
          userCompletionStatus = userDataDecrypted["userProfile"].completionStatus;
					if (userInfomation == null) {
						userName = userDataDecrypted["userProfile"].userName;
						console.log(userName);
            renderUserView(userName, userType, userCompletionStatus);
					} else {
            renderUserView(userInfomation.displayName, userType, userCompletionStatus);
					}
				}

			})	
		}
	}
}

$(document).ready(function() {

	firebase.initializeApp(config);
	firebaseDB = firebase.database();
    firebaseAuth = firebase.auth();
	provider = new firebase.auth.GoogleAuthProvider()
	userInfomation = firebase.auth().currentUser;

	setTimeout(function() {
		callFirebase();
	}, 2000)
});

