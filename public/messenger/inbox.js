var incomingContacts = [];

var listOfContacts = [];

var fakeDB = {
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

DBKeys = Object.keys(fakeDB);

DBKeys.forEach(function(key) {
	console.log(key);
	subStringToSearch = userId
	if (key.indexOf(subStringToSearch) !== -1) {
		DBKeyToCall.push(key);
	}
});

DBKeyToCall.forEach(function(key) {
	conversationKey = Object.keys(fakeDB[key]);
	listOfContacts.push(key.replace(userId, ""));
})

//need to call each of list of the contactas and add to the contact list.

//once each member of the list is being clicked, then, 
//the conversation log will be wiped out and fetch the the conversation
//log with the new contacts








