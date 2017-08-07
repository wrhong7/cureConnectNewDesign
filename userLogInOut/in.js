console.log("in was called")

function loginWithGoogle() {

	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		//Once you are done, the browser will be redirected to your index page to 
		//confirm your dahsboard. Once you get to the index page,
		//user redentials will be recalled, and infomration will be fetched.
		window.location.href="/index.html"
	}).catch(function(error) {
	  // Handle Errors here.
	  // window.location.href = "logIn.html"
	  // ...
	}).then(
		function() {
			var currentUser = firebase.auth().currentUser;
			var currentUserID = currentUser.uid
			var userData = firebase.database().ref(currentUserID);

			//this must be in a format of string to get the access
			userData.on('value', function(data) {
				var userDataDecrypted = data.val()

				// console.log(data.val())

				// console.log(userDataDecrypted["userProfile"])
				// console.log(userDataDecrypted.userProfile)
				
				if (userDataDecrypted["userProfile"].userType == "professional") {
					window.location.href = "/professionalsDashboard/myStory.html"
				} else if (userDataDecrypted["userProfile"].userType == "recruiter") {
					window.location.href = "/recruitersDashboard/status.html"
				} else {
					console.log("this is clear an error")
				}
			})
		}
	);
}

function passwordLogin() {

	var userEmail = $(".userEmail").val();
	var userPW = $(".userPW").val();

	firebase.auth().signInWithEmailAndPassword(userEmail, userPW).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  console.log(errorCode)
	  console.log(errorMessage)

	  // firebase.database().ref(firebase.auth().currentUser.id)

	  if (errorCode == "auth/invalid-email") {
	  	console.log(errorCode);
	  	$(".errorMessageSection").empty();
	  	$(".errorMessageSection").append("Please check your email.<br>This email is not valid.");
	  } else if (errorCode == "auth/user-not-found") {
	  	console.log(errorCode);
	  	$(".errorMessageSection").empty();
	  	$(".errorMessageSection").append("Please check your email.<br>This email is not registered with Cure Connect");
	  }	else if (errorCode == "auth/wrong-password") {
	  	console.log(errorCode);
	  	$(".errorMessageSection").empty();
	  	$(".errorMessageSection").append("Password is incorrect.<br>Your account can be locked after multiple invalid entries.");
	  } else if (firebase.auth().currentUser.uid !== null) {
	  	console.log(errorCode);
	  	console.log("works")	  	
	  } 

	  // else {
	  // 	window.location.href = "/professionalsDashboard/myStory.html"
	  // }
	  // ...

	}).then(
		function() {
			var currentUser = firebase.auth().currentUser;
			var currentUserID = currentUser.uid
			var userData = firebase.database().ref(currentUserID);

			//this must be in a format of string to get the access
			userData.on('value', function(data) {
				var userDataDecrypted = data.val();

				console.log(userDataDecrypted);

				location.href="/index.html"			

				// // console.log(data.val())

				// // console.log(userDataDecrypted["userProfile"])
				// // console.log(userDataDecrypted.userProfile)
				
				// if (userDataDecrypted["userProfile"].userType == "professional") {
				// 	window.location.href = "/professionalsDashboard/myStory.html"
				// } else if (userDataDecrypted["userProfile"].userType == "recruiter") {
				// 	window.location.href = "/recruitersDashboard/status.html"
				// } else {
				// 	console.log("this is clear an error")
				// }
			})
		}
	);	
}
