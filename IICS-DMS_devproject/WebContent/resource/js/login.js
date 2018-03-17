/**
 * 	login.js
 * 	- used by the Login page (index.jsp) for scripting functionalities in logging in
 */

/* 
 * LOGIN FUNCTIONALITY  
 */
	/* SUBMIT - Login Form */
	$('#login_form').ajaxForm({
		 beforeSubmit: isLoginFormValid,
	     success: function(response) { 
	    	if(response == 'invalid') {
		        	callFailModal('Invalid Login Credentials',  'Check your login credentials and try logging in again.');
		        	deactivatePageLoading();
	    	}
	        else if(response) {
	        	setTimeout( function(){  
        			window.location = getContextPath() + response.redirect; 
        		}, 1000);
	        }
	        else {
	        	callFailModal('Unable to Login', 'Please try logging in again later. ' +
					'If the problem persists, please contact your administrator.');
	        	deactivatePageLoading();
	        }
	     },
	     error: function(response) {
	    	 deactivatePageLoading();
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
					},
					{
						type   : 'maxLength[100]',
					}
				]
			},
			user_password: {
				identifier: 'user_password',
				rules: [
					{
						type   : 'empty',
			            prompt : 'Please enter your password'
					},
					{
						type   : 'maxLength[100]',
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Login Form */
	function isLoginFormValid() {		
		if( $('#login_form').form('is valid') ) {
			activatePageLoading('Logging In');
			return true;
		} 
		else {
			return false;
		}
	}