function uploadWithCSVClicked() {
  $(".postJobOptionContainer").hide();
  $(".csvFileUploadContainer").css("display", "inline-block");
}

var jobPostings;

$(document).ready(function() {
  if(isAPIAvailable()) {
    $('#files').bind('change', handleFileSelect);
  }
});

function postJobButtonClicked() {

  console.log(jobPostings);

  var zipCodeData = firebase.database().ref("jobsDB");
  var zipCodeArray;

  zipCodeData.on('value', function(data) {
    var zipcodeDataDecrypted = data.val();
    console.log(zipcodeDataDecrypted["zipcodes"]);
    var zipCodeArray = zipcodeDataDecrypted["zipcodes"];
  })

  jobPostings.forEach(function(job) {

    userDB = firebaseDB.ref('jobsDB/'+job["hospitalZipCode"]).push({
      recruiterInfo: {
        internalRequisitionNumber: job["internalRequisitionNumber"],
        recruiterName: job["recruiterName"],
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

    // zipCodeArray.forEach(function(zipcode) {
    // 	if (zipcode == job["hospitalZipCode"]) {
    // 		//insert this into the existing zipcode bucket
    // 	} else {
    // })
  })
}

function uploadDifferentButtonClicked() {
  location.href="postJobs.html";
}

function isAPIAvailable() {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    return true;
  } else {
    // source: File API availability - http://caniuse.com/#feat=fileapi
    // source: <output> availability - http://html5doctor.com/the-output-element/
    document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
    // 6.0 File API & 13.0 <output>
    document.writeln(' - Google Chrome: 13.0 or later<br />');
    // 3.6 File API & 6.0 <output>
    document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
    // 10.0 File API & 10.0 <output>
    document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
    // ? File API & 5.1 <output>
    document.writeln(' - Safari: Not supported<br />');
    // ? File API & 9.2 <output>
    document.writeln(' - Opera: Not supported');
    return false;
  }
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];

  var output = ''
  output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
  output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
  output += ' - FileSize: ' + file.size + ' bytes<br />\n';
  output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

  // read the file contents
  printTable(file);

  // post the results
  $('#list').append(
    "<button class='postJobsButton' onclick='postJobButtonClicked()'>Post Jobs</button>"
  );
  $('#list').append(
    "<button class='uploadDifferentFileButton' onclick='uploadDifferentButtonClicked()'>Upload Different File</button>"
  );
  $('#list').append(output);
}

var csvFileView;

function printTable(file) {
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event){
    var csv = event.target.result;

    // console.log(csv);

    csvFileView = csv;

    var data = $.csv.toArrays(csv);
    //this data is being fed into the functions to show the user the imported csv fields

    var result = $.csv.toObjects(csv);

    jobPostings = result;

    //this obj data is fed into the functions to feed the data to firebase
    var html = '';
    for(var row in data) {
      html += '<tr>\r\n';
      for(var item in data[row]) {
        html += '<td>' + data[row][item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }

    $('#contents').html(html);
  };

  reader.onerror = function(){ alert('Unable to read ' + file.fileName); };

  // setTimeout(function(){
  //   window.location.href = "/recruitersDashboard/mapping/mapping.html";
  // }, 2000);

}