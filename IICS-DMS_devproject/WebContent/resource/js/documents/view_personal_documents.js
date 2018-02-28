/**
 *  personal_view.js
 *    - javascript used for scripting in viewing personal documents on documents.jsp
 */

	$(document).ready(() => {
		getPersonalDocuments();
	});

/*
 *  VARIABLES
 */
	// For checking
	var isPersonalDocsTableEmpty = false;
	
	// Table References
	var personalDocsTable;
	
	// Local Data
	var localPersonalDocsData;
	
	// For Search Functions
	var minimumDate_personal;
	var maximumDate_personal;

/*
 * FUNCTIONS
 */
	 
	/* CUSTOM SEARCH FILTER */
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
					'order': [[0, 'asc'], [1, 'asc']]
				});
				selectPersonalDocsRow();
				removeCSSClass('#personal_loading', 'active');
			} 
			else if(responseJson.length == 0)
			{
				$('<tr>').appendTo('#personal_tablebody')
					.append($('<td class="center-text" colspan="3">')
							.text("You do not have any personal documents. Go to Upload Documents page to upload one."));
				removeCSSClass('#personal_loading', 'active');
				isPersonalDocsTableEmpty = true;
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
				onHidden: () => {
					$(this).toggleClass('active');
				}
			}).modal('show');
		});
	}
		
	/* GET - Populate Dialog For View File */
	function getPersonalDocumentsData(id) {
		var selectedData = localPersonalDocsData[id];
		$('#viewpersonal_title').text(selectedData['title']);
		$('#viewpersonal_uploadedby').text(selectedData['createdBy']);
		$('#viewpersonal_uploaddate').text(selectedData['timeCreated']);
		$('#viewpersonal_category').text(selectedData['category']);
		$('#viewpersonal_type').text(selectedData['type']);
		$('#viewpersonal_file').text(selectedData['fileName']);
		$('#viewpersonal_download_id').val(parseInt(selectedData['id']));
		$('#viewpersonal_download_type').val(selectedData['type']);
		$('#viewpersonal_description').text(selectedData['description']);
	}
		
	/* SEARCH - Personal Documents */
	$('#personal_search').on('input', () => {
		if(!isPersonalDocsTableEmpty) personalDocsTable.search( $(this).val() ).draw();
	});
		
	/* SEARCH - Personal Documents Upload From */
	$('#personal_uploadfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#personal_uploadto_calendar'),
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
	$('#personal_uploadto_calendar').calendar({
		type: 'date',
		startCalendar: $('#personal_uploadfrom_calendar'),
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
	$('#personal_category').on('change', function() {
		if(!isPersonalDocsTableEmpty) personalDocsTable.column(2).search( $(this).val() ).draw();
	});
		
	/* CLEAR SEARCH - Personal Documents Category */
	$('#personal_clear').click(() => {
		clearPersonalDocsSearch();
	});
		
	function clearPersonalDocsSearch() {
		$('#personal_search').val('');
		$('#personal_upload').val('');
		$('#personal_uploadfrom_calendar').calendar('clear');
		$('#personal_uploadto_calendar').calendar('clear');
		$('#personal_category').dropdown('restore defaults');
	}
