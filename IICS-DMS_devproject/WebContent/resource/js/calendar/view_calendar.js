/**
 * 
 */

/*
 * VARIABLES
 */
	var eventData = [];
	var selectedDataIndex;
	var localEventInvitationData;


	$(document).ready( function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			navLinks: true, 
			eventLimit: true
		});
		
		$('#event_date_input').hide();
		
		getCalendarData();
		getInvitationList();
	}); 
	
/*
 * FUNCTIONS and EVENTS
 */
	
	/* CLICK - Navigate to Event List */ 
	$('#event_list_btn').click(function(){
		window.location.href = getContextPath() + '/calendar/vieweventlist.jsp';
	});
	
	/* GET - Calendar Data */
	function getCalendarData() {
		activatePageLoading('Retrieving Calendar Data');
		
		$.get(getContextPath() + '/RetrieveCalendarData', function(response) {
			if(!response.length == 0) {
				$.each(response, (index, event) => {
					eventData.push({
						title: event.title,
						start: event.startDateTime,
						end: event.endDateTime
					})
				});
				
				$('#calendar').fullCalendar('addEventSource', eventData);
				
				deactivatePageLoading();
			} 
			else {
				deactivatePageLoading();
			}
		})
		.fail( function(response) {
			 deactivatePageLoading();
			 callFailModal('Unable to Retrieve Calendar Data', 'We are get your events. Please try refreshing the page.');
		});
	}
	
	/* GET - Event Invitation List */
	function getInvitationList() {
		addCSSClass('#invitation_list_segment', 'loading');
		
		$.get(getContextPath() + '/RetrieveInvitationList', function(response) {
			if(!response.length == 0) {
				localEventInvitationData = response;
				$.each(response, (index, event) => {
					mapEventInvitationList(index, event);
				});
				bindClickEventOnInvitationList();
				removeCSSClass('#invitation_list_segment', 'loading');
			}
			else if(response.length == 0) {
				$('<div class="item">').appendTo('#invitation_list')
				.append($('<div class="content">')
					.append($('<div class="header">').text('No Event Invitation List at the Moment.'))
				)
				removeCSSClass('#invitation_list_segment', 'loading');
			}
		})
		.fail( function(response) {
			removeCSSClass('#invitation_list_segment', 'loading');
			 callFailModal('Unable to Retrieve Event Invitation List', 'We are get your invitations. Please try refreshing the page.');
		});
	}
	

	/* HTML MAP - Event Invitation List */
	function mapEventInvitationList(index, eventData) {
		$('<div class="item" id="' + index + '">').appendTo('#invitation_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text(eventData.title))
				.append($('<div class="description">').text(eventData.location))
				.append($('<div class="description">').text(eventData.startDateTime + ' -- ' + eventData.endDateTime))
			)
	}
	
/*
 * EVENT INVITATION 
 */
	/* CLICK EVENT - Open Event Invitation Modal */
	function bindClickEventOnInvitationList() {
		$('#invitation_list > div[class="item"]').click(function() {
			selectedDataIndex = $(this).attr("id");
			
			setEventInvitationDetails( selectedDataIndex );
			$('#event_invitation_dialog').modal({
				closable: false,
				observeChanges: true,
				onHidden: function() {
					removeCSSClass('#event_response_form', 'loading');
					$('#event_response_close').prop("disabled", "");
					
				}
			}).modal('show');
		});
	}
	
	/* SET - Event Invitation Details */
	function setEventInvitationDetails(id) {
		var selectedData = localEventInvitationData[id];
		
		$('#view_event_id').val(selectedData.id);
		$('#view_event_title').text(selectedData.title);
		$('#view_event_location').text(selectedData.location);
		$('#view_event_start_datetime').text(selectedData.startDateTime);
		$('#view_event_end_datetime').text(selectedData.endDateTime);
		$('#view_event_invited_by').text(selectedData.createdBy);
		$('#view_event_description').text(selectedData.description);
	}
	
	/* SUBMIT - Invitation Response Form */
	$('#event_response_form').ajaxForm({
		  beforeSubmit: isInvitationResponseFormValid,
          success: function(response) { 
        	  if(response == 'Accepted') {
        		  var selectedData = localEventInvitationData[selectedDataIndex];
        		  
        		  $('#calendar').fullCalendar('addEventSource', 
        			[
                		{
                			title: selectedData.title,
                			start: selectedData.startDateTime,
                			end: selectedData.endDateTime
                		}
                	]
                  );
        	  }
        	  $('textarea[name="event_response_text"]').val('');
        	  $('div[id="'+selectedDataIndex+'"]').remove();
        	  callSuccessModal('Successfully Responded to Event', 'Your event response has been recorded.');
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
	