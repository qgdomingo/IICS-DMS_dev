/**
 * 
 */

/*
 * VARIABLES
 */
	// for progress bar
    var bar = $('.bar');
    var percent = $('.label');

	$(document).ready( function() {
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    threadNumber = decodeURIComponent(data.thread_number);
	    
	    getMailInformation(threadNumber);
	});
	
	function getMailInformation(id) {
		
		var data = { threadNumber: id }
		
		$.get(getContextPath() + '/RetrieveExternalUserDetailsThreadNo', $.param(data), function(response) {
			$('#sender_info').text(response[0].firstName + ' ' + response[0].lastName + ' (' + response[0].email + ')');
			$('#contact_info').text(response[0].contactNumber);
			$('#affiliation_info').text(response[0].affiliation);
			$('#thread_number').val(response[0].threadNumber);
			$('#subject_info').val(response[0].subject);
		});
		
	}
    
	/* SUBMIT - Reply to Director Form */
	$('#reply_to_director_form').ajaxForm({
		beforeSubmit: isReplyToFormValid,
		uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	    },
		success: function(response) {  
			closeUploadProgress();
			clearResponseDirectorForm();
			callSuccessModal('Message Successfully Sent', 'Your response has been sent to the Director. You will be receive ' 
					+ ' a reply through the email address you entered. Redirecting you to the login page.');
			setTimeout(function(){  window.location.href = getContextPath() + '/index.jsp'; }, 3000);
		},
		error: function(response) {
			closeUploadProgress();
			callFailRequestModal();
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Reply to Director Form */
	$('#reply_to_director_form').form({
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
	
	/* BOOLEAN VALIDATION - Response Director Form */
	function isReplyToFormValid() {
		if( $('#reply_to_director_form').form('is valid') ) {
			activatePageLoading('Sending Message');
			openAndInitializeUploadProgress();
			return true;
		} 
		else {
			return false;
		}
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