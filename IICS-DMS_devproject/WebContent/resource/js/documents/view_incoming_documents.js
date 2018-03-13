/**
 *  view_incoming_documents.js
 *    - javascript used for scripting in viewing incoming documents on incomingdocs.jsp
 */

	$(document).ready(() => {
		getIncomingDocuments();
		retrieveCategory('#search_category');	
		
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_form').hide();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isIncomingDocsTableEmpty = true;
	
	// Table References
	var incomingDocsTable;
	var selectedRowId;
	
	// Local Data
	var localIncomingDocsData;
	
	// For Search Functions
	var minimumDate_incoming;
	var maximumDate_incoming;

/*
 * NAVIGATE FUNCTION
 */
	$('#doctype_select').on('change', function() {
		window.location.href = getContextPath() + '/files/' + $(this).dropdown('get value');
	});
	
/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[2] ).getTime(); 
			
		if ( ( isNaN(min) && isNaN(max) ) ||
		     ( isNaN(min) && dateData <= max ) ||
		     ( min <= dateData && isNaN(max) ) ||
		     ( min <= dateData && dateData <= max ) )
		{
			return true;
		}
		return false;
	}
	
	/* APPLY - Custom search filter: Date Range */
	$.fn.dataTable.ext.search.push(
		function(settings, data, dataIndex) {
			return filterDateRange(data, minimumDate_incoming, maximumDate_incoming);
		}
	);
	
	/* GET - Incoming Documents */
	function getIncomingDocuments() {
		addCSSClass('#incoming_loading', 'active');
			
		$.get(getContextPath() + '/IncomingDocument', (responseJson) => {
			$('#incoming_tablebody').empty();
			if(!responseJson.length == 0) 
			{
				localIncomingDocsData = responseJson;
				$.each(responseJson, (index, incomingDocs) => {
					$('<tr id="'+index+'">').appendTo('#incoming_tablebody')
						.append($('<td>').text(incomingDocs.title))
						.append($('<td>').text(incomingDocs.sourceRecipient))
						.append($('<td>').text(incomingDocs.timeCreated))
						.append($('<td>').text(incomingDocs.category))
						.append($('<td>').text(incomingDocs.actionRequired))
						.append($('<td>').text(incomingDocs.dueOn))
						.append($('<td>').text(incomingDocs.status))
						.append($('<td>').text(incomingDocs.referenceNo))
				});
					
				// bind events and classes to the table after all data received
				incomingDocsTable = $('#incoming_table').DataTable({
					'order': [[2, 'desc']]
				});
				selectIncomingDocsRow();
				isIncomingDocsTableEmpty = false;
				removeCSSClass('#incoming_loading', 'active');
			} 
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#incoming_tablebody')
					.append($('<td class="center-text" colspan="8">')
							.text("You do not have any incoming documents. Go to Upload Documents page to upload one."));
				removeCSSClass('#incoming_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#incoming_tablebody')
				.append($('<td class="center-text error" colspan="8">')
						.text("Unable to retrieve list of your incoming documents. Please refresh page. :("));
				removeCSSClass('#incoming_loading', 'active');
				callFailRequestModal();
				
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#incoming_tablebody')
			.append($('<td class="center-text error" colspan="8">')
					.text("Unable to retrieve list of your incoming documents. Please refresh page. :("));
			removeCSSClass('#incoming_loading', 'active');
			callFailRequestModal();
		});
	}
		
	/* SELECT ROW - Incoming Documents */
	function selectIncomingDocsRow() {
		$('#incoming_table tbody').on('dblclick', 'tr', function () {
			selectedRowId = $(this).attr('id');
			getIncomingDocumentsData($(this).attr('id'));
		   	$(this).toggleClass('active');
		   	
		    $('#viewincoming_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false,
				onHidden: function() {
					$('#viewincoming_due').text('');
					$('#view_incoming_note').val('');
					reinitializeMarkAsDone();
					hideNoteMessages();
				}
			}).modal('show');
		    
		    $(this).toggleClass('active');
		});
	}
		
	/* GET - Populate Dialog For View File */
	function getIncomingDocumentsData(id) {
		var selectedData = localIncomingDocsData[id];
		$('#viewincoming_title').text(selectedData['title']);
		$('#viewincoming_source').text(selectedData['sourceRecipient']);
		$('#viewincoming_refno').text(selectedData['referenceNo']);
		$('#viewincoming_action').text(selectedData['actionRequired']);
		$('#viewincoming_due').text(selectedData['dueOn']);
		$('#viewincoming_status').text(selectedData['status']);
		$('#viewincoming_uploadedby')
			.text(selectedData['createdBy'] + ' <' + selectedData['email'] + '>');
		$('#viewincoming_uploaddate').text(selectedData['timeCreated']);
		$('#viewincoming_category').text(selectedData['category']);
		$('#viewincoming_type').text('Incoming');
		$('#viewincoming_file').text(selectedData['file_name']);
		$('#viewincoming_description').text(selectedData['description']);
		$('#viewincoming_download_id').val(selectedData['id']);
		$('#viewincoming_download_type').val(selectedData['type']);
		$('#viewincoming_threadno').val(selectedData['threadNumber']);
		
		$('#viewincoming_note_id').val(selectedData['id']);
		$('#viewincoming_note_type').val(selectedData['type']);
		$('#view_incoming_note').val(selectedData['note']);
		
		if(!(selectedData['status'] == 'Done')) {
			$('#viewincoming_done_id').val(selectedData['id']);
			$('#viewincoming_done_type').val(selectedData['type']);
			$('#mark_as_done_form').show();
		}
	}
		
	/* VIEW THREAD */
	$('#viewincoming_view_thread').click(function() {
		var url = getContextPath() + '/files/thread.jsp?id=' 
			+ encodeURIComponent($('#viewincoming_threadno').val())
			+ '&origin=1';
			
		document.location.href = url;
	});

