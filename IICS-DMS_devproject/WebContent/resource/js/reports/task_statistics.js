/**
 * 
 */

/*
 * VARIABLES
 */
	var labels = ["On-time Submission", "Late Submission", "Unaccomplished Tasks"]
	
	$(document).ready( function() {
		hideAllScopeChoices();
		
		var myChart = new Chart($('#myChart'), {
		    type: 'doughnut',
		    data: {
		        labels: labels,
		        datasets: [{
		            data: [1, 1, 1],
		            backgroundColor: [
		                'rgba(119, 221, 119, 1)',
		                'rgba(255, 179, 71, 1)',
		                'rgba(255, 105, 97, 1)'
		            ]
		        }]
		    },
		    options: {
		    	title: {
		    		display: true,
		    		text: 'Task Compliance'
		    	}
		    } 
		});
	});
	
/*
 * QUERY INPUT CONDITIONS
 */
	/* SHOW - Either Department Selection or User Selection */
	$('#view_scope').on('change', function() {
		hideAllScopeChoices();
		
		var tempData = $('#view_scope').dropdown('get value');
		
		if (tempData == 'Staff') {
			$('#user_selection').show();
		}
		else if (tempData == 'Faculty') {
			$('#user_selection').show();
		}
		else if (tempData == 'Department') {
			$('#department_selection').show();
		}
	});
	
	/* HIDE - Department Selection and User Selection */
	function hideAllScopeChoices() {
		$('#department_selection').hide();
		$('#user_selection').hide();
	}
	
/*
 * FORM SUBMISSION
 */
	/* SUBMIT - View Statistics Form */
	$('#view_stats_form').ajaxForm({
		  beforeSubmit: isViewStatisticsFormValid,
          success: function(response) {    
        	  if(response) {
        		  
        	  }
        	  else {
        		  
        	  }        	  
          },
          error: function(response) {
        	  callFailModal('Fail to Add a New Task', 'We are unable to create a new task. Please Try Again.');
          }
	});

	/* FORM VALIDATION - View Statistics Form */
	function viewStatisticsFormValidation() {
		$('#view_stats_form').form({
		    fields: {
		    	view_academic_year: {
		          identifier: 'view_academic_year',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Please select an Academic Year'
		            }
		          ]
		        },
		        view_scope: {
		          identifier: 'view_scope',
			      rules: [
			        {
			          type   : 'empty',
			          prompt : 'Please select the scope of the statistics'
			        }
			       ]
			     },
			     department_selection: {
			    	identifier: 'department_selection',
			    	rules: [
			    		{
			    			type  : 'empty',
			    			prompt: 'Please choose a document category of the task'
			    		}
			    	]
			     },
			     user_selection: {
				    identifier: 'user_selection',
				    rules: [
				    	{
				    		type  : 'empty',
				    		prompt: 'Please enter the instructions for the task'
				    	}
				    ]
				 }
		       }
		    });
	}
	
	/* BOOLEAN VALIDATION - View Statistics Form */
	function isViewStatisticsFormValid() {
		if( $('#view_stats_form').form('is valid') ) {
			addCSSClass('#task_statistics_loading', 'active');
			return true;
		} 
		else {
			return false;
		}
	}
	