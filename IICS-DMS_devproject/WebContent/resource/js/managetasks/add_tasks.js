/**
 * 
 */

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

