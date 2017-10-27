var incomingContacts = [];

var listOfContacts = [];

var DB = {
	bBSSOBAG7ygj6BARCHQl60Gm3cF2user2: {
		"1509061592558": {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 1",
		},
		"1509061522558": {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 2",
		},
		"1209061592558": {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 3",
		}
	},
	bBSSOBAG7ygj6BARCHQl60Gm3cF2user4: {
		timestamp1: {
			from: "Rachel Simon",
			to: "Sarah Sprull",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Alabama people 1",
		},
		timestamp2: {
			from: "Rachel Simon",
			to: "Sarah Sprull",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Alabama people 2",
		},
		timestamp3: {
			from: "Rachel Simon",
			to: "Sarah Sprull",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Alabama people 3",
		}
	},
	bBSSOBAG7ygj6BARCHQl60Gm3cF2user6: {
		timestamp1: {
			from: "Daniel J Scott",
			to: "Gorkem Garpier",
			timestamp: "2012-12-31-05:44:44",
			message: "We are facists 1",
		},
		timestamp2: {
			from: "Gorkem Garpier",
			to: "Daniel J Scott",
			timestamp: "2012-12-31-05:44:44",
			message: "We are facists 2",
		},
		timestamp3: {
			from: "Daniel J Scott",
			to: "Gorkem Garpier",
			timestamp: "2012-12-31-05:44:44",
			message: "We are facists 3",
		}
	},
	bBSSOBAG7ygj6BARCHQl60Gm3cF2user7: {
		timestamp1: {
			from: "Goksu Kaptanoglu",
			to: "Sinem Binicioglu",
			timestamp: "2012-12-31-05:44:44",
			message: "We hate Won Jun",
		},
		timestamp2: {
			from: "Sinem Binicioglu",
			to: "Goksu Kaptanoglu",
			timestamp: "2012-12-31-05:44:44",
			message: "We ",
		}
	},
}

DBKeyToCall = [];

var incomingMessages;

userId = "user1";

DBKeys = Object.keys(DB);

DBKeys.forEach(function(key) {
	console.log(key);
	subStringToSearch = userId
	if (key.indexOf(subStringToSearch) !== -1) {
		DBKeyToCall.push(key);
	}
});

function pushUserConversationToDB() {
	alphabeticalllyRearrangeSenderAndReceiver = [userId, contactTarget];
	alphabeticalllyRearrangeSenderAndReceiver.sort();
	DBConversationKeyToCall = alphabeticalllyRearrangeSenderAndReceiver[0]+alphabeticalllyRearrangeSenderAndReceiver[1];
	dateNow = Date.now();
	message = $(".conversationTextField").val();
	$(".conversationTextField").val("");
	// DB[DBConversationKeyToCall][dateNow] = {
	// 		from: userId,
	// 		to: contactTarget,
	// 		timestamp: dateNow,
	// 		message: message,
	// }

	//pushing the caht content to the database
	url = 'chatDB/'+DBConversationKeyToCall+'/'+dateNow;
  	userDB = firebaseDB.ref(url).set({
		from: userId,
		to: contactTarget,
		timestamp: dateNow,
		message: message,
  	});
}


function fetchUserConversation(contact) {
	alphabeticalllyRearrangeSenderAndReceiver = [userId, contact];
	alphabeticalllyRearrangeSenderAndReceiver.sort();
	DBConversationKeyToCall = alphabeticalllyRearrangeSenderAndReceiver[0]+alphabeticalllyRearrangeSenderAndReceiver[1];
	contactTarget = contact;

	chatURL = "chatDB/"+DBConversationKeyToCall;
	chatData = firebase.database().ref(chatURL);
	chatData.on('value', function(chat) {
		chatDB = chat.val();
		chatTimestampObjectKey = Object.keys(chatDB);
		chatTimestampObjectKey.reverse();
		$(".dialogueSection").empty();
		chatTimestampObjectKey.forEach(function(key) {
			console.log(key, chatDB[key]["message"]);
			$(".dialogueSection").append(
				`<div class="messageReceived">${chatDB[key]["message"]}</div>`
			)
		});
	})






	// conversationObjectKeys = Object.keys(DB[DBConversationKeyToCall]);






}

function fetchingContactList(userAccountTypeSelected) {
	url = "usersDB/"+userAccountTypeSelected+"/"+userId+"/listOfContacts";
	console.log(url);
	listOfContactsInfo = firebase.database().ref(url);
	listOfContactsInfo.on('value', function(data) {
		listOfContacts = data.val();
		console.log(listOfContacts);
	})
}

function addContactListToMessengerPage() {

	userId = firebase.auth().currentUser.uid;
	firebaseDB = firebase.database();
	accountTypeIdentificationUrl = "usersDB/allUsers/"+userId+"/userProfile/userType";
	userAccountType = firebase.database().ref(accountTypeIdentificationUrl);
	userAccountType.on('value', function(data) {
		userAccountType = data.val();
		if (userAccountType == "professional") {
			fetchingContactList("professional")
		} else if (userAccountType == "hospitalRecruiter") {
			fetchingContactList("hospitalRecruiter")
		}
	})

	listOfContacts.forEach(function(contact) {
		$(".contactList").append(
			`<div id="${contact}" onclick="fetchUserConversation('${contact}')">${contact}</div>`
		)
	})
}

// function filterOutOwnUserID() {
//  	DBKeyToCall.forEach(function(key) {
// 		conversationKey = Object.keys(DB[key]);
// 		listOfContacts.push(key.replace(userId, ""));
// 	})
// }

$(document).ready(function() {
	//For the future, promise will have to be implemented here
	// filterOutOwnUserID();
	setTimeout(function(){ 
		addContactListToMessengerPage();
	}, 5000);
	
})







