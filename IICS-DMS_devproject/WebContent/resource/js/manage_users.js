/**
 *  manage_users.js
 *   - Javascript used for the manageusers.jsp page for scripting functionalities such as retrieving users, add, edit, 
 *   	enable and disable users.
 */
	$(document).ready(() => {
		hideButtons();
		retriveUserList();
	});

/* 
 * VARIABLES 
 */
	var table;
	
	var localUserAccountsData;
	
	var originalEmail;
	
	var addUserModalInputs = 
		[ 
		  '#add_email', '#add_facultyno', '#add_firstname', 
		  '#add_lastname', '#add_usertype'
		];
	
	var addUserModalButtons =
		[
			'#adduser_clear', '#adduser_cancel', '#adduser_submit'
		];
	
	var editUserModalInputs = 
		[ 
		  '#edit_email', '#edit_facultyno', '#edit_firstname', 
		  '#edit_lastname', '#edit_usertype'
		];
	
	var editUserModalButtons =
		[
			'#edituser_cancel', '#edituser_submit'
		];
/* 
 * FUNCTIONS 
 */	
	
	/* GET - Retrieve Users*/
	function retriveUserList() {
		addCSSClass('#table-loading', 'active');
		
		$.get(getContextPath() + '/RetrieveUsers', (responseData, textStatus, xhr) => {
			if(!responseData.length == 0) 
			{
				localUserAccountsData = responseData;
				$.each(responseData, (index, account) => {
					$('<tr id="data'+index+'">').appendTo('#usertable-body')		
						.append($('<td>').text(account.facultyNumber))
						.append($('<td>').text(account.firstName))
						.append($('<td>').text(account.lastName))
						.append($('<td>').text(account.email))
						.append($('<td>').text(account.userType))
						.append($('<td>').text(account.department))
						.append($('<td>').text(account.status))
						.append($('<td>').text(account.creationTimestamp));
				});
				
				// bind events and classes to the table after all data received
				table = $('#userstable').DataTable({
					'order': [[2, 'asc'], [1, 'asc'], [0, 'asc']]
				});
				selectRow();
				
				removeCSSClass('#table-loading', 'active');	
			} 
			else 
			{
				$('<tr>').appendTo('#usertable-body')
					.append($('<td class="center-text" colspan="9">')
							.text("Your account list is empty. Click on the 'Add User' button to add one."));
				removeCSSClass('#table-loading', 'active');
			}
		})
		.fail((response, textStatus, xhr) => {
			$('<tr>').appendTo('#usertable-body')
			.append($('<td class="center-text error" colspan="9">')
					.text("Unable to retrieve list of users. :("));
			removeCSSClass('#table-loading', 'active');
		});
	}
	
	/* GET - Individual User for Edit */
	function retrieveUserForEdit() {
		var existingData = table.rows('.active').data()[0];
		originalEmail = existingData[3];
		
		$('#edit_email').val(existingData[3]);
		$('#edit_facultyno').val(existingData[0]);
		$('#edit_firstname').val(existingData[1]);
		$('#edit_lastname').val(existingData[2]);
		$('#edit_usertype').dropdown('set selected', existingData[4]);
		$('#edit_department').dropdown('set selected', existingData[5]);
	}
	
	/* REMOVE - List of Users in Table */
	function removeUserLists() {
		$('#usertable-body').empty();
		hideButtons();
	}
	
	/* HIDE - User Management Actions */
	function hideButtons() {
		$('#edituser_btn').hide();
		$('#enableuser_btn').hide();
		$('#disableuser_btn').hide()
	}
	
	/* TOGGLER - User Management Actions */
	function selectedRowsTogglers() {
		if(table.rows('.active').data().length == 0)
		{
			hideButtons();
		}
		else if(table.rows('.active').data().length == 1) 
		{
			$('#edituser_btn').show();	
			$('#enableuser_btn').show();
			$('#disableuser_btn').show()
		} 
		else if(table.rows('.active').data().length >= 2) 
		{
			$('#edituser_btn').hide();
			$('#enableuser_btn').show();
			$('#disableuser_btn').show();
		}
	}
	
	/* UPDATE - Add new row data */
	function addNewRowData(newData) {
		var rowString = '<tr>'
			+ '<td>' + newData.faculty_no + '</td>'
			+ '<td>' + newData.first_name + '</td>'
			+ '<td>' + newData.last_name + '</td>'
			+ '<td>' + newData.email + '</td>'
			+ '<td>' + newData.user_type + '</td>'
			+ '<td>' + newData.department + '</td>'
			+ '<td>active</td>'
			+ '<td>' + newData.creation_timestamp + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
	/* UPDATE - Replace Edit Row with new data */
	function replaceEditedRow(index, newData) {
		localUserAccountsData[index]['facultyNumber'] = newData.faculty_no;
		localUserAccountsData[index]['email'] = newData.email;
		localUserAccountsData[index]['firstName'] = newData.first_name;
		localUserAccountsData[index]['lastName'] = newData.last_name;
		localUserAccountsData[index]['userType'] = newData.user_type;
		localUserAccountsData[index]['department'] = newData.department;
		
		table.row.add(localUserAccountsData[index]);
		
		//$('#data'+index)
		//	.empty()			
		//	.append($('<td>').text(localUserAccountsData[index].facultyNumber))
		//	.append($('<td>').text(localUserAccountsData[index].firstName))
		//	.append($('<td>').text(localUserAccountsData[index].lastName))
		//	.append($('<td>').text(localUserAccountsData[index].email))
		//	.append($('<td>').text(localUserAccountsData[index].userType))
		//	.append($('<td>').text(localUserAccountsData[index].department))
		//	.append($('<td>').text(localUserAccountsData[index].status))
		//	.append($('<td>').text(localUserAccountsData[index].creationTimestamp));
		
		// change to selected
		//selectedRowsTogglers();
	}
	
	/* SELECT ROW */
	function selectRow() {
	    $('#userstable tbody').on('click', 'tr', function (){
	        $(this).toggleClass('active');
			selectedRowsTogglers();
	    });
	}
/* 
 *  ADD USER MODAL 
 */
	
	/* OPEN MODAL - Add User */
	$('#adduser_btn').click(() => {
		$('#adduser_dia').modal({
			blurring: true,
			closable: false,
			onShow: () => {
				checkUserTypeDepartment('#add_usertype', '#add_department_field'); 
			},
			onHidden: () => {
				enableFormButtons(addUserModalButtons);
				removeCSSClass('#adduser_form', 'loading');
			}
		}).modal('show');
	});
	
	/* SUBMIT - Add User */
	$('#adduser_submit').click(() => {
		// check if the input requires a department field
		if(checkUserTypeDepartment('#add_usertype', '#add_department_field'))
		{
			addUserModalInputs.push('#add_department');
		}
		
		// checks if all the forms are filled up
		if(checkEmptyFields(addUserModalInputs) 
			&& checkEmailField('#add_email', '#add_email_field')
			&& checkNumberField('#add_facultyno', '#add_facultyno_field')) 
		{	
			disableFormButtons(addUserModalButtons);
			addCSSClass('#adduser_form', 'loading');
			
			var userAccountData = 
			{
				email: $('#add_email').val(),
				faculty_no: $('#add_facultyno').val(),
				first_name: $('#add_firstname').val(),
				last_name: $('#add_lastname').val(),
				user_type: $('#add_usertype').val(),
				department: $('#add_department').val(),
				creation_timestamp: ''
			};
				
			$.post(getContextPath() + '/AddUser', $.param(userAccountData), (success) => {
				userAccountData['creation_timestamp'] = success.timestamp;
				table.row.add(addNewRowData(userAccountData)).draw();
				clearAddUserModal();
				callSuccessModal('Success', 'A new account has successfully been added.');
			})
			.fail((response) => {
				callFailModal('Unable to Add New User', 'An error has occured when adding a new account. ' +
								'Please try again. If the problem persists, please contact your administrator.');
			});
		}
		
		// removes the '#add_department' from the array of Add Inputs if it exists
		var pos = addUserModalInputs.indexOf('#add_department');
		addUserModalInputs.splice(pos, pos);
	});
	
/* 
 * EDIT USER MODAL 
 */
	
	/* OPEN MODAL - Edit User */
	$('#edituser_btn').click(() => {		
		$('#edituser_dia').modal({
			blurring: true,
			closable: false,
			onShow: () => {
				checkUserTypeDepartment('#edit_usertype', '#edit_department_field'); 
				retrieveUserForEdit();
			},
			onHidden: () => {
				clearEditUserModal();
				enableFormButtons(editUserModalButtons);
				removeCSSClass('#edituser_form', 'loading');
			}
		}).modal('show');
		
	});
	
	/* SUBMIT - Edit User */
	$('#edituser_submit').click(() => {
		// check if the input requires a department field
		if(checkUserTypeDepartment('#edit_usertype', '#edit_department_field'))
		{
			addUserModalInputs.push('#edit_department');
		}
		
		// checks if all the forms are filled up
		if(checkEmptyFields(editUserModalInputs) 
			&& checkEmailField('#edit_email', '#edit_email_field')
			&& checkNumberField('#edit_facultyno', '#edit_facultyno_field')) 
		{	
			disableFormButtons(editUserModalButtons);
			addCSSClass('#edituser_form', 'loading');
						
			var userAccountData = 
			{
				email: $('#edit_email').val(),
				faculty_no: $('#edit_facultyno').val(),
				first_name: $('#edit_firstname').val(),
				last_name: $('#edit_lastname').val(),
				user_type: $('#edit_usertype').val(),
				department: $('#edit_department').val(),
				original_email: originalEmail
			};
			
			$.post(getContextPath() + '/EditUser', $.param(userAccountData), (success) => {
				callSuccessModal('Success', 'The account has successfully been updated.');
				replaceEditedRow($('.checked > input:checkbox').val(), userAccountData);
			})
			.fail((response) => {
				callFailModal('Unable to Edit User', 'An error has occured when updating an account. ' +
								'Please try again. If the problem persists, please contact your administrator.');
			});
		}
		
		// removes the '#edit_department' from the array of Edit Inputs if it exists
		var pos = editUserModalInputs.indexOf('#edit_department');
		editUserModalInputs.splice(pos, pos);
	});

/* 
 * ENABLE USER MODAL
 */

	/* OPEN MODAL - Enable User */
	$('#enableuser_btn').click(() => {		
		$('#enableuser_dia').modal({
			blurring: true,
			closable: false,
		}).modal('show');	
	});
	
	/* SUBMIT - Enable User */
	$('#enableuser_submit').click(() => {
		var checkedIndex = $('.checked > input:checkbox').val();
		console.log(checkedIndex);
		
	});
/* 
 * DISABLE USER MODAL
 */
	
	/* OPEN MODAL - Disable User */
	$('#disableuser_btn').click(() => {		
		$('#disableuser_dia').modal({
			blurring: true,
			closable: false,
		}).modal('show');	
	});
	
/*
 * FORM CLEANERS
*/	
	/* CLEAN - Clear Fields on Add User Modal */
	function clearAddUserModal() {
		addUserModalInputs.push('#add_department');
		clearUserModal('#adduser_form', '#add_usertype', '#add_department', addUserModalInputs);
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
		addUserModalInputs.pop();
	}
	
	/* CLEAN - Clear Fields on Edit User Modal */
	function clearEditUserModal() {
		editUserModalInputs.push('#edit_department');
		clearUserModal('#edituser_form', '#edit_usertype', '#edit_department', editUserModalInputs);
		checkUserTypeDepartment('#edit_usertype', '#edit_department_field');
		editUserModalInputs.pop();
	}
	
	/* CLEAN - Clear Fields Button on Add User Modal Event */
	$('#adduser_clear').on('click', () => {
		addUserModalInputs.push('#add_department');
		clearUserModal('#adduser_form', '#add_usertype', '#add_department', addUserModalInputs);
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
		addUserModalInputs.pop();
	});
	
	/* CLEAN - Modal */
	function clearUserModal(form, usertypeDP, departmentDP, inputsArray) {
		$(form).trigger('reset');
		$(usertypeDP).dropdown('restore defaults');
		$(departmentDP).dropdown('restore defaults');
		clearErrorFields(inputsArray);
	}
	
/*
 * FORM VALIDATORS
 */
	
	/* VALIDATOR - Add Faculty Number Event */
	$('#add_facultyno').on('input', () => {
		checkNumberField('#add_facultyno', '#add_facultyno_field');
	});
	
	/* VALIDATOR - Add Email Event */
	$('#add_email').on('input', () => {
		checkEmailField('#add_email', '#add_email_field');
	});
	
	/* VALIDATOR - Add User Type Event */
	$('#add_usertype').change(() => {
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
	});
	
	/* VALIDATOR - Edit Faculty Number Event */
	$('#edit_facultyno').on('input', () => {
		checkNumberField('#edit_facultyno', '#edit_facultyno_field');
	});
	
	/* VALIDATOR - Edit Email Event */
	$('#edit_email').on('input', () => {
		checkEmailField('#edit_email', '#edit_email_field');
	});
	
	/* VALIDATOR - Edit User Type Event */
	$('#edit_usertype').change(() => {
		checkUserTypeDepartment('#edit_usertype', '#edit_department_field');
	});
	
	/* VALIDATOR - User Type Toggle */
	function checkUserTypeDepartment(userTypeDP, departmentField) {
		var userType = $(userTypeDP).val();

		if(userType == 'Department Head' || userType == 'Faculty') 
		{
			$(departmentField).show();
			return true;
		}
		else $(departmentField).hide();
		return false;
	}
	
	
	