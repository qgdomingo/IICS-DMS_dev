/**
 * 
 */

	$(document).ready( function() {
		getRequestMail();
		
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
		$('#mark_as_done_conf').hide();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isRequestMailTableEmpty = true;
	
	// Table References
	var requestMailTable;
	var selectedID;
	
	// Local Data
	var localRequestMailData;
	
	// For Search Functions
	var minimumDate_send_timestamp;
	var maximumDate_send_timestamp;
	
/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[4] ).getTime(); 
			
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
	
	/* GET - REQUEST MAIL */
	function getRequestMail() {
		addCSSClass('#request_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveRequestMail', function(response) {
			$('#request_tablebody').empty();
			
			if(!response.length == 0) 
			{
				localRequestMailData = response;
				$.each(response, (index, requestMail) => {
					//  class="'+setRowAsUnread(inboxMail.acknowledgementStatus)+'"
					$('<tr id="'+index+'">').appendTo('#request_tablebody')
						.append($('<td>').text(requestMail.senderName + ' (' + requestMail.senderEmail+ ')'))
						.append($('<td>').text(requestMail.subject))
						.append($('<td>').text(requestMail.type))
						.append($('<td>').text(requestMail.requestStatus))
						.append($('<td>').text(requestMail.dateCreated))
				});
					
				// bind events and classes to the table after all data received
				requestMailTable = $('#request_table').DataTable({
					'order': [[4, 'desc']]
				});
				selectRequestMailRow();
				isRequestMailTableEmpty = false;
				removeCSSClass('#request_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#request_tablebody')
					.append($('<td class="center-text" colspan="5>')
							.text("You do not have any request mail right now."));
				removeCSSClass('#request_loading', 'active');
			}
		})
		.fail((response) => {
			$('#request_tablebody').empty();
			$('<tr>').appendTo('#request_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve your request mail. Please try refreshing the page."));
			removeCSSClass('#request_loading', 'active');
		});
	}
	
//	/* SET - Row as Unread */
//	function setRowAsUnread(status){
//		if(status == 'Unread') {
//			return 'positive'
//		}
//	}
	
	/* SELECT ROW - Request Mail */
	function selectRequestMailRow() {
		$('#request_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			$('#view_mail_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false
//				onShow: function() {
//					$('#confirmation_checkbox').checkbox('uncheck');
//				},
//				onHidden: function() {
//					removeCSSClass('#acknowledge_form', 'error')
//					$('#acknowledge_form').form('reset');
//					$('#view_mail_acknowledgement_remarks').text('');
//					hideAcknowledgementMessages();
//				}
			}).modal('show');
			
		});
	}
	
	/* GET - Mail Data */
	function getMailData(mailID) {
		var selectedData = localRequestMailData[mailID];
		
		console.log(selectedData);
		
		$('#view_mail_sender').text(selectedData.senderName + '(' + selectedData.senderEmail + ')');
		$('#view_mail_status').text(selectedData.requestStatus);
		$('#view_mail_type').text(selectedData.type);
		$('#view_mail_timestamp').text(selectedData.dateCreated);
		
		$('#view_mail_recipient').text(selectedData.recipient);
		$('#view_mail_external_recipient').text(selectedData.externalRecipient);
		$('#view_mail_subject').text(selectedData.subject);
		$('#view_mail_message').val(selectedData.message);
		
		$('#view_mail_note_id').val(selectedData.id);
		$('#view_mail_note').val(selectedData.note);
		$('#view_mail_done_id').val(selectedData.id);
		
	}

//	/* SET as READ - Inbox Row */
//	function setMailAsRead(mailID) {
//		var data = {
//			id: localInboxMailData[mailID].id
//		}
//		
//		$.post(getContextPath() + '/UpdateReadTimeStamp', $.param(data), function(response) {
//			localInboxMailData[mailID].acknowledgementStatus = 'Read';
//		});
//	}
	
