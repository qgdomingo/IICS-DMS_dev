/**
 *  upload_incoming.js
 *   - javascript used for upload of incoming document which includes form validation
 */

/*
 * VARIABLES
 */
	var today = new Date();
	var firstThreeLetters = '';
	var selectedAction = '';
	var tempDueValue = '';
	
	$(document).ready(() => {
		$('#reference_no_field').hide();
		$('#incoming_due_field').hide();

		// Calendar Input Initialization
		$('#incoming_due_calendar').calendar({
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			ampm: false,
			formatter: dateFormat
		});
	});
	
/*
 * FUNCTIONS and EVENTS
 */
	/* CLEAR - Thread Selection */
	$('#clear_incoming_thread').click(function() {
		$('#incoming_thread').dropdown('restore defaults');
	});
	
	/* CHANGE - Set Incoming Document Reference No. Label and Field */
	$('#incoming_source').on('change', function() {
		$('#reference_no').val('');
		$('#reference_no_field').hide();
		
		var selectedSource = $('#incoming_source').dropdown('get value');
		var startingReference = '';
		
		$.each(localSourceRecipientData, (index, data) => {
			if(data.sourcesName == selectedSource) {
				startingReference = data.defaultReference;
				return;
			}
		});
		
		firstThreeLetters = startingReference.substring(0, 3);
		
		if(firstThreeLetters == 'UST') {
			$('#reference_no_field').show();
			$('#reference_no_start').text(startingReference);
		} 
		else {
			$('#reference_no_field').hide();
		}
	});
	
	/* CHANGE - Set Incoming Document Action Due */
	$('#incoming_action').on('change', function() {
		$('#incoming_due_calendar').calendar('clear');
		$('#incoming_due_field').hide();
		
		selectedAction = $('#incoming_action').dropdown('get value');
		
		if( !((selectedAction == 'None') || (selectedAction == 'For Dissemination')) ) {
			$('#incoming_due_field').show();
		}
	});
	
	/* CUSTOM FORM RULE - If Needed a Reference No */
	$.fn.form.settings.rules.referenceNo = function(value) {
		if( (firstThreeLetters == '') ||
			(firstThreeLetters == 'EXT' && value == '') ||
		    (firstThreeLetters == 'UST' && !(value == '')) ) {
			return true;
		}
		else {
			return false;
		}
	};
	
	/* CUSTOM FORM RULE - If Needed an Action Due */
	$.fn.form.settings.rules.actionDue = function(value) {
		if( (selectedAction == '') ||
		    (!((selectedAction == 'None') || (selectedAction == 'For Dissemination')) && !(value == ''))  || 
		    (((selectedAction == 'None') || (selectedAction == 'For Dissemination')) && value == '')) {
			return true;
		}
		else {
			return false;
		}
	};
	
	/* SUBMIT - Incoming Document Form */
	$('#incomingdocs_form').ajaxForm({
		beforeSubmit: isIncomingDocFormValid,
		uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	    },
		success: function(response) {  
			closeUploadProgress();
			if (response) {
				clearIncomingDocsForm();
				callSuccessModal('Incoming Document Upload Success', 'Your document has been successfully uploaded.'
						+ ' The document reference number is: ');
			}
			else {
				callFailModal('Incoming Document Upload Failed', 'We are unable to upload your document, please try again.');
			}
			
			deactivatePageLoading();
		},
		error: function(response) {
			closeUploadProgress();
			callFailRequestModal();
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Incoming Document Form */
	$('#incomingdocs_form').form({
		fields: {
			category: {
				identifier: 'category',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select a document category'
					}
				]
			},
			document_source: {
				identifier: 'document_source',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select a source of the document'
					}
				]
			},
			document_title: {
				identifier: 'document_title',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a title for the document'
					}
				]
			},
			file: {
				identifier: 'file',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select a file to upload'
					}
				]
			},
			action_required: {
				identifier: 'action_required',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select an action needed for the document'
					}
				]
			},
			incoming_due: {
				identifier: 'incoming_due',
				rules: [
					{
						type   : 'actionDue[]',
						prompt : 'Please enter a due date for the incoming document'
					}
				]
			},
			reference_no: {
				identifier: 'reference_no',
				rules: [
					{
						type   : 'referenceNo[]',
						prompt : 'Please enter a reference number of the document'
					}
				]
			}
			
		}
	});
	
	/* BOOLEAN VALIDATION - Incoming Document Form */
	function isIncomingDocFormValid() {
		if( $('#incomingdocs_form').form('is valid') ) {
			activatePageLoading('Uploading Incoming Document');
			openAndInitializeUploadProgress();
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Incoming Document Fields */
	function clearIncomingDocsForm() {
		removeCSSClass('#incomingdocs_form', 'error');		
	  	$('#incomingdocs_form').form('reset')
		$('#incoming_category').dropdown('restore defaults');
	  	$('#incoming_source').dropdown('restore defaults');
	  	$('#incoming_action').dropdown('restore defaults');
	  	$('#incoming_thread').dropdown('restore defaults');
	  	$('#incoming_due_field').hide();
	}
	
	/* CLICK EVENT - Incoming Document Clear Fields Button */
	$('#incoming_clear').click(() => {
		clearIncomingDocsForm();
	});
	
/*
 *  DOCUMENT THREAD
 */
	$('#incoming_source').on('change', function() {
		var tempSource = $('#incoming_source').dropdown('get value');
		
		if(!tempSource == '') {
			retrieveIncomingDocumentThread(tempSource);
		}
	});
	
	/* GET - FOR INCOMING: DOCUMENT THREAD LIST */
	function retrieveIncomingDocumentThread(incomingSource) {
		$('#incoming_thread').empty();

		var sourceData = {
			source: incomingSource
		}
		
		$.post(getContextPath() + '/IncomingDocumentsThread', $.param(sourceData), (responseList) => {
			$('#incoming_thread').dropdown('clear');
			$('#incoming_thread').empty();
			
			if(!responseList.length == 0)
			{				
				$('#incoming_thread').append($('<option value="">').text("Select Thread"));
				$.each(responseList, (index, data) => {
					$('#incoming_thread').append($('<option value="'+data.threadNumber+'">')
							.text(data.title + ' (' + data.category + ') ' + data.timeCreated));
				});
				$('#incoming_thread').dropdown().dropdown('refresh');
			}
			else if(responseList.length == 0)
			{
				$('#incoming_thread').append($('<option value="">').text("No Existing Thread for this Source"));
				$('#incoming_thread').dropdown().dropdown('refresh');
			}
			else
			{
				callFailModal('Retrieve Thread Error', 'We are unable to retrieve the document thread list for Incoming Documents.');
			}
		})
		.fail((response) => {
			callFailRequestModal();
		});
	}
	