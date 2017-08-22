//User Logout Session
function userLogOut() {
	firebase.auth().signOut().then(function() {
		userInfomation = null;
	}).catch(function(error) {
		console.log("Sorry. Try again.")
	})
}

function logOutButtonClicked() {
	userLogOut();
	addNonUserHeader();
}