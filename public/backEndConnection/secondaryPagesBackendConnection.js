$(document).ready(function() {

	firebase.initializeApp(config);
	firebaseDB = firebase.database();
	firebaseAuth = firebase.auth();
	provider = new firebase.auth.GoogleAuthProvider();

	//Backend database is loaded after the firebase has been fully connected
	setTimeout(function(){ 
		if (document.readyState === 'complete') {
	    // if userid is not, render addNonUserHeader() to add the header to all main pages
   		// if userid is verified, render addUserHeader(user information details) to add the header
			userInfomation = firebase.auth().currentUser;
			if (userInfomation === null) {
				renderNonUserView();
			} else {
			//There is one case 
				// var userData;
				userType = firebase.database().ref('usersDB/allUsers/'+userInfomation.uid);	
				userType.on('value', function(data) {
					userDataDecrypted = data.val();
					isUserProfessionalOrRecruiter = userDataDecrypted["userProfile"].userType
					console.log(isUserProfessionalOrRecruiter);
					userData = firebase.database().ref('usersDB/'+isUserProfessionalOrRecruiter+'/'+userInfomation.uid);
					userData.on('value', function(data) {
						userDataDecrypted = data.val();
						console.log(userDataDecrypted);
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
		            			renderUserView(userName, userType, userCompletionStatus);
							} else {
		            			renderUserView(userInfomation.displayName, userType, userCompletionStatus);
							}
						}
					})	
				})
			}
		}
	}, 4000);
});