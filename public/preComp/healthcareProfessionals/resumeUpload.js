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
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console

            resumePDFBinary = base64
            $(".resumeContainer").replaceWith(
                '<div class=\"resumeContainer\">'+
									'<div class="replaceResumeSection">'+
										'<input class="inputFile" name="file" type="file" id="file" onchange="convertToBase64();" />'+
										'<label for="file" class="uploadResumeButton">Replace Resume</label>'+
									'</div>'+
                '</div>'
            );

            $(".resumeContainer").append(
            	'<iframe src="${base64}"  class="resumeiFrame"></iframe>'
            )
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

// we are setting up a global variable to ensure that the 
// user information can be accessed from everywhere.


function hideOptions() {
	$(".optionsSection").css("cssText", "display: none;")
}

function showOptions() {
	$(".optionsSection").css("cssText", "display: inline-block;")
}

function showResumeSection() {
	$(".resumeSection").css("cssText", "display: inline-block")	
}

function hideResumeSection() {
	$(".resumeSection").css("cssText", "display: none")	
}

function fetchSecondaryQuestions() {
	$(".preliminaryQuestions").css("cssText", "display: none");
	$(".secondaryQuestions").css("cssText", "display: inline-block");

	$(".preliminaryQuestionsSubmission").css("cssText", "display: none");
	$(".secondaryQuestionSubmission").css("cssText", "display: inline-block");
}

function completeQuestions() {
	$(".preliminaryQuestions").css("cssText", "display: inline-block");
	$(".secondaryQuestions").css("cssText", "display: none");
	$(".preliminaryQuestionsSubmission").css("cssText", "display: inline-block");
	$(".secondaryQuestionSubmission").css("cssText", "display: none");

	hideResumeSection();
	showOptions();
}

var retrievedObject;

$(document).ready(function() {

	function updateUserName() {
		//this functionality has been included so that this funciton can only be rendred after the document is fully loaded
		// console.log('retrievedObject: ', JSON.parse(retrievedObject));
		console.log("working");
		$(".userName").empty();
		$(".userName").append(retrievedObject.displayName);
	}

	retrievedObject = localStorage.getItem('userInfo');
	retrievedObject = JSON.parse(retrievedObject);

	if (retrievedObject != null) {
		updateUserName();
	}

});

