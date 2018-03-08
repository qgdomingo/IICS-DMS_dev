/**
 * 
 */

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
		
	}); 
	
/*
 * FUNCTIONS and EVENTS
 */
	
	/* CLICK - Navigate to Event List */ 
	$('#event_list_btn').click(function(){
		window.location.href = getContextPath() + '/calendar/vieweventlist.jsp';
	});
	
	/* OPEN MODAL - Add Event Modal */
	$('#add_event_btn').click(function() {
		$('#add_event_modal').modal({
			closable: false,
			observeChanges: true
		}).modal('show');
	});
	
	/* TOGGLE - Date Input */
	$('#event_all_day_toggle').change( function() {
		if( $('#event_all_day_toggle').checkbox('is checked') )  {
			$('#event_date_input').show();
			$('#event_datetime_input').hide();
		}
		else {
			$('#event_date_input').hide();
			$('#event_datetime_input').show();
		}
	});