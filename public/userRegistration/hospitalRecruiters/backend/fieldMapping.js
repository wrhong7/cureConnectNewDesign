var cureConnectJobPostingFields = ["internalRequisitionNumber", "recruitingPosition", "expectedSchedule", "union", "reqLicense", "compRangeBottom",
  "zipCode", "recruiterName", "recruitingDepartment", "hoursPerWeek", "contractType", "boardCertifiedStates", "compRangeTop", "insuranceAndPension",
  "hospitalName", "responsibility", "callDuty", "patientTypes", "minExperience", "educationCredit", "hospitalAddress", "shift", "weekendDuty",
  "patientRatio", "requiredAcademicDegree", "vacationPolicy"]
var newlyMappedArray = [];
var objectArrayToBePushedToFirebase = [];

function closeExplanationModal() {
  $(".cureConnectMappingExplanations").css("display", "none");
  $(".cureConnectMappingFieldsCover").css("opacity", "1")
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

    //get all the objects if the value is not null

    filterOutNullObjects(job);
    console.log(job);

    var keysAfterFilteredOut = Object.keys(job);

    console.log(keysAfterFilteredOut);
    //
    userDB = firebaseDB.ref('jobsDB/'+job["zipCode"]).push(job);
    // uniqueID = userDB.name();
    // console.log(uniqueID)
  })

  location.href="confirmation.html"

}

function mandatoryFieldEnforcer() {
  //Pleaes complete this functionality to ensure users to fill up the mandatory fields.
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
});


