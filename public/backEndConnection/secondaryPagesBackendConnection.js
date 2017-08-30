$(document).ready(function() {

	firebase.initializeApp(config);
	firebaseDB = firebase.database();
    firebaseAuth = firebase.auth();
	provider = new firebase.auth.GoogleAuthProvider();

	//Backend database is loaded after the firebase has been fully connected
	window.onload = function() { 
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
		}, 3000);

	}
});