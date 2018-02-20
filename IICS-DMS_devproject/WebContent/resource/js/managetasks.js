/**
 *  managetasks.js
 *   - javascript used by the viewtasks.jsp for scripting functions such as switching tables and viewing tasks
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
	// checkers
	var isNewlyLoadedPageTC = true;
	var isNewlyLoadedPageMT = true;
	var isNewlyLoadedDirectory = true;
	var isCategoryNotEmpty = false;
	
	// local data variables
	var localMyTasksData;
	var localCreatedTasksData;
	var localCategoriesData;
	var localAssignedTasksData;
	
	// table references
	var myTasksTable;
	var createdTasksTable;
	var directoryTable;
	var assignedToTasksTable;
	
	var today = new Date();
	
/*
 *  CALENDAR INPUT INITIALIZATIONS
 */
	/* DATE FORMAT FOR yyyy/MM/dd */
	var dateFormat = {
		date: function (date, settings) {
			if (!date) return '';
			var day = date.getDate() + '';
		    if (day.length < 2) {
		    	day = '0' + day;
		    }
		    var month = (date.getMonth() + 1) + '';
		    if (month.length < 2) {
		    	month = '0' + month;
		    }
		    var year = date.getFullYear();
		    return year + '-' + month + '-' + day;
		}
	};
		
	/* DATE FORMAT FOR yyyy/MM/dd HH:mm:ss */
	var datetimeFormat = {
		
		date: function (date, settings) {
			if (!date) return '';
		    var day = date.getDate() + '';
		    if (day.length < 2) {
		    	day = '0' + day;
		    }
		    var month = (date.getMonth() + 1) + '';
		    if (month.length < 2) {
		        month = '0' + month;
		    }
		    var year = date.getFullYear();
		    return year + '-' + month + '-' + day;
		    
		},
	// not yet working :(
//		time: function (date, settings, forCalendar) {
//		    var hour = date.getHours() + '';
//		    if(hour.length < 2) {
//		    	hour = '0' + hour;
//		    }
//		    var minute = date.getMinutes();
//		    if(minute.length < 2) {
//		    	minute = '0' + minute;
//		    }
//		    var seconds = date.getSeconds();
//		    if(seconds.length < 2) {
//		    	seconds = '0' + seconds;
//		    }
//		    return hour + ":" + minute + ":" + seconds;
//		}

	};

