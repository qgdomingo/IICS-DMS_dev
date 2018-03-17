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
		 uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	     },
	     success: function(response) { 
	    	closeUploadProgress();
			if(response == 'incorrect upload type') {
				callFailModal('File Format Invalid', 'The file format you are trying to upload is invalid. ');
			}	
			else if(response == 'above maximum size') {
	        	callFailModal('File Max Size Error', 'Your file has exceeded the maximum file size of 25MB. Please upload a smaller file');
	        }
	        else {
	        	clearPersonalDocsForm();
	            callSuccessModal('Personal Document Upload Success', 'Your document has been successfully uploaded.');     	
	        }
	        deactivatePageLoading();
	     },
	     error: function(response) {
	    	 closeUploadProgress();
	    	 deactivatePageLoading();
	    	 callFailModal('Personal Document Upload Failed', 'We are unable to upload your document, please try again.');
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
					},
					{
						type : 'maxLength[100]',
						prompt: 'Maximum of 100 characters in title'
					}
				]
			},
			description: {
				identifier: 'description',
				rules: [
					{
						type : 'maxLength[2000]',
						prompt: 'Maximum of 100 characters in description'
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
			openAndInitializeUploadProgress();
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