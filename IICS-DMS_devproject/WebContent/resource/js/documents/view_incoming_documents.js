/**
 *  view_incoming_documents.js
 *    - javascript used for scripting in viewing incoming documents on incomingdocs.jsp
 */

	$(document).ready(() => {
		getIncomingDocuments();
		retrieveCategory('#search_category');	
	});

/*
 *  VARIABLES
 */
	// For checking
	var isIncomingDocsTableEmpty = true;
	
	// Table References
	var incomingDocsTable;
	
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
					'order': [[2, 'asc']]
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
			getIncomingDocumentsData($(this).attr('id'));
		   	$(this).toggleClass('active');
		   	
		    $('#viewincoming_dialog').modal({
				closable: false,
				observeChanges: true
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
		$('#viewincoming_type').text(selectedData['type']);
		$('#viewincoming_file').text(selectedData['file_name']);
		$('#viewincoming_description').text(selectedData['description']);
		$('#viewincoming_download_id').val(parseInt(selectedData['id']));
		$('#viewincoming_download_type').val(selectedData['type']);
		$('#viewincoming_threadno').text(selectedData['threadNumber']);
	}
		
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
