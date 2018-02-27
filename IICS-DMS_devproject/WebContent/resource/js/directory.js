/**
 * 
 */

/*
 *  DIRECTORY 
 */
	/* GET - Directory, list of users */
	function getListOfUsers(directoryDropdown) {
		$.get(getContextPath() + '/RetrieveUserDirectory', (responseJson) => {
			if(!responseJson.length == 0)
			{
				$(directoryDropdown).empty(); 
				$.each(responseJson, (index, account) => {
					$(directoryDropdown).append($('<option value="'+account.email+'">')
							.text(account.fullName + ' <' +account.email+ '>'));
				});
			}
			else if(responseJson.length == 0)
			{
				$(directoryDropdown).empty(); 
				$(directoryDropdown).append('<option value="">').text('No Users are available');
			}
			else
			{
				callFailRequestModal();
			}
		})
		.fail((response) => {
			callFailRequestModal();
		});
	}