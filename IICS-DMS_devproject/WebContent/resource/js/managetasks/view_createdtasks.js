/**
 *  view_createdtasks.js
 *    - javascript code used to retrieve tasks created by a user
 */

/*
 * VARIABLES
 */
	var localCreatedTasksData;
	var createdTasksTable;
	var isCreatedTasksTableEmpty = true;
	
	$(document).ready(() => {
		retrieveCategory('#taskscreated_category');
		retrieveCategory('#addtask_category');
		retrieveTasksCreated();
	});

/*
 * FUNCTIONS
 */
	/* GET - Tasks Created */
	function retrieveTasksCreated() {
		addCSSClass('#taskscreated_loading', 'active');	
		
		$.get(getContextPath() + '/TasksCreated', (responseData) => {
			$('#taskscreated_tablebody').empty();
			
			if(!responseData.length == 0) 
			{
				localCreatedTasksData = responseData;
				$.each(responseData, (index, mytask) => {
					$('<tr id="'+mytask.id+'">').appendTo('#taskscreated_tablebody')		
						.append($('<td>').text(mytask.title))
						.append($('<td>').text(mytask.dateCreated))
						.append($('<td>').text(mytask.deadline))
						.append($('<td>').text(mytask.category))
						.append($('<td>').text(mytask.status))
				});
				
				// bind events and classes to the table after all data received
				createdTasksTable = $('#taskscreated_table').DataTable({
					'order': [[1, 'asc']]
				});
				selectTaskCreatedRow();
				isCreatedTasksTableEmpty = false;
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
	    	var url = getContextPath() + '/task/viewcreatedtaskdetails.jsp?id=' 
	    		+ encodeURIComponent($(this).attr('id'))
	    		
	    	document.location.href = url;
	    });
	}
	
	/*  */
	function addNewRowData(newData) {
		if(!isCreatedTasksTableEmpty) 
		{
			createdTasksTable.row.add( $(addNewRowDataFormat(newData))[0] ).draw();
			createdTasksTable.order([1, 'asc']).draw();
			localCreatedTasksData.push(newData);
		}
		else
		{
			retrieveTasksCreated();
		}
	}
	
	/* UPDATE - New Row Data Format */
	function addNewRowDataFormat(newData) {
		var rowString = '<tr id="'+newData[0]+'">'
			+ '<td>' + newData[1] + '</td>'
			+ '<td>' + newData[2] + '</td>'
			+ '<td>' + newData[3] + '</td>'
			+ '<td>' + newData[4] + '</td>'
			+ '<td>' + newData[5] + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
/*
 * SEARCH FUNCTIONS - CREATED TASKS
 */
	$('#taskscreated_search').on('input', function() {
		if(!isCreatedTasksTableEmpty) createdTasksTable.search( $(this).val() ).draw();
	});
			
	$('#taskscreated_created_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isCreatedTasksTableEmpty) createdTasksTable.column(1).search( text ).draw();
		}) 
	});
			
	$('#taskscreated_deadline_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isCreatedTasksTableEmpty) createdTasksTable.column(2).search( text ).draw();
		}) 
	});
		
	$('#taskscreated_category').on('change', function() {
		if(!isCreatedTasksTableEmpty) createdTasksTable.column(3).search( $(this).val() ).draw();
	});
			
	$('#taskscreated_status').on('change', function() {
		if(!isCreatedTasksTableEmpty) createdTasksTable.column(4).search( $(this).val() ).draw();
	});
			
	$('#taskscreated_clear').click(() => {
		resetTasksCreatedSearchFields();
	})
			
	function resetTasksCreatedSearchFields() {
		$('#taskscreated_search').val('');
		$('#taskscreated_created_calendar').calendar('clear');
		$('#taskscreated_deadline_calendar').calendar('clear');
		$('#taskscreated_category').dropdown('restore defaults');
		$('#taskscreated_status').dropdown('restore defaults');
	}