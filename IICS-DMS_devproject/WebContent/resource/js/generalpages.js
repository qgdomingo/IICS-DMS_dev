/**
 *  generalpages.js
 *   - a javascript used by all general pages (regular user account pages) except of the login page
 */

	$(document).ready(() => {		
		$('.ui.dropdown').dropdown();
		$('.checkbox').checkbox();
	})

/*
 * UPLOAD DOCUMENT PROGRESS BAR
 */	
	/* Open and Initialize Progress Bar */
	function openAndInitializeUploadProgress() {
		$('#upload_progress_bar').progress({
		    percent: 0
		}).progress();
		
		$('#progressbar_modal').modal({
			closeable: false,
			observeChanges: true,
			duration: 0
		}).modal('show');
	}
	
	/* Update Progress Bar */
	function updateUploadProgress(percent) {
		$('#upload_progress_bar').progress('set percent', percent);
	}
	
	/* Close Progress Bar on Complete */
	function closeUploadProgress() {
    	$('#progressbar_modal').modal('hide');
	}
	
	
/*
 * CALENDAR INITIALIZATION
 */
	
	/* DATE FORMAT FOR yyyy/MM/dd */
	var dateFormat = {
		date: function (date, settings) {
			if (!date) return '';
			var day = date.getDate() + '';
			if (day.length < 2) {
			   day = '0' + day;
			}
			var month = (date.getMonth() + 1) + '';
			if (month.length < 2) {
			   month = '0' + month;
			}
			var year = date.getFullYear();
			return year + '-' + month + '-' + day;
		}
	};

/* 
 * SIDE MENU FUNCTIONALITY 
 */ 
	
	$('#togglenav').click(() => {
		$('#side_nav').sidebar({
			dimPage: false,
			returnScroll: true,
			scrollLock: false
		}).sidebar('toggle');
	});
	
/* 
 * LOGOUT FUNCTIONALITY 
 */
	
	/* CLOSE MODAL - Logout */
	$('#logout_btn').click(() => {
		$('#logout_dia').modal({
			closable: false,
			observeChanges: true
		})
		.modal('show');
	});
	
	/* CLOSE MODAL - Logout (Mobile) */
	$('#logout_btn2').click(() => {
		$('#logout_dia').modal({
			closable: false
		})
		.modal('show');
	});

	/* SUBMIT - Logout */
	$('#logout_submit').click(() => {
		$('#logout_dia').modal('hide');
		activatePageLoading('Logging out');
		
		$.get(getContextPath() + '/Logout', (response) => {
			deactivatePageLoading();
			window.location = getContextPath() + '/index.jsp';
		})
		 .fail((response) => {
			 deactivatePageLoading();
			 window.location = getContextPath() + '/index.jsp';
		 });
	});
	
