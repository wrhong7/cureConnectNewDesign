var userType;

function googleRegister() {

	userType = $(".userTypeSelection").val();

	console.log(userType);

	firebaseAuth.signInWithPopup(provider).then(function(result) {

		firebaseDB = firebase.database();

		userDB = firebaseDB.ref('usersDB/allUsers/'+firebase.auth().currentUser.uid).set({
			userProfile: {
				userID: firebase.auth().currentUser.uid,
				userEmail: firebase.auth().currentUser.email,
				userName: firebase.auth().currentUser.displayName,
				userType: userType,
				completionStatus: "preCompletion"
			}
		});

		if (userType == "professional") {
			userDB = firebaseDB.ref('usersDB/professional/'+firebase.auth().currentUser.uid).set({
				userProfile: {
					userID: firebase.auth().currentUser.uid,
					userEmail: firebase.auth().currentUser.email,
					userName: firebase.auth().currentUser.displayName,
					userType: userType,
					completionStatus: "preCompletion"
				}
			});
		} else if (userType == "hospitalRecruiter") {
			userDB = firebaseDB.ref('usersDB/hospitalRecruiter/'+firebase.auth().currentUser.uid).set({
				userProfile: {
					userID: firebase.auth().currentUser.uid,
					userEmail: firebase.auth().currentUser.email,
					userName: firebase.auth().currentUser.displayName,
					userType: userType,
					completionStatus: "preCompletion"
				}
			});
		} else if (userType == "independentRecruiter") {
			userDB = firebaseDB.ref('usersDB/independentRecruiter/'+firebase.auth().currentUser.uid).set({
				userProfile: {
					userID: firebase.auth().currentUser.uid,
					userEmail: firebase.auth().currentUser.email,
					userName: firebase.auth().currentUser.displayName,
					userType: userType,
					completionStatus: "preCompletion"
				}
			});
		}
		//Once you are done, the browser will be redirected to your index page to 
		//confirm your dahsboard. Once you get to the index page,
		//user redentials will be recalled, and infomration will be fetched.
		window.location.href="/index.html"

	}).then(function() {
		console.log("registered")
	})	
}

