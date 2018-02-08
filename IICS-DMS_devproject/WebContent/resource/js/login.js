/**
 * 	login.js
 * 	- used by the Login page (index.jsp) for scripting functionalities, mostly used for dialog boxes
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
		removeCSSClass('#user_email_field', 'error');
		removeCSSClass('#user_password_field', 'error');
		addCSSClass('#login_form', 'loading');
		loginParams = {
			user_email: $('#user_email').val(),
			user_password: $('#user_password').val()
		}
		
		$.post('Login', $.param(loginParams), (response) => {
			// add handler if empty
			window.location = getContextPath() + response.redirect;
		})
		 .fail((response) => {
			 removeCSSClass('#login_form', 'loading');
			 addCSSClass('#user_email_field', 'error');
			 addCSSClass('#user_password_field', 'error');
			 callFailModal('Invalid Login Credentials',
					 	  'Please try logging in again.');
		 });
	});
	
/* 
 *  FORGOT PASSWORD MODAL - GET EMAIL 
 */
	
	/* OPEN MODAL - Forgot Password Email */
	$('#forgotpass_btn').click(() => {
		$('#forgotpass_dia').modal({
			blurring: true,
			closable: false
		}).modal('show');
	});
	
	/* CLOSE MODAL - Forgot Password Email */
	$('#cancelforgot_btn').click(() => {
		cleanGetMail();
		removeCSSClass('#forgotpass_emailfield', 'error');
	});
	
	/* SUBMIT - Forgot Password Email */
	$('#submitforgot_btn').click(() => {
		addCSSClass('#forgotpass_form', 'loading');
		$("#cancelforgot_btn").prop("disabled", "disabled");
		$("#submitforgot_btn").prop("disabled", "disabled");
		
		emailRecoveryParams['email'] = $('#forgotpass_email').val();
		$.post('sendemail', $.param(emailRecoveryParams), (success) => { 
			$('#resetcode_dia').modal({
				blurring: true,
				closable: false
			}).modal('show');
			cleanGetMail();			
		})
		.fail((response) => {
			callFailModal('Uh oh! Something Went Wrong', 'We are unable to process your request, please try again.' 
							+ 'If the problem persists, please contact your administrator.');
			cleanGetMail();	
		});
	});

/* 
 * FORGOT PASSWORD MODAL - INPUT RESET CODE
 */
	
	/* CLOSE MODAL - Input Reset Code */
	$('#cancelreset_btn').click(() => {
		$('#resetcode').val('');
		removeCSSClass('#resetcode_form', 'error');
		removeCSSClass('#resetcode_field', 'error');
		$("#submitreset_btn").prop("disabled", "disabled");
	});
	
	/* SUBMIT - Input Reset Code */
	$('#submitreset_btn').click(() => {
		removeCSSClass('#resetcode_form', 'error');
		addCSSClass('#resetcode_form', 'loading');
		$("#cancelreset_btn").prop("disabled", "disabled");
		$("#submitreset_btn").prop("disabled", "disabled");
		
		emailRecoveryParams['code'] = $('#resetcode').val();

		$.post('InputRecoveryCode', $.param(emailRecoveryParams), 
			(success) => {
				$('#newpassword_dia')
					.modal({
						blurring: true,
						closable: false
					})
					.modal('show');
				
				$('#resetcode').val('');
				$("#cancelreset_btn").prop("disabled", "");
				removeCSSClass('#resetcode_form', 'loading');
		})
		.fail( (response) => {
			$("#cancelreset_btn").prop("disabled", "");
			removeCSSClass('#resetcode_form', 'loading');
			addCSSClass('#resetcode_form', 'error');
			addCSSClass('#resetcode_field', 'loading');
		});
	});

/* 
 * FORGOT PASSWORD MODAL - INPUT NEW PASSWORD 
 */
	
	/* CLOSE MODAL - Input New Password */
	$('#cancelnewpass_btn').click(() => {
		cleanInputNewPassword();
		removeCSSClass('#confirm_password', 'error');
		removeCSSClass('#new_password', 'error');
	});
	
	/* SUBMIT - Input New Password */
	$('#submitnewpass_btn').click(() => {
		addCSSClass('#newpass_form', 'loading');
		$('#cancelnewpass_btn').prop("disabled", "disabled");
		$('#submitnewpass_btn').prop("disabled", "disabled");
		
		emailRecoveryParams['new_password'] = $('#new_password').val();
		emailRecoveryParams['confirm_password'] = $('#confirm_password').val();
		
		$.post('PasswordChange', $.param(emailRecoveryParams), () => {
			callSuccessModal('Successful Password Change', 'You have successfully changed your account`s password!');
			cleanInputNewPassword();
		}).fail( (response) => {
			callFailModal('Something Went Wrong', 'Sorry about that! Your password was unable to be changed. Please try again.');
			cleanInputNewPassword();
		});
	});	
	
/*
 *  FORM CLEANERS
 */
	
	/* CLEAN - Forgot Password Email */
	function cleanGetMail() {
		$('#forgotpass_email').val('');
		$("#cancelforgot_btn").prop("disabled", "");
		$("#submitforgot_btn").prop("disabled", "disabled");
		removeCSSClass('#forgotpass_form', 'loading');
	}
	
	/* CLEAN - Input New Password */
	function cleanInputNewPassword() {
		$('#new_password').val('');
		$('#confirm_password').val('');
		removeCSSClass('#newpass_form', 'loading');
		$('#cancelnewpass_btn').prop("disabled", "");
		$('#submitnewpass_btn').prop("disabled", "disabled");
	}

/*
 * 	FIELD VALIDATORS
 */
	
	/* VALIDATOR - Email Field */
	$('#forgotpass_email').on('input', () => {
		var emailTest = $('#forgotpass_email').val();
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailTest)) {
			$('#submitforgot_btn').prop("disabled", "");
			removeCSSClass('#forgotpass_emailfield', 'error');
		} 
		else {
			$('#submitforgot_btn').prop("disabled", "disabled");
			addCSSClass('#forgotpass_emailfield', 'error');
		}
	});
	
	/* VALIDATOR - Reset Code */
	$('#resetcode').on('input', () => { 
		var resetCodeTest = $('#resetcode').val();
		if(!isNaN(resetCodeTest) && resetCodeTest > 9999 && resetCodeTest < 100000 && resetCodeTest.length == 5) {
			$('#submitreset_btn').prop("disabled", "");
			removeCSSClass('#resetcode_field', 'error');
		}
		else {
			$('#submitreset_btn').prop("disabled", "disabled");
			addCSSClass('#resetcode_field', 'error');
		}
	});
	
		
	/* VALIDATOR - New Password Form */
	$('#newpass_form').on('input', () => {
		var new_passwordtemp = $('#new_password').val();
		var conf_passwordtemp = $('#confirm_password').val();
		
		// conditions for the whole form
		if( checkPasswordInput(new_passwordtemp, '#newpass_field')
			&& checkPasswordInput(conf_passwordtemp, '#confnewpass_field')
			&& new_passwordtemp === conf_passwordtemp)
		{
			$('#submitnewpass_btn').prop("disabled", "");
		} 
		else 
		{
			$('#submitnewpass_btn').prop("disabled", "disabled");
		}
	});
	
	/*  VALIDATOR - Individual Password Field */
	function checkPasswordInput(inputValue, inputField) {
		if(inputValue.length >= 6) {
			removeCSSClass(inputField, 'error');
			return true;
		} else {
			addCSSClass(inputField, 'error');
			return false;
		}
	}

	