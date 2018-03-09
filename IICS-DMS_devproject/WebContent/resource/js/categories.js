/**
 * 	categories.js
 *    - used by pages to 
 */
	var isCategoryNotEmpty = false;
	var localCategoriesData;
	
	/* GET CATEGORIES */
	function retrieveCategory(categoryDropdown) {
		addCSSClass(categoryDropdown, 'loading');
		var localCategoriesData = [];
		
		$.get(getContextPath() + '/RetrieveCategory', (responseList) => {
			if(!responseList.length == 0)
			{
				localCategoriesData = responseList;
				isCategoryNotEmpty = true;
				populateCategory(categoryDropdown, 'Categories', localCategoriesData);
				removeCSSClass(categoryDropdown, 'loading');
			}
			else if(responseList.length == 0)
			{
				localCategoriesData = ['Category List Empty. Please Add One'];
				populateCategory(categoryDropdown, 'Categories', localCategoriesData);
				removeCSSClass(categoryDropdown, 'loading');
			}
			return localCategoriesData;
		})
		.fail((response) => {
			removeCSSClass(categoryDropdown, 'loading');
			addCSSClass(categoryDropdown, 'error');
			return localCategoriesData;
		});
	}

	/* POPULATE CATEGORY */
	function populateCategory(categoryDropdown, categoryLabel, categoryData) {
		
		if(isCategoryNotEmpty) {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text(categoryLabel));
			$.each(categoryData, (index, stringData) => {
				$(categoryDropdown).append($('<option value="'+stringData+'">').text(stringData));
			});
			
			console.log('CATEGORY: SUCCESSFUL POPULATION');
		}
		else if(categoryData && !isCategoryNotEmpty){
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text(categoryData[0]));
			console.log('CATEGORY: ERROR POPULATION');
		}
		$(categoryDropdown).dropdown();
	}