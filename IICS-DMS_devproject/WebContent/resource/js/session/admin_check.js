/**
 * 
 */

	$(document).ready( function() {
	
		$.get(getContextPath() + '/checkadminsession', function(response) {
			if(response == 'authorized') {
			} else if (response == 'not admin') {
				window.location.href = getContextPath() + '/home.jsp';
			} else if (response == 'not logged in') {
				window.location.href = getContextPath() + '/index.jsp';
			}
		})
		.fail( function(response) {
			window.location.href = getContextPath() + '/index.jsp';
		});
		
	});
	