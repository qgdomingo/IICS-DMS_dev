/**
 * 
 */

/* ADD USER MODAL*/
	$('#adduser_btn').click(() => {
		$('#adduser_dia').modal({
			blurring: true,
			closable: false
		}).modal('show');
	});