/**
 *  upload_personal.js
 *   - used by the fileupload.jsp for upload personal document form which includes form validation
 */

/*
 * FUNCTIONS and EVENTS
 */

	/* SUBMIT - Personal Form */
	$('#personaldocs_form').ajaxForm({
		 beforeSubmit: isPersonalDocFormValid,
	     success: function(response) {    
	        if(response)
	        {
	        	clearPersonalDocsForm();
	            deactivatePageLoading();
	            callSuccessModal('Personal Document Upload Success', 'Your document has been successfully uploaded.');
	        }
	        else
	        {
	        	deactivatePageLoading();
	        	callFailModal('Personal Document Upload Failed', 'We are unable to upload your document, please try again.');
	            
	        }
	     },
	     error: function(response) {
		   deactivatePageLoading();
	       callFailRequestModal();
	    }
	});

	/* FORM VALIDATION - Personal Document Form */
	$('#personaldocs_form').form({
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
	
	/* BOOLEAN VALIDATION - Personal Document Form */
	function isPersonalDocFormValid() {
		if( $('#personaldocs_form').form('is valid') ) {
			activatePageLoading('Uploading Personal Document');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Personal Document Fields */
	function clearPersonalDocsForm() {
		removeCSSClass('#personaldocs_form', 'error');
		$('#personaldocs_form').form('reset')
		$('#personal_category').dropdown('restore defaults');
	}
	
	/* CLICK EVENT - Personal Document Clear Fields Button */
	$('#personal_clear').click(() => {
		clearPersonalDocsForm();
	});