/**
 * 	JAVASCRIPT UTILIZED BY THE LOGIN PAGE
 */

	$(document).ready(() => {
		$('#forgotpass1').modal();
		
	});
	
	$('#forgotpass_btn').click(() => {
		$('#forgotpass_1')
			.modal({
				blurring: true,
				closable: false
			})
			.modal('show');
	});
	
	$('#cancelforgot_btn').click(() => {
		$('#forgotpass_1').modal('hide');
		$('#forgotpass_email').val('');
	});
	