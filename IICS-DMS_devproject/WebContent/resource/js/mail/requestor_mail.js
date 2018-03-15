/**
 * 
 */

	$(document).ready( function() {
		getRequestMail();
		
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
			
		$.get(getContextPath() + '/RetrieveRequesterMail', function(response) {
			$('#request_tablebody').empty();
			
			if(!response.length == 0) 
			{
				localRequestMailData = response;
				$.each(response, (index, requestMail) => {
					$('<tr id="'+index+'">').appendTo('#request_tablebody')
						.append($('<td>').text(requestMail.senderName + ' (' + requestMail.sentBy+ ')'))
						.append($('<td>').text(requestMail.type))
						.append($('<td>').text(requestMail.subject))
						.append($('<td>').text(requestMail.status))
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
		
	/* SELECT ROW - Request Mail */
	function selectRequestMailRow() {
		$('#request_table tbody').on('dblclick', 'tr', function() {
			selectedID = $(this).attr('id');
			getMailData(selectedID);
			
			$('#view_mail_dialog').modal({
				closable: false,
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
		console.log(selectedData);
		
		$('#view_mail_type').text(selectedData.type);
		$('#view_mail_timestamp').text(selectedData.dateCreated);
		$('#view_mail_sender').text(selectedData.senderName + ' (' + selectedData.sentBy + ')');
		$('#view_mail_status').text(selectedData.status);
		
		$('#view_mail_recipient').val(selectedData.recipient);
		$('#view_mail_external_recipient').val(selectedData.externalRecipient);
		
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
		
		$('#view_mail_note').val(selectedData.note);
		
		if(selectedData.status == 'Pending') {
			$('#submit_edit').show();
			$('#submit_send').hide();
			$('#submit_download').hide();
		}
		else if(selectedData.status = 'Approved') {
			$('#submit_edit').hide();
			$('#submit_send').show();
			$('#submit_download').show();
		}
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
	