/**
 * 	login_script.js
 * 	- used by the Login page (index.jsp) for scripting functionalities, mostly used for dialog boxes
 */

	$(document).ready(() => {
		$('#forgotpass1').modal();
		
	});
	
	$('#forgotpass_btn').click(() => {
		$('#forgotpass_dia')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
	});
	
	$('#cancelforgot_btn').click(() => {
		$('#forgotpass_dia').modal('hide');
		$('#forgotpass_email').val('');
	});
	
	$('#submitforgot_btn').click(() => {
		$('#forgotpass_dia').modal('hide');
		$('#forgotpass_email').val('');
		$.ajax({
			type: "POST",
			url: ""
		})
	});
	