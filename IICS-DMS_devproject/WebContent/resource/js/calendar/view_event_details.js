/*
 * VARIABLES
 */
	var eventID;
	var originId;
	var localEventData;
	
	var localInvitedUsers = [];
	var localInvitedUsersData;
	var invitedUsersTable;
	var isInvitedUsersTableEmpty = true;
	
	var NewResponseData;
	
	var localResponseData;
	var tempSelectedResponseID;
	var tempResponseStatus;
	var today = new Date();
	
	var userEmail = $('#account_email').val();
	
/*
 * DOCUMENT ON READY FUNCTION
 */
	$(document).ready(() => {
		hideTableAndButtons();
		
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    eventID = decodeURIComponent(data.id);
	    originId = data.origin;

	    setBackButton(originId);
	    retrieveEventDetails(eventID);
	    
	    // Populate Edit Event Form
		getAllUsers('#edit_event_invite');
	});
	
/*
 * FUNCTIONS FOR PAGE INITIALIZATION
 */
	function setBackButton(originId) {
		if(originId == '1') {
			$('#page_origin').attr('href', getContextPath() + '/calendar/viewcalendar.jsp');
		}
		else if(originId == '2') {
			$('#page_origin').attr('href', getContextPath() + '/calendar/vieweventlist.jsp');
		}
	}
	
	/* HIDE - Table and Buttons */
	function hideTableAndButtons() {
		$('#owner_event_buttons').hide();
		$('#owner_invited_users_table').hide();
		
		$('#invited_event_response').hide();
		$('#invited_event_button').hide();
	}
	
	/* GET - Event Details */
	function retrieveEventDetails(id) {
		addCSSClass('#eventdetails_loading', 'active');
		
		var data = { id: id }
		
		$.get(getContextPath() + '/RetrieveEventDetails', $.param(data), (response) => {
			if(response) {
				localEventData = response;
				var data = response[0]; 
				$('#event_title').text(data.title);
				$('#event_location').text(data.location);
				$('#event_start_datetime').text(data.startDateTime);
				$('#event_end_datetime').text(data.endDateTime);
				$('#event_createdby').text(data.createdBy);
				$('#event_description').text(data.description);	
				$('#event_display_invited_list').text( data.displayInvitedUsers ? "Visible" : "Hidden");
				$('#event_status').text(data.status);
				
				setPageData(data.displayInvitedUsers, data.status);
			}
		}).fail( (response) => {
			removeCSSClass('#eventdetails_loading', 'active');
			callFailRequestModal();
		});
	}
	
	/* SET - Page Data */
	function setPageData(displayInvitedUsersFlag, status) {
		

		if(userEmail == localEventData[0].email) {
			$('#owner_event_buttons').show();
		} 
		else {
			$('#invited_event_response').show();
			$('#invited_event_button').show();
			
			getEventResponseDetails();
		}

		if(userEmail == localEventData[0].email || displayInvitedUsersFlag) {
			$('#owner_invited_users_table').show();
			getEventInvitedUsers();
		}
		
		if(status == 'Cancelled') {
			$('#invited_event_button').hide();
			$('#owner_event_buttons').hide();
		}
	}
	
	/* GET - Event Invited Users */
	function getEventInvitedUsers() {
		var data = { id: eventID }

		$.get(getContextPath() + '/RetrieveEventInvitedList', $.param(data), (response) => {
			if(!response.length == 0)
			{
				localResponseData = response;
				
				$.each(response, (index, invitedUser) => {
					localInvitedUsers.push(invitedUser.email);
					
					$('<tr id="'+index+'">').appendTo('#invitedusers_tablebody')		
						.append($('<td>').text(invitedUser.fullName + ' ('+invitedUser.email+')'))
						.append($('<td>').text(invitedUser.status))
						.append($('<td>').text(invitedUser.dateResponse))
				});

				// bind events and classes to the table after all data received
				invitedUsersTable = $('#invitedusers_table').DataTable({
					'order': [[0, 'asc']]
				});
				
				isInvitedUsersTableEmpty = false;
				selectInvitedUsers();
				removeCSSClass('#eventdetails_loading', 'active');	
			}
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#invitedusers_tablebody')
					.append($('<td class="center-text" colspan="3">')
						.text("You did not invite anyone in this event. Click on Edit Event to invite one."));
				removeCSSClass('#eventdetails_loading', 'active');
			}
		})
		.fail( function(response) {
			$('<tr>').appendTo('#invitedusers_tablebody')
				.append($('<td class="error center-text" colspan="3">').text("Unable to retrieve invited users."));
			removeCSSClass('#eventdetails_loading', 'active');
		});
		
	}
	
	/* GET - Event Response Details */
	function getEventResponseDetails() {
		var data = { id: eventID }
		
		$.get(getContextPath() + '/RetrieveEventResponseDetails', $.param(data), (response) => {
			if(!response.length == 0) {
				$('#event_response_status').text(response[0]);
				$('#event_response_details').text(response[1]);
				$('textarea[name="event_response_text"]').val(response[1]);
				$('#event_response_timestamp').text(response[2]);
				
				$('#view_event_id').val(eventID);
				removeCSSClass('#eventdetails_loading', 'active');
			}
		})
		.fail( function(response) {
			callFailModal('Unable to Retrieve Response Details', 'We are unable to retrieve your event response details. Please try again. ');
			removeCSSClass('#eventdetails_loading', 'active');
		});
	}
	
