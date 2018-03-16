/**
 * 
 */

	$(document).ready( function() {
		getExternalSentMail();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isExternalSentMailTableEmpty = true;
	
	// Table References
	var externalSentMailTable;
	var selectedID;
	var localExternalSentMailData;
	
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
	
	/* GET - EXTERNAL SENT MAIL */
	function getExternalSentMail() {
		addCSSClass('#external_sent_mail_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveExternalSentMail', function(response) {
			$('#sent_mail_tablebody').empty();
			if(!response.length == 0) 
			{
				localExternalSentMailData = response;
				$.each(response, (index, sentMail) => {
					$('<tr id="'+index+'">').appendTo('#external_sent_mail_tablebody')
						.append($('<td>').text(sentMail.recipientName))
						.append($('<td>').text(sentMail.affiliation))
						.append($('<td>').text(sentMail.subject))
						.append($('<td>').text(sentMail.timeStamp))
				});
					
				// bind events and classes to the table after all data received
				externalSentMailTable = $('#external_sent_mail_table').DataTable({
					'order': [[3, 'desc']]
				});
				selectExternalSentMailRow();
				isExternalSentMailTableEmpty = false;
				removeCSSClass('#external_sent_mail_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#external_sent_mail_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any external sent mail right now."));
				removeCSSClass('#external_sent_mail_loading', 'active');
			}
		})
		.fail((response) => {
			$('#external_sent_mail_tablebody').empty();
			$('<tr>').appendTo('#external_sent_mail_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve your external sent mail. Please try refreshing the page."));
			removeCSSClass('#external_sent_mail_loading', 'active');
		});
	}

	/* SELECT ROW - External Sent Mail */
	function selectExternalSentMailRow() {
		$('#external_sent_mail_table tbody').on('dblclick', 'tr', function() {
	    	selectedID = $(this).attr('id')
    		
	    	setExternalMailData(selectedID);

	    	$('#view_mail_dialog').modal({
	    		closeable: false
	    	}).modal('show');
		});
	}
	
	function setExternalMailData(id) {
		var selectedData = localExternalSentMailData[id];

		$('#view_mail_recipient').text(selectedData.recipientName);
		$('#view_mail_affiliation').text(selectedData.affiliation);
		$('#view_mail_contact').text(selectedData.recipientContactNo);
		$('#view_mail_sender').text(selectedData.senderName);
		$('#view_mail_timestamp').text(selectedData.timeStamp);
		$('#view_mail_subject').val(selectedData.subject);
		$('#view_mail_message').val(selectedData.message);
		$('#view_attachment_type').val(selectedData.type);
		$('#view_attachment_id').val(selectedData.mailID);
		$('#view_mail_file_name').text(selectedData.fileName)
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Sent Mail */
	$('#search_mail').on('input', function() {
		if(!isExternalSentMailTableEmpty) externalSentMailTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Mail Sent From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isExternalSentMailTableEmpty) 
			{
				minimumDate_send_timestamp = new Date(text + ' 00:00:00').getTime();
				externalSentMailTable.draw();
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
			if(!isExternalSentMailTableEmpty) 
			{
				maximumDate_send_timestamp = new Date(text + ' 23:59:59').getTime();
				externalSentMailTable.draw();
			}
		}) 
	});
			
	/* CLEAR SEARCH EVENT - External Sent */
	$('#clear_search').click(() => {
		clearExternalSentMail();
	});
		
	/* CLEAR SEARCH - External Sent */
	function clearExternalSentMail() {
		$('#search_mail').val('');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
		if(!isExternalSentMailTableEmpty) externalSentMailTable.search('').draw();
	}
	