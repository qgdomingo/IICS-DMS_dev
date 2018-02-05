/**
 *  manage_users.js
 *   - Javascript used for the manageusers.jsp page for scripting functionalities such as retrieving users, add, edit, 
 *   	enable and disable users.
 */
	$(document).ready(() => {
		retriveUserList();
		hideButtons();
		$('table').tablesort();
	});

/* VARIABLES */
	var localUserAccountsData;
	
	var userAccountData = 
		{
			email: '',
			faculty_no: '',
			first_name: '',
			last_name: '',
			user_type: '',
			department: '',
			orginal_email: ''
		}
	
/* FUNCTIONS */	
	function retriveUserList() {
		addCSSClass('#table-loading', 'active');
		
		$.get('../RetrieveUsers', (responseData, textStatus, xhr) => {
			if(!responseData.length == 0) 
			{
				localUserAccountsData = responseData;
				$.each(responseData, (index, account) => {
					$('<tr>').appendTo('#usertable-body')
						.append($('<td class="collapsing">')
								.append('<div class="ui fitted checkbox"><input class="user" type="checkbox" value="'+index+'" />'))			
						.append($('<td>').text(account.facultyNumber))
						.append($('<td>').text(account.firstName))
						.append($('<td>').text(account.lastName))
						.append($('<td>').text(account.email))
						.append($('<td>').text(account.userType))
						.append($('<td>').text(account.department))
						.append($('<td>').text(account.status))
						.append($('<td>').text(account.creationTimestamp));
				});
				$('.checkbox').checkbox();
				removeCSSClass('#table-loading', 'active');	
				inputCheckboxTogglers();
			} 
			else 
			{
				$('<tr>').appendTo('#usertable-body')
					.append($('<td class="center-text" colspan="9">')
							.text("Your account list is empty. Click on the 'Add User' button to add one."));
				removeCSSClass('#table-loading', 'active');
			}
		})
		.fail((response, textStatus, xhr) => {
			$('<tr>').appendTo('#usertable-body')
			.append($('<td class="center-text error" colspan="9">')
					.text("Unable to retrieve list of users. :("));
			removeCSSClass('#table-loading', 'active');
		});
	}
	
	function hideButtons() {
		$('#edituser_btn').hide();
		$('#enableuser_btn').hide();
		$('#disableuser_btn').hide()
	}
	
	/* EDIT, ENABLE AND DISABLE TOGGLER */
	function inputCheckboxTogglers() {
		$('input[type="checkbox"]').on('change', () => {
			if($('input:checkbox').parent('.checked').length == 0)
			{
				hideButtons();
			}
			else if($('input:checkbox').parent('.checked').length == 1) 
			{
				$('#edituser_btn').show();	
				$('#enableuser_btn').hide();
				$('#disableuser_btn').hide()
			} 
			else if ($('input:checkbox').parent('.checked').length >= 2) 
			{
				$('#edituser_btn').hide();
				$('#enableuser_btn').show();
				$('#disableuser_btn').show();
			}
		});
	}
	

/* ADD USER MODAL */
	
	/* OPEN ADD USER MODAL */
	$('#adduser_btn').click(() => {
		$('#adduser_dia').modal({
			blurring: true,
			closable: false,
			onHidden: () => {
				// NOT YET WORKING :(
				$('#adduser_form').trigger('reset');
				$('#adduser_form > select').dropdown('restore defaults');
			}
		}).modal('show');
	});
	
	$('#adduser_submit').click(() => {
		userAccountData = 
		{
			email: $('#'),
			faculty_no: $('#add_facultyno').val(),
			first_name: $('#add_firstname').val(),
			last_name: $(),
			user_type: '',
			department: ''
		}
		
		$.post()
	});
	
/* EDIT USER MODAL */
	
	/* OPEN EDIT USER MODAL */
	$('#edituser_btn').click(() => {
		$('#edituser_dia').modal({
			blurring: true,
			closable: false,
			onHidden: () => {
				// NOT YET WORKING :(
				$('#edituser_form').trigger('reset');
			}
		}).modal('show');
	});
	
	$()
	
	