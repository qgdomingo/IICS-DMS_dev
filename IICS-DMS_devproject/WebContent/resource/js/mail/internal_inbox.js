/**
 * 
 */

	$(document).ready( function() {
		getInbox();
		hideAcknowledgementMessages();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isInboxMailTableEmpty = true;
	
	// Table References
	var inboxMailTable;
	var selectedID;
	
	// Local Data
	var localInboxMailData;
	
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
	
	/* GET - INBOX MAIL */
	function getInbox() {
		addCSSClass('#inbox_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveInbox', function(response) {
			$('#inbox_tablebody').empty();
			if(!response.length == 0) 
			{
				localInboxMailData = response;
				$.each(response, (index, inboxMail) => {
					$('<tr id="'+index+'" class="'+setRowAsUnread(inboxMail.acknowledgementStatus)+'">').appendTo('#inbox_tablebody')
						.append($('<td>').text(inboxMail.senderName + ' (' + inboxMail.senderEmail+ ')'))
						.append($('<td>').text(inboxMail.subject))
						.append($('<td>').text(inboxMail.type))
						.append($('<td>').text(inboxMail.isoNumber))
						.append($('<td>').text(inboxMail.dateCreated))
				});
					
				// bind events and classes to the table after all data received
				inboxMailTable = $('#inbox_table').DataTable({
					'order': [[4, 'desc']]
				});
				selectInboxRow();
				isInboxMailTableEmpty = false;
				removeCSSClass('#inbox_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#inbox_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("You do not have any mail right now."));
				removeCSSClass('#inbox_loading', 'active');
			}
		})
		.fail((response) => {
			$('#inbox_tablebody').empty();
			$('<tr>').appendTo('#incoming_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve your inbox. Please try refreshing the page."));
			removeCSSClass('#inbox_loading', 'active');
		});
	}
	
	/* SET - Row as Unread */
	function setRowAsUnread(status){
		if(status == 'Unread') {
			return 'positive'
		}
	}
	
	/* SELECT ROW - Inbox */
	function selectInboxRow() {
		$('#inbox_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			if(localInboxMailData[selectedID].acknowledgementStatus == 'Unread') {
				setMailAsRead(selectedID);
				$(this).removeClass('positive');
			}
			
			$('#view_mail_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false,
				onShow: function() {
					$('#confirmation_checkbox').checkbox('uncheck');
				},
				onHidden: function() {
					removeCSSClass('#acknowledge_form', 'error')
					$('#acknowledge_form').form('reset');
					$('#view_mail_acknowledgement_remarks').text('');
					hideAcknowledgementMessages();
				}
			}).modal('show');
			
		});
	}
	
	/* GET - Mail Data */
	function getMailData(mailID) {
		var selectedData = localInboxMailData[mailID];
		
		$('#view_mail_sender').text(selectedData.senderName + '(' + selectedData.senderEmail + ')');
		$('#view_mail_subject').text(selectedData.subject);
		$('#view_mail_type').text(selectedData.type);
		$('#view_mail_iso_number').text(selectedData.isoNumber);
		$('#view_mail_timestamp').text(selectedData.dateCreated);
		$('#view_mail_id').val(selectedData.id);
		
		if( selectedData.acknowledgementStatus == 'Acknowledged' ) {
			$('#acknowledge_form').hide();
			$('#acknowledgement_info').show();
			$('#view_mail_acknowledgment_status').text(selectedData.acknowledgementStatus);
			$('#view_mail_acknowledgement_timestamp').text(selectedData.acknowledgementTimestamp);
			$('#view_mail_acknowledgement_remarks').text(selectedData.acknowledgementRemarks);
		}
		else {
			$('#acknowledge_form').show();
			$('#acknowledgement_info').hide();
			
			$('#acknowledge_mail_id').val(selectedData.id);
		}
	}
	
	/* SET as READ - Inbox Row */
	function setMailAsRead(mailID) {
		var data = {
			id: localInboxMailData[mailID].id
		}
		
		$.post(getContextPath() + '/UpdateReadTimeStamp', $.param(data), function(response) {
			localInboxMailData[mailID].acknowledgementStatus = 'Read';
		});
	}
	
	$('#acknowledge_form').ajaxForm({
		beforeSubmit: isAcknowledgeFormValid,
		success: function(response) {
			localInboxMailData[selectedID].acknowledgementStatus = 'Acknowledged';
			localInboxMailData[selectedID].acknowledgementTimestamp = response + '';
			localInboxMailData[selectedID].acknowledgementRemarks = $('#acknowledge_remarks').val();
			$('#ack_green_message').show();
			$('#acknowledge_form').hide();
			$('#view_mail_acknowledgment_status').text(localInboxMailData[selectedID].acknowledgementStatus);
			$('#view_mail_acknowledgement_timestamp').text(localInboxMailData[selectedID].acknowledgementTimestamp);
			$('#view_mail_acknowledgement_remarks').text(localInboxMailData[selectedID].acknowledgementRemarks);
			$('#acknowledgement_info').show();
		},
		error: function(response) { 
			$('#ack_orange_message').show();
		}
	});
	
	$('#acknowledge_form').form({
		fields: {
			confirmation: {
				identifier: 'confirmation',
				rules: [
					{
						type   : 'checked',
						prompt : 'Please check the box if you agree that you have understood and acknowledged the mail'
					}
				]
			},
		}
	})
	
	function isAcknowledgeFormValid() {
		if( $('#acknowledge_form').form('is valid') ) {
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* HIDE - Acknowledgement Messages */
	function hideAcknowledgementMessages() {
		$('#ack_orange_message').hide();
		$('#ack_green_message').hide();
	}
	
	/* CLICK - Hide the Orange Message */
	$('#close_ack_orange_message').on('click', function() {
		$('#ack_orange_message').hide();
	});
	
	/* CLICK - Hide the Green Message */
	$('#close_ack_green_message').on('click', function() {
		$('#ack_green_message').hide();
	});
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Inbox */
	$('#search_mail').on('input', function() {
		if(!isInboxMailTableEmpty) inboxMailTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Inbox */
	$('#search_type').on('change', function() {
		if(!isInboxMailTableEmpty) inboxMailTable.column(2).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Mail Sent From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isInboxMailTableEmpty) 
			{
				minimumDate_send_timestamp = new Date(text + ' 00:00:00').getTime();
				inboxMailTable.draw();
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
			if(!isInboxMailTableEmpty) 
			{
				maximumDate_send_timestamp = new Date(text + ' 23:59:59').getTime();
				inboxMailTable.draw();
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
	