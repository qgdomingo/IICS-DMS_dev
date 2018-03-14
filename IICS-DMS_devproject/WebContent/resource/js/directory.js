/**
 * 
 */
	var localDirectoryData;
	var localExternalData;
	
/*
 *  DIRECTORY 
 */
	/* GET - Directory, list of users per Department and depending on User Account Type */
	function getListOfUsers(directoryDropdown) {
		addCSSClass(directoryDropdown, 'loading');
		
		$.get(getContextPath() + '/RetrieveUserDirectory', (responseJson) => {
			if(!responseJson.length == 0)
			{
				localDirectoryData = responseJson;
				$(directoryDropdown).empty(); 
				$.each(responseJson, (index, account) => {
					$(directoryDropdown).append($('<option value="'+account.email+'">')
							.text(account.fullName + ' <' +account.email+ '>'));
				});
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
			else if(responseJson.length == 0)
			{
				$(directoryDropdown).empty(); 
				$(directoryDropdown).append('<option value="">').text('No Users are available');
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
		})
		.fail((response) => {
			removeCSSClass(directoryDropdown, 'loading');
			addCSSClass(directoryDropdown, 'error');
		});
	}
	
	/* GET - Directory, get all users */
	function getAllUsers(directoryDropdown) {
		addCSSClass(directoryDropdown, 'loading');
		
		$.get(getContextPath() + '/RetrieveAllUsers', (responseJson) => {
			if(!responseJson.length == 0)
			{
				localDirectoryData = responseJson;
				$(directoryDropdown).empty(); 
				$.each(responseJson, (index, account) => {
					$(directoryDropdown).append($('<option value="'+account.email+'">')
							.text(account.fullName + ' <' +account.email+ '>'));
				});
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
			else if(responseJson.length == 0)
			{
				$(directoryDropdown).empty(); 
				$(directoryDropdown).append('<option value="">').text('No Users are available');
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
		})
		.fail((response) => {
			removeCSSClass(directoryDropdown, 'loading');
			addCSSClass(directoryDropdown, 'error');
		});
	}
	
	/* GET - Directory, get external to users */
	function getExternalTo(directoryDropdown) {
		addCSSClass(directoryDropdown, 'loading');
		
		$.get(getContextPath() + '/RetrieveExternalTo', (responseJson) => {
			if(!responseJson.length == 0)
			{
				localExternalData = responseJson;
				$(directoryDropdown).empty(); 
				$.each(responseJson, (index, user) => {
					$(directoryDropdown).append($('<option value="'+user.email+'">')
							.text(user.firstName + ' ' + user.lastName + ' <' +user.email+ '>'));
				});
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
			else if(responseJson.length == 0)
			{
				$(directoryDropdown).empty(); 
				$(directoryDropdown).append('<option value="">').text('No Users are available');
				$(directoryDropdown).dropdown('refresh'); 
				removeCSSClass(directoryDropdown, 'loading');
			}
		})
		.fail((response) => {
			removeCSSClass(directoryDropdown, 'loading');
			addCSSClass(directoryDropdown, 'error');
		});
	}
	
/*
 * DIRECTORY OPTIONS
 */
	