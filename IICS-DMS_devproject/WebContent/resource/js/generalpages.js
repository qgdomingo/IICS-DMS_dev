/**
 * 
 */

	$('#togglenav').click(() => {
		$('#side_nav').sidebar('toggle');
	});
	
	$(document).ready(() => {
		
		$('.checkbox').checkbox();
		$('table').tablesort();
	});
	
	$('#logout_btn').click(() => {
		$('#logout_dia').modal({
			closable: false
		})
		.modal('show');
	});