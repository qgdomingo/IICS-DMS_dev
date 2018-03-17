/**
 * 
 */

	$(document).ready( function() {
		editEventFormValidation();
	}); 
	
/*
 * FUNCTIONS and EVENTS
 */
	
	/* TOGGLE - Date Input */
	$('#event_all_day_toggle').change( function() {
		showAppropriateFields();
	});
	
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
	
	/* SUBMIT - Edit Event */
	$('#edit_event_form').ajaxForm({
		  beforeSubmit: isEditEventFormValid,
          success: function(response) {    
        	  callSuccessModal('Successfully Updated Event', 
        			  'The event data has been successfully updated. Refreshing page in 2 seconds.');
        	  setTimeout(function(){  window.location.reload(); }, 2000);
          },
          error: function(response) {
        	  removeCSSClass('#edit_event_form', 'error');
        	  removeCSSClass('#edit_event_form', 'loading');
        	  resetEditEventButtons();
        	  callFailModal('Failed to Update Event', 'We are unable to update the event. Please Try Again.');
          }
	});

	/* FORM VALIDATION - Edit Event Form */
	function editEventFormValidation() {
		$('#edit_event_form').form({
		    fields: {
		    	event_title: {
		          identifier: 'event_title',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please enter the event title'
		            },
					{
						type : 'maxLength[100]',
						prompt: 'Maximum of 100 characters in title'
					}
		          ]
		        },
		        event_location: {
		          identifier: 'event_location',
			      rules: [
			        {
			          type   : 'empty',
			          prompt : 'Please enter the location of the event'
			        },
					{
						type : 'maxLength[150]',
						prompt: 'Maximum of 150 characters in location'
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
				    	},
						{
							type : 'maxLength[2000]',
							prompt: 'Maximum of 2000 characters in description'
						}
				     ]
				  }
		       }
		    });
	}
	
	/* BOOLEAN VALIDATION - Edit Event Form */
	function isEditEventFormValid() {
		if( $('#edit_event_form').form('is valid') ) {
			addCSSClass('#edit_event_form', 'loading');
			$('#edit_event_cancel').prop("disabled", "disabled");
			$('#edit_event_submit').prop("disabled", "disabled");
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* CLEAR - Reset Edit Event Modal Buttons */
	function resetEditEventButtons() {
		$('#edit_event_cancel').prop("disabled", "");
		$('#edit_event_submit').prop("disabled", "");
	}
		