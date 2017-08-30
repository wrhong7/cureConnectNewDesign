
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
  // mappedDict["internalRequisitionNumber"] = $("#internalRequisitionNumber").children(".csvTableField").text();
  // mappedDict["assignedRecruiterName"] = $("#assignedRecruiterName").children(".csvTableField").text();
  // mappedDict["hospitalName"] = $("#hospitalName").children(".csvTableField").text();
}

$( document ).ready(function() {
  var loadCSVArray = JSON.parse(localStorage.getItem("csvArray"));
  var mappedDict = {};
  var keys = Object.keys(loadCSVArray[0]);

  keys.forEach(function(keyValue){
    console.log(keyValue)
    $(".csvColumnField").append(
      "<div class=\"csvTableField\" id=\""+keyValue+"\" draggable=\"true\" ondragstart=\"drag(event)\">"+keyValue+"</div>"
    )
    //Here key value portion needs to be fixed
  });

});
