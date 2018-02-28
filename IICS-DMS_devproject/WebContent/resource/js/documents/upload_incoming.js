/**
 *  upload_incoming.js
 *   - javascript used for upload of incoming document which includes form validation
 */
	var today = new Date();

	$(document).ready(() => {
		
		// Calendar Input Initialization
		$('#incoming_due_calendar').calendar({
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			ampm: false,
			formatter: dateFormat
		});
	});


	/* SUBMIT - Incoming Document Form */
	$('#incomingdocs_form').ajaxForm({
		beforeSubmit: isIncomingDocFormValid,
		success: function(response) {    
			if(response) {
				clearIncomingDocsForm();
				deactivatePageLoading();
				callSuccessModal('Incoming Document Upload Success', 'Your document has been successfully uploaded.');
			}
			else {
				callFailModal('Incoming Document Upload Failed', 'We are unable to upload your document, please try again.');
				deactivatePageLoading();
			}
		},
		error: function(response) {
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
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Incoming Document Form */
	function isIncomingDocFormValid() {
		if( $('#incomingdocs_form').form('is valid') ) {
			activatePageLoading('Uploading Incoming Document');
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
	}
	
	/* CLICK EVENT - Incoming Document Clear Fields Button */
	$('#incoming_clear').click(() => {
		clearIncomingDocsForm();
	});