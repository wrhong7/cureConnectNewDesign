function addNonUserHeader() {

	$(".headerSection").empty();
	$(".headerSection").append(
		`
			<div class="">
				<div class="loginButton">
					Login
				</div>   
				<div 
					class="registerationButton"
					onclick='location.href="userRegisteration/signUp.html"'
				>
					Sign Up
				</div>
			</div>
		`
	)
}

function addUserHeader(userName) {
	$(".headerSection").empty();
	$(".headerSection").append(
		`
			<div class="">
				Welcome ${userName}
			</div>
		`
	);
}