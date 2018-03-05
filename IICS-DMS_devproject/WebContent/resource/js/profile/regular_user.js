/**
 * 
 */

/*
 * EDIT USER PROFILE
 */
	/* OPEN MODAL - Edit User Profile Modal */
	$('#edit_user_profile').click( function() {
		$('#edit_profile_dialog').modal({
			closable: false,
			autofocus: false,
			observeChanges: false
		}).modal('show');
	});