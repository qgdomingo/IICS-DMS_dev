/**
 * 
 */

	$(document).ready( () => {
		addTaskFormValidation();
	});

/*
 * VARIABLES
 */
	var isNewlyLoadedDirectory = true;
	var today = new Date();
	
/*
 *  TASKS CREATED - ADD TASK
 */
	/* OPEN MODAL - Add Task */
	$('#taskscreated_addtask_btn').click(() => {
		$('#addtask_dialog').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				$('#addtask_deadline_calendar').calendar({
					minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
					ampm: false,
					formatter: dateFormat
				});
				if(isNewlyLoadedDirectory) {
					getListOfUsers('#addtask_assignto');
					isNewlyLoadedDirectory = false;
				}
			},
			onHidden: () => {
				 removeCSSClass('#add_task_form', 'loading');
				 $('#addtask_clear').prop("disabled", "");
				 $('#addtask_cancel').prop("disabled", "");
				 $('#addtask_submit').prop("disabled", "");
			}
		}).modal('show');
	});
		
	/* SUBMIT - Add Task */
	$('#add_task_form').ajaxForm({
		  beforeSubmit: isAddTaskFormValid,
          success: function(response) {    
        	  if(response) {
        		  addNewRowData(response);
        		  clearAddTaskFields();
        		  callSuccessModal('Added New Task', 'A Task has successfully been created.');
        	  }
        	  else {
        		  callFailModal('Fail to Add a New Task', 'We are unable to create a new task. Please Try Again.');
        	  }        	  
          },
          error: function(response) {
        	  callFailRequestModal();
          }
	});

	/* FORM VALIDATION - Add Task Form */
	function addTaskFormValidation() {
		$('#add_task_form').form({
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
		$('#add_task_form').form('reset');
		$('#addtask_deadline_calendar').calendar('clear');
		$('#addtask_category').dropdown('restore defaults');
		$('#addtask_assignto').dropdown('restore defaults');
	}
	
	/* CLEAR EVENT - Add Task Clear Fields Button */
	$('#addtask_clear').click(() => {
		clearAddTaskFields();
	});
	
		