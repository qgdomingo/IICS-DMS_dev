/**
 * 
 */

	$(document).ready(() => {	
		submitPersonalDocsForm();
	});

/*
 * FUNCTIONS and EVENTS
 */

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
	
	/* CLEAR FORM - Personal Documents */
	$('#personal_clear').click(() => {
		$('#personaldocs_form').trigger('reset')
		$('#personal_category').dropdown('restore defaults');
	});
	
	/* FORM VALIDATION - Personal Form */
	function personalFormValidation() {
		$('#personaldocs_form').form({
		    fields: {
		    	category: {
		          identifier: 'category',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please enter the task title'
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
	}
	
	/* BOOLEAN VALIDATION - Add Task Form */
	function isAddTaskFormValid() {
		if( $('#add_task_form').form('is valid') ) {
			 addCSSClass('#add_task_form', 'loading');
			 $('#addtask_clear').prop("disabled", "disabled");
			 $('#addtask_cancel').prop("disabled", "disabled");
			 $('#addtask_submit').prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Add Task Fields */
	function clearAddTaskFields() {
		removeCSSClass('#add_task_form', 'error');
		$('#add_task_form').form('reset');
		$('#addtask_deadline_calendar').calendar('clear');
		$('#addtask_category').dropdown('restore defaults');
		$('#addtask_assignto').dropdown('restore defaults');
	}
	
	/* CLEAR EVENT - Add Task Clear Fields Button */
	$('#addtask_clear').click(() => {
		clearAddTaskFields();
	});