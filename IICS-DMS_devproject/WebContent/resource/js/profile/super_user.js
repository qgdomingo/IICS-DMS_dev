/**
 * 
 */
	$(document).ready( function() {
		$('#invalid_email_message').hide();
		$('#invalid_password_message').hide();
	});
/*
 * EDIT USER PROFILE
 */
	/* OPEN MODAL - Edit User Profile Modal */
	$('#edit_user_profile').click( function() {
		$('#edit_profile_dialog').modal({
			closable: false,
			autofocus: false,
			observeChanges: true,
			onHidden: function() {
				cleanEditUserProfileForm();
			}
		}).modal('show');
	});
	
	/* SUBMIT - Edit User Profile Form */
	$('#edit_profile_form').ajaxForm({
		 beforeSubmit: isEditUserProfileFormValid,
	     success: function(response) { 
	        if(response == 'success') {
	            callSuccessModal('Profile Successfully Updated', 'Your profile has been updated. Refreshing page in 5 seconds.');
	            setTimeout(function(){  window.location.reload(); }, 5000);
	        }
	        else if(response == 'invalid password') {
	        	$('#invalid_password_message').show();
	        	cleanEditUserProfileForm();
	        }
	        else if(response == 'existing email') {
	        	$('#invalid_email_message').show();
	        	cleanEditUserProfileForm();
	        }
	        else {
	        	callFailModal('Profile Update Failed', 'We are unable to update your profile, please try again.');
	        }
	     },
	     error: function(response) {
	    	 callFailRequestModal();
	     }
	});

	/* FORM VALIDATION - Edit User Profile Form */
	$('#edit_profile_form').form({
		fields: {
			email: {
				identifier: 'email',
				rules: [
					{
						type   : 'email',
						prompt : 'Please enter a valid email address'
					}
				]
			},
			current_password: {
				identifier: 'current_password',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter your account password for authentication'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Edit User Profile Form */
	function isEditUserProfileFormValid() {
		if( $('#edit_profile_form').form('is valid') ) {
			$('#invalid_email_message').hide();
			$('#invalid_password_message').hide();
			
			addCSSClass('#edit_profile_form', 'loading');
			$('#edit_profile_cancel').prop('disabled', true);
			$('#edit_profile_submit').prop('disabled', true);
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Edit User Profile Form */
	function cleanEditUserProfileForm() {
		removeCSSClass('#edit_profile_form', 'loading');
		removeCSSClass('#edit_profile_form', 'error');
		$('#edit_profile_cancel').prop("disabled", false);
		$('#edit_profile_submit').prop("disabled", false);
	}