/*
 * FUNCTIONS - MY TASKS
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

/*
 *  FUNCTIONS - TASK CREATED
 */
	
	/* GET - Tasks Created */
	function retrieveTasksCreated() {
		addCSSClass('#taskscreated_loading', 'active');	
		
		$.get(getContextPath() + '/TasksCreated', (responseData) => {
			if(!responseData.length == 0) 
			{
				localCreatedTasksData = responseData;
				$.each(responseData, (index, mytask) => {
					$('<tr id="'+index+'">').appendTo('#taskscreated_tablebody')		
						.append($('<td>').text(mytask.title))
						.append($('<td>').text(mytask.dateCreated))
						.append($('<td>').text(mytask.deadline))
						.append($('<td>').text(mytask.category))
						.append($('<td>').text(mytask.status))
				});
				
				// bind events and classes to the table after all data received
				createdTasksTable = $('#taskscreated_table').DataTable({
					'order': [[0, 'asc'], [1, 'asc'], [2, 'asc']]
				});
				selectTaskCreatedRow();
				removeCSSClass('#taskscreated_loading', 'active');	
			} 
			else if(responseData.length == 0)
			{
				$('<tr>').appendTo('#taskscreated_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("You do not have tasks you created. Click on 'Add Task' to add one."));
				removeCSSClass('#taskscreated_loading', 'active');	
			}
			else
			{
				$('<tr>').appendTo('#taskscreated_tablebody')
				.append($('<td class="center-text error" colspan="5">')
						.text("Unable to retrieve list of the tasks you created. :("));
				removeCSSClass('#taskscreated_loading', 'active');
				callFailRequestModal();
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#taskscreated_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve list of the tasks you created. :("));
			removeCSSClass('#taskscreated_loading', 'active');
			callFailRequestModal();
		});
		isNewlyLoadedPageTC = false;
	}
	
	/* SELECT ROW - TASK CREATED TABLE */
	function selectTaskCreatedRow() {
	    $('#taskscreated_table tbody').on('dblclick', 'tr', function () {
	    	populateCreatedTasksDetails($(this).attr('id'));
	    	$(this).toggleClass('active');
	    	$('#taskscreated_dialog').modal({
				closable: false,
				allowMultiple: true,
				observeChanges: true,
				onHidden: () => {
					$(this).toggleClass('active');
				}
			}).modal('show');
	    });
	}
	
	/* SET - Populate the Task Created Details */
	function populateCreatedTasksDetails(id) {
		var data = localCreatedTasksData[id];
		retrieveAssignedTasks(data['id']);
		$('#taskscreated_viewstatus').text(data['status']);
		$('#taskscreated_title').text(data['title']);
		$('#taskscreated_viewcategory').text(data['category']);
		$('#taskscreated_datecreated').text(data['dateCreated']);
		$('#taskscreated_viewdeadline').text(data['deadline']);
		$('#taskscreated_instructions').text(data['instructions']);	
	}
	
	/* GET - Assigned Tasks */
	function retrieveAssignedTasks(id) {
		addCSSClass('#viewcreatedtask_table_loading', 'active');
		$('#viewcreatedtask_tablebody').empty();
		
		var data = {
			id: id
		}
		
		$.post(getContextPath() + '/RetrieveAssignedToTasks', $.param(data), (responseJson) => {
			if(!responseJson.length == 0)
			{
				localAssignedTasksData = responseJson;
				$.each(responseJson, (index, taskassign) => {
					$('<tr id="'+index+'">').appendTo('#viewcreatedtask_tablebody')		
						.append($('<td>').text(taskassign.name + ' ('+taskassign.email+')'))
						.append($('<td>').text(taskassign.title))
						.append($('<td>').text(taskassign.dateUploaded))
						.append($('<td>').text(taskassign.status))
				});
				
				// bind events and classes to the table after all data received
				assignedToTasksTable = $('#viewcreatedtask_table').DataTable({
					'order': [[0, 'asc']]
				});
				// row selection
				removeCSSClass('#viewcreatedtask_table_loading', 'active');	
			}
			else if(responseJson.legth == 0)
			{
				$('<tr>').appendTo('#viewcreatedtask_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("You did not assign the task to anyone. Click on Edit Task to assign to a user."));
				removeCSSClass('#viewcreatedtask_table_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#viewcreatedtask_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("Unable to retrieved tasks assigned."));
				removeCSSClass('#viewcreatedtask_table_loading', 'active');
			}
		})
		.fail ((response) => {
			$('<tr>').appendTo('#viewcreatedtask_tablebody')
			.append($('<td class="center-text" colspan="4">')
					.text("Unable to retrieved tasks assigned."));
			removeCSSClass('#viewcreatedtask_table_loading', 'active');
		});
	}
/*
 *  TASKS CREATED - ADD TASK
 */
	/* OPEN MODAL - Add Task */
	$('#taskscreated_addtask_btn').click(() => {
		$('#addtask_dialog').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				/* INITIALIZE - Calendar Input */
				$('#addtask_deadline_calendar').calendar({
					minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
					ampm: false,
					formatter: datetimeFormat
				});
				populateCategory('#addtask_category');
			}
		}).modal('show');
	});
	
	/* CLOSE MODAL - Add Task */
	$('#addtask_cancel').click(() => {
		//console.log('This shit was clicked');
		//$('#directory_dialog').modal('hide');
	});
	
	/* OPEN MODAL - Directory */
	$('#addtask_directory').click(() => {
		$('#directory_dialog').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				if(isNewlyLoadedDirectory) 
				{
					addCSSClass('#directory_table_loading', 'active');
					getListOfUsers();
				}
			},
			onHidden: () => {
				$('#addtask_dialog').modal('show');
			}
		}).modal('show');
	});
	
	/* SUBMIT - Add Task */
	$('#addtask_submit').click(() => {
		// form validation
		
		var newTaskData = {
			title: $('#addtask_title').val(),
			deadline: $('#addtask_deadline').val(),
			category: $('#addtask_category').val(),
			instructions: $('#addtask_instructions').val(),
			assigned_to: []
		}
		
		// in the assigned_to array, slice the string separated by ";", then push each data
	});

	
