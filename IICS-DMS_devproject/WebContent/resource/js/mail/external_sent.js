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
	var selectedID;
	var localData;
	
	// For Search Functions
	var minimumDate_send_timestamp;
	var maximumDate_send_timestamp;
	
/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[3] ).getTime(); 
			
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
			
		$.get(getContextPath() + '/RetrieveExternalSentMail', function(response) {
			$('#sent_mail_tablebody').empty();
			if(!response.length == 0) 
			{
				localData = response;
				$.each(response, (index, sentMail) => {
					$('<tr id="'+index+'">').appendTo('#sent_mail_tablebody')
						.append($('<td>').text(sentMail.recipientName))
						.append($('<td>').text(sentMail.affiliation))
						.append($('<td>').text(sentMail.subject))
						.append($('<td>').text(sentMail.timeStamp))
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
					.append($('<td class="center-text" colspan="5">')
							.text("You do not have any sent mail right now."));
				removeCSSClass('#sent_mail_loading', 'active');
			}
		})
		.fail((response) => {
			$('#inbox_tablebody').empty();
			$('<tr>').appendTo('#sent_mail_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve your sent mail. Please try refreshing the page."));
			removeCSSClass('#sent_mail_loading', 'active');
		});
	}

	/* SELECT ROW - Sent Mail */
	function selectSentMailRow() {
		$('#sent_mail_table tbody').on('dblclick', 'tr', function() {
	    	selectedID = $(this).attr('id')
    		
	    	setData(selectedID);

	    	$('#view_mail_dialog').modal({
	    		closeable: false
	    	}).modal('show');
		});
	}
	
	function setData(id) {
		var selectedData = localData[id];

		$('#view_mail_recipient').text(selectedData.recipientName);
		$('#view_mail_affiliation').text(selectedData.affiliation);
		$('#view_mail_contact').text(selectedData.recipientContactNo);
		$('#view_mail_sender').text(selectedData.senderName);
		$('#view_mail_timestamp').text(selectedData.timeStamp);
		$('#view_mail_subject').text(selectedData.subject);
		$('#view_mail_message').text(selectedData.message);
		$('#view_attachment_type').val(selectedData.type);
		$('#view_attachment_id').val(selectedData.mailID);
		$('#view_mail_file_name').text(selectedData.fileName)
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
		
	/* SEARCH - Academic Year */
	$('#search_acad_year').on('change', function() {
		if(!isSentMailTableEmpty) sentMailTable.column(3).search( $(this).val() ).draw();
	});
	
	/* CLEAR SEARCH EVENT - Sent */
	$('#clear_search').click(() => {
		clearInboxSearch();
	});
		
	/* CLEAR SEARCH - Sent */
	function clearInboxSearch() {
		$('#search_mail').val('');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
		$('#search_type').dropdown('restore defaults');
		$('#search_acad_year').dropdown('restore defaults');
		if(!isSentMailTableEmpty) sentMailTable.search('').draw();
	}
	