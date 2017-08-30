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

// This is subjected to change as we implement whether one is recruiter vs. talents

$( document ).ready(function() {

	firebase.initializeApp(config);
	firebaseDB = firebase.database();
    firebaseAuth = firebase.auth();
	provider = new firebase.auth.GoogleAuthProvider()
	userInfomation = firebase.auth().currentUser;

	setTimeout(
		function() { 
			if (document.readyState === 'complete') {
			    // if userid is not, render addNonUserHeader() to add the header to all main pages
		   		// if userid is verified, render addUserHeader(user information details) to add the header
				userInfomation = firebase.auth().currentUser;
				if (userInfomation === null) {
					renderNonUserView();
				} else {
				//There is one case 
					var userData;
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

              console.log("logging")

              if (userInfomation.displayName == null) {
                userName = userDataDecrypted["userProfile"].userName;
                renderUserView(userName, userType, userCompletionStatus);
              } else {
                renderUserView(userName, userType, userCompletionStatus);
							}

						}

					})	
				}
			}
		}, 2000
	)


//WARNING -- this needs to be fixed. How would I know someone will be able to fetch his
//or her information within one second?

});


