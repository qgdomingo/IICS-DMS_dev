/**
 * 
 */

	$(document).ready(() => {		
		$('.ui.dropdown').dropdown();
	})

	$('#togglenav').click(() => {
		$('#side_nav').sidebar({
			dimPage: false,
			returnScroll: true,
			scrollLock: false
		}).sidebar('toggle');
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
	
	$('#logout_btn2').click(() => {
		$('#logout_dia').modal({
			closable: false
		})
		.modal('show');
	});
	
