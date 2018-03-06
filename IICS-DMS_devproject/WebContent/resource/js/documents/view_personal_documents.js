/**
 *  view_personal_documents.js
 *    - javascript used for scripting in viewing personal documents on personaldocs.jsp
 */

	$(document).ready(() => {
		getPersonalDocuments();
		retrieveCategory('#search_category');	
	});

/*
 *  VARIABLES
 */
	// For checking
	var isPersonalDocsTableEmpty = true;
	
	// Table References
	var personalDocsTable;
	
	// Local Data
	var localPersonalDocsData;
	
	// For Search Functions
	var minimumDate_personal;
	var maximumDate_personal;

/*
 * NAVIGATE FUNCTION
 */
	$('#doctype_select').on('change', function() {
		window.location.href = getContextPath() + '/files/' + $(this).dropdown('get value');
	});
	
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
			return filterDateRange(data, minimumDate_personal, maximumDate_personal);
		}
	);
	
	/* GET - Personal Documents*/
	function getPersonalDocuments() {
		addCSSClass('#personal_loading', 'active');
			
		$.get(getContextPath() + '/PersonalDocuments', (responseJson) => {
			$('#personal_tablebody').empty();
			if(!responseJson.length == 0) 
			{
				localPersonalDocsData = responseJson;
				$.each(responseJson, (index, personalDocs) => {
					$('<tr id="'+index+'">').appendTo('#personal_tablebody')
						.append($('<td>').text(personalDocs.title))
						.append($('<td>').text(personalDocs.timeCreated))
						.append($('<td>').text(personalDocs.category))
				});
					
				// bind events and classes to the table after all data received
				personalDocsTable = $('#personal_table').DataTable({
					'order': [[1, 'desc']]
				});
				selectPersonalDocsRow();
				isPersonalDocsTableEmpty = false;
				removeCSSClass('#personal_loading', 'active');
			} 
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#personal_tablebody')
					.append($('<td class="center-text" colspan="3">')
							.text("You do not have any personal documents. Go to Upload Documents page to upload one."));
				removeCSSClass('#personal_loading', 'active');
			}
			else
			{
				$('<tr>').appendTo('#personal_tablebody')
				.append($('<td class="center-text error" colspan="3">')
						.text("Unable to retrieve list of your personal documents. Please refresh page. :("));
				removeCSSClass('#personal_loading', 'active');
				callFailRequestModal();
				
			}
		})
		.fail((response) => {
			$('<tr>').appendTo('#personal_tablebody')
			.append($('<td class="center-text error" colspan="3">')
					.text("Unable to retrieve list of your personal documents. Please refresh page. :("));
			removeCSSClass('#personal_loading', 'active');
			callFailRequestModal();
		});
	}
		
	/* SELECT ROW - Personal Documents */
	function selectPersonalDocsRow() {
		$('#personal_table tbody').on('dblclick', 'tr', function () {
			getPersonalDocumentsData($(this).attr('id'));
		   	$(this).toggleClass('active');
		   	
		    $('#viewpersonal_dialog').modal({
				closable: false,
				autofocus: false,
				observeChanges: true
			}).modal('show');
		    
		    $(this).toggleClass('active');
		});
	}
		
	/* GET - Populate Dialog For View File */
	function getPersonalDocumentsData(id) {
		var selectedData = localPersonalDocsData[id];
		$('#viewpersonal_title').text(selectedData['title']);
		$('#viewpersonal_uploadedby').text(selectedData['createdBy']);
		$('#viewpersonal_uploaddate').text(selectedData['timeCreated']);
		$('#viewpersonal_category').text(selectedData['category']);
		$('#viewpersonal_type').text('Personal');
		$('#viewpersonal_file').text(selectedData['fileName']);
		$('#viewpersonal_download_id').val(selectedData['id']);
		$('#viewpersonal_download_type').val(selectedData['type']);
		$('#viewpersonal_description').text(selectedData['description']);
	}
		
/*
 * SEARCH FUNCTIONALITY
 */
	/* SEARCH - Personal Documents */
	$('#search_personal').on('input', function() {
		if(!isPersonalDocsTableEmpty) personalDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Personal Documents Upload From */
	$('#search_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_uploadto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isPersonalDocsTableEmpty) 
			{
				minimumDate_personal = new Date(text + ' 00:00:00').getTime();
				personalDocsTable.draw();
			}
		}) 
	});
		
	/* SEARCH - Personal Documents Upload To */
	$('#search_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_uploadfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isPersonalDocsTableEmpty) 
			{
				maximumDate_personal = new Date(text + ' 23:59:59').getTime();
				personalDocsTable.draw();
			}
		}) 
	});
	
	/* SEARCH - Personal Documents Category */
	$('#search_category').on('change', function() {
		if(!isPersonalDocsTableEmpty) personalDocsTable.column(2).search( $(this).val() ).draw();
	});
		
	/* CLEAR SEARCH EVENT - Personal Documents Category */
	$('#search_clear').click(() => {
		clearPersonalDocsSearch();
	});
		
	/* CLEAR SEARCH - Personal Documents */
	function clearPersonalDocsSearch() {
		$('#search_personal').val('');
		$('#search_uploadfrom_calendar').calendar('clear');
		$('#search_uploadto_calendar').calendar('clear');
		$('#search_category').dropdown('restore defaults');
	}
