/**
 * 
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