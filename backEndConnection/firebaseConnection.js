var userInfomation;

var config = {
	apiKey: "AIzaSyC1emm-nnqa9iXrI8JFrfxmi4nFFFF8vjU",
	authDomain: "cureconnectdev.firebaseapp.com",
	databaseURL: "https://cureconnectdev.firebaseio.com",
	projectId: "cureconnectdev",
	storageBucket: "",
	messagingSenderId: "695867102096"
};

var firebaseAuth;

var provider;

var userDB; //setting up the global variable as user data will be loaded after creating a session

var userType = "employer";

// This is subjected to change as we implement whether one is recruiter vs. talents

$( document ).ready(function() {

	console.log("firebase connection called")

	firebase.initializeApp(config);
	firebaseDB = firebase.database();
    firebaseAuth = firebase.auth();
	provider = new firebase.auth.GoogleAuthProvider()

	setTimeout(
		function() { 
			if(document.readyState === 'complete'){
				userInfomation =  firebase.auth().currentUser;

			    // if userid is not, render addNonUserHeader() to add the header to all main pages
			    // if userid is verified, render addUserHeader(user information details) to add the header
				if (userInfomation === null) {
					console.log("non user view rendered")
					renderNonUserView();
				} else {
					console.log(userInfomation)
					renderUserView(userInfomation.displayName);
				}	
		    }
		}, 1000

//WARNING -- this needs to be fixed. How would I know someone will be able to fetch his
//or her information within one second?

	);

});