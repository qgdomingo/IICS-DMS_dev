/**
 * 
 */

/*
 * VARIABLES
 */
	// for progress bar
    var bar = $('.bar');
    var percent = $('.label');
    
    /* SUBMIT - Message Director Form */
	$('#message_director_form').ajaxForm({
		beforeSubmit: isMessageDirectorFormValid,
		uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	    },
		success: function(response) {  
			closeUploadProgress();
			deactivatePageLoading();
			
			if(response == 'invalid captcha') {
				callFailModal('Invalid Captcha', 'Please try answering the captcha again.');
			}
			else if(response == 'above maximum size') {
				callFailModal('File Max Size Error', 'Your file has exceeded the maximum file size of 25MB. Please upload a smaller file');
			}
			else {
				clearMessageDirectorForm();
				callSuccessModal('Message Successfully Sent', 'Your message has been sent to the Director. You will be receive ' 
						+ ' a reply through the email address you entered.');
			}
		},
		error: function(response) {
			closeUploadProgress();
			callFailRequestModal();
			deactivatePageLoading();
		}
	});

	/* FORM VALIDATION - Message Director Form */
	$('#message_director_form').form({
		fields: {
			first_name: {
				identifier: 'first_name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your first name'
					},
					{
						type : 'maxLength[30]',
						prompt: 'Maximum of 30 characters in first name'
					}
				]
			},
			last_name: {
				identifier: 'last_name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your last name'
					},
					{
						type : 'maxLength[30]',
						prompt: 'Maximum of 30 characters in last name'
					}
				]
			},
			email_address: {
				identifier: 'email_address',
				rules: [
					{
						type   : 'email',
						prompt : 'Please enter a valid email address'
					},
					,
					{
						type : 'maxLength[50]',
						prompt: 'Maximum of 30 characters in email'
					}
				]
			},
			contact_number: {
				identifier: 'contact_number',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your contact number'
					},
					{
						type   : 'exactLength[11]',
						prompt : 'Your contact number must be 11 digits long'
					}
				]
			},
			affiliation: {
				identifier: 'affiliation',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your affiliation'
					},
					{
						type : 'maxLength[30]',
						prompt: 'Maximum of 30 characters in affiliation'
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the message'
					},
					{
						type : 'maxLength[50]',
						prompt: 'Maximum of 50 characters in subject'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a message'
					},
					{
						type : 'maxLength[2000]',
						prompt: 'Maximum of 2000 characters in message'
					}
				]
			}
			
		}
	});
	
	/* BOOLEAN VALIDATION - Message Director Form */
	function isMessageDirectorFormValid() {
		if( $('#message_director_form').form('is valid') ) {
			activatePageLoading('Sending Message');
			openAndInitializeUploadProgress();
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Message  */
	function clearMessageDirectorForm() {
		removeCSSClass('#message_director_form', 'error');		
	  	$('#message_director_form').form('reset');
	}
	
/*
 * UPLOAD DOCUMENT PROGRESS BAR
 */	
	/* Open and Initialize Progress Bar */
	function openAndInitializeUploadProgress() {
		$('#upload_progress_bar').progress({
		    percent: 0
		}).progress();
		
		$('#progressbar_modal').modal({
			closeable: false,
			observeChanges: true,
			duration: 0
		}).modal('show');
	}
	
	/* Update Progress Bar */
	function updateUploadProgress(percent) {
		$('#upload_progress_bar').progress('set percent', percent);
	}
	
	/* Close Progress Bar on Complete */
	function closeUploadProgress() {
    	$('#progressbar_modal').modal('hide');
	}