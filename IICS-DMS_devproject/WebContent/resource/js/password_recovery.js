/**
 *  password_recovery.js
 *  	- 
 */
	$(document).ready(() => {
		emailFormValidation();
		resetCodeFormValidation();
		newPasswordFormValidation();
		
		$('#invalid_code_msg').hide();
	});

/* 
 *  FORGOT PASSWORD MODAL - GET EMAIL 
 */
	
	/* OPEN MODAL - Forgot Password Email */
	$('#forgotpass_btn').click(() => {
		$('#forgotpass_dia').modal({
			closable: false,
			observeChanges: true,
			onHidden: () => {
				cleanGetEmail();
			}
		}).modal('show');
	});
	
	/* SUBMIT - Forgot Password Email */
	$('#forgotpass_form').ajaxForm({
		  beforeSubmit: isEmailFormValid,
          success: function(response) {    
        	  if(response) {
      			  $('#resetcode_email').val( $('#forgotpass_email').val() ); 
      			  
        		  $('#resetcode_dia').modal({
	  					blurring: true,
	  					closable: false,
	  					onHidden: () => {
	  						cleanResetCodeForm();
	  					}
  				  }).modal('show');
        	  }
        	  else {
        		  callFailRequestModal();
        	  }        	  
          },
          error: function(response) {
        	  callFailRequestModal();
          }
	});

	/* FORM VALIDATION - Email Form */
	function emailFormValidation() {
		$('#forgotpass_form').form({
		    fields: {
		    	email: {
		          identifier: 'email',
		          rules: [
		            {
		              type   : 'email',
		              prompt : 'Please enter a valid e-mail address'
		            },
		            {
		              type : 'maxLength[100]'
		            }
		            ]
		    	}
		    }
		});
	}
	
	/* BOOLEAN VALIDATION - Email Form */
	function isEmailFormValid() {
		if( $('#forgotpass_form').form('is valid') ) {			
			addCSSClass('#forgotpass_form', 'loading');
			$("#cancelforgot_btn").prop("disabled", "disabled");
			$("#submitforgot_btn").prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Forgot Password Email */
	function cleanGetEmail() {
		$('#forgotpass_form').form('reset');
		$("#cancelforgot_btn").prop("disabled", "");
		$("#submitforgot_btn").prop("disabled", "");
		removeCSSClass('#forgotpass_form', 'error');
		removeCSSClass('#forgotpass_form', 'loading');
	}
	
/* 
 * FORGOT PASSWORD MODAL - INPUT RESET CODE
 */
	
	/* SUBMIT - Reset Code Form */
	$('#resetcode_form').ajaxForm({
		  beforeSubmit: isResetCodeFromValid,
          success: function(response) {

        	  if(response == 'valid code') {
      			  $('#newpass_email').val( $('#resetcode_email').val() ); 
      			  $('#newpass_code').val( $('#resetcode').val() ); 
      			  
  				  $('#newpassword_dia').modal({
  				  		closable: false,
  						observeChanges: true,
  				  		onHidden: () => {
  				  			cleanNewPasswordForm();
  				  		}
  				  	})
  				  	.modal('show');

        	  }
        	  else if(response == 'invalid') {
        		  $('#invalid_code_msg').show();
  				  $("#cancelreset_btn").prop("disabled", "");
  				  $("#submitreset_btn").prop("disabled", "");
  				  removeCSSClass('#resetcode_form', 'loading');
  				  removeCSSClass('#resetcode_form', 'error');
  			  }
        	  else {
        		  callFailRequestModal();
        	  }        	  
          },
          error: function(response) {
        	  callFailRequestModal();
          }
	});
	
	/* FORM VALIDATION - Reset Code Form */
	function resetCodeFormValidation() {
		$('#resetcode_form').form({
		    fields: {
		    	code: {
		          identifier: 'code',
		          rules: [
		            {
		              type   : 'exactLength[5]',
		              prompt : 'Please exactly 5 digits of the reset code'
		            },
		            {
			          type   : 'integer[10000..99999]',
			          prompt : 'The reset code only contains 5 digits'
			        }
		            ]
		    	}
		    }
		});
	}
	
	/* BOOLEAN VALIDATION - Reset Code Form */
	function isResetCodeFromValid() {
		if( $('#resetcode_form').form('is valid') ) {	
			$('#invalid_code_msg').hide();
			addCSSClass('#resetcode_form', 'loading');
			$("#cancelreset_btn").prop("disabled", "disabled");
			$("#submitreset_btn").prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Reset Code Form */
	function cleanResetCodeForm() {
		$('#resetcode_form').form('reset');
		$("#cancelreset_btn").prop("disabled", "");
		$("#submitreset_btn").prop("disabled", "");
		removeCSSClass('#resetcode_form', 'error');
		removeCSSClass('#resetcode_form', 'loading');
	}
	
/* 
 * FORGOT PASSWORD MODAL - INPUT NEW PASSWORD 
 */
	
	/* SUBMIT - Reset Code Form */
	$('#newpass_form').ajaxForm({
		  beforeSubmit: isNewPasswordFormValid,
          success: function(response) {
        	  if(response == 'changed') {
        		  callSuccessModal('Successful Password Change', 'You have successfully changed your account`s password!');
        	  }
        	  else if(response == 'unchanged') {
        		  callFailModal('Something Went Wrong', 'Sorry about that! Your password was unable to be changed. Please try again.');
  			  }
        	  else {
        		  callFailRequestModal();
        	  }        	  
          },
          error: function(response) {
        	  callFailRequestModal();
          }
	});
	
	/* FORM VALIDATION - New Password Form */
	function newPasswordFormValidation() {
		$('#newpass_form').form({
		    fields: {
		    	new_password: {
		          identifier: 'new_password',
		          rules: [
		            {
		              type   : 'minLength[8]',
		              prompt : 'Your password must be minimum of 8 characters'
		            },
		            {
		              type : 'maxLength[100]'
		            }
		          ]
		    	},
		    	confirm_password: {
			      identifier: 'confirm_password',
			      rules: [
			          {
			           type   : 'match[new_password]',
			           prompt : 'The two passwords does not match'
			         },
			         {
			            type : 'maxLength[100]'
			         }
			       ]
			    }
		    }
		});
	}
	
	/* BOOLEAN VALIDATION - Reset Code Form */
	function isNewPasswordFormValid() {
		if( $('#newpass_form').form('is valid') ) {	
			addCSSClass('#newpass_form', 'loading');
			$("#cancelnewpass_btn").prop("disabled", "disabled");
			$("#submitnewpass_btn").prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAN - Input New Password */
	function cleanNewPasswordForm() {
		$('#newpass_form').form('reset');
		$('#cancelnewpass_btn').prop("disabled", "");
		$('#submitnewpass_btn').prop("disabled", "");
		removeCSSClass('#newpass_form', 'loading');
		removeCSSClass('#newpass_form', 'error');
	}
