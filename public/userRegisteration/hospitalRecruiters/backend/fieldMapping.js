var cureConnectJobPostingFields =
  [
    "internalRequisitionNumber", "recruitingPosition", "expectedSchedule",
    "union", "reqLicense", "compRangeBottom", "zipCode", "recruiterName",
    "recruitingDepartment", "hoursPerWeek", "contractType", "boardCertifiedStates",
    "compRangeTop", "insuranceAndPension", "hospitalName", "responsibility",
    "callDuty", "patientTypes", "minExperience", "educationCredit", "hospitalAddress",
    "shift", "weekendDuty", "patientRatio", "requiredAcademicDegree", "vacationPolicy"
  ]


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

  cureConnectJobPostingFields.forEach(function(eachField) {
    if ($("#"+eachField).children(".csvTableField").text() != null) {
      mappedDict[eachField] = $("#"+eachField).children(".csvTableField").text();
    }
  })
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

var newlyMappedArray = [];

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
  console.log(newlyMappedArray);

  newlyMappedArray.forEach(function(job) {
    //here we need to solve the undefined property issue other than that we are good to go
    userDB = firebaseDB.ref('jobsDB/'+job["hospitalZipCode"]).push({
      recruiterInfo: {
        internalRequisitionNumber: job["internalRequisitionNumber"],
        recruiterName: job["assignedRecruiterName"],
        recruiterCureConnectCode: job["recruiterCureConnectCode"],
      },
      hospitalInfo: {
        hospitalName: job["hospitalName"],
        hospitalAddress: job["hospitalAddress"],
      },
      jobInfo: {
        recruitingPosition: job["recruitingPosition"],
        recruitingDepartment: job["recruitingDepartment"],
        responsibility: job["responsibility"],
        shift: job["shift"],
        expSchedule: job["expSchedule"],
        weekendDuty: job["weekendDuty"],
        callDuty: job["callDuty"],
        hoursPerWeek: job["hoursPerWeek"],
        contractType: job["contractType"],
        union: job["union"],
        patientTypes: job["patientTypes"],
        patientImbursementTypes: job["patientImbursementTypes"],
        requiredAcademicDegree: job["requiredAcademicDegree"],
        patientRatio: job["patientRatio"],
      },
      requirements: {
        minExperience: job["minExperience"],
        reqLicense: job["reqLicense"],
        boardCertifiedStates: job["boardCertifiedStates"],
      },
      compensations: {
        compRangeBottom: job["compRangeBottom"],
        compRangeTop: job["compRangeTop"],
        vacationPolicy: job["vacationPolicy"],
        educationCredit: job["educationCredit"],
        insuranceAndPension: job["insuranceAndPension"],
      },
      zipCode: job["hospitalZipCode"],
    })
  })

}
