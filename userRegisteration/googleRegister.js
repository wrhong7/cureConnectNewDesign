var userType;

function googleRegister() {

	userType = $(".userTypeSelection").val();

	console.log(userType);

	firebaseAuth.signInWithPopup(provider).then(function(result) {

		firebaseDB = firebase.database();
		
		userDB = firebaseDB.ref(firebase.auth().currentUser.uid).set({
			userProfile: {
				userID: firebase.auth().currentUser.uid,
				userEmail: firebase.auth().currentUser.email,
				userName: firebase.auth().currentUser.displayName,
				userType: userType,
				completionStatus: "preCompletion"
			}
		});
		//Once you are done, the browser will be redirected to your index page to 
		//confirm your dahsboard. Once you get to the index page,
		//user redentials will be recalled, and infomration will be fetched.
		window.location.href="/index.html"

	}).then(function() {
		console.log("registered")
	})	
}

