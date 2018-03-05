/**
 * 
 */

	var today = new Date();
	
	$(document).ready(function() {
		setDateTodayDisplay();
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