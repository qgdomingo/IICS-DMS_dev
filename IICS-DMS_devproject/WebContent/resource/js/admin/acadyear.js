/**
 *  manage_users.js
 *   - Javascript used for the acadyear.jsp for checking input of the user before submitting in the database.
 *   	For changes in the academic year configuration of the system. (for ISO numbers)
 */

	$(document).ready(() => {
		getAcademicYearConfigurations();
		cleanAcademicYearForm();
	});
	
	/* VARIABLE - Inputs */
	var inputFields = ['#start_year', '#end_year', '#start_month', '#end_month']
	
	/* GET - Academic Year Configurations */
	function getAcademicYearConfigurations() {
		activatePageLoading('Fetching Academic Year Config');
		
		$.get(getContextPath() + '/getacademicyear', (responseJson) => {
			if(responseJson) 
			{
				$('#current_acadyear').text(responseJson[0] + ' - ' + responseJson[1]);
				$('#current_acadmonth').text(responseJson[2] + ' - ' + responseJson[3]);
				populateStartYear(responseJson[1]);
			}
			else
			{
				errorText = 'Unable to retrieve data from server.';
				$('#current_acadyear').text(errorText);
				$('#current_acadmonth').text(errorText);
				
				callFailModal('Fetch Error', 'Unable to fetch academic year configurations. ' +
				'Please try refreshing the page. If the problem persists, please contact your administrator.');
			}
			deactivatePageLoading();
		})
		.fail( (response) => {
			errorText = 'Unable to retrieve data from server.';
			$('#current_acadyear').text(errorText);
			$('#current_acadmonth').text(errorText);
			deactivatePageLoading();
			callFailRequestModal();
		});
	}
	
	/* SET - Start Year Config */
	function populateStartYear(endYear) {
		currentEndYear = parseInt(endYear);
		newEndYear = [currentEndYear-1, currentEndYear, currentEndYear+1, currentEndYear+2, currentEndYear+3];
		
		$('#start_year').append($('<option value="'+newEndYear[0]+'">').text(newEndYear[0]))
						.append($('<option value="'+newEndYear[1]+'">').text(newEndYear[1]))
					    .append($('<option value="'+newEndYear[2]+'">').text(newEndYear[2]))
					    .append($('<option value="'+newEndYear[3]+'">').text(newEndYear[3]))
					    .append($('<option value="'+newEndYear[4]+'">').text(newEndYear[4]));

	}
	
	/* SET - End Year Config */
	$('#start_year').on('change', () => {
		$('#end_year').val( parseInt($('#start_year').val()) + 1 );
	});
	
	/* SUBMIT - New Academic Year Configurations */
	$('#acadyear_submit').click(() => {
		
		if(checkEmptyFields(inputFields)) 
		{
			clearErrorFields(inputFields);
			activatePageLoading('Updating Academic Year Config');
			
			var newAcadYearData = {
					year_from: $(inputFields[0]).val(),
					year_to: $(inputFields[1]).val(),
					month_start: $(inputFields[2]).val(),
					month_end: $(inputFields[3]).val()
			}
			
			$.post(getContextPath() + '/EditYear', $.param(newAcadYearData), (response) => {
				if(success) 
				{
					cleanAcademicYearForm();
					callSuccessModal('Success', 'Successfully updated academic year configurations! ');
					getAcademicYearConfigurations();
				}
				else
				{
					deactivatePageLoading();
					callFailModal('Update Failed', 'Unable to update academic year configurations. ' +
						'Please try again.  If the problem persists, please contact your administrator.');
				}
			})
			.fail( (response) => {
				deactivatePageLoading();
				callFailRequestModal();
			});
		}
	});
	
	/* CLEAN - Academic Year Form */
	function cleanAcademicYearForm() {
		$(inputFields[0]).dropdown('restore defaults');
		$(inputFields[1]).val('');
		$(inputFields[2]).dropdown('restore defaults');
		$(inputFields[3]).dropdown('restore defaults');
	}