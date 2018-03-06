/**
 * 	categories.js
 *    - used by pages to 
 */
	var isCategoryNotEmpty = false;
	var localCategoriesData;
	
	/* GET CATEGORIES */
	function retrieveCategory(categoryDropdown) {
		var localCategoriesData = [];
		
		$.get(getContextPath() + '/RetrieveCategory', (responseList) => {
			if(!responseList.length == 0)
			{
				localCategoriesData = responseList;
				isCategoryNotEmpty = true;
				populateCategory(categoryDropdown, 'Categories', localCategoriesData);
			}
			else if(responseList.length == 0)
			{
				localCategoriesData = ['Category List Empty. Please Add One'];
				populateCategory(categoryDropdown, 'Categories', localCategoriesData);
			}
			else
			{
				callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
			}
			return localCategoriesData;
		})
		.fail((response) => {
			callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
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