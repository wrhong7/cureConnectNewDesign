var selectedFieldsEntryDict = {
  weeklyJobRecEmailNotification: false,
  incomingMessageFromRecruiter: false,
  interviewRequestFromRecruiter: false,
  jobApplicationResults: false,
  weeklyJobRecNotificationMobile: false,
  incomingMessageFromRecruiterMobile: false,
  interviewRequestFromRecruiterMobile: false,
  callInterviewMobile: false,
  jobApplicationResultsMobile: false
}

function selectThisField(id) {
  console.log(id)
  if (selectedFieldsEntryDict[id] == true){
    $("#"+id).css("background-color", "red");
    selectedFieldsEntryDict[id] = false;
  } else {
    $("#"+id).css("background-color", "green");
    selectedFieldsEntryDict[id] = true;
  }
}