/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Incoming Documents */
	$('#search_incoming').on('input', function() {
		if(!isIncomingDocsTableEmpty) incomingDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Incoming Documents Upload From */
	$('#search_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_uploadto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isIncomingDocsTableEmpty) 
			{
				minimumDate_incoming = new Date(text + ' 00:00:00').getTime();
				incomingDocsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Incoming Documents Upload To */
	$('#search_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_uploadfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isIncomingDocsTableEmpty) 
			{
				maximumDate_incoming = new Date(text + ' 23:59:59').getTime();
				incomingDocsTable.draw();
			}
		}) 
	});
	
	/* SEARCH - Incoming Documents Category */
	$('#search_category').on('change', function() {
		if(!isIncomingDocsTableEmpty) incomingDocsTable.column(3).search( $(this).val() ).draw();
	});
		
	/* SEARCH - Incoming Documents Action Required */
	$('#search_action').on('change', function() {
		if(!isIncomingDocsTableEmpty) incomingDocsTable.column(4).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Incoming Documents Action Due */
	$('#search_action_due_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isIncomingDocsTableEmpty) 
			{
				incomingDocsTable.column(5).search( text ).draw();
			}
		}) 
	});
	
	/* SEARCH - Incoming Documents Status */
	$('#search_status').on('change', function() {
		if(!isIncomingDocsTableEmpty) incomingDocsTable.column(6).search( $(this).val() ).draw();
	});
	
	/* CLEAR SEARCH EVENT - Incoming Documents Category */
	$('#search_clear').click(() => {
		clearIncomingDocsSearch();
	});
		
	/* CLEAR SEARCH - Incoming Documents */
	function clearIncomingDocsSearch() {
		$('#search_incoming').val('');
		$('#search_uploadfrom_calendar').calendar('clear');
		$('#search_uploadto_calendar').calendar('clear');
		$('#search_category').dropdown('restore defaults');
		$('#search_action').dropdown('restore defaults');
		$('#search_action_due_calendar').calendar('clear');
		$('#search_status').dropdown('restore defaults');
	}
	
/*
 * EDIT NOTE
 */
	
	/* SUBMIT - Update Document Note */
	$('#edit_note_form').ajaxForm({
		success: function(response) {
			localIncomingDocsData[selectedRowId]['note'] = $('#view_incoming_note').val();
 			$('#note_green_message').show();
		},
		error: function(response) { 
			$('#note_orange_message').show();
		}
	});
	
	/* CLICK - Hide the Orange Message */
	$('#close_note_orange_message').on('click', function() {
		$('#note_orange_message').hide();
	});
	
	/* CLICK - Hide the Green Message */
	$('#close_note_green_message').on('click', function() {
		$('#note_green_message').hide();
	});
	
	function hideNoteMessages() {
		$('edit_note_form').form('reset');
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
	}
	
/*
 * MARK AS DONE
 */
	/* CLICK - Mark as Done: Show Confirmation */
	$('#mark_as_done_btn').click( function() {
		$('#mark_as_done_conf').show();
		$(this).prop("disabled", true);
	});
	
	/* CLICK - Mark as Done: Cancel Confirmation */
	$('#mark_as_done_no').click( function() {
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	});

	/* UPDATE - Document Row Data */
	function updateDocumentRowData(incomingDocs) {
		var rowString = '<tr id="'+selectedRowId+'">'
			+ '<td>' + incomingDocs.title + '</td>'
			+ '<td>' + incomingDocs.sourceRecipient + '</td>'
			+ '<td>' + incomingDocs.timeCreated + '</td>'
			+ '<td>' + incomingDocs.category + '</td>'
			+ '<td>' + incomingDocs.actionRequired + '</td>'
			+ '<td>' + (incomingDocs.dueOn == undefined ? "" : incomingDocs.dueOn)  + '</td>'
			+ '<td>' + incomingDocs.status + '</td>'
			+ '<td>' + incomingDocs.referenceNo + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
	/* SUBMIT - Mark Document as Done */
	$('#mark_as_done_form').ajaxForm({
		beforeSubmit: initializePageForMarkAsDone,
		success: function(response) {  
			localIncomingDocsData[selectedRowId]['status'] = "Done";
			incomingDocsTable.rows( '#' + selectedRowId ).remove();
			incomingDocsTable.row.add( $(updateDocumentRowData(localIncomingDocsData[selectedRowId]))[0] ).draw();
			// update the row (remove + update)
			deactivatePageLoading();
			callSuccessModal('Document Status Update Success', 'The incoming document has been updated to done.');
		},
		error: function(response) { 
			deactivatePageLoading();
			callFailRequestModal();
		}
	});
	
	/* ON SUBMIT - Hide Modal and Activate Loading */
	function initializePageForMarkAsDone() {
		$('#viewincoming_dialog').modal('hide');
		activatePageLoading('Updating Document Status');
		return true;
	}
	
	/* Fix Elements on Modal Hide */
	function reinitializeMarkAsDone() {
		$('#mark_as_done_form').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	}