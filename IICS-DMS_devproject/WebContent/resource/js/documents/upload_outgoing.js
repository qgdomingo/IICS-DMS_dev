/**
 * 
 */

	/* SUBMIT - Outgoing Document Form */
	$('#outgoingdocs_form').ajaxForm({
		beforeSubmit: isOutgoingDocFormValid,
		success: function(response) {    
			if(response) {
				clearOutgoingDocsForm();
				deactivatePageLoading();
				callSuccessModal('Outgoing Document Upload Success', 'Your document has been successfully uploaded.');
			}
			else {
				 callFailModal('Outgoing Document Upload Failed', 'We are unable to upload your document, please try again.');
				deactivatePageLoading();
			}
		},
		error: function(response) {
			callFailRequestModal();
			deactivatePageLoading();
		}
	});


	/* FORM VALIDATION - Outgoing Document Form */
	$('#outgoingdocs_form').form({
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
			document_recipient: {
				identifier: 'document_recipient',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select a recipient of the document'
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
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Outgoing Document Form */
	function isOutgoingDocFormValid() {
		if( $('#outgoingdocs_form').form('is valid') ) {
			activatePageLoading('Uploading Outgoing Document');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Outgoing Document Fields */
	function clearOutgoingDocsForm() {
		removeCSSClass('#outgoingdocs_form', 'error');		
	  	$('#outgoingdocs_form').form('reset')
		$('#outgoing_category').dropdown('restore defaults');
	  	$('#outgoing_recipient').dropdown('restore defaults');
	}
	
	/* CLICK EVENT - Outgoing Document Clear Fields Button */
	$('#outgoing_clear').click(() => {
		clearOutgoingDocsForm();
	});