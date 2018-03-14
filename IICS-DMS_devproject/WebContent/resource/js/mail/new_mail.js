/**
 * 
 */
	$(document).ready( function() {
		displayAppropriateForm();

		if( ! ($('#user_type').val() == 'Faculty') ) {
			getListOfUsers('#internal_letter_to');
			getListOfUsers('#internal_memo_notice_to');
		}
	});
	
	$('#new_mail_type_select').change( function() {
		displayAppropriateForm();
	});
	
	function displayAppropriateForm() {
		var tempVal = $('#new_mail_type_select').val();
		
		if (tempVal == 'Letter') {
			$('#letter_form').show();
			$('#memo_notice_form').hide();
			$('#generate_iso_form').hide();
			$('#mail_type').val(tempVal);
		}
		else if (tempVal == 'Memo' || tempVal == 'Notice') {
			$('#letter_form').hide();
			$('#memo_notice_form').show();
			$('#generate_iso_form').hide();
			$('#mail_type_label').text(tempVal);
			$('#mail_type').val(tempVal);
		}
		else if(tempVal == 'ISO'){
			$('#letter_form').hide();
			$('#memo_notice_form').hide();
			$('#generate_iso_form').show();
		}
		
	}
	
/*
 * FORM SUBMISSION - LETTER
 */
	
	/* SUBMIT - Letter Form */
	$('#letter_form').ajaxForm({
		beforeSubmit: isLetterFormValid,
		success: function(response) {  
			if (response == 'invalid send mail') {
				callFailModal('Unable to Send Letter','Please add at least one recipient on the "TO" field on the Mail Recipients section');
			}
			else {
				clearLetterForm();
				callSuccessModal('Mail Processed Successfully ','Your mail has been processed without errors.');
			}
			deactivatePageLoading();
		},
		error: function(response) {
			callFailModal('Unable to Forward Mail','An error has occured when sending your mail, please try again.');
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Letter Form */
	$('#letter_form').form({
		fields: {
			addressee_line1: {
				identifier: 'addressee_line1',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please an addressee of the letter'
					}
				]
			},
			addressee_line2: {
				identifier: 'addressee_line2',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter at least the second line header of the addressee. (e.g. Affiliation of the Addressee)'
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the letter'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the letter content'
					}
				]
			},
			closing_line: {
				identifier: 'closing_line',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a complimentary closing line of the letter. (e.g. Sincrely Yours, )'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Letter Form */
	function isLetterFormValid() {
		if( $('#letter_form').form('is valid') ) {
			activatePageLoading('Forwarding Letter');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Letter Form */
	function clearLetterForm() {
		removeCSSClass('#letter_form', 'error');		
	  	$('#letter_form').form('reset');
	  	
	  	if( ! ($('#user_type').val() == 'Faculty') ) {
			$('#internal_letter_to').dropdown('restore defaults');
		  	$('#external_letter_to').dropdown('restore defaults');
	  	}
	}
	
	/* CLICK EVENT - Letter Form */
	$('#clear_letter_form').click(() => {
		clearLetterForm();
	});
	
/*
 * FORM SUBMISSION - MEMO/NOTICE
 */
	
	/* SUBMIT - MEMO/NOTICE Form */
	$('#memo_notice_form').ajaxForm({
		beforeSubmit: isMemoNoticeFormValid,
		success: function(response) {  
			if (response == 'invalid send mail') {
				callFailModal('Unable to Send Letter','Please add at least one recipient on the "TO" field on the Mail Recipients section');
			}
			else {
				clearMemoNoticeForm();
				callSuccessModal('Mail Processed Successfully ','Your mail has been processed without errors.');
			}
			deactivatePageLoading();
		},
		error: function(response) {
			callFailModal('Unable to Forward Mail','An error has occured when sending your mail, please try again.');
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Memo/Notice Form */
	$('#memo_notice_form').form({
		fields: {
			addressee: {
				identifier: 'addressee',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please an addressee of the mail'
					}
				]
			},
			from: {
				identifier: 'from',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter office from whom the mail is'
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the letter'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the letter content'
					}
				]
			},
			closing_line: {
				identifier: 'closing_line',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a complimentary closing line of the letter. (e.g. Sincrely Yours, )'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Memo/Notice Form */
	function isMemoNoticeFormValid() {
		if( $('#memo_notice_form').form('is valid') ) {
			activatePageLoading('Forwarding Mail');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Memo/Notice Form */
	function clearMemoNoticeForm() {
		removeCSSClass('#memo_notice_form', 'error');		
	  	$('#memo_notice_form').form('reset');
	  	
	  	if( ! ($('#user_type').val() == 'Faculty') ) {
			$('#internal_memo_notice_to').dropdown('restore defaults');
		  	$('#external_memo_notice_to').dropdown('restore defaults');
	  	}
	}
	
	/* CLICK EVENT - Letter Form */
	$('#clear_mail_form').click(() => {
		clearMemoNoticeForm();
	});
	
/*
 * FORM SUBMISSION - GET ISO CODE
 */
	$('#generate_iso_form').ajaxForm({
		beforeSubmit: isGetISOCodeFormValid,
		success: function(response) {
			deactivatePageLoading();
			if(response) {
				$('#generated_type').text($('#generate_iso_type').val());
				$('#generated_iso').text(response + '');
				
				$('#generate_iso_type').dropdown('restore defaults');
				$('#generate_iso_form').form('reset');
				addCSSClass('#generate_iso_form','success');
			}
		},
		error: function(response) { 
			callFailModal('Unable to Get ISO Code','An error has occured with this request. Please try again.');
			deactivatePageLoading();
		}
	});
	
	$('#generate_iso_form').form({
		fields: {
			generate_iso_type: {
				identifier: 'generate_iso_type',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select the type of mail to generate an ISO number'
					}
				]
			},
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
	