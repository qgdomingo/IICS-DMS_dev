/**
 *  view_createdtasks_details.js
 *    - javascript used to retrieve and populate data on the details of a created task
 */

/*
 * VARIABLES
 */

	var localUsersData;
	var sentToUsersTable;
	
	var tempTaskStatus;
	var selectedID;
	var mailID;
	
	var isSentToUsersTableEmpty = true;

/*
 * DOCUMENT ON READY FUNCTION
 */
	$(document).ready(() => {
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    mailID = decodeURIComponent(data.id);
	    
	    retrieveMailDetails(mailID);
	    retrieveSentToUsers(mailID);
	});
	
/*
 * FUNCTIONS
 */
	
	/* GET - Mail Details */
	function retrieveMailDetails(id) {
		var data = { id: id }
		
		$.post(getContextPath() + '/RetrieveSentMailInformation', $.param(data), (response) => {
			if(!response.length == 0) {
				var data = response[0];
				$('#view_mail_sender').text(data.senderName + ' (' + data.senderEmail + ')');
				$('#view_mail_subject').text(data.subject);
				$('#view_mail_type').text(data.type);
				$('#view_mail_acad_year').text(data.schoolYear);
				$('#view_mail_iso_number').text(data.isoNumber);
				$('#view_mail_timestamp').text(data.dateCreated);
				$('#view_mail_id').val(data.id);
			}
			else {
				callFailModal('No Mail Data Retrieved', 'No Data for this mail was found.');
			}
		}).fail( (response) => {
			callFailModal('Unable to Retrieve Mail Data', 'An error has occured on fetching mail data.' 
					+ ' Please try refreshing the page.');
		});
		
	}
	
	/* GET - Sent To Users List */
	function retrieveSentToUsers(id) {
		addCSSClass('#sent_mail_loading', 'active');	
		var data = { id: id } 
		
		$('#sent_mail_to_tablebody').empty();
		$.post(getContextPath() + '/RetrieveSentMailToUsers', $.param(data), (responseJson) => {
			if(!responseJson.length == 0)
			{
				localUsersData = responseJson;
				$.each(responseJson, (index, user) => {
					$('<tr id="'+index+'">').appendTo('#sent_mail_to_tablebody')		
						.append($('<td>').text(user.senderName))
						.append($('<td>').text(user.acknowledgementStatus))
						.append($('<td>').text(user.acknowledgementTimestamp))
				});

				// bind events and classes to the table after all data received
				sentToUsersTable = $('#sent_mail_to_table').DataTable({
					'order': [[2, 'desc']]
				});
				
				isSentToUsersTableEmpty = false;
				selectUserSentDetails();
				removeCSSClass('#sent_mail_loading', 'active');	
			}
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#sent_mail_to_tablebody')
				.append($('<td class="center-text" colspan="3">')
						.text("This mail was not sent to anyone."));
				removeCSSClass('#sent_mail_loading', 'active');
			}
		})
		.fail ((response) => {
			$('<tr>').appendTo('#sent_mail_to_tablebody')
			.append($('<td class="error center-text" colspan="3">')
					.text("Unable to retrieve users."));
			removeCSSClass('#sent_mail_loading', 'active');
		});
	}
	
	/* SELECT ROW - Sent Mail */
	function selectUserSentDetails() {
		$('#sent_mail_to_table tbody').on('dblclick', 'tr', function () {
			selectedID = $(this).attr('id');
			
			if(localUsersData[selectedID].acknowledgementStatus == 'Acknowledged') {
				setData(selectedID);
				openAcknowledgementModal();
			}
			else {
				openNoAcknowledgementModal();
			}
	    });
	}

	/* OPEN MODAL - Acknowledgement Details */
	function openAcknowledgementModal() {
		$('#acknowledgement_dialog').modal({
			closable: false,
			onHidden: function() {
				$('#view_mail_acknowledgement_remarks').text('');
			}
		}).modal('show');
	}

	function setData(id) {
		var selectedData = localUsersData[id];
		$('#view_mail_acknowledgment_status').text(selectedData.acknowledgementStatus);
		$('#view_mail_acknowledgement_timestamp').text(selectedData.acknowledgementTimestamp);
		$('#view_mail_acknowledgement_remarks').text(selectedData.acknowledgementRemarks);
	}
	
	/* OPEN MODAL - No Acknowledgement */
	function openNoAcknowledgementModal() {
    	$('#no_acknowledgement_dialog').modal({
			closable: false
		}).modal('show');
	}

/*
 * SEARCH FUCTION
 */	
	$('#search_user').on('input', function() {
		if(!isSentToUsersTableEmpty) sentToUsersTable.search( $(this).val() ).draw();
	});
		
	$('#search_status').on('change', function() {
		if(!isSentToUsersTableEmpty) sentToUsersTable.column(1).search( $(this).val() ).draw();
	});
	
	$('#search_acknowledge_date_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isSentToUsersTableEmpty) sentToUsersTable.column(2).search( text ).draw();
		}) 
	});
	
	$('#clear_search').click(() => {
		$('#search_user').val('');
		$('#search_acknowledge_date_calendar').calendar('clear');
		$('#search_status').dropdown('restore defaults');
		if(!isSentToUsersTableEmpty) sentToUsersTable.search('').draw();
	});
	