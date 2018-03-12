/**
 * 
 */

/*
 * VARIABLES
 */
	var labels = ["On-time Submission", "Late Submission", "Unaccomplished Tasks"]
	var taskChart;
	var viewScope;
	
	var taskTableByDepartment
	var taskTableByPerson;
	var isTaskTableByPersonEmpty = true;
	
	var byDepartmentTableInitialized = false;
	var byPersonTableInitialized = false;
	
	$(document).ready( function() {
		hideTaskTables();
		hideChartMessages();
		viewStatisticsFormValidation(); 
		
		taskChart = new Chart($('#myChart'), {
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
	
	/* HIDE - Task Tables */
	function hideTaskTables() {
		$('#no_of_tasks_title').hide();
		$('#task_department_table').hide();
		$('#task_facultystaff_filter').hide();
		$('#task_facultystaff_table').hide();
	}
	
	function hideChartMessages() {
		$('#no_statistics_msg').hide();
		$('#error_statistics_msg').hide();
	}
	
/*
 * FORM SUBMISSION
 */
	/* SUBMIT - View Statistics Form */
	$('#view_stats_form').ajaxForm({
		  beforeSubmit: isViewStatisticsFormValid,
		  resetForm: false,
		  clearForm: false,
          success: function(response) {
        	  if(viewScope == 'Department') {
        		  setTableByDepartment(response);
        	  } 
        	  else {
        		  setTableByPerson(response);
        	  }
          },
          error: function(response) {
        	  
        	if(viewScope == 'Department') {
        		$('#task_department_tablebody').empty();
        		$('<tr>').appendTo('#task_department_tablebody')
				.append($('<td class="error center-text" colspan="4">')
						.text("Unable to Retrieve Task Statistics Data."));
        		$('#task_department_table').show();
        	} 
        	else {
        		$('#task_facultystaff_tablebody').empty();
        		$('<tr>').appendTo('#task_facultystaff_tablebody')
				.append($('<td class="center-text" colspan="2">')
						.text("No Task Statistics Data is Available."));
        		$('#task_facultystaff_table').show();
        	}  
			
			removeCSSClass('#task_statistics_loading', 'active');
			callFailModal('Retrieve Task Statistics Fail', 'We are unable to retrieve task statistics. Please Try Again.');
          }
	});
	
	/* CUSTOM FORM RULE - If Needed a User Selection */
	$.fn.form.settings.rules.userSelection = function(value) {
		var scope = $('#view_scope').val();
		var booleanUser = (scope == 'Staff' || scope == 'Faculty');

		if( (booleanUser && !(value == '')) 
			|| (!booleanUser && (value == '')) 
			|| scope == '') {
			return true;
		}
		else {
			return false;
		}
	};
	
	/* CUSTOM FORM RULE - If Needed a Deparment Selection */
	$.fn.form.settings.rules.departmentSelection = function(value) {
		var scope = $('#view_scope').val();
		var booleanDepartment = (scope == 'Department');
		
		if( (booleanDepartment && !(value == '')) 
			|| (!booleanDepartment && (value == '')) 
			|| scope == '') {
			return true;
		}
		else {
			return false;
		}
	};
	
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
			    			type  : 'departmentSelection[]',
			    			prompt: 'Please choose a department for the task statistics'
			    		}
			    	]
			     },
			     user_selection: {
				    identifier: 'user_selection',
				    rules: [
				    	{
				    		type  : 'userSelection[]',
				    		prompt: 'Please choose a user for the task statistics'
				    	}
				    ]
				 }
		       }
		    });
	}
	
	/* BOOLEAN VALIDATION - View Statistics Form */
	function isViewStatisticsFormValid() {
		if( $('#view_stats_form').form('is valid') ) {
			viewScope = $('#view_scope').val();
			
			hideTaskTables();
			hideChartMessages();
			reinitializeTables();
			addCSSClass('#task_statistics_loading', 'active');
			getPieChartStatistics();
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* GET - PIECHART STATISTICS */
	function getPieChartStatistics() {
		var data = {
			view_scope: $('#view_scope').val(),
			department_selection: $('#department_selection_dropdown').val(),
			user_selection: $('#user_selection_dropdown').val(),
			view_academic_year: $('#view_academic_year').val()
		}
		
		$.get(getContextPath() + '/PieChartTasksStatistics', $.param(data), function(response) {
			if(!response.length == 0) {
				var newData = response[0];
				
				taskChart.data.datasets[0].data = [
					newData.onTimeSubmission,
					newData.lateSubmission,
					newData.noSubmission
					]
				
				var newTitleString = 'Task Compliance';
				
				if(data.view_scope == 'Department') {
					newTitleString = newTitleString + ' for ' + data.department_selection;
				}
				else {
					newTitleString = newTitleString + ' for ' + data.user_selection;
				}
				
				taskChart.options.title.text = newTitleString;
				taskChart.update();
			}
			else {
				$('#no_statistics_msg').show();
			}
		})
		.fail(function(response) {
			$('#error_statistics_msg').show();
		});
	}
	
/*
 *  SET TABLES
 */
	/* SET - BY DEPARTMENT */
	function setTableByDepartment(response) {
		$('#task_department_tablebody').empty();
		if(!response.length == 0) 
		{
			var taskCount = 0;
			$.each(response, (index, taskData) => {
				taskCount = taskCount + 1;
				$('<tr>').appendTo('#task_department_tablebody')
					.append($('<td>').text(taskData.taskTitle))
					.append($('<td>').text(taskData.onTimeSubmission))
					.append($('<td>').text(taskData.lateSubmission))
					.append($('<td>').text(taskData.noSubmission))
			});
			$('#no_of_tasks').text(taskCount)
			
			// bind events and classes to the table after all data received
			taskTableByDepartment = $('#task_department_table').DataTable({
				'order': [[0, 'asc']]
			});
			byDepartmentTableInitialized = true;
			removeCSSClass('#task_statistics_loading', 'active');
		} 
		else if(response.length == 0)
		{
			$('<tr>').appendTo('#task_department_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("No Task Statistics Data is Available."));
			removeCSSClass('#task_statistics_loading', 'active');
			
			$('#no_statistics_msg').show();
		}
		
		$('#no_of_tasks').show();
		$('#task_department_table').show();
	}
	
	/* SET - BY PERSON */
	function setTableByPerson(response) {
		$('#task_facultystaff_tablebody').empty();
		if(!response.length == 0) 
		{
			var taskCount = 0;
			$.each(response, (index, taskData) => {
				taskCount = taskCount + 1;
				$('<tr>').appendTo('#task_facultystaff_tablebody')
					.append($('<td>').text(taskData.title))
					.append($('<td>').text(taskData.status))
			});
			$('#no_of_tasks').text(taskCount);
			
			// bind events and classes to the table after all data received
			taskTableByPerson = $('#task_facultystaff_table').DataTable({
				'order': [[0, 'asc']]
			});
			byPersonTableInitialized = true;
			isTaskTableByPersonEmpty = false;
			removeCSSClass('#task_statistics_loading', 'active');
		} 
		else if(response.length == 0)
		{
			$('<tr>').appendTo('#task_facultystaff_tablebody')
				.append($('<td class="center-text" colspan="2">')
						.text("No Task Statistics Data is Available."));
			removeCSSClass('#task_statistics_loading', 'active');
			
			$('#no_statistics_msg').show();
		}  
		
		$('#no_of_tasks').show();
		$('#task_facultystaff_filter').show();
		$('#task_facultystaff_table').show();
	}
	
	$('#task_facultystaff_filter_dropdown').change( function() {
		if(!isTaskTableByPersonEmpty) taskTableByPerson.column(1).search( $(this).val() ).draw();
	}); 
	
	$('#task_facultystaff_filter_clear').click( function() {
		$('#task_facultystaff_filter_dropdown').dropdown('restore defaults');
	});
	
	function reinitializeTables() {
		if(byDepartmentTableInitialized) {
			taskTableByDepartment.destroy();
			byDepartmentTableInitialized = false;
		}
		
		if(byPersonTableInitialized) {
			taskTableByPerson.destroy();
			byPersonTableInitialized = false;
		}
	}