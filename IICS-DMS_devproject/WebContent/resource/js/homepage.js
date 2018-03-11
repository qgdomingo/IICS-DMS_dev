/**
 * 
 */

	var today = new Date();
	
	$(document).ready(function() {
		setDateTodayDisplay();
		getUpcomingEvents();
		getPendingTasks();
	});
	
/*
 * FUNCTIONS
 */
	
	/* SET - Date Today */
	function setDateTodayDisplay() {
		var month = today.getMonth();
		var monthWord = '';
		var day = today.getDate() + '';
		var properDay = '';
		
		switch(month) {
			case 0: monthWord = 'January'; break;
			case 1: monthWord = 'February'; break;
			case 2: monthWord = 'March'; break;
			case 3: monthWord = 'April'; break;
			case 4: monthWord = 'May'; break;
			case 5: monthWord = 'June'; break;
			case 6: monthWord = 'July'; break;
			case 7: monthWord = 'August'; break;
			case 8: monthWord = 'September'; break;
			case 9: monthWord = 'October'; break;
			case 10: monthWord = 'November'; break;
			case 11: monthWord = 'December'; break;	
		}
		
		if (day.length < 2) {
			properDay = '0' + day;
		} 
		else {
			properDay = day
		} 
		
		$('#today_month').text(monthWord);
		$('#today_day').text(properDay);
		$('#today_year').text(today.getFullYear());
		$('#today_mobile').text(monthWord + ' ' + properDay + ', ' + today.getFullYear());
	}

	/* GET - Upcoming Events */
	function getUpcomingEvents() {
		addCSSClass('#upcoming_events_segment', 'loading');
		
		$.get(getContextPath() + '/RetrieveUpcomingEvents', function(response) {
			if(!response.length == 0) {
				$.each(response, (index, event) => {
					mapUpcomingEventList(event);
				});
				removeCSSClass('#upcoming_events_segment', 'loading');
			}
			else if(response.length == 0) {
				$('<div class="item">').appendTo('#upcoming_events_list')
				.append($('<div class="content">')
					.append($('<div class="header">').text('No Upcoming Events at the moment.'))
				)
				removeCSSClass('#upcoming_events_segment', 'loading');
			}
		})
		.fail( function(response) {
			$('<div class="item">').appendTo('#upcoming_events_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text('Unable to retrieve upcoming events.'))
			)
			
			removeCSSClass('#upcoming_events_segment', 'loading');
		});
		
	}
	
	/* HTML MAP - Upcoming Event List */
	function mapUpcomingEventList(eventData) {
		$('<div class="item">').appendTo('#upcoming_events_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text(eventData.title))
				.append($('<div class="description">').text(eventData.location))
				.append($('<div class="description">').append(
						'<b>from</b> ' + eventData.startDateTime + ' ' +
						'<b>to</b> ' + eventData.endDateTime)
						)
		)
	}
	
	/* GET - Pending Tasks */
	function getPendingTasks() {
		addCSSClass('#pending_tasks_segment', 'loading');
		
		$.get(getContextPath() + '/RetrieveTaskHomePage', function(response) {
			if(!response.length == 0) {
				$.each(response, (index, task) => {
					mapPendingTasksList(task);
				});
				removeCSSClass('#pending_tasks_segment', 'loading');
			}
			else if(response.length == 0) {
				$('<div class="item">').appendTo('#pending_tasks_list')
				.append($('<div class="content">')
					.append($('<div class="header">').text('No Pending Tasks at the Moment.'))
				)
				removeCSSClass('#pending_tasks_segment', 'loading');
			}
		})
		.fail( function(response) {
			$('<div class="item">').appendTo('#pending_tasks_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text('Unable to retrieve pending tasks.'))
			)
			
			removeCSSClass('#pending_tasks_segment', 'loading');
		});
		
	}
	
	/* HTML MAP - Pending Tasks List */
	function mapPendingTasksList(taskData) {
		$('<div class="item">').appendTo('#pending_tasks_list')
			.append($('<div class="content">')
				.append($('<div class="header">').text(taskData.title))
				.append($('<div class="description">').text(taskData.category))
				.append($('<div class="description">').append(
						'<b>due on</b> ' + taskData.deadline + ' ' +
						'<b>from</b> ' + taskData.fullName + ' (' + taskData.assignedBy + ')')
						)
		)
	}