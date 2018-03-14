/**
 * 
 */

	$(document).ready( function() {
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    exMailID = decodeURIComponent(data.id);
	    
	    getMailInformation(exMailID);
	});
	
	function getMailInformation(id) {
		
		var data = { id: id }
		
		$.get(getContextPath() + '/RetrieveExternalUserDetails', $.param(data), function(response) {
			$('#sender_info').text(response[0].firstName + ' ' + response[0].lastName + ' (' + response[0].email + ')');
			$('#contact_info').text(response[0].contactNumber);
			$('#affiliation_info').text(response[0].affiliation);
			$('#subject_info').text('RE: ' + response[0].subject);
			$('#thread_number').val(response[0].threadNumber);
		});
		
	}
	
/*
 * VARIABLES
 */
	// for progress bar
    var bar = $('.bar');
    var percent = $('.label');
    
    /* SUBMIT - Message Director Form */
	$('#response_external_form').ajaxForm({
		beforeSubmit: isMessageDirectorFormValid,
		uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	    },
		success: function(response) {  
			closeUploadProgress();
			callSuccessModal('Message Successfully Sent', 'Your message has been sent to the External User. Redirecting back to the inbox page');
			setTimeout(function(){  window.location.href = getContextPath() + '/mail/externalinbox.jsp'; }, 3000);
			
		},
		error: function(response) {
			closeUploadProgress();
			callFailModal('Message Send Failed', 'An error has occured while processing your request.');
			deactivatePageLoading();
		}
	});

	/* FORM VALIDATION - Message Director Form */
	$('#response_external_form').form({
		fields: {
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
		if( $('#response_external_form').form('is valid') ) {
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