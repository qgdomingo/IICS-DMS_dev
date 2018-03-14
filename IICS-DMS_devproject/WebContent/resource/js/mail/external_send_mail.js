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
			clearMessageDirectorForm();
			callSuccessModal('Message Successfully Sent', 'Your message has been sent to the Director. You will be receive ' 
					+ ' a reply through the email address you entered.');
			deactivatePageLoading();
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
					}
				]
			},
			last_name: {
				identifier: 'last_name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your last name'
					}
				]
			},
			email_address: {
				identifier: 'email_address',
				rules: [
					{
						type   : 'email',
						prompt : 'Please enter a valid email address'
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
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the message'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a message'
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