//Resume Uploader:
var resumePDFBinary;

function convertToBase64() {
  //Read File
  var selectedFile = document.getElementById("file").files;
  //Check File is not Empty
  if (selectedFile.length > 0) {
    // Select the very first file from list
    var fileToLoad = selectedFile[0];
    // FileReader function for read the file.
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      resumePDFBinary = base64;

      // $(".resumeContainer").replaceWith(
      //   '<div class=\"resumeContainer\">'+
      //     '<div class="replaceResumeSection">'+
      //       '<input class="inputFile" name="file" type="file" id="file" onchange="convertToBase64();" />'+
      //       '<label for="file" class="attachFile">Replace Resume</label>'+
      //     '</div>'+
      //   '</div>'
      // );

      // $(".resumeContainer").append(
      //   '<iframe src='+base64+' class="resumeiFrame"></iframe>'
      // );

      $(".uploadResumeButtonContainer").css("margin-top", "1vh");
      $(".uploadResumeButtonContainer").css("margin-bottom", "1vh");
      $(".uploadResumeButton").empty();
      $(".uploadResumeButton").append('Replace Resume');
      $(".resumeContainer").append(
        '<object class="csviFrameSizeAdjustment" data='+base64+' type="application/pdf" height="100%" width="100%"></object>'
      );
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  }
}

