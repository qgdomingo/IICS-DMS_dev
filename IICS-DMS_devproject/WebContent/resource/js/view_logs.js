/**
 * 
 */
	$(document).ready(() => {
		getLogs();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isLogsTableEmpty = true;
	
	// Table References
	var logsTable;
	
	// For Search Functions
	var minimumDate_log;
	var maximumDate_log;

/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[0] ).getTime(); 
			
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
			return filterDateRange(data, minimumDate_log, maximumDate_log);
		}
	);
	
	/* GET - Logs */
	function getLogs() {
		addCSSClass('#logs_loading', 'active');
		$('#logs_tablebody').empty();
		$.get(getContextPath() + '/RetrieveLogs', (response) => {
			if(!response.length == 0) 
			{
				$.each(response, (index, logsData) => {
					$('<tr>').appendTo('#logs_tablebody')
						.append($('<td>').text(logsData.timestamp))
						.append($('<td>').text(logsData.logType))
						.append($('<td>').text(logsData.logInformation))
						.append($('<td>').text(logsData.user))
						.append($('<td>').text(logsData.userType))
						.append($('<td>').text(logsData.department))
				});
					
				// bind events and classes to the table after all data received
				logsTable = $('#logs_table').DataTable({
					'order': [[0, 'desc']]
				});
				isLogsTableEmpty = false;
				removeCSSClass('#logs_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#logs_tablebody')
					.append($('<td class="center-text" colspan="6">')
							.text("No Logs as of the Moment."));
				removeCSSClass('#logs_loading', 'active');
			}
		})
		.fail( function(response) {
			$('<tr>').appendTo('#logs_tablebody')
			.append($('<td class="center-text error" colspan="6">')
					.text("Unable to logs. Try refreshing the page."));
			removeCSSClass('#logs_loading', 'active');
			callFailRequestModal();
		});
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Logs */
	$('#search_log').on('input', function() {
		if(!isLogsTableEmpty) logsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Log Type */
	$('#search_log_type').on('change', function() {
		if(!isLogsTableEmpty) logsTable.column(1).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Timestamp From */
	$('#search_timestamp_from_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_timestamp_to_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isLogsTableEmpty) 
			{
				minimumDate_log = new Date(text + ' 00:00:00').getTime();
				logsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Timestamp To */
	$('#search_timestamp_to_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_timestamp_from_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isLogsTableEmpty) 
			{
				maximumDate_log = new Date(text + ' 23:59:59').getTime();
				logsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - User Type */
	$('#search_user_type').on('change', function() {
		if(!isLogsTableEmpty) logsTable.column(4).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Department */
	$('#search_department').on('change', function() {
		if(!isLogsTableEmpty) logsTable.column(6).search( $(this).val() ).draw();
	});
	
	/* CLEAR - Logs Search */
	$('#clear_search').click(() => {
		clearLogsSearch();
	});
		
	/* CLEAR SEARCH - Logs */
	function clearLogsSearch() {
		$('#search_log').val('');
		$('#search_log_type').dropdown('restore defaults');
		$('#search_timestamp_from_calendar').calendar('clear');
		$('#search_timestamp_to_calendar').calendar('clear');
		$('#search_user_type').dropdown('restore defaults');
		$('#search_department').dropdown('restore defaults');
	}