/*
 *  TASK CREATED - Directory 
 */
	/* GET - Directory, list of users */
	function getListOfUsers() {
		$.get(getContextPath() + '/RetrieveUserDirectory', (responseJson) => {
			if(!responseJson.length == 0)
			{
				$.each(responseJson, (index, account) => {
					$('<tr>').appendTo('#directory_tablebody')		
						.append($('<td>').text(account.facultyNumber))
						.append($('<td>').text(account.fullName))
						.append($('<td>').text(account.email))
						.append($('<td>').text(account.userType))
						.append($('<td>').text(account.department))
				});
				
				// bind events and classes to the table after all data received
				directoryTable = $('#directory_table').DataTable({
					'order': [[0, 'asc'], [1, 'asc']]
				});
				selectDirectoryRow();
				removeCSSClass('#directory_table_loading', 'active');
				isNewlyLoadedDirectory = false;
			}
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#directory_tablebody')
				.append($('<td class="center-text" colspan="5">')
						.text("Your account list is empty."));
				removeCSSClass('#directory_table_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#directory_tablebody')
				.append($('<td class="center-text error" colspan="5">')
						.text("Unable to retrieve list of users. :("));
				removeCSSClass('#directory_table_loading', 'active');
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#directory_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve list of users. :("));
			removeCSSClass('#directory_table_loading', 'active');
		});
	}
	
	/* SELECT - Directory */
	function selectDirectoryRow() {
		$('#directory_table tbody').on('click', 'tr', function () {
		    $(this).toggleClass('active');
		    $('#directory_usercount').text(directoryTable.rows('.active').data().length);
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
		
/*
* SEARCH FUNCTIONS - CREATED TASKS
*/
	$('#taskscreated_search').on('input', function() {
		createdTasksTable.search( $(this).val() ).draw();
	});
		
	$('#taskscreated_created_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			createdTasksTable.column(1).search( text ).draw();
		}) 
	});
		
	$('#taskscreated_deadline_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			createdTasksTable.column(2).search( text ).draw();
		}) 
	});
	
	$('#taskscreated_category').on('change', function() {
		createdTasksTable.column(3).search( $(this).val() ).draw();
	});
		
	$('#taskscreated_status').on('change', function() {
		createdTasksTable.column(4).search( $(this).val() ).draw();
	});
		
	$('#taskscreated_clear').click(() => {
		resetTasksCreatedSearchFields();
	})
		
	function resetTasksCreatedSearchFields() {
		$('#taskscreated_search').val('');
		$('#taskscreated_created').val('');
			createdTasksTable.column(1).search('').draw();
		$('#taskscreated_deadline').val('');
			createdTasksTable.column(2).search('').draw();
		$('#taskscreated_category').dropdown('restore defaults');
		$('#taskscreated_status').dropdown('restore defaults');
	}
	
/* 
 * SWITCH TABLE EVENTS
 */
	/* BUTTON - My Task */
	$('#mytasks_button').click(() => {
		switchTaskTable(false);
		switchMenu('#taskscreated_button', '#mytasks_button');
	});
	
	/* BUTTON - Task Created */
	$('#taskscreated_button').click(() => {
		switchTaskTable(true);
		switchMenu('#mytasks_button', '#taskscreated_button');
	});
	
	/* SWITCH TABLET/COMPUTER MENU */
	function switchMenu(fromMenu, toMenu) {
		removeCSSClass(fromMenu, 'active');
		removeCSSClass(fromMenu + ' > i', 'open')
		addCSSClass(toMenu, 'active');
		addCSSClass(toMenu + ' > i', 'open');
	}
	
	/* SWTICH TABLE */
	function switchTaskTable(openTaskCreated) {
		if(openTaskCreated) {
			$('#taskscreated_segment').show();
			$('#mytasks_segment').hide();
			
			if(isNewlyLoadedPageTC) { 
				retrieveTasksCreated();
				isNewlyLoadedPageTC = false;
			}
			populateCategory('#taskscreated_category');
		}
		else {
			$('#mytasks_segment').show();
			$('#taskscreated_segment').hide();
			
			if(isNewlyLoadedPageMT) {
				retrieveMyTasks();
				isNewlyLoadedPageMT = false;
			}
			populateCategory('#mytask_category');
		}
	}