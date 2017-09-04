function onLinkedInLoad() {
  IN.Event.on(IN, "auth", onLinkedInAuth);

  //we are injecting artificial codes here to change the signin with linkedin Button

  // $('span[id*="-title-text"]').css('cssText', 'display: red !important;');
  $('span[id*="-title-text"]').empty();
  $('span[id*="-title-text"]').append("Pull from LinkedIn");
  // // $('span[id*="-title-text"]').css("width", "20vw");
  // $('span[id*="-title-text"]').css("csstext", "font-size: 3rem !important");
}

// 2. Runs when the viewer has authenticated
function onLinkedInAuth() {
  IN.API.Profile("me").fields("id","first-name", "last-name", "email-address", "location", "summary", "positions", "picture-url").result(displayProfiles);
}

// 2. Runs when the Profile() API call returns successfully
function displayProfiles(profiles) {

  member = profiles.values[0];

  var firstName = member.firstName;
  var lastName = member.lastName;
  var linkedInEmailAddress = member.emailAddress;
  var locationInfo = member.location.name;
  var linkedInSummary = member.summary;
  var currentWorkInfo = member.positions.values[0].company.name;
  var currentJobTitle = member.positions.values[0].title;
  var userPhotoFromLinkedIn = member.pictureUrl;
  var userJobHeadline = member.headline;

  //headline

  $(".recruiterName").val(firstName+" "+lastName);
  $(".recruiterEmail").val(linkedInEmailAddress);
  $(".recruiterJobTitle").val(currentWorkInfo);
  $(".hospitalName").val(currentWorkInfo);
  $(".linkedInButton").css("display", "none");
  $(".recruitingSpecialty").val(userJobHeadline);
  $(".hospitalLocation").val(locationInfo);

  console.log(firstName)
  console.log(locationInfo)
  console.log(linkedInSummary)
  console.log(currentWorkInfo)
  console.log(currentJobTitle)
  console.log(userPhotoFromLinkedIn)
  // document.getElementById("profiles").innerHTML
}