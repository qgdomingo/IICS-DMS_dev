/**
 *  fileupload.js
 */
	
	$(document).ready(() => {	
		changeUploadForm($('#doctype_select').val());
		
		submitPersonalDocsForm();
		submitIncomingDocsForm();
		submitOutgoingDocsForm();
	})

/* 
 *  FUNCTIONS AND EVENTS
 */
	
	/* Switch Upload Form */
	$('#doctype_select').change(() => {
		changeUploadForm($('#doctype_select').val());
	});
	
	/* CHANGE - Upload Form and Hide other forms */
	function changeUploadForm(doctype) {
		if(doctype == 'Personal') {
			$('#personaldocs_form').show();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Incoming') {
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').show();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Outgoing') {
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').show();
		}
	}
	
	/* SUBMIT - Personal Form */
	function submitPersonalDocsForm() {
		 $('#personaldocs_form').submit(() => {
			 //TODO: form validation 
			 activatePageLoading('Uploading Personal Document');
		 });
		
		 $('#personaldocs_form').ajaxForm({
	          success: function(response) {    
	              if(response)
	              {
	            	  $('#personaldocs_form').trigger('reset')
	            	  $('#personal_category').dropdown('restore defaults');
	            	  deactivatePageLoading();
	            	  callSuccessModal('Personal Document Upload Success', 'Your document has been successfully uploaded.');
	              }
	              else
	              {
	            	  callFailModal('Personal Document Upload Failed', 'We are unable to upload your document, please try again.');
	            	  deactivatePageLoading();
	              }
	          },
	          error: function(response) {
	        	  callFailRequestModal();
	        	  deactivatePageLoading();
	          }
	     });
	}
	
	/* SUBMIT - Incoming Form */
	function submitIncomingDocsForm() {
		 $('#incomingdocs_form').submit(() => {
			 //TODO: form validation 
			 activatePageLoading('Uploading Incoming Document');
		 });
		
		 $('#incomingdocs_form').ajaxForm({
	          success: function(response) {    
	              if(response)
	              {
	            	  $('#incomingdocs_form').trigger('reset')
	            	  $('#incoming_category').dropdown('restore defaults');
	            	  $('#incoming_action').dropdown('restore defaults');
	            	  deactivatePageLoading();
	            	  callSuccessModal('Incoming Document Upload Success', 'Your document has been successfully uploaded.');
	              }
	              else
	              {
	            	  callFailModal('Incoming Document Upload Failed', 'We are unable to upload your document, please try again.');
	            	  deactivatePageLoading();
	              }
	          },
	          error: function(response) {
	        	  callFailRequestModal();
	        	  deactivatePageLoading();
	          }
	     });
	}
	
	/* SUBMIT - Outgoing Form */
	function submitOutgoingDocsForm() {
		 $('#outgoingdocs_form').submit(() => {
			 //TODO: form validation 
			 activatePageLoading('Uploading Outgoing Document');
		 });
		
		 $('#outgoingdocs_form').ajaxForm({
	          success: function(response) {    
	              if(response)
	              {
	            	  $('#outgoingdocs_form').trigger('reset')
	            	  $('#outgoing_category').dropdown('restore defaults');
	            	  deactivatePageLoading();
	            	  callSuccessModal('Outgoing Document Upload Success', 'Your document has been successfully uploaded.');
	              }
	              else
	              {
	            	  callFailModal('Outgoing Document Upload Failed', 'We are unable to upload your document, please try again.');
	            	  deactivatePageLoading();
	              }
	          },
	          error: function(response) {
	        	  callFailRequestModal();
	        	  deactivatePageLoading();
	          }
	     });
	}
	
	/* CLEAR FORM - Personal Documents */
	$('#personal_clear').click(() => {
		$('#personaldocs_form').trigger('reset')
		$('#personal_category').dropdown('restore defaults');
	});
	
	/* CLEAR FORM - Incoming Documents */
	$('#incoming_clear').click(() => {
	  	$('#incomingdocs_form').trigger('reset')
		$('#incoming_category').dropdown('restore defaults');
	  	$('#incoming_action').dropdown('restore defaults');
	});
	
	/* CLEAR FORM - Outgoing Documents */
	$('#outgoing_clear').click(() => {
		$('#outgoingdocs_form').trigger('reset')
		$('#outgoing_category').dropdown('restore defaults');
	});
	