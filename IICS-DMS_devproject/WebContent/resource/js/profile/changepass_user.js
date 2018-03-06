/**
 * 
 */

/*
 * CHANGE PASSWORD
 */
	/* OPEN MODAL - Change Password Modal */
	$('#change_password').click( function() {
		$('#change_password_dialog').modal({
			closable: false,
			autofocus: false,
			observeChanges: true,
			onHidden: function() {
				cleanChangePasswordForm();
			}
		}).modal('show');
	});
	
	/* SUBMIT - Change Password Form */
	$('#change_password_form').ajaxForm({
		 beforeSubmit: isChangePasswordFormValid,
	     success: function(response) { 
	        if(response == 'success') {
	            callSuccessModal('Password Changed Successfully', 'Your password has successfully changed.');
	        }
	        else if(response == 'invalid password') {
	        	callFailModal('Password Incorrect', 'The password you entered is incorrect, please try again.');
	        }
	        else {
	        	callFailModal('Profile Change Failed', 'We are unable to change your password, please try again.');
	        }
	     },
	     error: function(response) {
	    	 callFailRequestModal();
	     }
	});

	/* FORM VALIDATION - Change Password Form */
	$('#change_password_form').form({
		fields: {
			current_password: {
				identifier: 'current_password',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your account password for authentication'
					}
				]
			},
			new_password: {
				identifier: 'new_password',
				rules: [
					{
						type   : 'minLength[6]',
			            prompt : 'Your password must be minimum of 6 characters'
					}
				]
			},
			repeat_password: {
				identifier: 'repeat_password',
				rules: [
					{
						type   : 'match[new_password]',
				        prompt : 'The two passwords does not match'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Change Password Form */
	function isChangePasswordFormValid() {
		if( $('#change_password_form').form('is valid') ) {
			addCSSClass('#change_password_form', 'loading');
			$('#change_password_cancel').prop('disabled', true);
			$('#change_password_submit').prop('disabled', true);
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Change Password Form */
	function cleanChangePasswordForm() {
		removeCSSClass('#change_password_form', 'loading');
		removeCSSClass('#change_password_form', 'error');
		$('#change_password_cancel').prop("disabled", false);
		$('#change_password_submit').prop("disabled", false);
	}
