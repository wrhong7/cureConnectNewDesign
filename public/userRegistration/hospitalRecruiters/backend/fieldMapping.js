var cureConnectJobPostingFields = ["internalRequisitionNumber", "recruitingPosition", "expectedSchedule", "union", "reqLicense", "compRangeBottom",
  "zipCode", "recruiterName", "recruitingDepartment", "hoursPerWeek", "contractType", "boardCertifiedStates", "compRangeTop", "insuranceAndPension",
  "hospitalName", "responsibility", "callDuty", "patientTypes", "minExperience", "educationCredit", "hospitalAddress", "shift", "weekendDuty",
  "patientRatio", "requiredAcademicDegree", "vacationPolicy"]
var newlyMappedArray = [];
var objectArrayToBePushedToFirebase = [];
var jobDBZipCodeArray = [];
var zipCodesToBePushedToDB = [];
var listOfZipCodesAboutToBeEntered = [];

function closeExplanationModal() {
  $(".cureConnectMappingExplanations").css("display", "none");
  $(".cureConnectMappingFieldsCover").css("opacity", "1");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var targetDivID = ev.target.id;
  ev.target.appendChild(document.getElementById(data));
  $("#"+ev.target.id).css("background-color", "#009eb3");
  $("#"+data).css("color", "white");

  cureConnectJobPostingFields.forEach(function(eachField) {
    if ($("#"+eachField).children(".csvTableField").text() != null) {
      mappedDict[eachField] = $("#"+eachField).children(".csvTableField").text();
    }
  })
}

function filterOutNullObjects(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function loadDatabaseZipCodes() {
  firebaseDB = firebase.database();
  url = "jobsDB/zipcodes";
  jobDBZipCodes = firebase.database().ref(url);
  jobDBZipCodes.on('value', function(data) {
    jobDBZipCodeArray = data.val();
    console.log(jobDBZipCodeArray);
  })
}

function filterDuplicatedZipCodes() {
  zipCodesToBePushedToDB = listOfZipCodesAboutToBeEntered.filter( function(n) { 
    return !this.has(n) 
  }, new Set(jobDBZipCodeArray));

  jobDBZipCodeArray.forEach(function(zip) {
    zipCodesToBePushedToDB.push(zip)
  })

  zipCodeURL = 'jobsDB/zipcodes';
  userDB = firebaseDB.ref(zipCodeURL).set(zipCodesToBePushedToDB);
  location.href="confirmation.html"
}

function pushNewZipcodesIntoDB() {
  filterDuplicatedZipCodes();
}

function submitMappedData() {
  loadCSVArray.forEach(function(jobObject) {
    var eachJobObject = {};
    cureConnectJobPostingFields.forEach(function(eachField) {
      if ($("#"+eachField).children(".csvTableField").text() != null) {
        eachJobObject[eachField] = jobObject[mappedDict[eachField]];
      }
    })
    newlyMappedArray.push(eachJobObject);
  })
  // console.log(newlyMappedArray);

  newlyMappedArray.forEach(function(job) {

    console.log(job);

    //get all the objects if the value is not null

    filterOutNullObjects(job);

    var keysAfterFilteredOut = Object.keys(job);

    console.log(keysAfterFilteredOut);
    //
    userDB = firebaseDB.ref('jobsDB/'+job["zipCode"]).push(job);

    listOfZipCodesAboutToBeEntered.push(job["zipCode"]);

    pushNewZipcodesIntoDB();

    console.log("this part has been triggered.")

    // zipDB = firebaseDB.ref('jobsDB/zipcodes').push(job["zipCode"]);
    // uniqueID = userDB.name();
    // console.log(uniqueID)
  })
}

function mandatoryFieldEnforcer() {
  //Pleaes complete this functionality to ensure users to fill up the mandatory fields.
}

function expandAdvancedFields() {
  console.log("expand button has been clicked");
  $(".advancedFieldColumns").css("display","inline-block");
  $(".cureConnectColumns").css({"width": "16vw", "margin-left": "2vw"});
  $(".csvColumns").css({"width": "20vw", "float": "right", "margin-right": "3vw"});
  $(".csvTableField").css("width", "95%");
  $(".instructionsArrow").css("width", "5vw");
  $(".arrow3").css({
    "width": "35%",
    "margin-left": "20%",
  })
  $(".instructionsText").css("padding-left", "0")
}

$( document ).ready(function() {
  loadCSVArray = JSON.parse(localStorage.getItem("csvArray"));
  mappedDict = {};
  keys = Object.keys(loadCSVArray[0]);
  keys.forEach(function(keyValue){
    $(".csvColumnField").append(
      "<div class=\"csvTableField\" id=\"drop"+keyValue+"\" draggable=\"true\" ondragstart=\"drag(event)\">"+keyValue+"</div>"
    )
  });
  loadDatabaseZipCodes();
});


