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
	
	/* GET - Individual User for Edit */
	function retrieveUserForEdit() {
		var existingData = table.rows('.active').data()[0];
		
		$('#edit_original_email').val(existingData[3]);		
		$('#edit_facultyno').val(existingData[0]);
		$('#edit_firstname').val(existingData[1]);
		$('#edit_lastname').val(existingData[2]);
		$('#edit_email').val(existingData[3]);
		$('#edit_usertype').dropdown('set selected', existingData[4]);
		$('#edit_department').dropdown('set selected', existingData[5]);
	}
	
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
				cleanEditUserForm();
				selectedRowsTogglers();
			}
		}).modal('show');
		
	});
		
	/* SUBMIT - Edit User Profile Form */
	$('#edituser_form').ajaxForm({
		 beforeSubmit: isEditUserFormValid,
	     success: function(response) { 
	        if(!response.length == 0) {
	        	table.row('.active').remove();
				table.row.add( $(addNewRowData(response[0]))[0] ).draw();	
				callSuccessModal('Success', 'The account has successfully been updated.');
	        }
	        else if(response == 'existing email') {
	        	$('#edit_invalid_email_message').show();
	        	enableEditUserForm();
	        }
	        else {
	        	callFailModal('Unable to Edit User', 'An error has occured when updating an account. ' +
					'Please try again. If the problem persists, please contact your administrator.');
	        }
	     },
	     error: function(response) {
	    	 callFailRequestModal();
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