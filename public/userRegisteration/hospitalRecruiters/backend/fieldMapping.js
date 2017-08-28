var loadCSVArray = JSON.parse(localStorage.getItem("csvArray"));
var mappedDict = {};

console.log(loadCSVArray);

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
  mappedDict["internalRequisitionNumber"] = $("#internalRequisitionNumber").children(".csvTableField").text();
  mappedDict["assignedRecruiterName"] = $("#assignedRecruiterName").children(".csvTableField").text();
  mappedDict["hospitalName"] = $("#hospitalName").children(".csvTableField").text();
  //please see the mapping code below;

  console.log(mappedDict);
}