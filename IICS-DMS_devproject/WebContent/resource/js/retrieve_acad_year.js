/**
 * 
 */
	
	/* GET and SET - List of Academic Year */
	function getAcadYearList(acad_year_dropdown) {
		addCSSClass(acad_year_dropdown, 'loading');
		
		$.get(getContextPath() + '/RetrieveAcademicYear', function(responseJson) {
			if(!responseJson.length == 0)
			{
				$(acad_year_dropdown).empty(); 
				$(acad_year_dropdown).append($('<option value="">').text('Academic Year'));
				$.each(responseJson, (index, acadyear) => {
					$(acad_year_dropdown).append($('<option value="'+acadyear+'">')
							.text('A.Y. ' + acadyear));
				});
				$(acad_year_dropdown).dropdown('restore defaults'); 
				removeCSSClass(acad_year_dropdown, 'loading');
			}
			else if(responseJson.length == 0)
			{
				$(acad_year_dropdown).empty(); 
				$(acad_year_dropdown).append('<option value="">').text('No Academic Year is available');
				$(acad_year_dropdown).dropdown('restore defaults'); 
				removeCSSClass(acad_year_dropdown, 'loading');
			}
		})
		.fail( function(response) {
			removeCSSClass(acad_year_dropdown, 'loading');
			addCSSClass(acad_year_dropdown, 'error');
		});
	}
