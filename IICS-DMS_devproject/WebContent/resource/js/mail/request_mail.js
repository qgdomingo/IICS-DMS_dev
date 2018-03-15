/**
 * 
 */

	$(document).ready( function() {
		getRequestMail();
		
		getListOfUsers('#view_mail_recipient');
		getExternalTo('#view_mail_external_recipient');
		
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
	
	/* GET - REQUEST MAIL */
	function getRequestMail() {
		addCSSClass('#request_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveRequestMail', function(response) {
			$('#request_tablebody').empty();
			
			if(!response.length == 0) 
			{
				localRequestMailData = response;
				$.each(response, (index, requestMail) => {
					$('<tr id="'+index+'">').appendTo('#request_tablebody')
						.append($('<td>').text(requestMail.senderName + ' (' + requestMail.sentBy+ ')'))
						.append($('<td>').text(requestMail.type))
						.append($('<td>').text(requestMail.subject))
						.append($('<td>').text(requestMail.dateCreated))
				});
					
				// bind events and classes to the table after all data received
				requestMailTable = $('#request_table').DataTable({
					'order': [[3, 'desc']]
				});
				selectRequestMailRow();
				isRequestMailTableEmpty = false;
				removeCSSClass('#request_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#request_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("You do not have any request mail right now."));
				removeCSSClass('#request_loading', 'active');
			}
		})
		.fail( function(response) {
			$('#request_tablebody').empty();
			$('<tr>').appendTo('#request_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve your request mail. Please try refreshing the page."));
			removeCSSClass('#request_loading', 'active');
		});
	}
		
	/* SELECT ROW - Request Mail */
	function selectRequestMailRow() {
		$('#request_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			$('#view_mail_dialog').modal({
				observeChanges: true,
				autofocus: false,
				onHidden: function() {
					hideNoteMessages();
					reinitializeMarkAsDone();
				}
			}).modal('show');
			
		});
	}
	
	/* GET - Mail Data */
	function getMailData(mailID) {
		var selectedData = localRequestMailData[mailID];
		var mailType = selectedData.type;

		$('#view_mail_type').text(selectedData.type);
		$('#view_mail_timestamp').text(selectedData.dateCreated);
		$('#view_mail_sender').text(selectedData.senderName + ' (' + selectedData.sentBy + ')');
		$('#view_mail_status').text(selectedData.status);
		
		setInternalToList(selectedData.recipient);
		setExternalToList(selectedData.externalRecipient);
		
		$('#view_mail_size_select').dropdown('set selected', selectedData.paperSize);
		$('#view_mail_addressee').val(selectedData.addressLine1);
		
		if(mailType == 'Letter') {
			$('#view_mail_line2_field').show();
			$('#view_mail_line3_field').show();
			
			$('#view_mail_line2').val(selectedData.addressLine2);
			$('#view_mail_line3').val(selectedData.addressLine3);
			
			$('#view_mail_from_field').hide();
		} 
		else if(mailType == 'Memo' || mailType == 'Notice Of Meeting') {
			$('#view_mail_line2_field').hide();
			$('#view_mail_line3_field').hide();
			
			$('#view_mail_from_field').show();
			$('#view_mail_from').val(selectedData.addressLine2)
		}
		
		$('#view_mail_subject').val(selectedData.subject);
		$('#view_mail_message').val(selectedData.message);
		$('#view_mail_closingremark').val(selectedData.closingRemark);
		
		$('#view_mail_note_id').val(selectedData.id);
		$('#view_mail_note').val(selectedData.note);
		$('#view_mail_done_id').val(selectedData.id);
	}
	
	function setInternalToList(recipient) {
		var arrayRecipient = recipient.split(",");
		$('#view_mail_recipient').dropdown('set selected', arrayRecipient);
	}
	
	function setExternalToList(externalRecipient) {
		var arrayExternalRecipient = externalRecipient.split(",");
		$('#view_mail_external_recipient').dropdown('set selected', arrayExternalRecipient);
	}
	
/*
 * EDIT NOTE
 */
	
	/* SUBMIT - Update Mail Note */
	$('#edit_note_form').ajaxForm({
		success: function(response) {
			localRequestMailData[selectedID]['note'] = $('#view_mail_note').val();
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
	
	/* SUBMIT - Mark Document as Done */
	$('#mark_as_done_form').ajaxForm({
		beforeSubmit: initializePageForMarkAsDone,
		success: function(response) {  
			callSuccessModal('Mail Approval Success', 'This mail has been approved. ');
			deactivatePageLoading();
			requestMailTable.row('#'+selectedID).remove().draw();
		},
		error: function(response) { 
			deactivatePageLoading();
			callFailModal('Mail Approval Failed', 'The request has resulted into an error. Please try again.');
		}
	});
	
	/* ON SUBMIT - Hide Modal and Activate Loading */
	function initializePageForMarkAsDone() {
		$('#view_mail_dialog').modal('hide');
		activatePageLoading('Updating Mail Status');
		return true;
	}
	
	/* Fix Elements on Modal Hide */
	function reinitializeMarkAsDone() {
		$('#mark_as_done_form').show();
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
		if(!isRequestMailTableEmpty) requestMailTable.search('').draw();
	}
	