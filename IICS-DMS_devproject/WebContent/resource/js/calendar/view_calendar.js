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
			eventLimit: true,
			eventRender: function(eventObj, element) {
		      element.popup({
		        title: eventObj.title,
		        content: eventObj.description
		      });
			},
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
						description: '[' + event.location + '] ' + event.description,
						start: event.startDateTime,
						end: event.endDateTime,
						url: getContextPath() + '/calendar/vieweventdetails.jsp?id=' + encodeURIComponent(event.id)	
							+ '&origin=1'
							
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
			$('<div class="item">').appendTo('#invitation_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text('Unable to retrieve event invitations.'))
			)
			
			removeCSSClass('#invitation_list_segment', 'loading');
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
		  beforeSubmit: fillInvitationResponseForm,
          success: function(response) { 
        	  if(response == 'Accepted') {
        		  var selectedData = localEventInvitationData[selectedDataIndex];
        		  
        		  $('#calendar').fullCalendar('addEventSource', 
        			[
                		{
                			title: selectedData.title,
                			description: '[' + selectedData.location + '] ' + selectedData.description,
                			start: selectedData.startDateTime,
                			end: selectedData.endDateTime,
                			url: getContextPath() + '/calendar/vieweventdetails.jsp?id=' + encodeURIComponent(selectedData.id)
                				+ '&origin=1'
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
	
	/* BEFORE FORM SUBMIT FILL - Invitation Response Form */
	function fillInvitationResponseForm() {
		var timenow = getDateTimeFormat(); 
		$('#event_response_timestamp').val(timenow);

		addCSSClass('#event_response_form', 'loading');
		$('#event_response_close').prop("disabled", "disabled");
		return true;
	} 
		
	function getDateTimeFormat() {
		var now = new Date();
		
		var day = now.getDate() + '';
		if (day.length < 2) {
		   day = '0' + day;
		}
		var month = (now.getMonth() + 1) + '';
		if (month.length < 2) {
		   month = '0' + month;
		}
		var year = now.getFullYear();
		var hour = now.getHours() + '';
		if (hour.length < 2) {
			hour = '0' + hour;
		}
		var minute = now.getMinutes() + '';
		if (minute.length < 2) {
			minute = '0' + minute;
		}
		var seconds = now.getSeconds() + '';
		if (seconds.length < 2) {
			seconds = '0' + seconds;
		}
		
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
	}
	