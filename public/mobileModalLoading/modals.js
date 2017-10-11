var modalListing = {
  searchResultPagefalse: {
    sectionToBeBlurred: "jobSearchCover",
    field0: {
      caption: "Log In",
      link: "goToLoginPage()",
    },
    field1: {
      caption: "Sign Up",
      link: "goToRegisterationPage()",
    },
    field2: {
      caption: "How it works?",
      link: "",
    },
    field3: {
      caption: "Why Cure Connect",
      link: "",
    }
  },
  searchResultPagetrue: {
    sectionToBeBlurred: "jobSearchCover",
    field0: {
      caption: "Log Out",
      link: "userLogOut(toBeBlurred)",
    },
    field1: {
      caption: "Dashboard",
      link: "goToRegisterationPage()",
    },
    field2: {
      caption: "Job Recommendations",
      link: "",
    },
    field3: {
      caption: "Messenger",
      link: "",
    }
  },
  searchPageModalUser: {
    blurring: "jobSearchCover",
    field0: {
      caption: "Log Out"

    }
  }
}

var sessionStatus;

function goToLoginPage() {
  location.href="/userLogInOut/in.html"
}

function goToRegisterationPage() {
  location.href="/userRegistration/signUp.html"
}

function userLogOut(sessionToBeUnblurred) {
  firebase.auth().signOut().then(function() {
    userInfomation = null;
  }).catch(function(error) {
    console.log("Sorry. Try again.")
  })
  closeModal(sessionToBeUnblurred);
}

function goToUserDashboard() {
  onclick='location.href="/userLogInOut/in.html"'
}

function goToJobRecommendationPage() {
  onclick='location.href="/userLogInOut/in.html"'
}

function goToMessenger() {
  onclick='location.href="/userLogInOut/in.html"'
}

function closeModal(toBeNonBlurred) {
  console.log("triggered")
  $("."+toBeNonBlurred).css("opacity", "1");
  $(".mobileModalContainer").val("");
  $(".mobileModalContainer").css("display", "none");
}

function loadMenuForMobileModal(menuToBeLoaded) {
  toBeBlurred = modalListing[menuToBeLoaded]["sectionToBeBlurred"];
  link0 = modalListing[menuToBeLoaded]["field0"]["link"];
  caption0 = modalListing[menuToBeLoaded]["field0"]["caption"];
  link1 = modalListing[menuToBeLoaded]["field1"]["link"];
  caption1 = modalListing[menuToBeLoaded]["field1"]["caption"];
  link2 = modalListing[menuToBeLoaded]["field2"]["link"];
  caption2 =modalListing[menuToBeLoaded]["field2"]["caption"];
  link3 = modalListing[menuToBeLoaded]["field3"]["link"];
  caption3 =modalListing[menuToBeLoaded]["field3"]["caption"];

  $("."+"mobileModalContainer").css("display", "inline-block");
  $("."+toBeBlurred).css("opacity", "0.1");

  $(".mobileModalContainer").append(
    '<div class="mobileMenuContainer">\n' +
    '<div\n' +
    'class="mobileMenuButtonComponent button"\n' +
    'onclick=\'location.href=link3\'\n' +
    '>'+caption3+'</div>\n' +
    '<div\n' +
    'class="mobileMenuButtonComponent button"\n' +
    'onclick=\'location.href=link2\'\n' +
    '>'+caption2+'</div>\n' +
    '<div\n' +
    'class="mobileMenuButtonComponent button"\n' +
    'onclick='+'"'+link1+'"' +
    '>'+caption1+'</div>\n' +
    '<div\n' +
    'class="mobileMenuButtonComponent button"\n' +
    'onclick='+'"'+link0+'"' +
    '>'+caption0+'</div>\n' +

    '<div class="mobileMenuButtonComponent mobileModalClose button" onclick="closeModal(toBeBlurred)">Close</div>\n' +
    '</div>'
  )
}

function triggerPageLoader(loadedPage, userHasSession) {
  menuToBeLoaded = loadedPage+userHasSession;
  loadMenuForMobileModal(menuToBeLoaded);
}

function userSessionChecker(sessionStatus, loadedPage) {
  if (sessionStatus == null) {
    userHasSession = false
    triggerPageLoader(loadedPage, userHasSession)
  } else {
    userHasSession = true;
    sessionStatus = sessionStatus.m;
    triggerPageLoader(loadedPage, userHasSession)
  }
}

function triggerModal(loadedPage) {
  sessionStatus = firebase.auth().currentUser;
  userSessionChecker(sessionStatus, loadedPage);
}







