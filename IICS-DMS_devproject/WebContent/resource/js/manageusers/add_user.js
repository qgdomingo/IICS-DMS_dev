/**
 *  add_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in adding of users.
 */

/* 
 * VARIABLES 
 */ 

	var addUserModalInputs = 
		[ 
		  '#add_email', '#add_facultyno', '#add_firstname', 
		  '#add_lastname', '#add_usertype'
		];
	var addUserModalButtons =
		[
			'#adduser_clear', '#adduser_cancel', '#adduser_submit'
		];
	
/* 
 * FUNCTIONS 
 */
	
	/* UPDATE - Add new row data */
	function addNewRowData(newData) {
		var rowString = '<tr>'
			+ '<td>' + newData.facultyNumber + '</td>'
			+ '<td>' + newData.firstName + '</td>'
			+ '<td>' + newData.lastName + '</td>'
			+ '<td>' + newData.email + '</td>'
			+ '<td>' + newData.userType + '</td>'
			+ '<td>' + newData.department + '</td>'
			+ '<td>' + newData.status + '</td>'
			+ '<td>' + newData.creationTimestamp + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
/* 
 *  ADD USER MODAL 
 */
		
	/* OPEN MODAL - Add User */
	$('#adduser_btn').click(() => {
		$('#adduser_dia').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				checkUserTypeDepartment('#add_usertype', '#add_department_field'); 
			},
			onHidden: () => {
				enableFormButtons(addUserModalButtons);
				removeCSSClass('#adduser_form', 'loading');
				if(!isUsersTableEmpty) selectedRowsTogglers();
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
			};
				
			$.post(getContextPath() + '/AddUser', $.param(userAccountData), (responseJson) => {
				if(responseJson) 
				{
					if(!isUsersTableEmpty)
					{
						table.row.add( $(addNewRowData(responseJson[0]))[0] ).draw();
					}
					else
					{
						isUsersTableEmpty = false;
						retriveUserList();
					}
					clearAddUserModal();
					callSuccessModal('Success', 'A new account has successfully been added.');
				}
				else
				{
					callFailModal('Unable to Add New User', 'An error has occured when adding a new account. ' +
						'Please try again. If the problem persists, please contact your administrator.');
				}
			})
			.fail((response) => {
				callFailRequestModal();
			});
		}
			
		// removes the '#add_department' from the array of Add Inputs if it exists
		var pos = addUserModalInputs.indexOf('#add_department');
		addUserModalInputs.splice(pos, pos);
	});
	
/* 
 * FORM CLEARNERS 
 */
	
	/* CLEAN - Clear Fields on Add User Modal */
	function clearAddUserModal() {
		addUserModalInputs.push('#add_department');
		clearUserModal('#adduser_form', '#add_usertype', '#add_department', addUserModalInputs);
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
		addUserModalInputs.pop();
	}
	
	/* CLEAN - Clear Fields Button on Add User Modal Event */
	$('#adduser_clear').on('click', () => {
		clearAddUserModal();
	});
	
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