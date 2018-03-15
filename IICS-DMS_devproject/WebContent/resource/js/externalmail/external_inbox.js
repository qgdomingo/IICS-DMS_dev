/**
 * 
 */

	$(document).ready( function() {
		getExternalInbox();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isExternalInboxMailTableEmpty = true;
	
	// Table References
	var externalInboxMailTable;
	var selectedID;
	
	// Local Data
	var localExternalInboxMailData;
	
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
	
	/* GET - EXTERNAL INBOX MAIL */
	function getExternalInbox() {
		addCSSClass('#external_inbox_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveExternalMail', function(response) {
			$('#external_inbox_tablebody').empty();
			if(!response.length == 0) 
			{
				localExternalInboxMailData = response;
				$.each(response, (index, mail) => {
					$('<tr id="'+index+'"class="'+setRowAsUnread(mail.status)+'">').appendTo('#external_inbox_tablebody')
						.append($('<td>').text(mail.firstName + ' ' + mail.lastName + ' (' + mail.email+ ')'))
						.append($('<td>').text(mail.affiliation))
						.append($('<td>').text(mail.subject))
						.append($('<td>').text(mail.timestamp))
				});
					
				// bind events and classes to the table after all data received
				externalInboxMailTable = $('#external_inbox_table').DataTable({
					'order': [[3, 'desc']]
				});
				selectExternalInboxRow();
				isExternalInboxMailTableEmpty = false;
				removeCSSClass('#external_inbox_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#external_inbox_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any mail from external source at the moment."));
				removeCSSClass('#external_inbox_loading', 'active');
			}
		})
		.fail((response) => {
			$('#external_inbox_tablebody').empty();
			$('<tr>').appendTo('#external_inbox_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve your external inbox. Please try refreshing the page."));
			removeCSSClass('#external_inbox_loading', 'active');
		});
	}
	
	/* SET - Row as Unread */
	function setRowAsUnread(status){
		if(status == 'Unread') {
			return 'active unread_mail'
		}
	}
	
	/* SELECT ROW - External Inbox */
	function selectExternalInboxRow() {
		$('#external_inbox_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			if(localExternalInboxMailData[selectedID].status == 'Unread') {
				setMailAsRead(selectedID);
				$(this).removeClass('active');
				$(this).removeClass('unread_mail');
			}
			
			$('#view_mail_dialog').modal({
				closable: false,
				autofocus: false,
				centered: false,
				onHidden: function() {
					$('#view_attachment_form').show();
				}
			}).modal('show');
		});
	}
	
	/* GET - Mail Data */
	function getMailData(mailID) {
		var selectedData = localExternalInboxMailData[mailID];
		
		$('#view_mail_sender').text(selectedData.firstName + ' ' + selectedData.lastName + ' (' + selectedData.email+ ')');
		$('#view_mail_contact').text(selectedData.contactNumber);
		$('#view_mail_affiliation').text(selectedData.affiliation);
		$('#view_mail_timestamp').text(selectedData.timestamp);
		
		$('#view_mail_subject').val(selectedData.subject);
		$('#view_mail_message').val(selectedData.message);
			
		if( !(selectedData.fileName == '') ) {
			$('#view_attachment_id').val(selectedData.id);
			$('#view_attachment_type').val(selectedData.type);
			$('#view_mail_file_name').text(selectedData.fileName);
		}
		else {
			$('#view_attachment_form').hide();
		}
	}
	
	/* SET as READ - External Inbox Row */
	function setMailAsRead(mailID) {
		var data = {
			id: localExternalInboxMailData[mailID].id
		}
		
		$.post(getContextPath() + '/UpdateReadExternalMail', $.param(data), function(response) {
			localExternalInboxMailData[mailID].acknowledgementStatus = 'Read';
		});
	}
	
	$('#reply_button').click(function() {
		var url = getContextPath() + '/mail/replymail.jsp?id=' 
			+ encodeURIComponent(localExternalInboxMailData[selectedID].id)
		
		document.location.href = url;
	});

/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - External Inbox */
	$('#search_mail').on('input', function() {
		if(!isExternalInboxMailTableEmpty) externalInboxMailTable.search( $(this).val() ).draw();
	});	
	
	/* SEARCH - Timestamp From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isExternalInboxMailTableEmpty) 
			{
				minimumDate_send_timestamp = new Date(text + ' 00:00:00').getTime();
				externalInboxMailTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Timestampt To */
	$('#search_sentto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_sentfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isExternalInboxMailTableEmpty) 
			{
				maximumDate_send_timestamp = new Date(text + ' 23:59:59').getTime();
				externalInboxMailTable.draw();
			}
		}) 
	});
		
	/* CLEAR SEARCH EVENT - External Inbox */
	$('#clear_search').click(() => {
		clearExternalInboxSearch();
	});
		
	/* CLEAR SEARCH - External Inbox */
	function clearExternalInboxSearch() {
		$('#search_mail').val('');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
		if(!isExternalInboxMailTableEmpty) externalInboxMailTable.search('').draw();
	}
	