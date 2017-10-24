var incomingContacts = [];

var listOfContacts = [];

var DB = {
	user1user2: {
		timestamp1: {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 1",
		},
		timestamp2: {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 2",
		},
		timestamp3: {
			from: "Goksu Kaptanoglu",
			to: "Ece Ozalp",
			timestamp: "2012-12-31-05:44:44",
			message: "We are Turksih people 3",
		}
	},
	user3user4: {
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
	user5user6: {
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
	user1user7: {
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

var userId = "user1";

DBKeys = Object.keys(DB);

DBKeys.forEach(function(key) {
	console.log(key);
	subStringToSearch = userId
	if (key.indexOf(subStringToSearch) !== -1) {
		DBKeyToCall.push(key);
	}
});

function fetchUserConversation(contact) {
	alphabeticalllyRearrangeSenderAndReceiver = [userId, contact]
	alphabeticalllyRearrangeSenderAndReceiver.sort();

	DBConversationKeyToCall = alphabeticalllyRearrangeSenderAndReceiver[0]+alphabeticalllyRearrangeSenderAndReceiver[1];
	console.log(DBConversationKeyToCall);
}

function addContactListToMessengerPage() {
	listOfContacts.forEach(function(contact) {
		$(".contactList").append(
			`<div id="${contact}" onclick="fetchUserConversation('${contact}')">${contact}</div>`
		)
	})
}

function filterOutOwnUserID() {
 	DBKeyToCall.forEach(function(key) {
		conversationKey = Object.keys(DB[key]);
		listOfContacts.push(key.replace(userId, ""));
	})
}

$(document).ready(function() {
	//For the future, promise will have to be implemented here
	filterOutOwnUserID();
	addContactListToMessengerPage();
})







