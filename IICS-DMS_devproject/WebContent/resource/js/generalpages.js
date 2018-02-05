/**
 *  generalpages.js
 *   - a javascript used by all general pages (regular user account pages) 
 */

	$(document).ready(() => {		
		$('.ui.dropdown').dropdown();
		$('.checkbox').checkbox();
	})

/* FUNCTION HELPERS */	
	
	function addCSSClass(element, cssClass) {
		if(!$(element).hasClass(cssClass)) $(element).removeClass(cssClass); 
	}
	
	function removeCSSClass(element, cssClass) {
		if($(element).hasClass(cssClass)) $(element).removeClass(cssClass); 
	}
	
	function sendServerErrorMessage() {
		
	}
	
	function getContextPath() {
		return $('#context_path').val();
	}
	
	function setFailModal(header, body) {
		$('#faildia_header').text(header);
		$('#faildia_content').text(body);
		
		$('#faildia')
		.modal({
			blurring: true,
			closable: false
		})
		.modal('show');
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
		$.get('Logout', (response) => {
			window.location = getContextPath() + response.redirect;
		});
	});
	
