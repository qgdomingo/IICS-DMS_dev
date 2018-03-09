/**
 * 
 */

/*
 * VARIABLES
 */

	var newlyRetrievedFaculty = true;
	var newlyRetrievedStaff = true;
	
	var localFacultyList = [];
	var localStaffList = [];
	
	var isFacultyListEmpty = false;
	var isStaffListEmpty = false;
	
	$(document).ready( function() {
		hideAllScopeChoices();
	
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
			$('#user_selection_dropdown').dropdown('restore defaults'); 
			getListStaff();
		}
		else if (tempData == 'Faculty') {
			$('#user_selection').show();
			$('#user_selection_dropdown').dropdown('restore defaults'); 
			getListFaculty();
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
	
	/* GET and SET - List of Faculty */
	function getListFaculty() {
		addCSSClass('#user_selection_dropdown', 'loading');
		
		if(newlyRetrievedFaculty) {
			addCSSClass('#user_selection_dropdown', 'loading');
			
			$.get(getContextPath() + '/RetrieveFacultyDeptHeadUsers', function(responseJson) {
				if(!responseJson.length == 0)
				{
					localFacultyList = responseJson;
					$('#user_selection_dropdown').empty(); 
					$.each(responseJson, (index, account) => {
						$('#user_selection_dropdown').append($('<option value="'+account.email+'">')
								.text(account.fullName + ' <' +account.email+ '>'));
					});
					$('#user_selection_dropdown').dropdown(); 
					removeCSSClass('#user_selection_dropdown', 'loading');
				}
				else if(responseJson.length == 0)
				{
					localFacultyList.push('No Users are available');
					isFacultyListEmpty = true;
					$('#user_selection_dropdown').empty(); 
					$('#user_selection_dropdown').append('<option value="">').text('No Users are available');
					$('#user_selection_dropdown').dropdown(); 
					removeCSSClass('#user_selection_dropdown', 'loading');
				}
			})
			.fail( function(response) {
				removeCSSClass('#user_selection_dropdown', 'loading');
				addCSSClass('#user_selection_dropdown', 'error');
			});
			newlyRetrievedFaculty = false;
		}
		else {
			addCSSClass('#user_selection_dropdown', 'loading');
			
			if(!isFacultyListEmpty) {
				$('#user_selection_dropdown').empty(); 
				$.each(localFacultyList, (index, account) => {
					$('#user_selection_dropdown').append($('<option value="'+account.email+'">')
							.text(account.fullName + ' <' +account.email+ '>'));
				});
				$('#user_selection_dropdown').dropdown(); 
			}
			else {
				$('#user_selection_dropdown').empty(); 
				$('#user_selection_dropdown').append('<option value="">').text('No Users are available');
				$('#user_selection_dropdown').dropdown(); 
			}

			removeCSSClass('#user_selection_dropdown', 'loading');
		}
		
	}
	
	/* GET and SET - List of Staff */
	function getListStaff() {
		addCSSClass('#user_selection_dropdown', 'loading');
		
		if(newlyRetrievedStaff) {
			addCSSClass('#user_selection_dropdown', 'loading');
			
			$.get(getContextPath() + '/RetrieveStaffUsers', function(responseJson) {
				if(!responseJson.length == 0)
				{
					localStaffList = responseJson;
					$('#user_selection_dropdown').empty(); 
					$.each(responseJson, (index, account) => {
						$('#user_selection_dropdown').append($('<option value="'+account.email+'">')
								.text(account.fullName + ' <' +account.email+ '>'));
					});
					$('#user_selection_dropdown').dropdown(); 
					removeCSSClass('#user_selection_dropdown', 'loading');
				}
				else if(responseJson.length == 0)
				{
					localStaffList.push('No Users are available');
					isStaffListEmpty = true;
					$('#user_selection_dropdown').empty(); 
					$('#user_selection_dropdown').append('<option value="">').text('No Users are available');
					$('#user_selection_dropdown').dropdown(); 
					removeCSSClass('#user_selection_dropdown', 'loading');
				}
			})
			.fail( function(response) {
				removeCSSClass('#user_selection_dropdown', 'loading');
				addCSSClass('#user_selection_dropdown', 'error');
			});
			newlyRetrievedStaff = false;
		}
		else {
			addCSSClass('#user_selection_dropdown', 'loading');
			
			if(!isStaffListEmpty) {
				$('#user_selection_dropdown').empty(); 
				$.each(localStaffList, (index, account) => {
					$('#user_selection_dropdown').append($('<option value="'+account.email+'">')
							.text(account.fullName + ' <' +account.email+ '>'));
				});
				$('#user_selection_dropdown').dropdown(); 
			}
			else {
				$('#user_selection_dropdown').empty(); 
				$('#user_selection_dropdown').append('<option value="">').text('No Users are available');
				$('#user_selection_dropdown').dropdown(); 
			}

			removeCSSClass('#user_selection_dropdown', 'loading');
		}
		
	}