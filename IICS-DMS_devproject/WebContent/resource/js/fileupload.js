/**
 * 
 */
	
	$(document).ready(() => {	
		changeUploadForm($('#doctype_select').val());
	})

	$('#doctype_select').change(() => {
		changeUploadForm($('#doctype_select').val());
	});
	
	function changeUploadForm(doctype) {
		if(doctype == 'Personal') {
			$('#personaldocs_form').show();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Incoming') {
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').show();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Outgoing') {
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').show();
		}
	}