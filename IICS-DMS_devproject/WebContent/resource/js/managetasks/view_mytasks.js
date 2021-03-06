/**
 *  view_mytasks.js
 *   - javascript used for the viewtasks.jsp in retrieving tasks assigned to the user 
 */

/*
 * DOCUMENT ON LOAD 
 */
	$(document).ready(() => {
		retrieveCategory('#mytask_category');
		retrieveMyTasks();
		
		// Initialize Task Submission Form
		submitMyTask();
		validateMyTaskForm();
		
		getAcadYearList('#search_acad_year');
	});

/*
 * VARIABLES
 */
	var localMyTasksData;
	var myTasksTable;
	var isMyTasksTableEmpty = true;
	var today = new Date();
	var selectedDataID;
	var selectedRowReference;
/*
 * FUNCTIONS
 */
	 
	/* GET - My Tasks */
	function retrieveMyTasks() {
		addCSSClass('#mytasks_loading', 'active');	
		
		$.get(getContextPath() + '/AssignedTask', (responseData) => {
			if(!responseData.length == 0) 
			{
				localMyTasksData = responseData; 
				$.each(responseData, (index, mytask) => {
					$('<tr id="'+index+'">').appendTo('#mytasks_tablebody')		
						.append($('<td>').text(mytask.title))
						.append($('<td>').text(mytask.assignedBy))
						.append($('<td>').text(mytask.deadline))
						.append($('<td>').text(mytask.category))
						.append($('<td>').text(mytask.status))
						.append($('<td>').text(mytask.schoolYear))
				});
				
				// bind events and classes to the table after all data received
				myTasksTable = $('#mytasks_table').DataTable({
					'order': [[2, 'desc']]
				});
				selectMyTaskRow();
				isMyTasksTableEmpty = false;
				removeCSSClass('#mytasks_loading', 'active');	
			} 
			else if(responseData.length == 0)
			{
				$('<tr>').appendTo('#mytasks_tablebody')
					.append($('<td class="center-text" colspan="6">')
							.text("Hooray! You do not have any assigned tasks at the moment."));
				removeCSSClass('#mytasks_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#mytasks_tablebody')
				.append($('<td class="center-text error" colspan="6">')
						.text("Unable to retrieve list of your tasks. Please refresh page. :("));
				removeCSSClass('#mytasks_loading', 'active');
				callFailRequestModal();
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#mytasks_tablebody')
			.append($('<td class="center-text error" colspan="6">')
					.text("Unable to retrieve list of your tasks. Please refresh page. :("));
			removeCSSClass('#mytasks_loading', 'active');
			callFailRequestModal();
		});
	}

	
	/* SELECT ROW - MY TASK TABLE */
	function selectMyTaskRow() {
	    $('#mytasks_table tbody').on('dblclick', 'tr', function () {
	    	$(this).toggleClass('active');
	    	selectedDataID = $(this).attr('id');
	    	getMyTaskData($(this).attr('id'));
	    	selectedRowReference = $(this);
	    	$('#mytask_dialog').modal({
				closable: false,
				observeChanges: true,
				centered: false,
				onHidden: () => {
					removeCSSClass('#mytask_form', 'error');
					removeCSSClass('#mytask_form', 'loading');
					$('#viewmytask_close').prop("disabled", "");
					$('#mytask_form').form('reset');
				}
			}).modal('show');
	    });
	}
	
	/* CLOSE MODAL - MY TASK */
	$('#viewmytask_close').click(() => {
		selectedRowReference.toggleClass('active');
	});
	
	/* GET - Individual My Task Data for Viewing */
	function getMyTaskData(id) {
		var selectedData = localMyTasksData[id];
		populateMyTaskDetails(selectedData);
		
		if(selectedData['status'] == 'No Submission')
		{
			$('#mytask_submit_id').val(selectedData['id']);
			$('#mytask_submit_deadline').val(selectedData['deadline']);
			
			$('#mytask_form').show();
			$('#mytask_submissiondetails').hide();
		}
		else
		{
			$('#mytask_submissiondetails').show();
			$('#mytask_form').hide();
			getMyTaskSubmission(selectedData['id'])
		}
	}
	
	/* SET - Populate the My Task Details */
	function populateMyTaskDetails(data) {
		$('#mytask_title').text(data['title']);
		$('#mytask_viewcategory').text(data['category']);
		$('#mytask_academicyear').text(data['schoolYear']);
		$('#mytask_assignedby').text(data['assignedBy']);
		$('#mytask_datecreated').text(data['dateCreated']);
		$('#mytask_viewdeadline').text(data['deadline']);
		$('#mytask_instructions').text(data['instructions']);
		
	}
	
	/* GET - Submission Data of Task */
	function getMyTaskSubmission(id) {
		addCSSClass('#mytask_submissiondetails_loading', 'active');
		
		var data = {
			id: id
		}
		
		$.post(getContextPath() + '/RetrieveSpecificTask', $.param(data), (responseData) => {
			if(responseData)
			{
				$('#mytask_sub_title').text(responseData[0]);
				$('#mytask_submissiondate').text(responseData[1]);
				$('#mytask_viewstatus').text(responseData[2]);
				$('#mytask_file').text(responseData[3]);
				$('#mytask_description').text(responseData[4]);
				$('#mytask_download_id').val(responseData[5]);
				$('#mytask_download_email').val(responseData[6]);
				removeCSSClass('#mytask_submissiondetails_loading', 'active');
			}
			else
			{
				callFailModal('Uh-oh!','We are unable to retrieve submission details.');
				removeCSSClass('#mytask_submissiondetails_loading', 'active');
			}
		})
		.fail((response) => {
			callFailRequestModal();
			removeCSSClass('#mytask_submissiondetails_loading', 'active');
		});
	}
	
	/* UPDATE - Add Row Data */
	function addRowData(updatedData, index) {
		var rowString = '<tr id="'+index+'">'
			+ '<td>' + updatedData.title + '</td>'
			+ '<td>' + updatedData.assignedBy + '</td>'
			+ '<td>' + updatedData.deadline + '</td>'
			+ '<td>' + updatedData.category + '</td>'
			+ '<td>' + updatedData.status + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
	/* SUBMIT - Task */
	function submitMyTask() {		
		 $('#mytask_form').ajaxForm({
			  beforeSubmit: isFormValid,
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
	        	  else if(response)
	              {
	            	  localMyTasksData[selectedDataID]['status'] = response;
	            	  myTasksTable.row('.active').remove();
	            	  selectedRowReference.toggleClass('active');
	            	  myTasksTable.row.add( $(addRowData(localMyTasksData[selectedDataID], selectedDataID))[0] ).draw();	
	            	  
	            	  callSuccessModal('Task Upload Success', 'Your task has been successfully submitted.');
	              }
	          },
	          error: function(response) {
	        	  closeUploadProgress();
	        	  callFailModal('Task Upload Failed', 'We are unable to submit your task, please try again.');
	          }
	     });
	}
	
	
	/* MY TASK - FORM VALIDATION */
	function validateMyTaskForm() {
		$('#mytask_form').form({
		    fields: {
		    	document_title: {
		          identifier: 'document_title',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please enter the document title'
		            }
		          ]
		        },
		        file: {
		          identifier: 'file',
			      rules: [
			        {
			          type   : 'empty',
			          prompt : 'Please upload choose a file to upload'
			        }
			       ]
			     }
		       }
		    })
		  ;
	}
	
	/* MY TASK - BOOLEAN VALID FORM */
	function isFormValid() {
		if( $('#mytask_form').form('is valid') ) {
			 addCSSClass('#mytask_form', 'loading');
			 $('#viewmytask_close').prop("disabled", "disabled");
			 $('#mytask_dialog').modal('hide');
			 openAndInitializeUploadProgress();
			return true;
		} 
		else {
			return false;
		}
	}
	
	
