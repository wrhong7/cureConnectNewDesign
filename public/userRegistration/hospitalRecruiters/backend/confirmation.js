function sendConfCodeButtonClicked() {
  phoneNumberEntered = $(".phoneConfirmation").val();
  x = phoneNumberEntered.replace(/-/g, '');
  console.log(x);
  $(".phoneConfirmation").val('');
  $(".phoneConfirmation").attr("placeholder", "Please enter your confirmation code here")
  $(".enterMobilePhoneButton").css("display", "none");
  $(".submitCodeButton").css("display", "inline");
  $(".sendCodeButton").css("display", "inline");
}



$( document ).ready(function() {
  setTimeout(function(){
    $(".emailConfirmation").val(firebase.auth().currentUser.email);
  }, 3000);
});
