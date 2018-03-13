/**
 * 
 */
	$(document).ready( function() {
		displayAppropriateForm();

		if( ! ($('#user_type').val() == 'Faculty') ) {
			getListOfUsers('#internal_to');
		}
	});
	
	$('#mail_type_select').change( function() {
		displayAppropriateForm();
	});
	
	function displayAppropriateForm() {
		var tempVal = $('#mail_type_select').val();
		
		if (tempVal == 'Memo' || tempVal == 'Letter') {
			$('#new_mail_form').show();
			$('#generate_iso_form').hide();
		}
		else if(tempVal == 'ISO'){
			$('#new_mail_form').hide();
			$('#generate_iso_form').show();
		}
		
		$('#mail_type').val(tempVal);
	}
	
/*
 * FORM SUBMISSION - MAIL
 */
	
	/* SUBMIT - Mail Form */
	$('#new_mail_form').ajaxForm({
		beforeSubmit: isMailFormValid,
		success: function(response) {  
			if (response == 'invalid send mail') {
				callFailModal('Unable to Send Mail','Please add at least one recipient on the "TO" field. ');
			}
			else {
				clearMailForm();
				callSuccessModal('Mail Processed Successfully ','Your mail has been processed without errors.');
			}
			deactivatePageLoading();
		},
		error: function(response) {
			callFailModal('Unable to Forward Mail','An error has occured when sending your mail, please try again.');
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Mail Form */
	$('#new_mail_form').form({
		fields: {
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the mail'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the mail content'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Mail Form */
	function isMailFormValid() {
		if( $('#new_mail_form').form('is valid') ) {
			activatePageLoading('Forwarding Mail');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Mail Form */
	function clearMailForm() {
		removeCSSClass('#new_mail_form', 'error');		
	  	$('#new_mail_form').form('reset');
	  	
	  	if( ! ($('#user_type').val() == 'Faculty') ) {
			$('#internal_to').dropdown('restore defaults');
		  	$('#external_to').dropdown('restore defaults');
	  	}
	}
	
	/* CLICK EVENT - Incoming Document Clear Fields Button */
	$('#clear_mail_form').click(() => {
		clearMailForm();
	});
	
/*
 * FORM SUBMISSION - GET ISO CODE
 */
	$('#generate_iso_form').ajaxForm({
		beforeSubmit: isGetISOCodeFormValid,
		success: function(response) {
			deactivatePageLoading();
			callSuccessModal('ISO Number Generated','Your ISO Number is: ' + response + '');
		},
		error: function(response) { 
			callFailModal('Unable to Get ISO Code','An error has occured with this request. Please try again.');
			deactivatePageLoading();
		}
	});
	
	$('#generate_iso_form').form({
		fields: {
			purpose: {
				identifier: 'purpose',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the purpose of the generation of the ISO number'
					}
				]
			},
		}
	})
	
	function isGetISOCodeFormValid() {
		if( $('#generate_iso_form').form('is valid') ) {
			activatePageLoading('Generating ISO Number');
			return true;
		} 
		else {
			return false;
		}
	}
	