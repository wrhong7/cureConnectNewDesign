var professionalFields = ["doctor", "nurse", "recruiter", "psychologist", "physical therapists"];
var zipCodeRequestURL;
var neighboringZipCodesOfZipEntered = [];
var zipCodeListingFromDB;

//we need to assign this on cache. If there is nothing entered on cache variable, we should fetch nothing and tell
//users to answer the job type and zip code. we should log every search results.
var zipCodeEnteredFromPreviousPage = "10003";

// for instance from the pervious search page, the user should have entered the job catergory along with the zipcode.
// there should be two scenarios. 1) there should be one situation where zipcode is available.
// and 2) if zipcode is not entered, we should say, please enter the zipcode for the search.
// if the area that we serve has not been entered, then we say, sorry, we are not available in your area yet.

function nothingEnteredOnSearchQuery() {
  $(".jobSearchResults").empty();
  $(".jobSearchResults").append('<div class="searchCriteriaQuery">Please enter the search criteria for results</div>');
}

function fetchSearchResults() {
  searchPosition = $("#professionalFields").val();
  // zipCodeEnteredFromPreviousPage = $(".searchZipcodeInputBox").val();
  pullAllNeighboringZipCode(zipCodeEnteredFromPreviousPage);
}

function pullAllNeighboringZipCode(zipCode) {
  zipCodeRequestURL = "https://accesscontrolalloworiginall.herokuapp.com/https://www.zipcodeapi.com/rest/"+zipcodeAPIKey+"/radius.json/"+zipCode+"/10/km";
  console.log(zipCodeRequestURL);
  $.ajax({url: zipCodeRequestURL, success: function(result){
      result = result["zip_codes"];
      zipCodeArray = result;
      // //sorts zipcode array based on distance
      // zipCodeArray.sort(function(first,second) {return first["distance"]-second["distance"]});
      zipCodeArray.forEach(function(zip) {
        neighboringZipCodesOfZipEntered.push(zip["zip_code"]);
      })

      compareEnteredZipCodesAgainstServerZipCodes();

      // zipCodeArray.forEach(function(zip){
      //   console.log(zip["zip_code"]);
      // });
  }});
}

function pullZipCodeEntered() {
  if (zipCodeEnteredFromPreviousPage != null) {
    if (zipCodeEnteredFromPreviousPage == "") {
      nothingEnteredOnSearchQuery();
    } else {    
      fetchSearchResults();
    }
  } else if (zipCodeEnteredFromPreviousPage == null) {
    nothingEnteredOnSearchQuery();
  }
}

function compareEnteredZipCodesAgainstServerZipCodes() {
  zipCodesToBeFetched = zipCodeListingFromDB.filter( function(n) { 
    return this.has(n) 
  }, new Set(neighboringZipCodesOfZipEntered) );
  loadAllJobsUnderSearchingZipCode();
}

function loadAllJobsUnderSearchingZipCode() {
  zipCodesToBeFetched.forEach(function(zip) {
    console.log(zip);

    //need to fetch all the jobs listed under the zipcode
    jobDB = firebaseDB.ref('jobsDB/'+zip);
    jobDB.on('value',function(data){
      jobs = data.val();
      listOfJobsToBeAdded = Object.keys(jobs);
      listOfJobsToBeAdded.forEach(function(x) {
        console.log(jobs[x]);

        //when this thing gets clicked, we need to pass onto the zipcode and object key used for the details section
        //fetching

        $(".jobSearchResults").append(
          `     
          <div class="jobPostingCover">
            <div class="upperFloor">
              <div class="jobTitle">
                Nurse Practitioner - Urgent Care
              </div>
              <div class="addToFavorites">
                +
              </div>
            </div>

            <div class="lowerFloor">
              <div class="lowerFloorLeft">
                <div class="employerName">
                  Barton Associates
                </div>
                <div class="location">
                  Niagara Falls, NY
                </div>
              </div>
              <div class="lowerFloorRight">
                <div class="compRange">
                  $45-$55/hr
                </div>
                <div class="location">
                  20 hr/wk
                </div>
              </div>
            </div>
          </div>
          `
        )
      });
    });
  });
}

$(document).ready(function() {

  $("#professionalFields").select2({
    placeholder: "Relevant Field(s)"
  });

  $("#professionalFields").select2();
  professionalFields.forEach(function(profession) {
    $("#professionalFields").append(
      "<option value="+profession+">"+profession+"</option>"
    )
  })

  firebase.initializeApp(config);
  firebaseDB = firebase.database();
  zipCodeDB = firebaseDB.ref('jobsDB/zipcodes');
  zipCodeDB.on('value',function(data){
    zipCodeListingFromDB = data.val();
  })

  setTimeout(function() {


    pullZipCodeEntered();


  }, 2000)


  // zipCodeArray.forEach(function(individualZipCode) {
  //   jobPostingData = firebase.database().ref('jobsDB/'+individualZipCode);
  //   jobPostingData.on('value', function(data) {
  //     var keyArray = Object.keys(data.val());
  //       keyArray.forEach(function(individualKey) {
  //         jobPostingData = firebase.database().ref('jobsDB/'+individualZipCode+"/"+individualKey);
  //         jobPostingData.on('value', function(data) {
  //           console.log(data.val());
  //         })
  //       })
  //   })
  // })

  // jobPostingData = firebase.database().ref('jobsDB/zipcodes');
  // jobPostingData.on('value', function(data) {
  //
  //
  // })

  // userData.on('value', function(data) {
  //   var userDataDecrypted = data.val();
  //   if (userDataDecrypted == null) {
  //     console.log("force move the user to register section")
  //     //There might be a weird case where a user will fail to register with google
  //     //but directly logs in with google, a case in which registeraton is not complete.
  //     //for this case, we will force user to register by redirecting them.
  //   } else {
  //     userType = userDataDecrypted["userProfile"].userType;
  //     userCompletionStatus = userDataDecrypted["userProfile"].completionStatus;
  //     if (userInfomation == null) {
  //       userName = userDataDecrypted["userProfile"].userName;
  //       console.log(userName);
  //       renderUserView(userName, userType, userCompletionStatus);
  //     } else {
  //       renderUserView(userInfomation.displayName, userType, userCompletionStatus);
  //     }
  //   }
  // })



  // //Backend database is loaded after the firebase has been fully connected
	// window.onload = function() {
	// 	setTimeout(function(){
	// 		if (document.readyState === 'complete') {
	// 		    // if userid is not, render addNonUserHeader() to add the header to all main pages
	// 	   		// if userid is verified, render addUserHeader(user information details) to add the header
	// 			userInfomation = firebase.auth().currentUser;
  //
	// 			if (userInfomation === null) {
	// 				renderNonUserView();
	// 			} else {
	// 			//There is one case
	// 				// var userData;
	// 				userData = firebase.database().ref('usersDB/allUsers/'+userInfomation.uid);
	// 				userData.on('value', function(data) {
	// 					var userDataDecrypted = data.val();
	// 					if (userDataDecrypted == null) {
	// 						console.log("force move the user to register section")
	// 						//There might be a weird case where a user will fail to register with google
	// 						//but directly logs in with google, a case in which registeraton is not complete.
	// 						//for this case, we will force user to register by redirecting them.
	// 					} else {
	// 						userType = userDataDecrypted["userProfile"].userType;
	// 						userCompletionStatus = userDataDecrypted["userProfile"].completionStatus;
	// 						renderUserView(userInfomation.displayName, userType, userCompletionStatus);
	// 					}
  //
	// 				})
	// 			}
	// 		}
	// 	}, 2000);
  //
	// }
});






