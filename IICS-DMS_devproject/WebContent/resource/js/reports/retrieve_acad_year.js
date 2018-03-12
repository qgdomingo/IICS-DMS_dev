/**
 * 
 */
	$(document).ready( function() {
		getAcadYearList();
	});
	
	/* GET and SET - List of Academic Year */
	function getAcadYearList() {
		addCSSClass('#view_academic_year', 'loading');
		
		$.get(getContextPath() + '/RetrieveAcademicYear', function(responseJson) {
			if(!responseJson.length == 0)
			{
				$('#view_academic_year').empty(); 
				$('#view_academic_year').append($('<option value="">').text('Academic Year'));
				$.each(responseJson, (index, acadyear) => {
					$('#view_academic_year').append($('<option value="'+acadyear+'">')
							.text('A.Y. ' + acadyear));
				});
				$('#view_academic_year').dropdown('restore defaults'); 
				removeCSSClass('#view_academic_year', 'loading');
			}
			else if(responseJson.length == 0)
			{
				$('#view_academic_year').empty(); 
				$('#view_academic_year').append('<option value="">').text('No Academic Year is available');
				$('#view_academic_year').dropdown('restore defaults'); 
				removeCSSClass('#view_academic_year', 'loading');
			}
		})
		.fail( function(response) {
			removeCSSClass('#view_academic_year', 'loading');
			addCSSClass('#view_academic_year', 'error');
		});
	}
