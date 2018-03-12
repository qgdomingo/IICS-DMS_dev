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
	var inputFields = ['#start_year', '#end_year']
	
	/* GET - Academic Year Configurations */
	function getAcademicYearConfigurations() {
		activatePageLoading('Fetching Academic Year Config');
		
		$.get(getContextPath() + '/getacademicyear', (responseJson) => {
			if(responseJson) 
			{
				$('#current_acadyear').text(responseJson[0] + ' - ' + responseJson[1]);
				var startacadyear = parseInt(responseJson[0]);
				$(inputFields[0]).val(startacadyear + 1);
				$(inputFields[1]).val(startacadyear + 2);
			}
			else
			{
				errorText = 'Unable to retrieve data from server.';
				$('#current_acadyear').text(errorText);
				
				callFailModal('Fetch Error', 'Unable to fetch academic year configurations. ' +
				'Please try refreshing the page. If the problem persists, please contact your administrator.');
			}
			deactivatePageLoading();
		})
		.fail( (response) => {
			errorText = 'Unable to retrieve data from server.';
			$('#current_acadyear').text(errorText);
			deactivatePageLoading();
			callFailRequestModal();
		});
	}
		
	/* SUBMIT - New Academic Year Configurations */
	function submitAcademicYearChanges() {
		
		activatePageLoading('Updating Academic Year Config');
			
		var newAcadYearData = {
				year_from: $(inputFields[0]).val(),
				year_to: $(inputFields[1]).val(),
		}
			
		$.post(getContextPath() + '/EditYear', $.param(newAcadYearData), (response) => {
			if(response) 
			{
				var startacadyear = parseInt(newAcadYearData['year_from']);
				$(inputFields[0]).val(startacadyear + 1);
				$(inputFields[1]).val(startacadyear + 2);
				getAcademicYearConfigurations();
				callSuccessModal('Success', 'Successfully updated academic year configurations! ');
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
	
	/* OPEN MODAL - Change Confirmation */
	$('#acadyear_submit').click(() => {
		$('#confirmchange_dia').modal({
			closeable: false,
			onApprove: () => {
				submitAcademicYearChanges();
			}
		}).modal('show');
	});

