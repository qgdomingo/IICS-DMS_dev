/**
 * 
 */

	$(document).ready(() => {
		getAllDocuments();
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
	var isAllDocsTableEmpty = true;
	
	// Table References
	var allDocsTable;
	var selectedID;
	var selectedType;
	
	// Local Data
	var localAllDocsData;
	
	// For Search Functions
	var minimumDate_upload;
	var maximumDate_upload;
	
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
		var dateData = new Date( data[4] ).getTime(); 
			
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
			return filterDateRange(data, minimumDate_upload, maximumDate_upload);
		}
	);
	
	/* GET - All Documents */
	function getAllDocuments() {
		addCSSClass('#alldocs_loading', 'active');
			
		$.get(getContextPath() + '/AllDocuments', (response) => {
			$('#alldocs_tablebody').empty();
			
			if(!response.length == 0) 
			{
				localAllDocsData = response;
				$.each(response, (index, docsData) => {
					$('<tr id="'+index+'">').appendTo('#alldocs_tablebody')
						.append($('<td>').text(getType(docsData.type)))
						.append($('<td>').text(docsData.title))
						.append($('<td>').text(docsData.category))
						.append($('<td>').text(docsData.createdBy))
						.append($('<td>').text(docsData.timeCreated))
				});
					
				// bind events and classes to the table after all data received
				allDocsTable = $('#alldocs_table').DataTable({
					'order': [[4, 'desc']]
				}); 
				selectAllDocsRow();
				isAllDocsTableEmpty = false;
				removeCSSClass('#alldocs_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#alldocs_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("There are no documents found. Go to the Upload Document page to upload one."));
				removeCSSClass('#alldocs_loading', 'active');
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#alldocs_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve list of all the documents. Try refreshing the page. :("));
			removeCSSClass('#alldocs_loading', 'active');
			callFailRequestModal();
		});
	}
		
	/* GET TYPE DISPLAY */
	function getType(type) {
		if(type == 'oFiucZA+akmNSB/GHfGpJw==') {
	   		return 'Personal';
	   	}
		else if(type == 'V2m+nDkHv8hyhX08f1QpBg==') {
			return 'Outgoing';
	   	}
	   	else if(type == 'JfkL3LhppTMte3SuOtRe/A==') {
	   		return 'Incoming';
	   	}
	}
	
	/* SELECT ROW - All Documents */
	function selectAllDocsRow() {
		$('#alldocs_table tbody').on('dblclick', 'tr', function () {
			selectedID = $(this).attr('id');
			selectedType = localAllDocsData[selectedID].type;
		   	if(selectedType == 'oFiucZA+akmNSB/GHfGpJw==') {
		   		
		   	}
		   	else if(selectedType == 'V2m+nDkHv8hyhX08f1QpBg==') {
		   		
		   	}
		   	else if(selectedType == 'JfkL3LhppTMte3SuOtRe/A==') {
		   		getIncomingDocumentsData(selectedID);
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
		   }
		});
	}
	
	/* GET - Populate Dialog For View File */
	function getIncomingDocumentsData(id) {
		var selectedData = localAllDocsData[id];
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
			+ '&origin=3';
			
		document.location.href = url;
	});

/*
 * EDIT NOTE
 */
	
	/* SUBMIT - Update Document Note */
	$('#edit_note_form').ajaxForm({
		success: function(response) {
			localAllDocsData[selectedID]['note'] = $('#view_incoming_note').val();
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

	/* SUBMIT - Mark Document as Done */
	$('#mark_as_done_form').ajaxForm({
		success: function(response) {  
			localAllDocsData[selectedID]['status'] = "Done";
			$('#mark_as_done_form').hide();
			$('#viewincoming_status').text(localAllDocsData[selectedID]['status']);
		},
		error: function(response) { 
			callFailRequestModal();
		}
	});
	
	/* Fix Elements on Modal Hide */
	function reinitializeMarkAsDone() {
		$('#mark_as_done_form').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - All Documents */
	$('#search_documents').on('input', function() {
		if(!isAllDocsTableEmpty) allDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - All Documents Type */
	$('#search_type').on('change', function() {
		if(!isAllDocsTableEmpty) allDocsTable.column(0).search( $(this).val() ).draw();
	});
	
	/* SEARCH - All Documents Upload From */
	$('#search_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_uploadto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isAllDocsTableEmpty) 
			{
				minimumDate_upload = new Date(text + ' 00:00:00').getTime();
				allDocsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - All Documents Upload To */
	$('#search_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_uploadfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isAllDocsTableEmpty) 
			{
				maximumDate_upload = new Date(text + ' 23:59:59').getTime();
				allDocsTable.draw();
			}
		}) 
	});
	
	/* SEARCH - All Documents Category */
	$('#search_category').on('change', function() {
		if(!isAllDocsTableEmpty) allDocsTable.column(2).search( $(this).val() ).draw();
	});
	
	/* CLEAR SEARCH EVENT */
	$('#search_clear').click(() => {
		clearAllDocsSearch();
	});
		
	/* CLEAR SEARCH - All Documents */
	function clearAllDocsSearch() {
		$('#search_documents').val('');
		$('#search_type').dropdown('restore defaults');
		$('#search_uploadfrom_calendar').calendar('clear');
		$('#search_uploadto_calendar').calendar('clear');
		$('#search_category').dropdown('restore defaults');
	}