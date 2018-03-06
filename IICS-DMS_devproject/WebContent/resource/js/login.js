/**
 * 	login.js
 * 	- used by the Login page (index.jsp) for scripting functionalities in logging in
 */
	
/* 
 * VARIABLES 
 */ 
	var emailRecoveryParams = 
		{
			email: '',
			code: '',
			new_password: '',
			confirm_password: ''
		}
	
/* 
 * LOGIN FUNCTIONALITY  
 */
	/* SUBMIT - Login Form */
	$('#login_form').ajaxForm({
		 beforeSubmit: isLoginFormValid,
	     success: function(response) { 
	        if(response) {
	        	setTimeout( function(){  
	        			window.location = getContextPath() + response.redirect; 
	        		}, 1000);
	        }
	        else if(response == 'invalid') {
	        	callFailModal('Invalid Login Credentials',  'Check your login credentials and try logging in again.');
	        	removeCSSClass('#login_form', 'loading');
	        }
	        else {
	        	callFailModal('Unable to Login', 'Please try logging in again later. ' +
					'If the problem persists, please contact your administrator.');
	        	removeCSSClass('#login_form', 'loading');
	        }
	     },
	     error: function(response) {
	    	 removeCSSClass('#login_form', 'loading');
	    	 callFailRequestModal();
	     }
	});

	/* FORM VALIDATION - Login Form */
	$('#login_form').form({
		fields: {
			user_email: {
				identifier: 'user_email',
				rules: [
					{
						type   : 'email',
						prompt : 'Please enter a valid email address'
					}
				]
			},
			user_password: {
				identifier: 'user_password',
				rules: [
					{
						type   : 'empty',
			            prompt : 'Please enter your password'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Login Form */
	function isLoginFormValid() {
		if( $('#login_form').form('is valid') ) {
			addCSSClass('#login_form', 'loading');
			return true;
		} 
		else {
			return false;
		}
	}