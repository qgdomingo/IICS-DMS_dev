/**
 *  view_outgoing_documents.js
 *    - javascript used for scripting in viewing outgoing documents on outgoingdocs.jsp
 */

	$(document).ready(() => {
		getOutgoingDocuments();
		retrieveCategory('#search_category');	
	});

/*
 *  VARIABLES
 */
	// For checking
	var isOutgoingDocsTableEmpty = true;
	
	// Table References
	var outgoingDocsTable;
	
	// Local Data
	var localOutgoingDocsData;
	
	// For Search Functions
	var minimumDate_outgoing;
	var maximumDate_outgoing;

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
			return filterDateRange(data, minimumDate_outgoing, maximumDate_outgoing);
		}
	);
	
	/* GET - Outgoing Documents */
	function getOutgoingDocuments() {
		addCSSClass('#outgoing_loading', 'active');
			
		$.get(getContextPath() + '/OutgoingDocument', (responseJson) => {
			$('#outgoing_tablebody').empty();
			if(!responseJson.length == 0) 
			{
				localOutgoingDocsData = responseJson;
				$.each(responseJson, (index, outgoingDocs) => {
					$('<tr id="'+index+'">').appendTo('#outgoing_tablebody')
						.append($('<td>').text(outgoingDocs.title))
						.append($('<td>').text(outgoingDocs.sourceRecipient))
						.append($('<td>').text(outgoingDocs.timeCreated))
						.append($('<td>').text(outgoingDocs.category))
				});
					
				// bind events and classes to the table after all data received
				outgoingDocsTable = $('#outgoing_table').DataTable({
					'order': [[2, 'asc']]
				});
				selectOutgoingDocsRow();
				isOutgoingDocsTableEmpty = false;
				removeCSSClass('#outgoing_loading', 'active');
			} 
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#outgoing_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any outgoing documents. Go to Upload Documents page to upload one."));
				removeCSSClass('#outgoing_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#outgoing_tablebody')
				.append($('<td class="center-text error" colspan="4">')
						.text("Unable to retrieve list of your outgoing documents. Please refresh page. :("));
				removeCSSClass('#outgoing_loading', 'active');
				callFailRequestModal();
				
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#outgoing_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve list of your outgoing documents. Please refresh page. :("));
			removeCSSClass('#outgoing_loading', 'active');
			callFailRequestModal();
		});
	}
		
	/* SELECT ROW - Outgoing Documents */
	function selectOutgoingDocsRow() {
		$('#outgoing_table tbody').on('dblclick', 'tr', function () {
			getOutgoingDocumentsData($(this).attr('id'));
		   	$(this).toggleClass('active');
		   	
		    $('#viewoutgoing_dialog').modal({
				closable: false,
				observeChanges: true
			}).modal('show');
		    
		    $(this).toggleClass('active');
		});
	}
		
	/* GET - Populate Dialog For View File */
	function getOutgoingDocumentsData(id) {
		var selectedData = localOutgoingDocsData[id];
		$('#viewoutgoing_title').text(selectedData['title']);
		$('#viewoutgoing_recipient').text(selectedData['sourceRecipient']);
		$('#viewoutgoing_uploadedby')
			.text(selectedData['createdBy'] + ' <' + selectedData['email'] + '>');
		$('#viewoutgoing_uploaddate').text(selectedData['timeCreated']);
		$('#viewoutgoing_category').text(selectedData['category']);
		$('#viewoutgoing_type').text(selectedData['type']);
		$('#viewoutgoing_file').text(selectedData['fileName']);
		$('#viewoutgoing_description').text(selectedData['description']);
		$('#viewoutgoing_download_id').val(parseInt(selectedData['id']));
		$('#viewoutgoing_download_type').val(selectedData['type']);
		$('#viewoutgoing_threadno').text(selectedData['threadNumber']);
	}
		
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Outgoing Documents */
	$('#search_outgoing').on('input', function() {
		if(!isOutgoingDocsTableEmpty) outgoingDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Outgoing Documents Upload From */
	$('#search_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_uploadto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isOutgoingDocsTableEmpty) 
			{
				minimumDate_outgoing = new Date(text + ' 00:00:00').getTime();
				outgoingDocsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Outgoing Documents Upload To */
	$('#search_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_uploadfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isOutgoingDocsTableEmpty) 
			{
				maximumDate_outgoing = new Date(text + ' 23:59:59').getTime();
				outgoingDocsTable.draw();
			}
		}) 
	});
	
	/* SEARCH - Outgoing Documents Category */
	$('#search_category').on('change', function() {
		if(!isOutgoingDocsTableEmpty) outgoingDocsTable.column(3).search( $(this).val() ).draw();
	});
		
	
	/* CLEAR SEARCH EVENT - Outgoing Documents Category */
	$('#search_clear').click(() => {
		clearOutgoingDocsSearch();
	});
		
	/* CLEAR SEARCH - Outgoing Documents */
	function clearOutgoingDocsSearch() {
		$('#search_outgoing').val('');
		$('#search_uploadfrom_calendar').calendar('clear');
		$('#search_uploadto_calendar').calendar('clear');
		$('#search_category').dropdown('restore defaults');
	}
