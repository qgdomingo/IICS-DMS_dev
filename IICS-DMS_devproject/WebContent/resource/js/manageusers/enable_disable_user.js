/**
 *  enable_disable_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in enabling and disabling of users.
 */
/*
 * FUNCTIONS
 */
		
	/* GET - List of Selected Data Email */
	function getSelectedDataEmail() {
		var selectedEmail = []
		
		$.each(table.rows('.active').data(), (index, userData) => {
			selectedEmail.push(userData[3]);
		});
		
		return selectedEmail;
	}

/* 
 * ENABLE USER MODAL
 */

	/* OPEN MODAL - Enable User */
	$('#enableuser_btn').click(() => {		
		$('#enableuser_dia').modal({
			closable: false,
			onShow: function() {
				$('#enable_user_selected').val(getSelectedDataEmail());
			},
			onHide: function() {
				removeCSSClass('#enableuser_form', 'error');
			}
		}).modal('show');	
	});
	
	/* SUBMIT - Enable User Form */
	$('#enableuser_form').ajaxForm({
		 beforeSubmit: isEnableUserFormValid,
	     success: function(response) { 
	        if(response) {
	        	table.rows('.active').remove();
				$.each(response, (index, userData) => {
					table.row.add( $(addNewRowData(userData))[0] ).draw();
				});
				cleanEnableUserForm();
				callSuccessModal('Success', 'User accounts have successfully been enabled.');
				deactivatePageLoading();
				selectedRowsTogglers();
	        }
	        else {
				callFailModal('Unable to Enable User/s', 'An error has occured when enabling account/s. ' +
				'Please try again. If the problem persists, please contact your administrator.');
				deactivatePageLoading();
				selectedRowsTogglers();
	        }
	     },
	     error: function(response) {
			callFailRequestModal();
			deactivatePageLoading();
			selectedRowsTogglers();
	     }
	});
	
	/* FORM VALIDATION - Enable User Form */
	$('#enableuser_form').form({
		fields: {
			enable_user_purpose: {
				identifier: 'enable_user_purpose',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the reason for the enabling of users'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Enable User Form */
	function isEnableUserFormValid() {
		if( $('#enableuser_form').form('is valid') ) {
			$('#enableuser_dia').modal('hide');
			activatePageLoading('Enabling Users');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Enable User Form */
	function cleanEnableUserForm() {
		$('#enableuser_form').form('reset');
		removeCSSClass('#enableuser_form', 'error');
	}
	
/* 
 * DISABLE USER MODAL
 */
	
	/* OPEN MODAL - Disable User */
	$('#disableuser_btn').click(() => {		
		$('#disableuser_dia').modal({
			closable: false,
			onShow: function() {
				$('#disable_user_selected').val(getSelectedDataEmail());
			},
			onHide: function() {
				removeCSSClass('#disableuser_form', 'error');
			}
		}).modal('show');	
	});
		
	/* SUBMIT - Disable User Form */
	$('#disableuser_form').ajaxForm({
		 beforeSubmit: isDisableUserFormValid,
	     success: function(response) { 
	        if(response) {
	        	table.rows('.active').remove();
				$.each(response, (index, userData) => {
					table.row.add( $(addNewRowData(userData))[0] ).draw();
				});
				cleanDisableUserForm();
				callSuccessModal('Success', 'User accounts have successfully been disabled.');
				deactivatePageLoading();
				selectedRowsTogglers();
	        }
	        else {
	        	callFailModal('Unable to Disable User/s', 'An error has occured when enabling account/s. ' +
					'Please try again. If the problem persists, please contact your administrator.');
				deactivatePageLoading();
				selectedRowsTogglers();
	        }
	     },
	     error: function(response) {
			callFailRequestModal();
			deactivatePageLoading();
			selectedRowsTogglers();
	     }
	});
	
	/* FORM VALIDATION - Disable User Form */
	$('#disableuser_form').form({
		fields: {
			disable_user_purpose: {
				identifier: 'disable_user_purpose',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the reason for the disabling of users'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Disable User Form */
	function isDisableUserFormValid() {
		if( $('#disableuser_form').form('is valid') ) {
			$('#disableuser_dia').modal('hide');
			activatePageLoading('Disabling Users');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Disable User Form */
	function cleanDisableUserForm() {
		$('#disableuser_form').form('reset');
		removeCSSClass('#disableuser_form', 'error');
	}