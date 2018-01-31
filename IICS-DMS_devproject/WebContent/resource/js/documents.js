/**
 * 
 */

	$(document).ready(() => {	
		changeDocumentsTable($('#doctype_select').val());
	})

	$('#doctype_select').change(() => {
		changeDocumentsTable($('#doctype_select').val());
	});
	
	function changeDocumentsTable(doctype) {
		if (doctype == 'Personal') {
			$('#personaldocs_table').show();
			$('#incomingdocs_table').hide();
			$('#outgoingdocs_table').hide();
			$('#archiveddocs_table').hide();
			$('#alldocs_table').hide();
		} else if(doctype == 'Incoming') {
			$('#personaldocs_table').hide();
			$('#incomingdocs_table').show();
			$('#outgoingdocs_table').hide();
			$('#archiveddocs_table').hide();
			$('#alldocs_table').hide();
		} else if(doctype == 'Outgoing') {
			$('#personaldocs_table').hide();
			$('#incomingdocs_table').hide();
			$('#outgoingdocs_table').show();
			$('#archiveddocs_table').hide();
			$('#alldocs_table').hide();
		} else if(doctype == 'Archived') {
			$('#personaldocs_table').hide();
			$('#incomingdocs_table').hide();
			$('#outgoingdocs_table').hide();
			$('#archiveddocs_table').show();
			$('#alldocs_table').hide();
		} else if(doctype == 'All') {
			$('#personaldocs_table').hide();
			$('#incomingdocs_table').hide();
			$('#outgoingdocs_table').hide();
			$('#archiveddocs_table').hide();
			$('#alldocs_table').show();
		}
	}