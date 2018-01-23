/**
 * 	login_script.js
 * 	- used by the Login page (index.jsp) for scripting functionalities, mostly used for dialog boxes
 */

	
	$(document).ready(() => {

		
	});	
	
/* FORGOT PASSWORD MODAL - GET EMAIL */
	
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
		$('#forgotpass_dia').modal('hide');
		$('#forgotpass_email').val('');
	});
	
	/* Forgot Password Submit Button */
	$('#submitforgot_btn').click(() => {
		
		var emailadd = {
			foo: $('#forgotpass_email').val()
			}
		
		$.post('sendemail', $.param(emailadd), () => {
			$('#forgotpass_dia').modal('hide');
			$('#resetcode_dia')
				.modal({
					blurring: true,
					closable: false
				})
				.modal('show');
		});
		
		$('#forgotpass_email').val('');
	});
	
/* FORGOT PASSWORD MODAL - INPUPT RESET CODE */
	
	/* Input Reset Code Cancel Button */
	$('#cancelreset_btn').click(() => {
		$('#resetcode_dia').modal('hide');
		$('#resetcode').val('');
	});
	
	/* Input Reset Code Submit Button*/
	$('#submitreset_btn').click(() => {
		$('#resetcode_dia').modal('hide');
		$('#newpassword_dia')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
		$('#resetcode').val('');
	});

/* FORGOT PASSWORD MODAL - INPUPT NEW PASSWORD */
	
	/* Input New Password Cancel Button */
	$('#cancelnewpass_btn').click(() => {
		$('#newpassword_dia').modal('hide');
	});
	
	/* Input Reset Code Submit Button*/
	$('submitnewpass_btn').click(() => {
		$('#newpassword_dia').modal('hide');
	});	

	