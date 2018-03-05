/**
 *  view_createdtasks_details.js
 *    - javascript used to retrieve and populate data on the details of a created task
 */

/*
 * VARIABLES
 */

	var localTaskData;
	var localAssignedUsers = [];
	var assignedToTasksTable;
	var tempTaskStatus;
	var taskDataID;
	var isAssignedTaskTableEmpty = true;
	
	var isNewlyLoadedDirectory = true;
	var today = new Date();
	

/*
 * DOCUMENT ON READY FUNCTION
 */
	$(document).ready(() => {
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    taskDataID = decodeURIComponent(data.id);
	    
	    retrieveCreatedTaskDetails(data.id);
	    retrieveAssignedTasks(data.id);
	    
	    // Populate Edit Task Form
	    getListOfUsers('#edittask_assignto');
	    retrieveCategory('#edittask_category');
	});
	
/*
 * FUNCTIONS
 */
	
	/* GET - Created Task Details */
	function retrieveCreatedTaskDetails(id) {
		var data = { id: id }
		
		$.post(getContextPath() + '/RetrieveSpecificCreatedTask', $.param(data), (response) => {
			if(response) {
				localTaskData = response;
				$('#createdtask_title').text(response[0]);
				$('#createdtask_category').text(response[1]);
				$('#createdtask_datecreated').text(response[2]);
				$('#createdtask_status').text(response[3]);
				$('#createdtask_deadline').text(response[4]);
				$('#createdtask_instructions').text(response[5]);
			}
			else {
				callFailRequestModal();
			}
		}).fail( (response) => {
			callFailRequestModal();
		});
		
	}
	
	/* GET - Assigned Tasks */
	function retrieveAssignedTasks(id) {
		addCSSClass('#createdtaskdetails_loading', 'active');	
		var data = { id: id } 
		
		$.post(getContextPath() + '/RetrieveAssignedToTasks', $.param(data), (responseJson) => {
			if(!responseJson.length == 0)
			{
				$.each(responseJson, (index, taskassign) => {
					localAssignedUsers.push(taskassign.email);
					
					$('<tr id="'+index+'">').appendTo('#assignedtask_tablebody')		
						.append($('<td>').text(taskassign.name + ' ('+taskassign.email+')'))
						.append($('<td>').text(taskassign.title))
						.append($('<td>').text(taskassign.dateUploaded))
						.append($('<td>').text(taskassign.status))
				});

				// bind events and classes to the table after all data received
				assignedToTasksTable = $('#assignedtask_table').DataTable({
					'order': [[0, 'asc']]
				});
				
				isAssignedTaskTableEmpty = false;
				selectTaskAssigned();
				removeCSSClass('#createdtaskdetails_loading', 'active');	
			}
			else if(responseJson.legth == 0)
			{
				$('<tr>').appendTo('#assignedtask_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("You did not assign the task to anyone. Click on Edit Task to assign to a user."));
				removeCSSClass('#viewcreatedtask_table_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#assignedtask_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("Unable to retrieved tasks assigned."));
				removeCSSClass('#viewcreatedtask_table_loading', 'active');
			}
		})
		.fail ((response) => {
			$('<tr>').appendTo('#assignedtask_tablebody')
			.append($('<td class="center-text" colspan="4">')
					.text("Unable to retrieved tasks assigned."));
			removeCSSClass('#viewcreatedtask_table_loading', 'active');
		});
	}
	
	/* SELECT ROW - Task Assigned To */
	function selectTaskAssigned() {
		$('#assignedtask_table tbody').on('dblclick', 'tr', function () {
			$(this).toggleClass('active');
			
			tempTaskStatus = assignedToTasksTable.rows('.active').data()[0][3];
			tempEmailString = assignedToTasksTable.rows('.active').data()[0][0];
			
			if(tempTaskStatus == 'No Submission') {
				openNoTaskSubmissionModal();
			}
			else {
				email = getEmailFromString(tempEmailString);
				openTaskSubmission(email);
			}
			
			$(this).toggleClass('active');
	    });
	}

	/* GET - Email from Existing Data on Table */
	function getEmailFromString(containsEmail) {
		var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(containsEmail);
		
		return matches[1];
	}
	
	/* GET - Submission Data of Task */
	function getMyTaskSubmission(email) {
		addCSSClass('#submissiondetails_loading', 'active');
		
		var data = {
			id: taskDataID,
			email: email
		}
		
		$.post(getContextPath() + '/RetrieveSpecificTask', $.param(data), (responseData) => {
			if(responseData)
			{
				$('#submission_title').text(responseData[0]);
				$('#submission_submissiondate').text(responseData[1]);
				$('#submission_viewstatus').text(responseData[2]);
				$('#submission_file').text(responseData[3]);
				$('#submission_description').text(responseData[4]);
				$('#submission_download_id').val(responseData[5]);
				$('#submission_download_email').val(responseData[6]);
				$('#submission_uploadedby').text(responseData[7]);
				removeCSSClass('#submissiondetails_loading', 'active');
			}
			else
			{
				callFailModal('Uh-oh!','We are unable to retrieve submission details.');
				removeCSSClass('#submissiondetails_loading', 'active');
			}
		})
		.fail((response) => {
			callFailRequestModal();
			removeCSSClass('#submissiondetails_loading', 'active');
		});
	}
	
	/* SET and OPEN MODAL - Information for the View Task Submission */
	function openTaskSubmission(email) {
		getMyTaskSubmission(email);
		$('#submission_dialog').modal({
			closable: false
		}).modal('show');
	}
	
	
	/* OPEN MODAL - No Task Submission */
	function openNoTaskSubmissionModal() {
    	$('#nosubmission_dialog').modal({
			closable: false
		}).modal('show');
	}

/*
 * SEARCH FUCTION
 */	
	$('#search_filter').on('input', function() {
		if(!isAssignedTaskTableEmpty) assignedToTasksTable.search( $(this).val() ).draw();
	});
		
	$('#upload_date_filter_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isAssignedTaskTableEmpty) assignedToTasksTable.column(2).search( text ).draw();
		}) 
	});
	
	$('#status_filter').on('change', function() {
		if(!isAssignedTaskTableEmpty) assignedToTasksTable.column(3).search( $(this).val() ).draw();
	});
	
	$('#clear_filter').click(() => {
		$('#search_filter').val('');
		$('#upload_date_filter_calendar').calendar('clear');
		$('#status_filter').dropdown('restore defaults');
	})
	
/*
 * EDIT TASK FORM POPULATION
 */
	/* OPEN MODAL - Edit Task */
	$('#edittask_btn').click(() => {
		$('#edittask_dialog').modal({
			closable: false,
			observeChanges: true,
			centered: false,
			onShow: () => {
				$('#edittask_deadline_calendar').calendar({
					minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
					ampm: false,
					formatter: dateFormat
				});
				setEditTaskModal(localTaskData);
				setAssignedUsersInput(localAssignedUsers);
			},
			onHidden: () => {
				$('#edittask_cancel').prop("disabled", "");
				$('#edittask_submit').prop("disabled", ""); 
				removeCSSClass('#edit_task_form', 'loading');
			}
		}).modal('show');
	});
	
	/* Populate Edit Task Form */
	function setEditTaskModal(data) {
		$('#edittask_id').val(taskDataID);
		$('#edittask_title').val(data[0]);
		$('#edittask_deadline').val(data[4]);
		$('#edittask_category').dropdown('set selected', data[1]);
		$('#edittask_instructions').val(data[5]);
	}
	
	function setAssignedUsersInput(data) {
		$('#edittask_assignto').dropdown('set selected', data);
	}