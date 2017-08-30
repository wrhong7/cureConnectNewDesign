
//what we are going to do here is, upload the file only after the fields are correctly mapped
//mapping codes are lined up below

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  if ($("#internalRequisitionNumber").children(".csvTableField").text() != null) {
    mappedDict["internalRequisitionNumber"] = $("#internalRequisitionNumber").children(".csvTableField").text();
  }
  if ($("#recruitingPosition").children(".csvTableField").text() != null) {
    mappedDict["recruitingPosition"] = $("#recruitingPosition").children(".csvTableField").text();
  }
  if ($("#expectedSchedule").children(".csvTableField").text() != null) {
    mappedDict["expectedSchedule"] = $("#expectedSchedule").children(".csvTableField").text();
  }
  if ($("#union").children(".csvTableField").text() != null) {
    mappedDict["union"] = $("#union").children(".csvTableField").text();
  }
  if ($("#reqLicense").children(".csvTableField").text() != null) {
    mappedDict["reqLicense"] = $("#reqLicense").children(".csvTableField").text();
  }
  if ($("#compRangeBottom").children(".csvTableField").text() != null) {
    mappedDict["compRangeBottom"] = $("#compRangeBottom").children(".csvTableField").text();
  }
  if ($("#zipCode").children(".csvTableField").text() != null) {
    mappedDict["zipCode"] = $("#zipCode").children(".csvTableField").text();
  }
  if ($("#recruiterName").children(".csvTableField").text() != null) {
    mappedDict["recruiterName"] = $("#recruiterName").children(".csvTableField").text();
  }
  if ($("#recruitingDepartment").children(".csvTableField").text() != null) {
    mappedDict["recruitingDepartment"] = $("#recruitingDepartment").children(".csvTableField").text();
  }
  if ($("#hoursPerWeek").children(".csvTableField").text() != null) {
    mappedDict["hoursPerWeek"] = $("#hoursPerWeek").children(".csvTableField").text();
  }
  if ($("#contractType").children(".csvTableField").text() != null) {
    mappedDict["contractType"] = $("#contractType").children(".csvTableField").text();
  }
  if ($("#boardCertifiedStates").children(".csvTableField").text() != null) {
    mappedDict["boardCertifiedStates"] = $("#boardCertifiedStates").children(".csvTableField").text();
  }
  if ($("#compRangeTop").children(".csvTableField").text() != null) {
    mappedDict["compRangeTop"] = $("#compRangeTop").children(".csvTableField").text();
  }
  if ($("#insuranceAndPension").children(".csvTableField").text() != null) {
    mappedDict["insuranceAndPension"] = $("#insuranceAndPension").children(".csvTableField").text();
  }
  if ($("#hospitalName").children(".csvTableField").text() != null) {
    mappedDict["hospitalName"] = $("#hospitalName").children(".csvTableField").text();
  }
  if ($("#responsibility").children(".csvTableField").text() != null) {
    mappedDict["responsibility"] = $("#responsibility").children(".csvTableField").text();
  }
  if ($("#callDuty").children(".csvTableField").text() != null) {
    mappedDict["callDuty"] = $("#callDuty").children(".csvTableField").text();
  }
  if ($("#patientTypes").children(".csvTableField").text() != null) {
    mappedDict["patientTypes"] = $("#patientTypes").children(".csvTableField").text();
  }
  if ($("#minExperience").children(".csvTableField").text() != null) {
    mappedDict["minExperience"] = $("#minExperience").children(".csvTableField").text();
  }
  if ($("#educationCredit").children(".csvTableField").text() != null) {
    mappedDict["educationCredit"] = $("#educationCredit").children(".csvTableField").text();
  }
  if ($("#hospitalAddress").children(".csvTableField").text() != null) {
    mappedDict["hospitalAddress"] = $("#hospitalAddress").children(".csvTableField").text();
  }
  if ($("#shift").children(".csvTableField").text() != null) {
    mappedDict["shift"] = $("#shift").children(".csvTableField").text();
  }
  if ($("#weekendDuty").children(".csvTableField").text() != null) {
    mappedDict["weekendDuty"] = $("#weekendDuty").children(".csvTableField").text();
  }
  if ($("#patientRatio").children(".csvTableField").text() != null) {
    mappedDict["patientRatio"] = $("#patientRatio").children(".csvTableField").text();
  }
  if ($("#requiredAcademicDegree").children(".csvTableField").text() != null) {
    mappedDict["requiredAcademicDegree"] = $("#requiredAcademicDegree").children(".csvTableField").text();
  }
  if ($("#vacationPolicy").children(".csvTableField").text() != null) {
    mappedDict["vacationPolicy"] = $("#vacationPolicy").children(".csvTableField").text();
  }
}

$( document ).ready(function() {
  loadCSVArray = JSON.parse(localStorage.getItem("csvArray"));
  mappedDict = {};
  keys = Object.keys(loadCSVArray[0]);

  console.log(loadCSVArray);
  console.log(keys);

  // keys.forEach(function(keyValue){
  //   $(".csvColumnField").append(
  //     "<div class=\"csvTableField\" id=\""+keyValue+"\" draggable=\"true\" ondragstart=\"drag(event)\">"+keyValue+"</div>"
  //   )
  //   //Here key value portion needs to be fixed
  // });

  //this is a probleatic section

});

var newlyMappedArray = [];

function submitMappedData() {
  loadCSVArray.forEach(function(jobObject) {
    var eachJobObject = {}
    console.log(jobObject);
    eachJobObject["internalRequisitionNumber"] = loadCSVArray["internalRequisitionNumber"];

    newlyMappedArray.push(eachJobObject);
  })
}
