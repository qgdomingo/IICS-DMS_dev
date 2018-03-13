/**
 * 
 */

	$(document).ready( function() {
		getSentMail();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isSentMailTableEmpty = true;
	
	// Table References
	var sentMailTable;
	
	// For Search Functions
	var minimumDate_send_timestamp;
	var maximumDate_send_timestamp;
	
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
			return filterDateRange(data, minimumDate_send_timestamp, maximumDate_send_timestamp);
		}
	);
	
	/* GET - SENT MAIL */
	function getSentMail() {
		addCSSClass('#sent_mail_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveSentMail', function(response) {
			$('#sent_mail_tablebody').empty();
			if(!response.length == 0) 
			{
				$.each(response, (index, sentMail) => {
					$('<tr id="'+sentMail.id+'">').appendTo('#sent_mail_tablebody')
						.append($('<td>').text(sentMail.subject))
						.append($('<td>').text(sentMail.type))
						.append($('<td>').text(sentMail.isoNumber))
						.append($('<td>').text(sentMail.dateCreated))
				});
					
				// bind events and classes to the table after all data received
				sentMailTable = $('#sent_mail_table').DataTable({
					'order': [[3, 'desc']]
				});
				selectSentMailRow();
				isSentMailTableEmpty = false;
				removeCSSClass('#sent_mail_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#sent_mail_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any sent mail right now."));
				removeCSSClass('#sent_mail_loading', 'active');
			}
		})
		.fail((response) => {
			$('#inbox_tablebody').empty();
			$('<tr>').appendTo('#sent_mail_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve your sent mail. Please try refreshing the page."));
			removeCSSClass('#sent_mail_loading', 'active');
		});
	}

	/* SELECT ROW - Sent Mail */
	function selectSentMailRow() {
		$('#sent_mail_table tbody').on('dblclick', 'tr', function() {
	    	var url = getContextPath() + '/mail/sentmaildetails.jsp?id=' 
    		+ encodeURIComponent($(this).attr('id'))
    		
    		document.location.href = url;

		});
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Sent Mail */
	$('#search_mail').on('input', function() {
		if(!isSentMailTableEmpty) sentMailTable.search( $(this).val() ).draw();
	});
	
	/* SEARCH - Sent Mail */
	$('#search_type').on('change', function() {
		if(!isSentMailTableEmpty) sentMailTable.column(2).search( $(this).val() ).draw();
	});
		
	/* SEARCH - Mail Sent From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isSentMailTableEmpty) 
			{
				minimumDate_send_timestamp = new Date(text + ' 00:00:00').getTime();
				sentMailTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Mail Sent To */
	$('#search_sentto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_sentfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isSentMailTableEmpty) 
			{
				maximumDate_send_timestamp = new Date(text + ' 23:59:59').getTime();
				sentMailTable.draw();
			}
		}) 
	});
		
	/* CLEAR SEARCH EVENT - Inbox */
	$('#clear_search').click(() => {
		clearInboxSearch();
	});
		
	/* CLEAR SEARCH - Inbox */
	function clearInboxSearch() {
		$('#search_mail').val('');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
		$('#search_type').dropdown('restore defaults');
	}
	