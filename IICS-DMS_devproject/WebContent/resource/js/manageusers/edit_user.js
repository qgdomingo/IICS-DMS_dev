/**
 *  edit_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in editing of users.
 */
	
	$(document).ready( function() {
		$('#edit_invalid_email_message').hide();
	});

/*
 * FUNCTIONS AND EVENTS
 */
		
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
		var userType = $('#edit_usertype').dropdown('get value');

		if( (!(userType == 'Department Head' || userType == 'Faculty') && (value == ''))
			|| ((userType == 'Department Head' || userType == 'Faculty') && !(value == '')) ) {
			return true
		}
		else {
			return false;
		}
	};
	
	/* FORM VALIDATION - Edit User Form */
	$('#edituser_form').form({
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
	
	/* BOOLEAN VALIDATION - Edit User Form */
	function isEditUserFormValid() {
		if( $('#edituser_form').form('is valid') ) {
			$('#edit_invalid_email_message').hide();
			
			addCSSClass('#edituser_form', 'loading');
			$('#edituser_cancel').prop('disabled', true);
			$('#edituser_submit').prop('disabled', true);
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Edit User Form */
	function cleanEditUserForm() {
		enableEditUserForm();
		
		$('#edituser_form').form('reset');
		removeCSSClass('#edituser_form', 'error');
		$('#edit_usertype').dropdown('restore defaults');
		$('#edit_department').dropdown('restore defaults');
		checkUserTypeDepartment('#edit_usertype', '#edit_department_field');
	}

	/* Enable Edit User Form */
	function enableEditUserForm() {
		removeCSSClass('#edituser_form', 'loading');
		$('#edituser_cancel').prop("disabled", false);
		$('#edituser_submit').prop("disabled", false);
	}
	
	/* CHANGE - Edit User Type Event */
	$('#edit_usertype').change(() => {
		checkUserTypeDepartment('#edit_usertype', '#edit_department_field');
	});