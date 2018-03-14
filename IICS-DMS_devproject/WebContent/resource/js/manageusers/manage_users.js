/**
 *  manage_user.js
 *   - javascript used for the manageusers.jsp for scripting functionalities such as retrieving users.
 */

	$(document).ready(() => {
		hideButtons();
		retriveUserList();
		
		$('#userstable_filter').hide();
	});

/* 
 * VARIABLES 
 */
	var table;
	var isUsersTableEmpty = false;
	var localAccountsData;
	var selectedIndex;
	
/* 
 * FUNCTIONS 
 */	
	
	/* GET - Retrieve Users*/
	function retriveUserList() {
		addCSSClass('#table-loading', 'active');
		
		$.get(getContextPath() + '/RetrieveUsers', (responseData) => {
			$('#usertable-body').empty();
			if(!responseData.length == 0) 
			{
				localAccountsData = responseData; 
				$.each(responseData, (index, account) => {
					$('<tr id="'+index+'">').appendTo('#usertable-body')		
						.append($('<td>').text(account.facultyNumber))
						.append($('<td>').text(account.firstName))
						.append($('<td>').text(account.lastName))
						.append($('<td>').text(account.email))
						.append($('<td>').text(account.userType))
						.append($('<td>').text(account.department))
						.append($('<td>').text(account.status))
						.append($('<td>').text(account.creationTimestamp));
				});
				
				// bind events and classes to the table after all data received
				table = $('#userstable').DataTable({
					'order': [[7, 'desc']] 
				});
				selectRow();
				
				removeCSSClass('#table-loading', 'active');	
			} 
			else if(responseData.length == 0)
			{
				$('<tr>').appendTo('#usertable-body')
					.append($('<td class="center-text" colspan="9">')
							.text("Your account list is empty. Click on the 'Add User' button to add one."));
				removeCSSClass('#table-loading', 'active');
				isUsersTableEmpty = true;
			}
			else
			{
				$('<tr>').appendTo('#usertable-body')
				.append($('<td class="center-text error" colspan="9">')
						.text("Unable to retrieve list of users. Please refresh page. :("));
				removeCSSClass('#table-loading', 'active');
				callFailRequestModal();
			}
		})
		.fail((response, textStatus, xhr) => {
			$('<tr>').appendTo('#usertable-body')
			.append($('<td class="center-text error" colspan="9">')
					.text("Unable to retrieve list of users. Please refresh page. :("));
			removeCSSClass('#table-loading', 'active');
			callFailRequestModal();
		});
	}
	
	/* HIDE - User Management Actions */
	function hideButtons() {
		$('#edituser_btn').hide();
		$('#enableuser_btn').hide();
		$('#disableuser_btn').hide()
	}
	
	/* TOGGLER - User Management Actions */
	function selectedRowsTogglers() {
		if(table.rows('.active').data().length == 0)
		{
			hideButtons();
		}
		else if(table.rows('.active').data().length == 1) 
		{
			$('#edituser_btn').show();	
			$('#enableuser_btn').show();
			$('#disableuser_btn').show()
		} 
		else if(table.rows('.active').data().length >= 2) 
		{
			$('#edituser_btn').hide();
			$('#enableuser_btn').show();
			$('#disableuser_btn').show();
		}
	}
		
	/* SELECT ROW */
	function selectRow() {
	    $('#userstable tbody').on('click', 'tr', function (){
	    	selectedIndex = $(this).attr('id');
	        $(this).toggleClass('active');
			selectedRowsTogglers();
	    });
	}
	
	
/*
 * EDIT USER 
 */
	
	/* GET - Individual User for Edit */
	function retrieveUserForEdit() {
		var existingData = table.rows('.active').data()[0];
		var localDataReference = localAccountsData[selectedIndex];

		$('#edit_original_email').val(existingData[3]);		
		$('#edit_facultyno').val(existingData[0]);
		$('#edit_title').val(localDataReference.title);
		$('#edit_firstname').val(existingData[1]);
		$('#edit_lastname').val(existingData[2]);
		//TODO $('#edit_middleinitial').val()
		$('#edit_email').val(existingData[3]);
		$('#edit_cellphone_number').val(localDataReference.contactNumber);
		$('#edit_usertype').dropdown('set selected', existingData[4]);
		$('#edit_department').dropdown('set selected', existingData[5]);
		
	}
	
	/* OPEN MODAL - Edit User */
	$('#edituser_btn').click(() => {		
		$('#edituser_dia').modal({
			closable: false,
			observeChanges: true,
			onShow: () => {
				checkUserTypeDepartment('#edit_usertype', '#edit_department_field'); 
				retrieveUserForEdit();
			},
			onHidden: () => {
				cleanEditUserForm();
				selectedRowsTogglers();
			}
		}).modal('show');
		
	});
	
	/* SUBMIT - Edit User Profile Form */
	$('#edituser_form').ajaxForm({
		 beforeSubmit: isEditUserFormValid,
	     success: function(response) { 
	        if(!response.length == 0) {
	        	localAccountsData[selectedIndex] = response[0];
	        	table.row('.active').remove();
				table.row.add( $(addNewRowData(response[0], selectedIndex))[0] ).draw();	
				callSuccessModal('Success', 'The account has successfully been updated.');
	        }
	        else if(response == 'existing email') {
	        	$('#edit_invalid_email_message').show();
	        	enableEditUserForm();
	        }
	        else {
	        	callFailModal('Unable to Edit User', 'An error has occured when updating an account. ' +
					'Please try again. If the problem persists, please contact your administrator.');
	        }
	     },
	     error: function(response) {
	    	 callFailRequestModal();
	     }
	});
	
/*
 *  SEARCH FUNCTIONS
 */
	$('#search_textfield').on('input', function() {
		if(!isUsersTableEmpty) table.search( $(this).val() ).draw();
	});
	
	$('#search_usertype').on('change', function() {
		if(!isUsersTableEmpty) table.column(4).search( $(this).val() ).draw();
	});
	
	$('#search_department').on('change', function() {
		if(!isUsersTableEmpty) table.column(5).search( $(this).val() ).draw();
	});
	
	$('#search_status').on('change', function() {
		if(!isUsersTableEmpty) table.column(6).search( $(this).val() ).draw();
	});
	
	$('#search_clear').click(() => {
		resetSearchFields();
	})
	
	function resetSearchFields() {
		$('#search_textfield').val('');
		$('#search_usertype').dropdown('restore defaults');
		$('#search_department').dropdown('restore defaults');
		$('#search_status').dropdown('restore defaults');
		if(!isUsersTableEmpty) table.search('').draw();
	}
	
/*
 * FORM CLEANERS
*/	
	
	/* CLEAN - Modal */
	function clearUserModal(form, usertypeDP, departmentDP, inputsArray) {
		$(form).trigger('reset');
		$(usertypeDP).dropdown('restore defaults');
		$(departmentDP).dropdown('restore defaults');
		clearErrorFields(inputsArray);
	}
	
/*
 * FORM VALIDATORS
 */

	/* VALIDATOR - User Type Toggle */
	function checkUserTypeDepartment(userTypeDP, departmentField) {
		var userType = $(userTypeDP).val();

		if(userType == 'Department Head' || userType == 'Faculty') 
		{
			$(departmentField).show();
			return true;
		}
		else $(departmentField).hide();
		return false;
	}
	