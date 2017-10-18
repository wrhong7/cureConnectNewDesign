var blogArticle = [
  {
    articleNumber: "article1",
    articleDate: "September 8, 2017",
    articleName: "Suburban Nursing is Interesting",
    articleContent:
    "If you analyze the population data, you will soon figure out American suburbs have the greatest number of qualified and experienced RNs. I am talking about Long Island of New York City and Pasadena of LA. At the same time, suburban and rural clinics are the ones suffering from chronic nursing shortage.<br><br>" +
    "I was intrigued by such a paradox and picked up the phone and started reaching out to RNs in suburban and rural areas. Here are the answers:<br><br>" +
    "(1)\tNursing field has a very high job market dropout rate after 10 years, as many nurses stop working to take care of their children. This break continues up to ten years, and it becomes difficult for hospitals to reconnect with them after 10 years.<br><br>" +
    "(2)\tMetropolitan hospitals often pay 20-40% more than the suburban and rural hospitals. Thus, many end up commuting to the city center.<br><br>" +
    "One idea came across my mind. What if we redirect some of these nurses to part-time opportunities?<br><br>",
    author: "Cure Connect Blog Team",
    liked: 0,
    priority: "none",
  },
  {
    articleNumber: "article2",
    articleDate: "September 6, 2017",
    articleName: "Why is healthcare recruiting so costly?",
    articleContent:
    "We know America’s healthcare is broken, and recruiting is one of its many facets. While hospitals suffer from understaffing, professionals often have difficulty finding their careers. It has been a mystery to me.<br><br>" +
    "Before starting Cure Connect, I have talked to hundreds of hospital recruiters and professionals to identify problems. We came up with couple of points:<br><br>" +
    "(1)\tHealthcare recruiting is not transparent. If you drop application on line, you never hear back, unless you know someone inside to vouch for you.<br><br>" +
    "(2)\tThis makes many experienced professionals stop recruiting through an official channel, which limits their options.<br><br>" +
    "(3)\tHospitals almost always place their positions online, but those candidates who apply through the official channel are not as qualified the offline ones.<br><br>" +
    "(4)\tTo fill a need, hospitals end up reaching out to external recruiters or internal referrals, which are both costly (commissions and referral bonus).<br><br>" +
    "(5)\tAs there is an industry-wide lack of trust and transparency on the official channel, healthcare professionals are reluctant to share their information or profile on LinkedIn or other career sites.<br><br>" +
    "(6)\tHospital recruiters often end up spending hours dialing wrong numbers and emailing to wrong addresses.<br><br>" +
    "(7)\tAfter hours of Googling, recruiters may be able to talk to some of the candidates, but marrying the hospitals and the professionals often proves to be a difficult process thanks to difference in expectations.<br><br>" +
    "For these reasons, many hospitals (especially rural and suburban ones) often end up paying up to 50% of the professional’s first year salary as recruiting fee. Considering these hospitals already spend millions on internal HR and recruiters, it becomes clear that recruiting needs to be transformed to make this process affordable and efficient.<br><br>",
    author: "Cure Connect Blog Team",
    liked: 0,
    priority:"none",
  }
]

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function goToParticularBlogpost(post) {
  console.log(post);
  document.getElementById(post).scrollIntoView();
}

function pushEmailToBackEndDb() {
  emailValue = $(".blogSubscriptionEmailEntry").val();

  var emailCheck = validateEmail(emailValue);

  if (emailCheck == true) {
    //submit to firebase DB

    firebaseDB = firebase.database();
    userDB = firebaseDB.ref('blogSubscriber').push(emailValue);

    $(".blogSubscriptionEmailEntry").val("Registered! Thank you for subscribing.");

  } else {
    $(".blogSubscriptionEmailEntry").val("Email not valid. Check again please.");
    $(".blogSubscriptionEmailEntry").css("background-color", "#F0AD4E");
  }

}

$( document ).ready(function() {

  firebase.initializeApp(config);

  blogArticle.forEach(function(articleObject) {

    var articleNo = articleObject["articleNumber"];

    $(".contentDisplay").append(
      '<div class="articleTitle" id='+articleNo+'>'+articleObject["articleName"]+'</div>'+
      '<div class="articleDate">'+articleObject["articleDate"]+' by '+articleObject["author"]+'</div>'+
      '<div class="articleText">'+articleObject["articleContent"]+'</div>'
    )

    $(".indexColumnContainer").append(
      '<div class="postTitle" onclick=\'goToParticularBlogpost("'+articleNo+'")\'>'+articleObject["articleName"]+'</div>'
    )
  })
});





