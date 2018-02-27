/**
 * 
 */
	$(document).ready(() => {
		editTaskFormValidation();
	});

/*
 * FUNCTIONS
 */
			
	/* SUBMIT - Edit Task */
	$('#edit_task_form').ajaxForm({
		  beforeSubmit: isEditTaskFormValid,
          success: function(response) {    
        	  if(response) {
        		  callSuccessModal('Task Updated', 'This task has been updated. The page will now refresh.');
        		  
        		  // auto page refresh in 5 seconds
        	  }
        	  else {
        		  callFailModal('Fail to Update Task', 'We are unable to update this task. Please Try Again.');
        	  }        	  
          },
          error: function(response) {
        	  callFailRequestModal();
          }
	});

	/* FORM VALIDATION - Edit Task Form */
	function editTaskFormValidation() {
		$('#edit_task_form').form({
		    fields: {
		    	title: {
		          identifier: 'title',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please enter the task title'
		            }
		          ]
		        },
		        deadline: {
		          identifier: 'deadline',
			      rules: [
			        {
			          type   : 'empty',
			          prompt : 'Please enter the task deadline'
			        }
			       ]
			     },
			     category: {
			    	identifier: 'category',
			    	rules: [
			    		{
			    			type  : 'empty',
			    			prompt: 'Please choose a document category of the task'
			    		}
			    	]
			     },
			     instructions: {
				    identifier: 'instructions',
				    rules: [
				    	{
				    		type  : 'empty',
				    		prompt: 'Please enter the instructions for the task'
				    	}
				    ]
				 },
				 assigned_to: {
				    identifier: 'assigned_to',
				    rules: [
				    	{
				    		type  : 'empty',
				    		prompt: 'Please assign the task to at least one user'
				    	}
				     ]
				  }
		       }
		    });
	}
	
	/* BOOLEAN VALIDATION - Edit Task Form */
	function isEditTaskFormValid() {
		if( $('#edit_task_form').form('is valid') ) {
			 addCSSClass('#edit_task_form', 'loading');
			 $('#edittask_cancel').prop("disabled", "disabled");
			 $('#edittask_submit').prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
