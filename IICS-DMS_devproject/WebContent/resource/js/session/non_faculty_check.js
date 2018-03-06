/**
 * 
 */

	$(document).ready( function() {
	
		$.get(getContextPath() + '/checknonfacultysession', function(response) {
			if(response == 'authorized') {
				console.log('authorized');
			} else if (response == 'faculty') {
				window.location.href = getContextPath() + '/home.jsp';
			} else if (response == 'admin') {
				window.location.href = getContextPath() + '/admin/manageusers.jsp';
			} else if (response == 'not logged in') {
				window.location.href = getContextPath() + '/index.jsp';
			}
		})
		.fail( function(response) {
			window.location.href = getContextPath() + '/index.jsp';
		});
		
	});
	