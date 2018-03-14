/*
 *  VARIABLES
 */
	// For checking
	var isArchivedDocsTableEmpty = true;
	
	// Table References
	var archivedDocsTable;
	var selectedID;
	var folderID;
	
	// Local Data
	var localArchivedDocsData;
	
	// For Search Functions
	var minimumDate_archived;
	var maximumDate_archived;


	$(document).ready( function() {
	    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    folderID = decodeURIComponent(data.id);
		folderName = decodeURIComponent(data.name);
		
		$('#folder_title').text(folderName);
		
		getArchivedFolderDocuments(folderID);
		
		retrieveCategory('#search_category');
		getAcadYearList('#search_acad_year');
		retrieveSources('#search_source_recipient');
	});
	
/*
 * FUNCTIONS
 */
	
	/* GET SOURCES / RECIPIENT */
	function retrieveSources(dropdown) {
		$.get(getContextPath() + '/RetrieveSource', (responseList) => {
			$(dropdown).empty();
			if(!responseList.length == 0)
			{
				$(dropdown).append($('<option value="">').text('Select Document Source/Recipient'));
				$.each(responseList, (index, data) => {
					$(dropdown).append($('<option value="'+data.sourcesName+'">').text(data.sourcesName));
				});
				$(dropdown).dropdown('refresh');
			}
			else if(responseList.length == 0)
			{
				$(dropdown).append($('<option value="">').text('No Source/Recipient Exists'));
				$(dropdown).dropdown('refresh');
			}
		})
		.fail((response) => {
			$(dropdown).empty();
			$(dropdown).append($('<option value="">').text('Unable to Retrieve'));
			$(dropdown).dropdown('refresh');
		});
	}
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[5] ).getTime(); 
			
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
			return filterDateRange(data, minimumDate_archived, maximumDate_archived);
		}
	);
	
	/* GET - Archived Documents */
	function getArchivedFolderDocuments(folderID) {
		addCSSClass('#archive_folder_loading', 'active');
		
		var data = {
			id: folderID	
		}
		
		$.get(getContextPath() + '/RetrieveArchivedDocuments', $.param(data) ,(response) => {
			$('#archive_folders_tablebody').empty();
			if(!response.length == 0) 
			{
				localArchivedDocsData = response;
				$.each(response, (index, retrievedDocs) => {
					$('<tr id="'+index+'">').appendTo('#archive_folders_tablebody')
						.append($('<td>').text(retrievedDocs.title))
						.append($('<td>').text(retrievedDocs.type))
						.append($('<td>').text(retrievedDocs.category))
						.append($('<td>').text(retrievedDocs.sourceRecipient))
						.append($('<td>').text(retrievedDocs.uploadedBy + ' (' + retrievedDocs.email + ')'))
						.append($('<td>').text(retrievedDocs.uploadDate))
						.append($('<td>').text(retrievedDocs.acadYear))
				});
					
				// bind events and classes to the table after all data received
				archivedDocsTable = $('#archive_folders_table').DataTable({
					'order': [[5, 'desc']]
				});
				selectArchivedDocsRow();
				isArchivedDocsTableEmpty = false;
				removeCSSClass('#archive_folder_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#archive_folders_tablebody')
					.append($('<td class="center-text" colspan="7">')
							.text("This folder does not contain any archived documents"));
				removeCSSClass('#archive_folder_loading', 'active');
			}
		})
		.fail((response) => {
			$('#archive_folders_tablebody').empty();
			$('<tr>').appendTo('#archive_folders_tablebody')
			.append($('<td class="center-text error" colspan="7">')
					.text("Unable to archived documents on this folder. Try refreshing the page. :("));
			removeCSSClass('#archive_folder_loading', 'active');
			callFailRequestModal();
		});
	}
		
	/* SELECT ROW - Archived Documents */
	function selectArchivedDocsRow() {
		$('#archive_folders_table tbody').on('dblclick', 'tr', function () {
			selectedID = $(this).attr('id');
			var doctype = localArchivedDocsData[selectedID].type;
			
			if(doctype == 'Incoming') {
				getIncomingDocumentsData(selectedID);
				
				$('#viewincoming_dialog').modal({
					closable: false,
					observeChanges: true,
					autofocus: false
				}).modal('show');
			}
			else if(doctype == 'Outgoing') {
				getOutgoingDocumentData(selectedID);
				
				$('#viewoutgoing_dialog').modal({
					closable: false,
					observeChanges: true,
					autofocus: false
				}).modal('show');
			}
		});
	}
		
	/* GET - Populate Dialog For Incoming File */
	function getIncomingDocumentsData(id) {
		var selectedData = localArchivedDocsData[id];
		$('#viewincoming_title').text(selectedData['title']);
		$('#viewincoming_source').text(selectedData['sourceRecipient']);
		$('#viewincoming_refno').text(selectedData['referenceNo']);
		$('#viewincoming_note').text(selectedData['note']);
		$('#viewincoming_department').text(selectedData['department']);
		$('#viewincoming_academic_year').text(selectedData['acadYear']);
		$('#viewincoming_uploadedby')
			.text(selectedData['uploadedBy'] + ' <' + selectedData['email'] + '>');
		$('#viewincoming_uploaddate').text(selectedData['uploadDate']);
		$('#viewincoming_category').text(selectedData['category']);
		$('#viewincoming_type').text('Incoming');
		$('#viewincoming_file').text(selectedData['fileName']);
		$('#viewincoming_description').text(selectedData['description']);
		$('#viewincoming_download_id').val(selectedData['id']);
		$('#viewincoming_download_type').val(selectedData['type']);
	}
	
	/* GET - Populate Dialog For Outgoing File */
	function getOutgoingDocumentData(id) {
		var selectedData = localArchivedDocsData[id];
		$('#viewoutgoing_title').text(selectedData['title']);
		$('#viewoutgoing_recipient').text(selectedData['sourceRecipient']);
		$('#viewoutgoing_department').text(selectedData['department']);
		$('#viewoutgoing_academic_year').text(selectedData['acadYear']);
		$('#viewoutgoing_uploadedby')
			.text(selectedData['uploadedBy'] + ' <' + selectedData['email'] + '>');
		$('#viewoutgoing_uploaddate').text(selectedData['uploadDate']);
		$('#viewoutgoing_category').text(selectedData['category']);
		$('#viewoutgoing_type').text('Outgoing');
		$('#viewoutgoing_file').text(selectedData['fileName']);
		$('#viewoutgoing_description').text(selectedData['description']);
		$('#viewoutgoing_download_id').val(selectedData['id']);
		$('#viewoutgoing_download_type').val(selectedData['type']);
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Archived Documents */
	$('#search_archive').on('input', function() {
		if(!isArchivedDocsTableEmpty) archivedDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Archived Documents Type */
	$('#search_type').on('change', function() {
		if(!isArchivedDocsTableEmpty) archivedDocsTable.column(1).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Category */
	$('#search_category').on('change', function() {
		if(!isArchivedDocsTableEmpty) archivedDocsTable.column(2).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Source/Recipient */
	$('#search_source_recipient').on('change', function() {
		if(!isArchivedDocsTableEmpty) archivedDocsTable.column(3).search( $(this).val() ).draw();
	});
	
	/* SEARCH - Upload From */
	$('#search_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_uploadto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isArchivedDocsTableEmpty) 
			{
				minimumDate_archived = new Date(text + ' 00:00:00').getTime();
				archivedDocsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Upload To */
	$('#search_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_uploadfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isArchivedDocsTableEmpty) 
			{
				maximumDate_archived = new Date(text + ' 23:59:59').getTime();
				archivedDocsTable.draw();
			}
		}) 
	});
	
	/* SEARCH - Acad Year */
	$('#search_acad_year').on('change', function() {
		if(!isArchivedDocsTableEmpty) archivedDocsTable.column(6).search( $(this).val() ).draw();
	});
		
	/* CLEAR SEARCH EVENT  */
	$('#clear_search').click(() => {
		clearArchivedDocsSearch();
	});
		
	/* CLEAR SEARCH - Archived Documents */
	function clearArchivedDocsSearch() {
		$('#search_archive').val('');
		$('#search_type').dropdown('restore defaults');
		$('#search_category').dropdown('restore defaults');
		$('#search_source_recipient').dropdown('restore defaults');
		$('#search_uploadfrom_calendar').calendar('clear');
		$('#search_uploadto_calendar').calendar('clear');
		$('#search_acad_year').dropdown('restore defaults');
		if(!isArchivedDocsTableEmpty) archivedDocsTable.search('').draw();
	}