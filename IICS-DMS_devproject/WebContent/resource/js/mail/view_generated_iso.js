/**
 * 
 */

	$(document).ready( function() {
		getGeneratedISOList();
		getAcadYearList('#search_acad_year');
	});

/*
 *  VARIABLES
 */
	// For checking
	var isGeneratedISOTableEmpty = true;
	
	// Table References
	var generatedISOTable;
	
	// For Search Functions
	var minimumDate_generated_timestamp;
	var maximumDate_generated_timestamp;
	
/*
 * FUNCTIONS
 */
	
	/* CUSTOM SEARCH FILTER: Date Range */
	function filterDateRange(data, min, max) {
		var dateData = new Date( data[4] ).getTime(); 
			
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
			return filterDateRange(data, minimumDate_generated_timestamp, maximumDate_generated_timestamp);
		}
	);
	
	/* GET - Generated ISO List */
	function getGeneratedISOList() {
		addCSSClass('#generated_loading', 'active');
			
		$.get(getContextPath() + '/RetrieveGeneratedISONumbers', function(response) {
			$('#generated_iso_tablebody').empty();
			if(!response.length == 0) 
			{
				$.each(response, (index, generatedISOData) => {
					$('<tr>').appendTo('#generated_iso_tablebody')
						.append($('<td>').text(generatedISOData.isoNumber))
						.append($('<td>').text(generatedISOData.type))
						.append($('<td>').text(generatedISOData.purpose))
						.append($('<td>').text(generatedISOData.schoolYear))
						.append($('<td>').text(generatedISOData.generatedDate))
				});
					
				// bind events and classes to the table after all data received
				generatedISOTable = $('#generated_iso_table').DataTable({
					'order': [[4, 'desc']]
				});
				isGeneratedISOTableEmpty = false;
				removeCSSClass('#generated_loading', 'active');
			} 
			else if(response.length == 0)
			{
				$('<tr>').appendTo('#generated_iso_tablebody')
					.append($('<td class="center-text" colspan="5">')
							.text("There is no generated ISO number yet. Generate one on the Create Mail Page."));
				removeCSSClass('#generated_loading', 'active');
			}
		})
		.fail((response) => {
			$('#generated_iso_tablebody').empty();
			$('<tr>').appendTo('#generated_iso_tablebody')
			.append($('<td class="center-text error" colspan="5">')
					.text("Unable to retrieve generated ISO list. Please try refreshing the page."));
			removeCSSClass('#generated_loading', 'active');
		});
	}
	
/*
 * SEARCH FUNCTIONALITY
 */
	$('#search_iso').on('input', function() {
		if(!isGeneratedISOTableEmpty) generatedISOTable.search( $(this).val() ).draw();
	});
		
	$('#search_type').on('change', function() {
		if(!isGeneratedISOTableEmpty) generatedISOTable.column(1).search( $(this).val() ).draw();
	});
	
	$('#search_generatedfrom_calendar').calendar({
		type: 'date',
		endCalendar: $('#search_generatedto_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isGeneratedISOTableEmpty) 
			{	
				minimumDate_generated_timestamp = new Date(text + ' 00:00:00').getTime();
				generatedISOTable.draw();
			}
		}) 
	});
		
	$('#search_generatedto_calendar').calendar({
		type: 'date',
		startCalendar: $('#search_generatedfrom_calendar'),
		formatter: dateFormat,
		today: true,
		onChange: ((date, text, mode) => {
			if(!isGeneratedISOTableEmpty) 
			{
				maximumDate_generated_timestamp = new Date(text + ' 23:59:59').getTime();
				generatedISOTable.draw();
			}
		}) 
	});	
	
	/* SEARCH - Academic Year */
	$('#search_acad_year').on('change', function() {
		if(!isGeneratedISOTableEmpty) generatedISOTable.column(3).search( $(this).val() ).draw();
	});
	
	/* CLEAR SEARCH EVENT */
	$('#clear_search').click(() => {
		clearGeneratedISOSearch();
	});
		
	/* CLEAR SEARCH - Exported Mail */
	function clearGeneratedISOSearch() {
		$('#search_iso').val('');
		$('#search_generatedfrom_calendar').calendar('clear');
		$('#search_generatedto_calendar').calendar('clear');
		$('#search_type').dropdown('restore defaults');
		$('#search_acad_year').dropdown('restore defaults');
		if(!isGeneratedISOTableEmpty) generatedISOTable.search('').draw();
	}
	