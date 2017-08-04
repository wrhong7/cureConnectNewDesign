var userInfomation = null;



$( document ).ready(function() {

	// this javascript is used to centralize all the sessions

 //    var firebaseAuth = firebase.auth();
	// var provider = new firebase.auth.GoogleAuthProvider();

	// firebaseAuth.signInWithPopup(provider).then(function(result) {

	// 	firebaseDB = firebase.database();

	// 	localStorage.setItem('userInfo', JSON.stringify(result.user));

	// 	console.log("localItemset");

	// 	userDB = firebaseDB.ref(firebase.auth().currentUser.uid).set({
	// 		userProfile: {
	// 			userID: firebase.auth().currentUser.uid,
	// 			userEmail: firebase.auth().currentUser.email,
	// 			userName: firebase.auth().currentUser.displayName,
	// 			userType: userType		
	// 		}
	// 	});

	// }).then(function() {
	// 	window.location.href = "/professionalsDashboard/myStory.html";
	// })

	// if userid is not, render addNonUserHeader() to add the header to all main pages

	if (userInfomation === null) {
		renderNonUserView();
	} else {
		renderUserView();
	}

	// if userid is verified, render addUserHeader(user information details) to add the header


});