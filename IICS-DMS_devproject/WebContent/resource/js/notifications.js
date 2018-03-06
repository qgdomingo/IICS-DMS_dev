/**
 * 
 */

	$('#notification_button').click( function() {
		$('#notification_dialog').modal({
			closable: false,
			observeChanges: true,
			allowMultiple: true,
			centered: false
		}).modal('show')
	});