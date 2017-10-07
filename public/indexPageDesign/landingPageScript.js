function pressedMobileButton() {
  $(".mobileMenuContainer").css("display","inline-block");
  $(".searchSection").css("opacity", 0.2);
}

function closeModalButton() {
  $(".mobileMenuContainer").css("display","none");
  $(".searchSection").css("opacity", 1);
}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    // Do something
    $(".scrollDownArrow").css("display", "none");
});

