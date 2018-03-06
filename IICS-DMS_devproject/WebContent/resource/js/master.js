/**
 *  master.js
 *   - a javascript used by all the pages found on the application
 */

/* 
 * FUNCTION HELPERS 
 */	
	
	function addCSSClass(element, cssClass) {
		if(!$(element).hasClass(cssClass)) $(element).addClass(cssClass); 
	}
	
	function removeCSSClass(element, cssClass) {
		if($(element).hasClass(cssClass)) $(element).removeClass(cssClass); 
	}
	
	function getContextPath() {
		return $('#context_path').val();
	}
	
	function callSuccessModal(header, body) {
		$('#successdia_header').text(header);
		$('#successdia_content').text(body);
		
		$('#successdia').modal({
			blurring: true,
			closable: false
		}).modal('show');
	}
	
	function callFailModal(header, body) {
		$('#faildia_header').text(header);
		$('#faildia_content').text(body);
		
		$('#faildia').modal({
			blurring: true,
			closable: false
		}).modal('show');
	}	
	
	function callFailRequestModal() {
		callFailModal('Uh oh! Something Went Wrong', 'We are unable to process your request, please try again. ' 
				+ 'If the problem persists, please contact your administrator.');
	}