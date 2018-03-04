/**
 * 
 */

	/* SUBMIT - Outgoing Document Form */
	$('#outgoingdocs_form').ajaxForm({
		beforeSubmit: isOutgoingDocFormValid,
		uploadProgress: function(event, position, total, percentComplete) {
			 updateUploadProgress(percentComplete);
	    },
		success: function(response) {   
			closeUploadProgress();
			
			if(response) {
				clearOutgoingDocsForm();
				callSuccessModal('Outgoing Document Upload Success', 'Your document has been successfully uploaded.');
			}
			else {
				callFailModal('Outgoing Document Upload Failed', 'We are unable to upload your document, please try again.');
			}
			
			deactivatePageLoading();
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
			openAndInitializeUploadProgress();
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
	
/*
 *  DOCUMENT THREAD
 */
	$('#outgoing_recipient').on('change', function() {
		var tempSource = $('#outgoing_recipient').dropdown('get value');
		
		if(!tempSource == '') {
			retrieveOutgoingDocumentThread(tempSource);
		}
	});
	
	/* GET - FOR OUTGOING: DOCUMENT THREAD LIST */
	function retrieveOutgoingDocumentThread(outgoingSource) {
		$('#outgoing_thread').empty();

		var sourceData = {
			source: outgoingSource
		}
		
		$.post(getContextPath() + '/OutgoingDocumentsThread', $.param(sourceData), (responseList) => {
			$('#outgoing_thread').dropdown('clear');
			$('#outgoing_thread').empty()
			
			if(!responseList.length == 0)
			{
				$('#outgoing_thread').append($('<option value="">').text("Select Thread"));
				$.each(responseList, (index, data) => {
					$('#outgoing_thread').append($('<option value="'+data.threadNumber+'">')
							.text(data.title + ' (' + data.category + ') ' + data.timeCreated));
				});
				$('#outgoing_thread').dropdown().dropdown('refresh');
			}
			else if(responseList.length == 0)
			{
				$('#outgoing_thread').append($('<option value="">').text("No Existing Thread for this Recipient"));
				$('#outgoing_thread').dropdown().dropdown('refresh');
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
	