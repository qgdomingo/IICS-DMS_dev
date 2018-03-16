/**
 * 
 */

	$(document).ready( function() {
		getRequestMail();
		
		if( ! ($('#user_type').val() == 'Faculty') ) {
			getListOfUsers('#view_mail_recipient');
			getExternalTo('#view_mail_external_recipient');
		}
		
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
	var internalToList = [];
	var externalToList = [];
	
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
					clearRequestorForm();
					removeCSSClass('#requestor_form', 'success');
					removeCSSClass('#requestor_form', 'error');
					$('#view_mail_close').attr("disabled", false);
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
		
		if( ! ($('#user_type').val() == 'Faculty') ) {
			setInternalToList(selectedData.recipient);
			setExternalToList(selectedData.externalRecipient);
		}
		
		$('#view_mail_type_form').val(selectedData.type);
		$('#view_mail_id_form').val(selectedData.id);
		
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
		
		$('#view_mail_note').val(selectedData.note);
		
		if(selectedData.status == 'Pending') {
			$('#submit_edit').show();
			$('#submit_download').hide();
			
			if( !($('#user_type').val() == 'Faculty') )  $('#submit_send').hide();
		}
		else if(selectedData.status = 'Approved') {
			$('#submit_edit').hide();
			$('#submit_download').show();
			
			if( !($('#user_type').val() == 'Faculty') )  $('#submit_send').show();
		}
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
 * FORM SUBMISSION
 */
	/* SUBMIT - Requestor Form */
	$('#requestor_form').ajaxForm({
		beforeSubmit: isRequestorFormValid,
		success: function(response) {  
			$('#view_mail_close').attr("disabled", false);
			removeCSSClass('#requestor_form','loading');
			
			if(response == 'success edit') {
				addCSSClass('#requestor_form','success');
			}
			else if (response == 'invalid send mail') {
				callFailModal('Unable to Send Letter','Please add at least one recipient on the "TO" field on the Mail Recipients section');
			}
			else {
				clearRequestorForm();
				requestMailTable.row('#'+selectedID).remove().draw();
				callSuccessModal('Mail Processed Successfully ','Your mail has been processed without errors.');
			}

		},
		error: function(response) {
			callFailModal('Unable to Forward Mail','An error has occured while processing your mail, please try again.');
			removeCSSClass('#requestor_form','loading');
		}
	});

	/* CUSTOM FORM RULE - If Needed a Second Addressee Line */
	$.fn.form.settings.rules.letterLine2 = function(value) {
		var type = $('#view_mail_type_form').val();
		
		if( (type == 'Letter' && !(value == ''))  || 
		    (!(type == 'Letter')) ) {
			return true;
		}
		else {
			return false;
		}
	};
	
	/* CUSTOM FORM RULE - If Needed a Second Addressee Line */
	$.fn.form.settings.rules.fromField = function(value) {
		var type = $('#view_mail_type_form').val();
		
		if( (!(type == 'Letter') && !(value == ''))  || 
		    ((type == 'Letter')) ) {
			return true;
		}
		else {
			return false;
		}
	};
	
	/* FORM VALIDATION - Requestor Form */
	$('#requestor_form').form({
		fields: {
			addressee_line1: {
				identifier: 'addressee_line1',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please an addressee of the mail'
					}
				]
			},
			addressee_line2: {
				identifier: 'addressee_line2',
				rules: [
					{
						type   : 'letterLine2[]',
						prompt : 'Please enter at least the second line header of the addressee. (e.g. Affiliation of the Addressee)'
					}
				]
			},
			from: {
				identifier: 'from',
				rules: [
					{
						type   : 'fromField[]',
						prompt : 'Please enter office from whom the mail is'
					}
				]
			},
			subject: {
				identifier: 'subject',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a subject of the letter'
					}
				]
			},
			message: {
				identifier: 'message',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the letter content'
					}
				]
			},
			closing_line: {
				identifier: 'closing_line',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter a complimentary closing line of the letter. (e.g. Sincrely Yours, )'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Requestor Form */
	function isRequestorFormValid() {
		if( $('#requestor_form').form('is valid') ) {
			$('#view_mail_close').attr("disabled", true);
			addCSSClass('#requestor_form','loading');
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Requestor Form */
	function clearRequestorForm() {
		removeCSSClass('#requestor_form', 'error');		
	  	$('#requestor_form').form('reset');
	  	if( ! ($('#user_type').val() == 'Faculty') ) {
			$('#view_mail_recipient').dropdown('restore defaults');
		  	$('#view_mail_external_recipient').dropdown('restore defaults');
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
			
	$('#search_status').on('change', function() {
		if(!isRequestMailTableEmpty) requestMailTable.column(3).search( $(this).val() ).draw();
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
		$('#search_status').dropdown('restore defaults');
		if(!isRequestMailTableEmpty) requestMailTable.search('').draw();
	}
	