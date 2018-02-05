/**
 *  generalpages.js
 *   - a javascript used by all general pages (regular user account pages) except of the login page
 */

	$(document).ready(() => {		
		$('.ui.dropdown').dropdown();
		$('.checkbox').checkbox();
	})

/* FUNCTION HELPERS */
		
	function activatePageLoading(loadingText) {
		$('#page_loading_text').text(loadingText);
		addCSSClass('#page_loading', 'active');
	}
	
	
/* SIDE MENU FUNCTIONALITY */ 
	
	$('#togglenav').click(() => {
		$('#side_nav').sidebar({
			dimPage: false,
			returnScroll: true,
			scrollLock: false
		}).sidebar('toggle');
	});
	
/* LOGOUT FUNCTIONALITY */
	
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

	$('#logout_submit').click(() => {
		$('#logout_dia').modal('hide');
		activatePageLoading('Logging out');
		
		$.get(getContextPath() + '/Logout', (response) => {
			window.location = getContextPath() + response.redirect;
		})
		 .fail((response) => {
			 removeCSSClass('#page_loading', 'active');
		 });
	});
	
