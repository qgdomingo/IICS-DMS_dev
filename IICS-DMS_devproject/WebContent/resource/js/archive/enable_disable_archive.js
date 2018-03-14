
/*
 * FUNCTIONS
 */
		
	/* GET - List of Selected Archive Folders ID */
	function getSelectedDataID() {
		var selectedID = []
		
		$.each(archiveFoldersTable.rows('.active').ids(), (index, archiveID) => {
			selectedID.push(localArchiveFoldersData[archiveID].id);
		});
		
		return selectedID;
	}

/* 
 * ENABLE ARCHIVE MODAL
 */

	/* OPEN MODAL - Enable Archive */
	$('#enable_archive_btn').click(() => {		
		$('#enable_archive_dia').modal({
			closable: false,
			onShow: function() {
				$('#enable_archive_selected').val(getSelectedDataID());
			},
			onHide: function() {
				removeCSSClass('#enable_archive_form', 'error');
			}
		}).modal('show');	
	});
	
	/* SUBMIT - Enable Archive Form */
	$('#enable_archive_form').ajaxForm({
		 beforeSubmit: isEnableArchiveFormValid,
	     success: function(response) { 
	        if(response) {
				callSuccessModal('Enable Archive Success', 'Selected Archive Folders have been enabled. ' + 
						'Refreshing page in 3 seconds to update data.');
				setTimeout(function(){  window.location.reload(); }, 3000);
	        }
	     },
	     error: function(response) {
	    	callFailModal('Unable to Enable Archive Folders', 'An error has occured when enabling folders. ' +
				'Please try again.');
			deactivatePageLoading();
			selectedRowsTogglers(selectedID);
	     }
	});
	
	/* FORM VALIDATION - Enable Archive Form */
	$('#enable_archive_form').form({
		fields: {
			enable_archive_purpose: {
				identifier: 'enable_archive_purpose',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the reason for the enabling of archive folders'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Enable Archive Form */
	function isEnableArchiveFormValid() {
		if( $('#enable_archive_form').form('is valid') ) {
			$('#enable_archive_dia').modal('hide');
			activatePageLoading('Enabling Archive Folders');
			return true;
		} 
		else {
			return false;
		}
	}
		
/* 
 * DISABLE ARCHIVE MODAL
 */
	
	/* OPEN MODAL - Disable Archive */
	$('#disable_archive_btn').click(() => {		
		$('#diable_archive_dia').modal({
			closable: false,
			onShow: function() {
				$('#disable_archive_selected').val(getSelectedDataID());
			},
			onHide: function() {
				removeCSSClass('#disable_archive_form', 'error');
			}
		}).modal('show');	
	});
		
	/* SUBMIT - Disable Archive Form */
	$('#disable_archive_form').ajaxForm({
		 beforeSubmit: isDisableArchiveFormValid,
	     success: function(response) { 
	        if(response) {
	        	callSuccessModal('Disable Archive Success', 'Selected Archive Folders have been disabled. ' + 
					'Refreshing page in 3 seconds to update data.');
	        	
	        	setTimeout(function(){  window.location.reload(); }, 3000);
	        }
	     },
	     error: function(response) {
	    	callFailModal('Unable to Enable Archive Folders', 'An error has occured when enabling folders. ' +
				'Please try again.');
			deactivatePageLoading();
			selectedRowsTogglers(selectedID);
	     }
	});
	
	/* FORM VALIDATION - Disable Archive Form */
	$('#disable_archive_form').form({
		fields: {
			disable_archive_purpose: {
				identifier: 'disable_archive_purpose',
				rules: [
					{
						type   : 'empty',
						prompt : 'Please enter the reason for the disabling of archive folders'
					}
				]
			}
		}
	});
	
	/* BOOLEAN VALIDATION - Disable Archive Form */
	function isDisableArchiveFormValid() {
		if( $('#disable_archive_form').form('is valid') ) {
			$('#diable_archive_dia').modal('hide');
			activatePageLoading('Disabling Archive Folders');
			return true;
		} 
		else {
			return false;
		}
	}
	