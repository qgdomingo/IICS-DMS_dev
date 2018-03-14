/**
 * 
 */
	var isEventListTableEmpty = true;
	var eventListTable;
	
	var today = new Date();
	var minimumDate_event;
	var maximumDate_event;
	
	$(document).ready( function() {
		getEventsList();
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
			return filterDateRange(data, minimumDate_event, maximumDate_event);
		}
	);
	
	/* GET - Events List */
	function getEventsList() {
		addCSSClass('#event_list_loading', 'active');
		
		$.get(getContextPath() + '/RetrieveEventList', function(response) {
			if(!response.length == 0) 
			{
				$.each(response, (index, event) => {
					$('<tr id="'+event.id+'">').appendTo('#event_tablebody')		
						.append($('<td>').text(event.title))
						.append($('<td>').text(event.location))
						.append($('<td>').text(event.startDateTime))
						.append($('<td>').text(event.endDateTime))
						.append($('<td>').text(event.createdBy))
				});
				
				// bind events and classes to the table after all data received
				eventListTable = $('#event_table').DataTable({
					'order': [[2, 'desc'], [3, 'desc']] 
				});
				selectEventListRow();
				isEventListTableEmpty = false;
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#event_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("You do not have any events. Go to the Calendar page and add one."));
			}
			
			removeCSSClass('#event_list_loading', 'active');
		})
		.fail( function(response) {
			$('<tr>').appendTo('#event_tablebody')
				.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve list of your events. :("));
			removeCSSClass('#event_list_loading', 'active');
		});	
	}
	
	/* CLICK - Open Event Details */
	function selectEventListRow() {
	    $('#event_tablebody').on('dblclick', 'tr', function () {
	    	var url = getContextPath() + '/calendar/vieweventdetails.jsp?id=' 
	    		+ encodeURIComponent($(this).attr('id'))
	    		+ '&origin=2'
	    		
	    	document.location.href = url;
	    });
	}
	
/*
 * SEARCH EVENT LIST
 */
	/* SEARCH - Event */
	$('#search_event').on('input', function() {
		if(!isEventListTableEmpty) eventListTable.search( $(this).val() ).draw();
	});
	
	/* SEARCH - Start Event From */
	$('#search_datefrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_dateto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isEventListTableEmpty) 
			{
				minimumDate_event = new Date(text + ' 00:00:00').getTime();
				eventListTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Start Event To */
	$('#search_dateto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_datefrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isEventListTableEmpty) 
			{
				maximumDate_event = new Date(text + ' 23:59:59').getTime();
				eventListTable.draw();
			}
		}) 
	});
	
	/* CLEAR SEARCH */
	$('#search_clear').click( function() {
		$('#search_event').val('');
		$('#search_datefrom_calendar').calendar('clear');
		$('#search_dateto_calendar').calendar('clear');
		if(!isEventListTableEmpty) eventListTable.search('').draw();
	});