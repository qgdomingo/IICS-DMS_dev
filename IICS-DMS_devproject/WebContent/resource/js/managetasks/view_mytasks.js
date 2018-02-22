/**
 *  view_mytasks.js
 *   - javascript used for the viewtasks.jsp in retrieving tasks 
 */

	$(document).ready(() => {
		$('#taskscreated_segment').hide();
		retrieveCategory('#mytask_category');
		retrieveMyTasks();
		
		submitMyTask();
	});

/*
 * VARIABLES
 */
	
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
				});
				
				// bind events and classes to the table after all data received
				myTasksTable = $('#mytasks_table').DataTable({
					'order': [[0, 'asc'], [2, 'asc'], [1, 'asc']]
				});
				selectMyTaskRow();
				removeCSSClass('#mytasks_loading', 'active');	
			} 
			else if(responseData.length == 0)
			{
				$('<tr>').appendTo('#mytasks_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("Hooray! You do not have any assigned tasks at the moment."));
				removeCSSClass('#mytasks_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#mytasks_tablebody')
				.append($('<td class="center-text error" colspan="5">')
						.text("Unable to retrieve list of your tasks. Please refresh page. :("));
				removeCSSClass('#mytasks_loading', 'active');
				callFailRequestModal();
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#mytasks_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve list of your tasks. Please refresh page. :("));
			removeCSSClass('#mytasks_loading', 'active');
			callFailRequestModal();
		});
		isNewlyLoadedPageMT = false;
	}
	
	/* SELECT ROW - MY TASK TABLE */
	function selectMyTaskRow() {
	    $('#mytasks_table tbody').on('dblclick', 'tr', function () {
	    	getMyTaskData($(this).attr('id'));
	    	$(this).toggleClass('active');
	    	$('#mytask_dialog').modal({
				closable: false,
				observeChanges: true,
				onHidden: () => {
					removeCSSClass('#mytask_form', 'loading');
					$('#viewmytask_close').prop("disabled", "");
					$('#mytask_form').trigger('reset');
					$(this).toggleClass('active');
				}
			}).modal('show');
	    });
	}
	
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
		$('#mytask_assignedby').text(data['assignedBy']);
		$('#mytask_datecreated').text(data['dateCreated']);
		$('#mytask_viewdeadline').text(data['deadline']);
		$('#mytask_instructions').text(data['instructions']);
	}
	
	/* GET - Submission of My Task */
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
	
	/* SUBMIT - My Task */
	function submitMyTask() {
		 $('#mytask_form').submit(() => {
			 addCSSClass('#mytask_form', 'loading');
			 $('#viewmytask_close').prop("disabled", "disabled");
		 });
		
		 $('#mytask_form').ajaxForm({
	          success: function(response) {    
	              if(response)
	              {
	            	  //TODO: update selected row	
	            	  callSuccessModal('Task Upload Success', 'Your task has been successfully submitted.');
	              }
	              else
	              {
	            	  callFailModal('Task Upload Failed', 'We are unable to submit your task, please try again.');
	              }
	          },
	          error: function(response) {
	        	  callFailRequestModal();
	          }
	     });
	}
	
	
/*
 * SEARCH FUNCTIONS - MY TASKS
 */
	$('#mytask_search').on('input', function() {
		myTasksTable.search( $(this).val() ).draw();
	});
		
	$('#mytask_deadline_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			myTasksTable.column(2).search( text ).draw();
		}) 
	});
		
	$('#mytask_category').on('change', function() {
		myTasksTable.column(3).search( $(this).val() ).draw();
	});
		
	$('#mytask_status').on('change', function() {
		myTasksTable.column(4).search( $(this).val() ).draw();
	});
		
	$('#mytask_clear').click(() => {
		resetMyTasksSearchFields();
	})
		
	function resetMyTasksSearchFields() {
		$('#mytask_search').val('');
		$('#mytask_deadline').val('');
			myTasksTable.column(2).search('').draw();
		$('#mytask_category').dropdown('restore defaults');
		$('#mytask_status').dropdown('restore defaults');
	}

/*
 *  CATEGORY FUNCTIONS
 */
	/* GET CATEGORIES */
	function retrieveCategory(categoryDropdown) {
		$.get(getContextPath() + '/RetrieveCategory', (responseList) => {
			if(!responseList.length == 0)
			{
				localCategoriesData = responseList;
				isCategoryNotEmpty = true;
				populateCategory(categoryDropdown);
			}
			else if(responseList.length == 0)
			{
				localCategoriesData = ['Category List Empty.'];
				populateCategory(categoryDropdown);
			}
			else
			{
				callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
			}
		})
		.fail((response) => {
			callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
		});
	}
			
	/* POPULATE CATEGORY */
	function populateCategory(categoryDropdown) {
		if(isCategoryNotEmpty) {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text('Category'));
			$.each(localCategoriesData, (index, stringData) => {
				$(categoryDropdown).append($('<option value="'+stringData+'">').text(stringData));
			});
		}
		else {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text(localCategoriesData[0]));
		}
		$(categoryDropdown).dropdown();
	}
			