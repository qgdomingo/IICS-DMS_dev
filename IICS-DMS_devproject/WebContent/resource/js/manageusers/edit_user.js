/**
 *  edit_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in editing of users.
 */

/*
 * VARIABLES
 */
	var originalEmail;
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
	
/* 
 * EDIT USER MODAL 
 */
	
	/* OPEN MODAL - Edit User */
	$('#edituser_btn').click(() => {		
		$('#edituser_dia').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				checkUserTypeDepartment('#edit_usertype', '#edit_department_field'); 
				retrieveUserForEdit();
			},
			onHidden: () => {
				clearEditUserModal();
				enableFormButtons(editUserModalButtons);
				removeCSSClass('#edituser_form', 'loading');
				selectedRowsTogglers();
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
			
			$.post(getContextPath() + '/EditUser', $.param(userAccountData), (responseJson) => {
				if(responseJson)
				{
					table.row('.active').remove();
					table.row.add( $(addNewRowData(responseJson[0]))[0] ).draw();	
					callSuccessModal('Success', 'The account has successfully been updated.');
				}
				else
				{
					callFailModal('Unable to Edit User', 'An error has occured when updating an account. ' +
						'Please try again. If the problem persists, please contact your administrator.');
				}
			})
			.fail((response) => {
				callFailRequestModal();
			});
		}
		
		// removes the '#edit_department' from the array of Edit Inputs if it exists
		var pos = editUserModalInputs.indexOf('#edit_department');
		editUserModalInputs.splice(pos, pos);
	});
	
/*
 * FORM CLEANERS
 */
	
	/* CLEAN - Clear Fields on Edit User Modal */
	function clearEditUserModal() {
		editUserModalInputs.push('#edit_department');
		clearUserModal('#edituser_form', '#edit_usertype', '#edit_department', editUserModalInputs);
		checkUserTypeDepartment('#edit_usertype', '#edit_department_field');
		editUserModalInputs.pop();
	}

/*
 * FORM VALIDATORS
 */
	
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