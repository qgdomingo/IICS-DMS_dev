/**
 * 
 */

	$(document).ready( function() {
		$('#event_date_input').hide();
	}); 
	
/*
 * FUNCTIONS and EVENTS
 */
	
	/* OPEN MODAL - Add Event Modal */
	$('#edit_event_btn').click(function() {
		$('#edit_event_modal').modal({
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