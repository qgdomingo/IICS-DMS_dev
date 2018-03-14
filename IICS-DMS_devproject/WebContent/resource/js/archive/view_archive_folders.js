/**
 * 
 */

	$(document).ready( function() {
		getArchiveFolders();
		getAcadYearList('#search_acad_year');
		
		hideButtons();
	});
	
/*
 *  VARIABLES
 */
	// For checking
	var isArchiveFoldersTableEmpty = true;
	
	// Table References
	var archiveFoldersTable;
	var selectedID;
	
	// Local Data
	var localArchiveFoldersData;
	
	// For Search Functions
	var minimumDate_archive_timestamp;
	var maximumDate_archive_timestamp;
	
	var today = new Date();
	
/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[1] ).getTime(); 
			
		if ( ( isNaN(min) && isNaN(max) ) ||
		     ( isNaN(min) && dateData <= max ) ||
		     ( min <= dateData && isNaN(max) ) ||
		     ( min <= dateData && dateData <= max ) )
		{
			return true;
		}
		return false;
	}
	
	/* APPLY - Custom search filter: Date Range */
	$.fn.dataTable.ext.search.push(
		function(settings, data, dataIndex) {
			return filterDateRange(data, minimumDate_archive_timestamp, maximumDate_archive_timestamp);
		}
	);
	
	/* GET - ARCHIVE FOLDERS */
	function getArchiveFolders() {
		addCSSClass('#archive_folder_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveArchiveFolders', function(response) {
			$('#archive_folders_tablebody').empty();
			if(!response.length == 0) 
			{
				localArchiveFoldersData = response;
				$.each(response, (index, archiveData) => {
					$('<tr id="'+index+'">').appendTo('#archive_folders_tablebody')
						.append($('<td>').text(archiveData.title))
						.append($('<td>').text(archiveData.timestamp))
						.append($('<td>').text(archiveData.status))
						.append($('<td>').text(archiveData.academicYear))
				});
					
				// bind events and classes to the table after all data received
				archiveFoldersTable = $('#archive_folders_table').DataTable({
					'order': [[1, 'desc']]
				});
				selectArchiveFolderRow();
				viewArchiveFolderRow();
				isArchiveFoldersTableEmpty = false;
				removeCSSClass('#archive_folder_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#archive_folders_tablebody')
					.append($('<td class="center-text" colspan="4">')
							.text("No archive folder found."));
				removeCSSClass('#archive_folder_loading', 'active');
			}
		})
		.fail((response) => {
			$('#archive_folders_tablebody').empty();
			$('<tr>').appendTo('#archive_folders_tablebody')
			.append($('<td class="center-text error" colspan="4">')
					.text("Unable to retrieve archive folder. Please try refreshing the page."));
			removeCSSClass('#archive_folder_loading', 'active');
		});
	}
	
	/* SELECT ROW  */
	function selectArchiveFolderRow() {
		$('#archive_folders_table tbody').on('click', 'tr', function() {
			$(this).toggleClass('active');		
			selectedID = $(this).attr('id');
			selectedRowsTogglers(selectedID);
		});
	}
	
	/* VIEW ARCHIVE FOLDER */
	function viewArchiveFolderRow() {
		$('#archive_folders_table tbody').on('dblclick', 'tr', function() {	
			selectedID = localArchiveFoldersData[$(this).attr('id')].id;
			var selectedName = localArchiveFoldersData[$(this).attr('id')].title;
			
			var url = getContextPath() + '/admin/archivefolder.jsp?id=' 
    		+ encodeURIComponent(selectedID) 
    		+ '&name=' + encodeURIComponent(selectedName) 
    		
    		document.location.href = url;
		});
	}
	
	/* TOGGLE BUTTONS */
	function selectedRowsTogglers(id) {
		if(archiveFoldersTable.rows('.active').data().length == 0)
		{
			hideButtons();
		}
		else if(archiveFoldersTable.rows('.active').data().length == 1)
		{
			$('#download_folder_id').val(localArchiveFoldersData[id].id);
			$('#download_archive_btn').show();	
			$('#enable_archive_btn').show();
			$('#disable_archive_btn').show()
		}
		else if(archiveFoldersTable.rows('.active').data().length > 1) 
		{
			$('#download_archive_btn').hide();	
			$('#enable_archive_btn').show();
			$('#disable_archive_btn').show()
		}
	}
	
	/* Hide Buttons */
	function hideButtons() {
		$('#download_archive_btn').hide();
		$('#enable_archive_btn').hide();
		$('#disable_archive_btn').hide();	
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Archive Folders */
	$('#search_archive').on('input', function() {
		if(!isArchiveFoldersTableEmpty) archiveFoldersTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Archive From */
	$('#search_archivefrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_archiveto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isArchiveFoldersTableEmpty) 
			{
				minimumDate_archive_timestamp = new Date(text + ' 00:00:00').getTime();
				archiveFoldersTable.draw();
			}
		}) 
	});

	/* SEARCH - Archive To */
	$('#search_archiveto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_archivefrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isArchiveFoldersTableEmpty) 
			{
				maximumDate_archive_timestamp = new Date(text + ' 23:59:59').getTime();
				archiveFoldersTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Archive Status */
	$('#search_status').on('change', function() {
		if(!isArchiveFoldersTableEmpty) archiveFoldersTable.column(2).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Academic Year */
	$('#search_acad_year').on('change', function() {
		if(!isArchiveFoldersTableEmpty) archiveFoldersTable.column(3).search( $(this).val() ).draw();
	});
	
	/* CLEAR SEARCH EVENT - Inbox */
	$('#clear_search').click(() => {
		clearArchiveFolderSearch();
	});
		
	/* CLEAR SEARCH - Inbox */
	function clearArchiveFolderSearch() {
		$('#search_archive').val('');
		$('#search_archivefrom_calendar').calendar('clear');
		$('#search_archiveto_calendar').calendar('clear');
		$('#search_status').dropdown('restore defaults');
		$('#search_acad_year').dropdown('restore defaults');
		if(!isArchiveFoldersTableEmpty) archiveFoldersTable.search('').draw();
	}
	
	
/*
 * SET ARCHIVE DATE
 */
	$('#set_archive_date_btn').click( function() {
		$('#set_archive_date_modal').modal({
			closeable: false,
			autofocus: false,
			observeChanges: true,
			onShow: function() {
				$('#archive_date_calendar').calendar({
					minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()),
					ampm: false,
					formatter: dateFormat
				});
				$('#invalid_password_message').hide();
			},
			onHidden: function() {
				$('#set_archive_date_form').form('reset');
				removeCSSClass('#set_archive_date_form', 'error');
      		    removeCSSClass('#set_archive_date_form', 'loading');
    		    $('#cancel_set_archive').attr("disabled", false);
  		        $('#confirm_set_archive').attr("disabled", false);
			}
		}).modal('show');
	});
	
	/* SUBMIT */
	$('#set_archive_date_form').ajaxForm({
		  beforeSubmit: isSetArchiveDateFormValid,
          success: function(response) {    
        	  if(response == 'invalid password') {
        		  removeCSSClass('#set_archive_date_form', 'loading');
        		  $('#cancel_set_archive').attr("disabled", false);
      		      $('#confirm_set_archive').attr("disabled", false);
      		      $('#invalid_password_message').show();
        	  }
        	  else if(response == 'success') {
        		  callSuccessModal('An Archive Date has been Set', 
        			'Users will be notified via the Login page. The Archive Button will show once the Archive Date is met.' +
        			' The page will refresh to update data in 5 seconds.');
        		  
        		  setTimeout(function(){  window.location.reload(); }, 5000);
        	  }      	  
          },
          error: function(response) {
        	  callFailModal('Unable to Set an Archive Date', 'An error has occured on the server while processing the request.');
          }
	});
	
	/* BOOLEAN VALIDATION  */
	function isSetArchiveDateFormValid() {
		if( $('#set_archive_date_form').form('is valid') ) {
			addCSSClass('#set_archive_date_form', 'loading');
			$('#cancel_set_archive').attr("disabled", true);
			$('#confirm_set_archive').attr("disabled", true);
			$('#invalid_password_message').hide();
			return true;
		} 
		else {
			return false;
		}
	}
	
	/* FORM VALIDATION */
	$('#set_archive_date_form').form({
	    fields: {
	    	archive_date: {
	          identifier: 'archive_date',
	          rules: [
	            {
	              type   : 'empty',
	              prompt : 'Please enter an archive date'
	            }
	          ]
	        },
	        current_password: {
	          identifier: 'current_password',
		      rules: [
		        {
		          type   : 'empty',
		          prompt : 'Please enter your account password for authentication'
		        }
		       ]
		     }
	       }
	    });

/*
 * ARCHIVE DOCUMENT
 */ 
	$('#archive_docs_now_btn').click( function() {
		$('#confirm_archive_dia').modal({
			closeable: false
		}).modal('show');
	});
	
 	$('#confirm_archive_submit').click( function() {
 		activatePageLoading('Archiving Documents');
 		
 		$.get(getContextPath() + '/ArchiveDocument', function(response) {
 			if(response) {
 	 			callSuccessModal('Archive Documents Success!', 'The documents are now archived. Refereshing page to update data.');
 	 			
 	 			setTimeout(function(){  window.location.reload(); }, 3000);	
 			}
 		})
 		.fail( function(response) {
 			deactivatePageLoading();
 			callFailModal('Unable to Archive Documents', 'An error occured while processing your request.');
 		});
 	});