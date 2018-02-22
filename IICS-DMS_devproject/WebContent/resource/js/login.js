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
	$('#login_form').submit((event) => {
		event.preventDefault();
		
		if(checkEmailField('#user_email', '#user_email_field'))
		{
			removeCSSClass('#user_email_field', 'error');
			removeCSSClass('#user_password_field', 'error');
			addCSSClass('#login_form', 'loading');
			loginParams = {
				user_email: $('#user_email').val(),
				user_password: $('#user_password').val()
			}
			
			$.post('Login', $.param(loginParams), (response) => {
				if(response == 'invalid')
				{
					removeCSSClass('#login_form', 'loading');
					addCSSClass('#user_email_field', 'error');
					addCSSClass('#user_password_field', 'error');
					callFailModal('Invalid Login Credentials',  'Please try logging in again.')
				}
				else if(response)
				{
					window.location = getContextPath() + response.redirect;
				}
			})
			 .fail((response) => {
				removeCSSClass('#login_form', 'loading');
				callFailModal('Unable to Login', 'Please try logging in again later. ' +
							'If the problem persists, please contact your administrator.');
			 });
		}	
	});
	
	/* VALIDATOR - Email Field */
	function checkEmailField(email, emailField) {
		var emailTest = $(email).val();
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailTest)) 
		{
			removeCSSClass(emailField, 'error');
			return true;
		} 
		else 
		{
			addCSSClass(emailField, 'error');
			return false;
		}
	}