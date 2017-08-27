// console.log(csvDataArray);

var loadCSVArray = JSON.parse(localStorage.getItem("csvArray"));

console.log(loadCSVArray);


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

var mappedDict = {};



function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  mappedDict["internalRequisitionNumber"] = $("#internalRequisitionNumber").children(".csvTableField").text();
  mappedDict["assignedRecruiterName"] = $("#assignedRecruiterName").children(".csvTableField").text();
  mappedDict["hospitalName"] = $("#hospitalName").children(".csvTableField").text();

  console.log(mappedDict);
}