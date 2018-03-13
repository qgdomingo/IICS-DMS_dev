/**
 * 
 */

	$(document).ready( function() {
	
		$.get(getContextPath() + '/checkexistingsession', function(response) {
			if (response == 'not logged in') {
				console.log('correct page loaded');
			} else if (response == 'admin') {
				window.location.href = getContextPath() + '/admin/manageusers.jsp';
			} else if (response == 'non admin') {
				window.location.href = getContextPath() + '/home.jsp';
			}
		})
		.fail( function(response) {
			window.location.href = getContextPath() + '/index.jsp';
		});
		
	});
	