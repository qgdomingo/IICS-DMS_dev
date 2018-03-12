/**
 * 
 */
	
	$(document).ready( function() {
		getNotifications();
	});

	//$('#notification_count').text(15);
	$('#notification_button').click( function() {
		$('#notification_dialog').modal({
			closable: false,
			observeChanges: true,
			allowMultiple: true,
			centered: false
		}).modal('show')
	});
	
	function getNotifications() {
		
		$.get(getContextPath() + '/RetrieveNotifications', function(response) {
			$('#notification_count').text(response.length);
			if(!response.length == 0) {
				
			}
			else {
				
			}
		})
		.fail( function(response) {
			
		});
		
	}
	
	function mapNotification(notifData) {
		$('<div class="item" id="">').appendTo('#thread_area') // row reference, index for removal
			.append($('<div class="right floated content">')
				.append($('<button class="ui blue circular icon button notif_read" id="">') // bind notif id for notif as read
					.append('<i class="check circle outline icon"></i>')
				)
			)
			.append('<i class="large bullhorn middle aligned icon"></i>')
			.append($('<div class="content">')
				.append('<a class="header" href="">Semantic-Org/Semantic-UI</a>') // NOTIF LINK and NOTIF PAGE HEADER
				.append($('<div class="description">')
					// NOTIF DESCRIPTION
				)
				.append($('<div class="description">')
					// NOTIF TIMESTAMP
				)
			)		
	}
	

	function getNotificationLink(page) {
		
	}