/*
 * INVITED USERS TABLE
 */	
	function selectInvitedUsers() {
		$('#invitedusers_table tbody').on('dblclick', 'tr', function () {
			tempSelectedResponseID = $(this).attr('id');
			
			$(this).toggleClass('active');
			
			tempResponseStatus = invitedUsersTable.rows('.active').data()[0][1];
			
			if(tempResponseStatus == 'No Response') {
				openNoResponseModal();
			}
			else {
				openViewResponseModal();
			}
			
			$(this).toggleClass('active');
		});
	}
	
	function openViewResponseModal() {
		var data = localResponseData[tempSelectedResponseID];
		
		$('#view_response_user').text(data.fullName + ' ('+data.email+')');
		$('#view_response_status').text(data.status);
		$('#view_response_timestamp').text(data.dateResponse);
		$('#view_response_details').text(data.response);
		
		$('#view_response_dialog').modal({
			closable: false
		}).modal('show');
	}
	
	function openNoResponseModal() {
    	$('#noresponse_dialog').modal({
			closable: false
		}).modal('show');
	}
	
/*
 * SEARCH FUCTION
 */	
	$('#search_filter').on('input', function() {
		if(!isInvitedUsersTableEmpty) invitedUsersTable.search( $(this).val() ).draw();
	});
		
	$('#response_status_filter').on('change', function() {
		if(!isInvitedUsersTableEmpty) invitedUsersTable.column(1).search( $(this).val() ).draw();
	});
	
	$('#event_response_timestamp_calendar').calendar({
		type: 'date',
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isInvitedUsersTableEmpty) invitedUsersTable.column(2).search( text ).draw();
		}) 
	});
	
	$('#clear_filter').click(() => {
		$('#search_filter').val('');
		$('#event_response_timestamp_calendar').calendar('clear');
		$('#response_status_filter').dropdown('restore defaults');
		if(!isInvitedUsersTableEmpty) invitedUsersTable.search('').draw();
	});
		
	
