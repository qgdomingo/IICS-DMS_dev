/**
 * 	login.js
 * 	- used by the Login page (index.jsp) for scripting functionalities, mostly used for dialog boxes
 */
	
	var emailRecoveryParams = 
		{
			email: '',
			code: '',
			new_password: '',
			confirm_password: ''
		}
	
	function removeInputErrorClass(inputField) {
		if($(inputField).hasClass("error")) $(inputField).removeClass("error");
	}
	
/* LOGIN FUNCTION */
	$('#login_form').submit((event) => {	
		event.preventDefault();
		addCSSClass('#login_form', 'loading');
		loginParams = {
			user_email: $('#user_email').val(),
			user_password: $('#user_password').val()
		}
		
		$.post('Login', $.param(loginParams), (response) => {
			window.location = getContextPath() + response.redirect;
		})
		 .fail((response) => {
			 removeCSSClass('#login_form', 'loading');
			 addCSSClass('#user_email', 'error');
			 addCSSClass('#user_password', 'error');
			 setFailModal('Invalid Login Credentials',
					 	  'Please try logging in again.');
		 });
	});
	
/* FORGOT PASSWORD MODAL - GET EMAIL */

	/* Email Field Validator */
	$('#forgotpass_email').on('input', () => {
		var emailTest = $('#forgotpass_email').val();
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailTest)) {
			$('#submitforgot_btn').prop("disabled", "");
			if($('#forgotpass_emailfield').hasClass("error")) $('#forgotpass_emailfield').removeClass("error");
		} 
		else {
			$('#submitforgot_btn').prop("disabled", "disabled");
			if(!$('#forgotpass_emailfield').hasClass("error")) $('#forgotpass_emailfield').addClass("error");
		}
	});
	
	/* Forgot Password Button */
	$('#forgotpass_btn').click(() => {
		$('#forgotpass_dia')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
	});
	
	/* Forgot Password Cancel Button */
	$('#cancelforgot_btn').click(() => {
		cleanGetMail();
		removeInputErrorClass('#forgotpass_emailfield');
	});
	
	/* Forgot Password Submit Button */
	$('#submitforgot_btn').click(() => {		
		$('#forgotpass_form').addClass("loading");
		$("#cancelforgot_btn").prop("disabled", "disabled");
		$("#submitforgot_btn").prop("disabled", "disabled");
		
		emailRecoveryParams['email'] = $('#forgotpass_email').val();
		$.post('sendemail', $.param(emailRecoveryParams), 
			(success) => { 
				$('#resetcode_dia')
				.modal({
					blurring: true,
					closable: false
				})
				.modal('show');
				cleanGetMail();
			});
	});
	
	/* CLEAN: GET MAIL MODAL */
	function cleanGetMail() {
		$('#forgotpass_email').val('');
		$("#cancelforgot_btn").prop("disabled", "");
		$("#submitforgot_btn").prop("disabled", "disabled");
		$('#forgotpass_form').removeClass("loading");
	}
	
/* FORGOT PASSWORD MODAL - INPUPT RESET CODE */
	
	/* Reset Code Validator */
	$('#resetcode').on('input', () => { 
		var resetCodeTest = $('#resetcode').val();
		if(!isNaN(resetCodeTest) && resetCodeTest > 9999 
				&& resetCodeTest < 100000 && resetCodeTest.length == 5) {
			$('#submitreset_btn').prop("disabled", "");
			if($('#resetcode_field').hasClass("error")) $('#resetcode_field').removeClass("error");
		}
		else {
			$('#submitreset_btn').prop("disabled", "disabled");
			if(!$('#resetcode_field').hasClass("error")) $('#resetcode_field').addClass("error");
		}
	});
	
	/* Input Reset Code Cancel Button */
	$('#cancelreset_btn').click(() => {
		$('#resetcode_dia').modal('hide');
		$('#resetcode').val('');
		removeInputErrorClass('#resetcode_form');
		removeInputErrorClass('#resetcode_field');
		$("#submitreset_btn").prop("disabled", "disabled");
	});
	
	/* Input Reset Code Submit Button*/
	$('#submitreset_btn').click(() => {
		if($('#resetcode_form').hasClass("error")) $('#resetcode_form').removeClass("error");
		$('#resetcode_form').addClass("loading");
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
				$('#resetcode_form').removeClass("loading");
		})
		.fail( (response) => {
			$("#cancelreset_btn").prop("disabled", "");
			$('#resetcode_form').removeClass("loading");
			$('#resetcode_form').addClass("error");
			$('#resetcode_field').addClass("error");
		});
	});

/* FORGOT PASSWORD MODAL - INPUT NEW PASSWORD */
	
	/* Individual Password Field Validator */
	addErrorInput = function(inputField, inputValue, secondInput) {
		if(inputValue.length >= 6) {
			if($(inputField).hasClass("error")) $(inputField).removeClass("error");
		} else {
			if(!$(inputField).hasClass("error")) $(inputField).addClass("error");
		}
	}
	
	/* New Password Form Validator */
	$('#newpass_form').on('input', () => {
		var new_passwordtemp = $('#new_password').val();
		var conf_passwordtemp = $('#confirm_password').val();
		
		// conditions for the whole form
		if(new_passwordtemp === conf_passwordtemp
				&& new_passwordtemp.length >= 6
				&& conf_passwordtemp.length >= 6) {
			$('#submitnewpass_btn').prop("disabled", "");
		} 
		else {
			$('#submitnewpass_btn').prop("disabled", "disabled");
		}
		
		// conditions for the New Password input field
		addErrorInput('#newpass_field', new_passwordtemp);
		
		// conditions for the Confirm New Password input field
		addErrorInput('#confnewpass_field', conf_passwordtemp);
		
	});
	
	/* Input New Password Cancel Button */
	$('#cancelnewpass_btn').click(() => {
		cleanInputNewPassword();
		removeInputErrorClass('#confirm_password');
		removeInputErrorClass('#new_password');
	});
	
	/* Input New Password Submit Button */
	$('#submitnewpass_btn').click(() => {
		$('#newpass_form').addClass("loading");
		$('#cancelnewpass_btn').prop("disabled", "disabled");
		$('#submitnewpass_btn').prop("disabled", "disabled");
		
		emailRecoveryParams['new_password'] = $('#new_password').val();
		emailRecoveryParams['confirm_password'] = $('#confirm_password').val();
		
		$.post('PasswordChange', $.param(emailRecoveryParams), () => {
			$('#successdia_header').text('Success');
			$('#successdia_content').text('You have successfully changed your account`s password!');
			
			$('#successdia')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
			
			cleanInputNewPassword();
		}).fail( (response) => {
			$('#faildia_header').text('Something Went Wrong');
			$('#faildia_content').text('Oh no! Some guys on the back stage said that something went wrong.');
			
			$('#faildia')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
			
			cleanInputNewPassword();
		});
	});	
	
	/* CLEAN: Input New Password Submit Button */
	function cleanInputNewPassword() {
		$('#new_password').val('');
		$('#confirm_password').val('');
		$('#newpass_form').removeClass("loading");
		$('#cancelnewpass_btn').prop("disabled", "");
		$('#submitnewpass_btn').prop("disabled", "disabled");
	}

	