/**
 *  enable_disable_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities in enabling and disabling of users.
 */
/*
 * FUNCTIONS
 */
		
	/* GET - List of Selected Data Email */
	function getSelectedDataEmail() {
		var emailList = { 
			selected: []
		};
		
		$.each(table.rows('.active').data(), (index, userData) => {
			emailList['selected'].push(userData[3]);
		});
		
		return emailList
	}

/* 
 * ENABLE USER MODAL
 */

	/* OPEN MODAL - Enable User */
	$('#enableuser_btn').click(() => {		
		$('#enableuser_dia').modal({
			closable: false
		}).modal('show');	
	});
	
	/* SUBMIT - Enable User */
	$('#enableuser_submit').click(() => {
		$('#enableuser_dia').modal('hide');
		activatePageLoading('Enabling Users');
		
		$.post(getContextPath() + '/EnableUser', $.param(getSelectedDataEmail()), (responseJson) => {
			if(responseJson)
			{
				table.rows('.active').remove();
				$.each(responseJson, (index, userData) => {
					table.row.add( $(addNewRowData(userData))[0] ).draw();
				});
				callSuccessModal('Success', 'User accounts have successfully been enabled.');
				deactivatePageLoading();
				selectedRowsTogglers();
			}
			else
			{
				callFailModal('Unable to Enable User/s', 'An error has occured when enabling account/s. ' +
					'Please try again. If the problem persists, please contact your administrator.');
				deactivatePageLoading();
				selectedRowsTogglers();
			}

		})
		.fail( (response) => {
			callFailRequestModal();
			deactivatePageLoading();
			selectedRowsTogglers();
		});
	});
	
/* 
 * DISABLE USER MODAL
 */
	
	/* OPEN MODAL - Disable User */
	$('#disableuser_btn').click(() => {		
		$('#disableuser_dia').modal({
			closable: false
		}).modal('show');	
	});
	
	/* SUBMIT - Disable User */
	$('#disableuser_submit').click(() => {
		$('#disableuser_dia').modal('hide');
		activatePageLoading('Disabling Users');
		
		$.post(getContextPath() + '/DisableUser', $.param(getSelectedDataEmail()), (responseJson) => {
			if(responseJson)
			{
				table.rows('.active').remove();
				$.each(responseJson, (index, userData) => {
					table.row.add( $(addNewRowData(userData))[0] ).draw();
				});
				callSuccessModal('Success', 'User accounts have successfully been disabled.');
				deactivatePageLoading();
				selectedRowsTogglers();
			}
			else
			{
				callFailModal('Unable to Disable User/s', 'An error has occured when enabling account/s. ' +
				'Please try again. If the problem persists, please contact your administrator.');
				deactivatePageLoading();
				selectedRowsTogglers();
			}
		})
		.fail( (response) => {
			callFailRequestModal();
			deactivatePageLoading();
			selectedRowsTogglers();
		});
	});
	