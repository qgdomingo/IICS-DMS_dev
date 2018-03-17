/**
 *  add_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in adding of users.
 */

	$(document).ready( function() {
		$('#add_invalid_email_message').hide();
	});

/* 
 * FUNCTIONS 
 */
	
	/* UPDATE - Add new row data */
	function addNewRowData(newData, index) {
		var rowString = '<tr id="'+index+'">'
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
		
	/* OPEN MODAL - Add User */
	$('#adduser_btn').click(() => {
		$('#adduser_dia').modal({
			closable: false,
			onShow: () => {
				checkUserTypeDepartment('#add_usertype', '#add_department_field'); 
			},
			onHidden: () => {
				enableAddUserForm();
				$('#add_invalid_email_message').hide();
				if(!isUsersTableEmpty) selectedRowsTogglers();
			}
		}).modal('show');
	});
		
	/* SUBMIT - Edit User Profile Form */
	$('#adduser_form').ajaxForm({
		 beforeSubmit: isAddUserFormValid,
	     success: function(response) {
	    	if(response == 'existing email') {
		        $('#add_invalid_email_message').show();
		        enableAddUserForm();
		    }
	    	else if(!response.length == 0) {
	        	if(!isUsersTableEmpty)
				{
	        		localAccountsData.push(response[0]);
	        		table.row.add( $(addNewRowData(response[0], localAccountsData.length-1))[0] ).draw();
					table.order( [7, 'desc'] ).draw();
				}
				else
				{
					isUsersTableEmpty = false;
					retriveUserList();
				}
	        	cleanAddUserForm();
				callSuccessModal('Success', 'A new account has successfully been added.');
	        }
	     },
	     error: function(response) {
	    	 callFailModal('Unable to Add New User', 'An error has occured when adding a new account. ' +
				'Please try again. If the problem persists, please contact your administrator.');
	     }
	});

	/* CUSTOM VALIDATION - Cellphone Number */
	$.fn.form.settings.rules.cellphoneNumber = function(value) {
		if(!value == '') {
			var patt = new RegExp("^(09)\\d{9}$");
			return (patt.test(value) && value.length == 11);
		}
		else return true;
	};
	
	/* CUSTOM VALIDATION - User Department */
	$.fn.form.settings.rules.userDepartment = function(value) {
		var userType = $('#add_usertype').dropdown('get value');

		if( (!(userType == 'Department Head' || userType == 'Faculty') && (value == ''))
			|| ((userType == 'Department Head' || userType == 'Faculty') && !(value == '')) ) {
			return true
		}
		else {
			return false;
		}
	};
	
	/* FORM VALIDATION - Add User Form */
	$('#adduser_form').form({
		fields: {
			faculty_no: {
				identifier: 'faculty_no',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the faculty number'
					},
					{
						type   : 'integer',
						prompt : 'Please enter a valid faculty number'
					}
				]
			},
			title: {
				identifier: 'title',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the title of the faculty'
					}
				]
			},
			first_name: {
				identifier: 'first_name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the first name'
					}
				]
			},
			last_name: {
				identifier: 'last_name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the last name'
					}
				]
			},
			middile_initial: {
				identifier: 'middile_initial',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the middle initial'
					}
				]
			},
			email: {
				identifier: 'email',
				rules: [
					{
						type   : 'email',
						prompt : 'Please enter a valid email address'
					}
				]
			},
			cellphone_number: {
				identifier: 'cellphone_number',
				rules: [
					{
						type   : 'cellphoneNumber[]',
						prompt : 'Please enter a valid cellphone number'
					}
				]
			},
			user_type: {
				identifier: 'user_type',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please select a user type'
					}
				]
			},
			department: {
				identifier: 'department',
				rules: [
					{
						type   : 'userDepartment[]',
						prompt : 'Please select a department'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Add User Form */
	function isAddUserFormValid() {
		if( $('#adduser_form').form('is valid') ) {
			$('#add_invalid_email_message').hide();
			
			addCSSClass('#adduser_form', 'loading');
			$('#adduser_clear').prop("disabled", false);
			$('#adduser_cancel').prop("disabled", false);
			$('#adduser_submit').prop("disabled", false);
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Add User Form */
	function cleanAddUserForm() {
		enableAddUserForm();
		clearFieldsAddUserForm();
	}

	/* CLEAN - Clear Fields Button on Add User Modal Event */
	$('#adduser_clear').on('click', () => {
		clearFieldsAddUserForm();
	});
	
	/* CLEAR FIELDS - Add User Form */
	function clearFieldsAddUserForm() {
		$('#adduser_form').form('reset');
		removeCSSClass('#adduser_form', 'error');
		$('#add_invalid_email_message').hide();
		$('#add_usertype').dropdown('restore defaults');
		$('#add_department').dropdown('restore defaults');
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
	}
	
	/* Enable Add User Form */
	function enableAddUserForm() {
		removeCSSClass('#adduser_form', 'loading');
		$('#adduser_clear').prop("disabled", false);
		$('#adduser_cancel').prop("disabled", false);
		$('#adduser_submit').prop("disabled", false);
	}
	
	/* CHANGE - Add User Type Event */
	$('#add_usertype').change(() => {
		checkUserTypeDepartment('#add_usertype', '#add_department_field');
	});