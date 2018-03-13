/**
 * 
 */

/*
 * VARIABLES
 */
	var labels = ["Acknowledged", "Read", "Unread"]
	var mailChart;
	var viewScope;
	
	var mailTableByDepartment
	var mailTableByPerson;
	var isMailTableByPersonEmpty = true;
	
	var byDepartmentTableInitialized = false;
	var byPersonTableInitialized = false;
	
	$(document).ready( function() {
		hideMailTables();
		hideChartMessages();
		viewStatisticsFormValidation(); 
		
		mailChart = new Chart($('#myChart'), {
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
		    		text: 'Mail Acknowledgement'
		    	}
		    } 
		});
	});
	
	/* HIDE - Mail Tables */
	function hideMailTables() {
		$('#no_of_mail_title').hide();
		$('#mail_department_table').hide();
		$('#mail_facultystaff_filter').hide();
		$('#mail_facultystaff_table').hide();
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
        		$('#mail_department_tablebody').empty();
        		$('<tr>').appendTo('#mail_department_tablebody')
				.append($('<td class="error center-text" colspan="4">')
						.text("Unable to Retrieve Mail Statistics Data."));
        		$('#mail_department_table').show();
        	} 
        	else {
        		$('#mail_facultystaff_tablebody').empty();
        		$('<tr>').appendTo('#mail_facultystaff_tablebody')
				.append($('<td class="center-text" colspan="2">')
						.text("No Mail Statistics Data is Available."));
        		$('#mail_facultystaff_table').show();
        	}  
			
			removeCSSClass('#mail_statistics_loading', 'active');
			callFailModal('Retrieve Mail Statistics Fail', 'We are unable to retrieve Mail statistics. Please Try Again.');
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
			    			prompt: 'Please choose a department for the mail statistics'
			    		}
			    	]
			     },
			     user_selection: {
				    identifier: 'user_selection',
				    rules: [
				    	{
				    		type  : 'userSelection[]',
				    		prompt: 'Please choose a user for the mail statistics'
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
			
			hideMailTables(); 
			hideChartMessages();
			reinitializeTables();
			addCSSClass('#mail_statistics_loading', 'active');
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
		
		$.get(getContextPath() + '/PieChartMailStatistics', $.param(data), function(response) {
			if(!response.length == 0) {
				var newData = response[0];
				
				mailChart.data.datasets[0].data = [
					newData.acknowledged,
					newData.read,
					newData.unread
					]
				
				var newTitleString = 'Task Compliance';
				
				if(data.view_scope == 'Department') {
					newTitleString = newTitleString + ' for ' + data.department_selection;
				}
				else {
					newTitleString = newTitleString + ' for ' + data.user_selection;
				}
				
				mailChart.options.title.text = newTitleString;
				mailChart.update();
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
		$('#no_of_mail').text(response.length);
		$('#no_of_mail_title').show();
		$('#mail_department_tablebody').empty();
		if(!response.length == 0) 
		{
			$.each(response, (index, mailData) => {
				$('<tr>').appendTo('#mail_department_tablebody')
					.append($('<td>').text(mailData.subject))
					.append($('<td>').text(mailData.acknowledged))
					.append($('<td>').text(mailData.read))
					.append($('<td>').text(mailData.unread))
			});
			
			// bind events and classes to the table after all data received
			mailTableByDepartment = $('#mail_department_table').DataTable({
				'order': [[0, 'asc']]
			});
			byDepartmentTableInitialized = true;
			removeCSSClass('#mail_statistics_loading', 'active');
		} 
		else if(response.length == 0)
		{
			$('<tr>').appendTo('#mail_department_tablebody')
				.append($('<td class="center-text" colspan="4">')
						.text("No Mail Statistics Data is Available."));
			removeCSSClass('#mail_statistics_loading', 'active');
			
			$('#no_statistics_msg').show();
		}
		
		$('#mail_department_table').show();
	}
	
	/* SET - BY PERSON */
	function setTableByPerson(response) {
		$('#no_of_mail').text(response.length);
		$('#no_of_mail_title').show();
		$('#mail_facultystaff_tablebody').empty();
		if(!response.length == 0) 
		{
			$.each(response, (index, mailData) => {
				$('<tr>').appendTo('#mail_facultystaff_tablebody')
					.append($('<td>').text(mailData.subject))
					.append($('<td>').text(mailData.acknowledgement))
			});
			
			// bind events and classes to the table after all data received
			mailTableByPerson = $('#mail_facultystaff_table').DataTable({
				'order': [[0, 'asc']]
			});
			byPersonTableInitialized = true;
			isMailTableByPersonEmpty = false;
			removeCSSClass('#mail_statistics_loading', 'active');
		} 
		else if(response.length == 0)
		{
			$('<tr>').appendTo('#mail_facultystaff_tablebody')
				.append($('<td class="center-text" colspan="2">')
						.text("No Mail Statistics Data is Available."));
			removeCSSClass('#mail_statistics_loading', 'active');
			
			$('#no_statistics_msg').show();
		}  
		
		$('#mail_facultystaff_filter').show();
		$('#mail_facultystaff_table').show();
	}
	
	$('#mail_facultystaff_filter_dropdown').change( function() {
		if(!isMailTableByPersonEmpty) mailTableByPerson.column(1).search( $(this).val() ).draw();
	}); 
	
	$('#mail_facultystaff_filter_clear').click( function() {
		$('#task_facultystaff_filter_dropdown').dropdown('restore defaults');
	});
	
	function reinitializeTables() {
		if(byDepartmentTableInitialized) {
			mailTableByDepartment.destroy();
			byDepartmentTableInitialized = false;
		}
		
		if(byPersonTableInitialized) {
			mailTableByPerson.destroy();
			byPersonTableInitialized = false;
		}
	}