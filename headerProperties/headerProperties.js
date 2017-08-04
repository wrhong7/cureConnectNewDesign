function addNonUserHeader() {

	$(".headerSection").empty();
	$(".headerSection").append(
		`
			<div class="">
				Login   Sign Up
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