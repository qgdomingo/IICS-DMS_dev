/**
 *  managetasks.js
 *   - javascript used by the viewtasks.jsp for scripting functions such as switching tables and viewing tasks
 */
	
	$(document).ready(() => {
		$('#taskscreated_segment').hide();
		retrieveCategory('#mytask_category');
		retrieveMyTasks();
		
		submitMyTask();
	});
	
/* 
 * VARIABLES
 */
	// checkers
	var isNewlyLoadedPageTC = true;
	var isNewlyLoadedPageMT = true;
	var isNewlyLoadedDirectory = true;
	var isCategoryNotEmpty = false;
	
	// local data variables
	var localMyTasksData;
	var localCreatedTasksData;
	var localCategoriesData;
	var localAssignedTasksData;
	
	// table references
	var myTasksTable;
	var createdTasksTable;
	var directoryTable;
	var assignedToTasksTable;
	
	var today = new Date();
	
/*
 *  CALENDAR INPUT INITIALIZATIONS
 */

		
	/* DATE FORMAT FOR yyyy/MM/dd HH:mm:ss */
	var datetimeFormat = {
		
		date: function (date, settings) {
			if (!date) return '';
		    var day = date.getDate() + '';
		    if (day.length < 2) {
		    	day = '0' + day;
		    }
		    var month = (date.getMonth() + 1) + '';
		    if (month.length < 2) {
		        month = '0' + month;
		    }
		    var year = date.getFullYear();
		    return year + '-' + month + '-' + day;
		    
		},
	// not yet working :(
//		time: function (date, settings, forCalendar) {
//		    var hour = date.getHours() + '';
//		    if(hour.length < 2) {
//		    	hour = '0' + hour;
//		    }
//		    var minute = date.getMinutes();
//		    if(minute.length < 2) {
//		    	minute = '0' + minute;
//		    }
//		    var seconds = date.getSeconds();
//		    if(seconds.length < 2) {
//		    	seconds = '0' + seconds;
//		    }
//		    return hour + ":" + minute + ":" + seconds;
//		}

	};

/*
 * FUNCTIONS - MY TASKS
 */
	
	
	

/*
 *  FUNCTIONS - TASK CREATED
 */
	
	
	


	
/* 
 * SWITCH TABLE EVENTS
 */

	
	/* SWTICH TABLE */
	function switchTaskTable(openTaskCreated) {
		if(openTaskCreated) {
			$('#taskscreated_segment').show();
			$('#mytasks_segment').hide();
			
			if(isNewlyLoadedPageTC) { 
				retrieveTasksCreated();
				isNewlyLoadedPageTC = false;
			}
			populateCategory('#taskscreated_category');
		}
		else {
			$('#mytasks_segment').show();
			$('#taskscreated_segment').hide();
			
			if(isNewlyLoadedPageMT) {
				retrieveMyTasks();
				isNewlyLoadedPageMT = false;
			}
			populateCategory('#mytask_category');
		}
	}