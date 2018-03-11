/**
 *  add_event.js
 */

	$(document).ready( function() {
		addEventFormValidation();
	});

/*
 * VARIABLES
 */
	var isNewlyLoadedDirectory = true;
	var today = new Date();
	
	var title, startDate, endDate;
/*
 * FUNCTIONS and EVENTS
 */

	/* OPEN MODAL - Add Event Modal */
	$('#add_event_btn').click(function() {
		$('#add_event_modal').modal({
			closable: false,
			observeChanges: true,
			centered: false,
			onShow: function() {
				initializeCalendarInputs();
				if(isNewlyLoadedDirectory) {
					getAllUsers('#event_invite');
					isNewlyLoadedDirectory = false;
				}
			}
		}).modal('show');
	});
	
	/* CHANGE EVENT - Date Input */
	$('#event_all_day_toggle').change( function() {
		toggleDateInput();
	});
	
	/* TOGGLE - Date Input */
	function toggleDateInput() {
		if( $('#event_all_day_toggle').checkbox('is checked') )  {
			$('#event_date_input').show();
			$('#event_datetime_input').hide();
		}
		else {
			$('#event_date_input').hide();
			$('#event_datetime_input').show();
		}
	}
	
	
	/* INITIALIZE - Calendar Inputs */
	function initializeCalendarInputs() {
		$('#event_start_datetime_calendar').calendar({
			type: 'datetime',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()),
			endCalendar: $('#event_end_datetime_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_end_datetime_calendar').calendar({
			type: 'datetime',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()),
			startCalendar: $('#event_start_datetime_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_start_date_calendar').calendar({
			type: 'date',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			endCalendar: $('#event_end_date_calendar'),
			ampm: false,
			formatter: dateFormat
		});
		
		$('#event_end_date_calendar').calendar({
			type: 'date',
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			startCalendar: $('#event_start_date_calendar'),
			ampm: false,
			formatter: dateFormat
		});
	}
	
/*
 * FORM
 */
	/* CUSTOM FORM RULE - If Needed a DATETIME Input */
	$.fn.form.settings.rules.datetimeInput = function(value) {
		if( !$('#event_all_day_toggle').checkbox('is checked') ) {
			if( !value == '' ) { return true; }
			else { return false; }
		}
		else { return true; }
	
	};
	
	/* CUSTOM FORM RULE - If Needed a DATE Input */
	$.fn.form.settings.rules.dateInput = function(value) {	
		if( $('#event_all_day_toggle').checkbox('is checked') ) {
			if( !value == '' ) { return true; }
			else { return false; }
		}
		else { return true; }

	};
	
	/* SUBMIT - Add Event */
	$('#add_event_form').ajaxForm({
		  beforeSubmit: isAddEventFormValid,
          success: function(response) {    
        	  $('#calendar').fullCalendar('addEventSource', 
        		  [
        			{
        				title: title,
        				start: startDate,
        				end: endDate
        		  	}
        		  ]
        	  );
        	  clearAddEventFields();
        	  resetAddEventButtons();
        	  callSuccessModal('Added New Task', 'A Task has successfully been created.');
      	  
          },
          error: function(response) {
        	  removeCSSClass('#add_event_form', 'error');
        	  removeCSSClass('#add_event_form', 'loading');
        	  resetAddEventButtons();
        	  callFailModal('Fail to Add a New Task', 'We are unable to create a new task. Please Try Again.');
          }
	});

	/* FORM VALIDATION - Add Event Form */
	function addEventFormValidation() {
		$('#add_event_form').form({
		    fields: {
		    	event_title: {
		          identifier: 'event_title',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please enter the event title'
		            }
		          ]
		        },
		        event_location: {
		          identifier: 'event_location',
			      rules: [
			        {
			          type   : 'empty',
			          prompt : 'Please enter the location of the event'
			        }
			       ]
			     },
			     event_start_datetime: {
			    	identifier: 'event_start_datetime',
			    	rules: [
			    		{
			    			type  : 'datetimeInput[]',
			    			prompt: 'Please enter the start date and time of the event'
			    		}
			    	]
			     },
			     event_end_datetime: {
				    identifier: 'event_end_datetime',
				    rules: [
				    	{
				    		type  : 'datetimeInput[]',
				    		prompt: 'Please enter the end date and time of the event'
				    	}
				    ]
				 },
				 event_start_date: {
				    identifier: 'event_start_date',
				    rules: [
				    	{
				    		type  : 'dateInput[]',
				    		prompt: 'Please enter the start date of the event'
				    	}
				     ]
				 },
				 event_end_date: {
				    identifier: 'event_end_date',
				    rules: [
				    	{
				    		type  : 'dateInput[]',
				    		prompt: 'Please enter the end date of the event'
				    	}
				     ]
				  },
				  event_description: {
				    identifier: 'event_description',
				    rules: [
				    	{
				    		type  : 'empty',
				    		prompt: 'Please enter a description of the event'
				    	}
				     ]
				  }
		       }
		    });
	}
	
	/* BOOLEAN VALIDATION - Add Event Form */
	function isAddEventFormValid() {
		if( $('#add_event_form').form('is valid') ) {
			 addCSSClass('#add_event_form', 'loading');
			 $('#add_event_clear').prop("disabled", "disabled");
			 $('#add_event_cancel').prop("disabled", "disabled");
			 $('#add_event_submit').prop("disabled", "disabled");
			 getEventData();
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* GET - New Event Data */
	function getEventData() {
		title = $('input[name="event_title"]').val();
		
		if( $('#event_all_day_toggle').checkbox('is checked') ) {
			startDate = $('input[name="event_start_date"]').val() + " 00:00";
			endDate = $('input[name="event_end_date"]').val() + " 23:59";
		} 
		else {
			startDate = $('input[name="event_start_datetime"]').val();
			endDate = $('input[name="event_end_datetime"]').val();
		}
		
	}
	
	/* CLEAR - Add Event Fields */
	function clearAddEventFields() {
		removeCSSClass('#add_event_form', 'error');
		removeCSSClass('#add_event_form', 'loading');
		$('#add_event_form').form('reset');
		clearCalendarInputFields();
		toggleDateInput();
		$('#event_invite').dropdown('restore defaults');
	}
	
	/* CLEAR - Calendar Input Fields */
	function clearCalendarInputFields() {
		$('#event_start_datetime_calendar').calendar('clear');
		$('#event_end_datetime_calendar').calendar('clear');
		$('#event_start_date_calendar').calendar('clear');
		$('#event_end_date_calendar').calendar('clear');
	}
	
	/* CLEAR - Reset Add Event Modal Buttons */
	function resetAddEventButtons() {
		$('#add_event_clear').prop("disabled", "");
		$('#add_event_cancel').prop("disabled", "");
		$('#add_event_submit').prop("disabled", "");
	}
	
	/* CLEAR EVENT - Add Event Clear Fields Button */
	$('#add_event_clear').click(() => {
		clearAddEventFields();
	});
	