/*
 * SEARCH FUNCTIONS - MY TASKS
 */
	$('#mytask_search').on('input', function() {
		if(!isMyTasksTableEmpty) myTasksTable.search( $(this).val() ).draw();
	});
		
	$('#mytask_deadline_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isMyTasksTableEmpty) myTasksTable.column(2).search( text ).draw();
		}) 
	});
		
	$('#mytask_category').on('change', function() {
		if(!isMyTasksTableEmpty) myTasksTable.column(3).search( $(this).val() ).draw();
	});
		
	$('#mytask_status').on('change', function() {
		if(!isMyTasksTableEmpty) myTasksTable.column(4).search( $(this).val() ).draw();
	});
		
	/* SEARCH - Academic Year */
	$('#search_acad_year').on('change', function() {
		if(!isMyTasksTableEmpty) myTasksTable.column(5).search( $(this).val() ).draw();
	});
	
	$('#mytask_clear').click(() => {
		resetMyTasksSearchFields();
	})
		
	function resetMyTasksSearchFields() {
		$('#mytask_search').val('');
		$('#mytask_deadline_calendar').calendar('clear');
		$('#mytask_category').dropdown('restore defaults');
		$('#mytask_status').dropdown('restore defaults');
		$('#search_acad_year').dropdown('restore defaults');
		if(!isMyTasksTableEmpty) myTasksTable.search('').draw();
	}