/*
 * EDIT NOTE
 */
	
	/* SUBMIT - Update Document Note */
	$('#edit_note_form').ajaxForm({
		success: function(response) {
			localIncomingDocsData[selectedRowId]['note'] = $('#view_incoming_note').val();
 			$('#note_green_message').show();
		},
		error: function(response) { 
			$('#note_orange_message').show();
		}
	});
	
	/* CLICK - Hide the Orange Message */
	$('#close_note_orange_message').on('click', function() {
		$('#note_orange_message').hide();
	});
	
	/* CLICK - Hide the Green Message */
	$('#close_note_green_message').on('click', function() {
		$('#note_green_message').hide();
	});
	
	function hideNoteMessages() {
		$('edit_note_form').form('reset');
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
	}
	
/*
 * MARK AS DONE
 */
	/* CLICK - Mark as Done: Show Confirmation */
	$('#mark_as_done_btn').click( function() {
		$('#mark_as_done_conf').show();
		$(this).prop("disabled", true);
	});
	
	/* CLICK - Mark as Done: Cancel Confirmation */
	$('#mark_as_done_no').click( function() {
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	});

	/* UPDATE - Document Row Data */
	function updateDocumentRowData(incomingDocs) {
		var rowString = '<tr id="'+selectedRowId+'">'
			+ '<td>' + incomingDocs.title + '</td>'
			+ '<td>' + incomingDocs.sourceRecipient + '</td>'
			+ '<td>' + incomingDocs.timeCreated + '</td>'
			+ '<td>' + incomingDocs.category + '</td>'
			+ '<td>' + incomingDocs.actionRequired + '</td>'
			+ '<td>' + (incomingDocs.dueOn == undefined ? "" : incomingDocs.dueOn)  + '</td>'
			+ '<td>' + incomingDocs.status + '</td>'
			+ '<td>' + incomingDocs.referenceNo + '</td>'
		+ '</tr>';
		
		return rowString;
	}
	
	/* SUBMIT - Mark Document as Done */
	$('#mark_as_done_form').ajaxForm({
		beforeSubmit: initializePageForMarkAsDone,
		success: function(response) {  
			localIncomingDocsData[selectedRowId]['status'] = "Done";
			incomingDocsTable.rows( '#' + selectedRowId ).remove();
			incomingDocsTable.row.add( $(updateDocumentRowData(localIncomingDocsData[selectedRowId]))[0] ).draw();
			// update the row (remove + update)
			deactivatePageLoading();
			callSuccessModal('Document Status Update Success', 'The incoming document has been updated to done.');
		},
		error: function(response) { 
			deactivatePageLoading();
			callFailRequestModal();
		}
	});
	
	/* ON SUBMIT - Hide Modal and Activate Loading */
	function initializePageForMarkAsDone() {
		$('#viewincoming_dialog').modal('hide');
		activatePageLoading('Updating Document Status');
		return true;
	}
	
	/* Fix Elements on Modal Hide */
	function reinitializeMarkAsDone() {
		$('#mark_as_done_form').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Request */
	$('#search_mail').on('input', function() {
		if(!isRequestMailTableEmpty) requestMailTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Request */
	$('#search_type').on('change', function() {
		if(!isRequestMailTableEmpty) requestMailTable.column(2).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Mail Sent From */
	$('#search_sentfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_sentto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isRequestMailTableEmpty) 
			{
				minimumDate_send_timestamp = new Date(text + ' 00:00:00').getTime();
				requestMailTable.draw();
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
			if(!isRequestMailTableEmpty) 
			{
				maximumDate_send_timestamp = new Date(text + ' 23:59:59').getTime();
				requestMailTable.draw();
			}
		}) 
	});
			
	/* CLEAR SEARCH EVENT - Request */
	$('#clear_search').click(() => {
		clearRequestSearch();
	});
		
	/* CLEAR SEARCH - Request */
	function clearRequestSearch() {
		$('#search_mail').val('');
		$('#search_type').dropdown('restore defaults');
		$('#search_sentfrom_calendar').calendar('clear');
		$('#search_sentto_calendar').calendar('clear');
	}
	