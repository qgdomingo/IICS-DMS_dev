/**
 *  generalpages.js
 *   - a javascript used by all general pages (regular user account pages) except of the login page
 */

	$(document).ready(() => {		
		$('.ui.dropdown').dropdown();
		$('.checkbox').checkbox();
	})

/* 
 * FUNCTION HELPERS AND VALIDATORS
 */
		
	function activatePageLoading(loadingText) {
		$('#page_loading_text').text(loadingText);
		addCSSClass('#page_loading', 'active');
	}
	
	function deactivatePageLoading() {
		$('#page_loading_text').text('');
		removeCSSClass('#page_loading', 'active');
	}
	
	function checkEmailField(email, emailField) {
		var emailTest = $(email).val();
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailTest)) 
		{
			removeCSSClass(emailField, 'error');
			return true;
		} 
		else 
		{
			addCSSClass(emailField, 'error');
			return false;
		}
	}
	
	function checkNumberField(number, numberField) {
		var numberTest = $(number).val();
		if(!isNaN(numberTest)) 
		{
			removeCSSClass(numberField, 'error');
			return true;
		} 
		else
		{
			addCSSClass(numberField, 'error');
			return false;
		}
	}
	
	function checkEmptyFields(inputArray) {
		var areFieldsValid = false;
		var noOfInvalidFields = 0;
		inputArray.forEach(function(item, index, array) {
			if (!($(item).val() === '')) 
			{
				removeCSSClass(item + '_field', 'error');
			} 
			else 
			{
				addCSSClass(item + '_field', 'error');
				noOfInvalidFields++;
			}
		});
		if(noOfInvalidFields == 0) areFieldsValid = true;
		return areFieldsValid;
	}
	
	function clearErrorFields(inputArray) {
		inputArray.forEach(function(item, index, array) {
			removeCSSClass(item + '_field', 'error');
		});
	}
	
	function enableFormButtons(buttonArray) {
		buttonArray.forEach(function(item, index, array) {
			$(item).prop("disabled", "");
		});
	}
	
	function disableFormButtons(buttonArray) {
		buttonArray.forEach(function(item, index, array) {
			$(item).prop("disabled", "disabled");
		});
	}
	
/* 
 * SIDE MENU FUNCTIONALITY 
 */ 
	
	$('#togglenav').click(() => {
		$('#side_nav').sidebar({
			dimPage: false,
			returnScroll: true,
			scrollLock: false
		}).sidebar('toggle');
	});
	
/* 
 * LOGOUT FUNCTIONALITY 
 */
	
	/* CLOSE MODAL - Logout */
	$('#logout_btn').click(() => {
		$('#logout_dia').modal({
			closable: false
		})
		.modal('show');
	});
	
	/* CLOSE MODAL - Logout (Mobile) */
	$('#logout_btn2').click(() => {
		$('#logout_dia').modal({
			closable: false
		})
		.modal('show');
	});

	/* SUBMIT - Logout */
	$('#logout_submit').click(() => {
		$('#logout_dia').modal('hide');
		activatePageLoading('Logging out');
		
		$.get(getContextPath() + '/Logout', (response) => {
			if(response) 
			{
				window.location = getContextPath() + response.redirect;
			}
			else
			{
				callFailRequestModal();
				removeCSSClass('#page_loading', 'active');
			}
		})
		 .fail((response) => {
			 callFailRequestModal();
			 removeCSSClass('#page_loading', 'active');
		 });
	});
	