/*
 * EDIT EVENT MODAL
 */
	/* OPEN MODAL - Add Event Modal */
	$('#edit_event_btn').click(function() {
		$('#edit_event_modal').modal({
			closable	   : false,
			observeChanges : true,
			centered	   : false,
			onShow: function() {
				initializeCalendarInputs();
				setEditEventModalData();
			}
		}).modal('show');
	});
	
	/* INITIALIZE - Calendar Inputs */
	function initializeCalendarInputs() {
		$('#event_start_datetime_calendar').calendar({
			type: 'datetime',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()),
			endCalendar: $('#event_end_datetime_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_end_datetime_calendar').calendar({
			type: 'datetime',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()),
			startCalendar: $('#event_start_datetime_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_start_date_calendar').calendar({
			type: 'date',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			endCalendar: $('#event_end_date_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_end_date_calendar').calendar({
			type: 'date',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			startCalendar: $('#event_start_date_calendar'),
			ampm: false,
			formatter: dateFormat
		});
	}
	
	/* SET - Edit Event Modal Data */
	function setEditEventModalData() {
		var data = localEventData[0];
	
		$('#edit_event_id').val(data.id);
		$('#edit_event_title').val(data.title);
		$('#edit_event_location').val(data.location);
		
		if(data.allDayEvent_Flag == '0') {
			$('#event_all_day_toggle').checkbox('uncheck');
			$('#edit_event_start_datetime').val(data.startDateTime);
			$('#edit_event_end_datetime').val(data.endDateTime);
		} 
		else {
			$('#event_all_day_toggle').checkbox('check');
			$('#edit_event_start_date').val(data.startDateTime.match(/^(\S+)\s(.*)/)[1]);
			$('#edit_event_end_date').val(data.endDateTime.match(/^(\S+)\s(.*)/)[1]);
		}
		showAppropriateFields();

		$('#edit_event_description').val(data.description);
		$('#edit_event_invite').dropdown('set selected', localInvitedUsers);
		
		$('#display_invited_list_toggle').checkbox( (data.displayInvitedUsers ? 'check' : 'uncheck') );
	}
	
	/* INITIALIZE - Input Field Show */
	function showAppropriateFields() {
		if( $('#event_all_day_toggle').checkbox('is checked') )  {
			$('#event_date_input').show();
			$('#event_datetime_input').hide();
		}
		else {
			$('#event_date_input').hide();
			$('#event_datetime_input').show();
		}
	}
	
/*
 * EDIT RESPONSE
 */
	/* OPEN MODAL - Edit Response Modal */
	$('#edit_response_btn').click(function() {
		$('#event_response_dialog').modal({
			closable: false,
			observeChanges: true
		}).modal('show');
	});
	
	/* SUBMIT - Invitation Response Form */
	$('#event_response_form').ajaxForm({
		  beforeSubmit: isInvitationResponseFormValid,
          success: function(response) { 
        	  if(response == 'Accepted') {
        		 callSuccessModal('Successfully Responded ACCEPTED to Event', 'Your event response has been recorded. '
        			+ 'Refreshing page in 2 seconds'); 
        		 
        		 setTimeout(function(){  window.location.reload(); }, 2000);
        	  }
        	  else {
        		 callSuccessModal('Successfully Responded DECLINED to Event', 'Your event response has been recorded. ' +
        				 'Redirecting to the EVENT LIST page'); 
        		 setTimeout(function(){  window.location.href = getContextPath() + '/calendar/vieweventlist.jsp'; }, 3000);
        	  } 
          },
          error: function(response) {
        	  callFailModal('Unable to Process Response', 'We are unable to send your invitation response. Please try again.');
          }
	});
	
	/* BOOLEAN VALIDATION - Invitation Response Form */
	function isInvitationResponseFormValid() {
		if( $('#event_response_form').form('is valid') ) {
			 addCSSClass('#event_response_form', 'loading');
			 $('#event_response_close').prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
/*
 * CANCEL EVENT 
 */
	$('#cancel_event_btn').click(function() {
		$('#cancel_event_modal').modal({
			closable: false,
			onApprove: function() {
				activatePageLoading('Cancelling Event');
				
				var data = { id: eventID }
				
				$.post(getContextPath() + '/CancelEvent', $.param(data), function(response) {
					callSuccessModal('Event Cancel Success', 'This event has been successfully cancelled. ' 
							+ 'Refreshing page in 2 seconds');
		        	setTimeout(function(){  window.location.reload(); }, 2000);
				})
				.fail( function(response) {
					deactivatePageLoading();
					callFailModal('Failed to Cancel Event', 'We are unable to process your request. Please try again.');
				});
			}
		}).modal('show');
	});
	