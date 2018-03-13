/**
 * 
 */

	$(document).ready( function() {
		getExportedMail();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isExportedMailTableEmpty = true;
	
	// Table References
	var exportedMailTable;
	var selectedID;
	
	// Local Data
	var localExportedMailData;
	
	// For Search Functions
	var minimumDate_exported_timestamp;
	var maximumDate_exported_timestamp;
	
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
			return filterDateRange(data, minimumDate_exported_timestamp, maximumDate_exported_timestamp);
		}
	);
	
	/* GET - Exported Mail */
	function getExportedMail() {
		addCSSClass('#exported_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveExportedMail', function(response) {
			$('#exported_mail_tablebody').empty();
			if(!response.length == 0) 
			{
				localExportedMailData = response;
				$.each(response, (index, exportedMail) => {
					$('<tr id="'+index+'">').appendTo('#exported_mail_tablebody')
						.append($('<td>').text(exportedMail.subject))
						.append($('<td>').text(exportedMail.type))
						.append($('<td>').text(exportedMail.isoNumber))
						.append($('<td>').text(exportedMail.dateCreated))
				});
					
				// bind events and classes to the table after all data received
				exportedMailTable = $('#exported_mail_table').DataTable({
					'order': [[3, 'desc']]
				});
				selectExportedMailRow();
				isExportedMailTableEmpty = false;
				removeCSSClass('#exported_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#exported_mail_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any exported mail right now."));
				removeCSSClass('#exported_loading', 'active');
			}
		})
		.fail((response) => {
			$('#exported_mail_tablebody').empty();
			$('<tr>').appendTo('#exported_mail_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve your exported mail. Please try refreshing the page."));
			removeCSSClass('#exported_loading', 'active');
		});
	}
	
	/* SELECT ROW - Exported Mail */
	function selectExportedMailRow() {
		$('#exported_mail_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			$('#view_mail_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false
			}).modal('show');
			
		});
	}
	
	/* GET - Mail Data */
	function getMailData(mailID) {
		var selectedData = localExportedMailData[mailID];
		
		$('#view_mail_createdby').text(selectedData.senderName + '(' + selectedData.senderEmail + ')');
		$('#view_mail_subject').text(selectedData.subject);
		$('#view_mail_type').text(selectedData.type);
		$('#view_mail_iso_number').text(selectedData.isoNumber);
		$('#view_mail_timestamp').text(selectedData.dateCreated);
		$('#view_mail_id').val(selectedData.id);
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Exported Mail */
	$('#search_mail').on('input', function() {
		if(!isExportedMailTableEmpty) exportedMailTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Exported Mail */
	$('#search_type').on('change', function() {
		if(!isExportedMailTableEmpty) exportedMailTable.column(1).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Mail Exported From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isExportedMailTableEmpty) 
			{
				minimumDate_exported_timestamp = new Date(text + ' 00:00:00').getTime();
				exportedMailTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Mail Exported To */
	$('#search_sentto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_sentfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isExportedMailTableEmpty) 
			{
				maximumDate_exported_timestamp = new Date(text + ' 23:59:59').getTime();
				exportedMailTable.draw();
			}
		}) 
	});	
	
	/* CLEAR SEARCH EVENT - Exported Mail */
	$('#clear_search').click(() => {
		clearExportedMailSearch();
	});
		
	/* CLEAR SEARCH - Exported Mail */
	function clearExportedMailSearch() {
		$('#search_mail').val('');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
		$('#search_type').dropdown('restore defaults');
	}
	