/**
 * 
 */
	
	var notificationCount;

	$(document).ready( function() {
		getNotifications();
		
		$('#mark_all_as_read_btn').hide();
	});
	
	$('#notification_button').click( function() {
		$('#notification_dialog').modal({
			observeChanges: true,
			allowMultiple: true,
			centered: false,
			autofocus: false
		}).modal('show')
	});
	
	function getNotifications() {
		
		$.get(getContextPath() + '/RetrieveNotifications', function(response) {
			notificationCount = response.length;
			
			$('#notification_count').text(response.length);
			$('#notification_list').empty();
			
			if(!response.length == 0) {
				$.each(response, (index, notifData) => {
					mapNotification(index, notifData);
				});
				bindReadNotifEvent();
				$('#mark_all_as_read_btn').show();
			}
			else {
				$('<div class="item">').appendTo('#notification_list')
					.append($('<div class="content">')
						.append($('<div class="description">')
							.append('No New Notifications')
						)
					)
			}
		})
		.fail( function(response) {
			$('#notification_count').text('0');
			$('#notification_list').empty();
			$('<div class="item">').appendTo('#notification_list')
			.append($('<div class="content">')
				.append($('<div class="description">')
					.append('Unable to Retrieve Notifications')
				)
			)
		});
		
	}
	
	function mapNotification(index, notifData) {
		$('<div class="item" id="notif_row'+index+'">').appendTo('#notification_list')
			.append($('<div class="right floated content">')
				.append($('<button class="ui blue circular icon button notif_read" id="'+index+'" data_id="'+notifData.id+'">') 
					.append('<i class="check circle outline icon"></i>')
				)
			)
			.append('<i class="large bullhorn middle aligned icon"></i>')
			.append($('<div class="content">')
				.append('<a class="header" href="'+getNotificationLink(notifData.page)+'">'+notifData.page+'</a>') 
				.append($('<div class="description">')
					.append(notifData.description)
				)
				.append($('<div class="description">')
					.append(notifData.timestamp)
				)
			)		
	}
	
	function getNotificationLink(page) {
		var returnPageLink = '';
		
		switch(page) {
			case 'Incoming Documents Page':
				returnPageLink = getContextPath() + '/files/incomingdocs.jsp';
				break;
			case 'Outgoing Documents Page':
				returnPageLink = getContextPath() + '/files/outgoingdocs.jsp';
				break;
			case 'Task Page':
				returnPageLink = getContextPath() + '/task/viewtasks.jsp';
				break;
			case 'Mail Page':
				returnPageLink = getContextPath() + '/mail/inbox.jsp';
				break;
			case 'Request Mail Page':
				returnPageLink = getContextPath() + '/mail/requests.jsp';
				break;
			case 'Calendar Page':
				returnPageLink = getContextPath() + '/calendar/viewcalendar.jsp';
				break;
			case 'External Mail Page':
				returnPageLink = getContextPath() + '/mail/externalinbox.jsp';
				break;
		}
		
		return returnPageLink;
	}
	
	$('#mark_all_as_read_btn').click(function() {
		$('#notification_list').empty();
		$('<div class="item">').appendTo('#notification_list')
		.append($('<div class="content">')
			.append($('<div class="description">')
				.append('Clearing Notifications...')
			)
		)
		
		$.post(getContextPath() + '/UpdateReadAllNotifications', function(response) {
			$('#notification_list').empty();
			$('<div class="item">').appendTo('#notification_list')
			.append($('<div class="content">')
				.append($('<div class="description">')
					.append('No New Notifications')
				)
			)
			$('#mark_all_as_read_btn').hide();
			$('#notification_count').text('0');
		})
		.fail( function(response) {
			$('#notification_list').empty();
			$('<div class="item">').appendTo('#notification_list')
			.append($('<div class="content">')
				.append($('<div class="description">')
					.append('Unable to Clear Notifications')
				)
			)
			$('#notification_count').text('0');
		});
	});
	
	function bindReadNotifEvent() {
		$('button.notif_read').click( function() {
			notificationCount = notificationCount - 1;
			$('#notification_count').text(notificationCount);
			
			$('#notif_row'+$(this).attr('id')).remove();
			
			var data = {
				id: $(this).attr('data_id')
			}
			
			$.post(getContextPath() + '/UpdateNotificationStatus', $.param(data));
		});
	}