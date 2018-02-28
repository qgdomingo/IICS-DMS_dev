/**
 *  upload_document_page.js
 *   - used by the fileupload.jsp for scripting purposes of add category, source and recipient sources
 */
	
	$(document).ready(() => {	
		retrieveCategory();
		changeUploadForm($('#doctype_select').val());

		submitOutgoingDocsForm();
	});
	
/*
 *  VARIABLES
 */
	// local data sources
	var localCategoriesData = [];
	var localSourceRecipientData = [];
	
	var firstTimeToLoadSources = true;
	var isCategoryNotEmpty = false;
	var isSourceNotEmpty = false;
	var currentPageView = '';
	
	// local data sources checker 
	var personalCategoryUpdated = false;
	var incomingCategoryUpdated = false;
	var incomingSourceUpdated = false;
	var outgoingCategoryUpdated = false;
	var outgoingRecipientUpdated = false;
	
/* 
 *  FUNCTIONS AND EVENTS
 */
	
	/* Switch Upload Form */
	$('#doctype_select').change(() => {
		changeUploadForm($('#doctype_select').val());
	});
	
	/* CHANGE - Upload Form and Hide other forms */
	function changeUploadForm(doctype) {
		currentPageView = doctype;
		updateCategoryList(doctype);
		
		if(doctype == 'Personal') {
			$('#personaldocs_form').show();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Incoming') {
			updateSourceList(doctype);
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').show();
			$('#outgoingdocs_form').hide();
		} else if(doctype == 'Outgoing') {
			updateSourceList(doctype);
			$('#personaldocs_form').hide();
			$('#incomingdocs_form').hide();
			$('#outgoingdocs_form').show();
		}
	}
	
/*
 *  CATEGORY
 */
	/* GET CATEGORIES */
	function retrieveCategory() {
		$.get(getContextPath() + '/RetrieveCategory', (responseList) => {
			if(!responseList.length == 0)
			{
				localCategoriesData = responseList;
				isCategoryNotEmpty = true;
				setCategoriesOutdated();
				updateCategoryList(currentPageView);
			}
			else if(responseList.length == 0)
			{
				localCategoriesData = ['Category List Empty. Please Add One'];
				setCategoriesOutdated();
				updateCategoryList(currentPageView);
			}
			else
			{
				callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
			}
		})
		.fail((response) => {
			callFailModal('Retrieve Category List Error', 'We are unable to retrieve the category list. ');
		});
	}
	
	/* POPULATE CATEGORY */
	function populateCategory(categoryDropdown) {
		if(isCategoryNotEmpty) {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text('Select Category'));
			$.each(localCategoriesData, (index, stringData) => {
				$(categoryDropdown).append($('<option value="'+stringData+'">').text(stringData));
			});
		}
		else {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text(localCategoriesData[0]));
		}
		$(categoryDropdown).dropdown();
	}
	
	/* UPDATE CATEGORY */
	function updateCategoryList(doctype) {
		if(doctype == 'Personal' && !personalCategoryUpdated) {
			populateCategory('#personal_category');
			personalCategoryUpdated = true;
		} else if(doctype == 'Incoming' && !incomingCategoryUpdated) {
			populateCategory('#incoming_category');
			incomingCategoryUpdated = true;
		} else if(doctype == 'Outgoing' && !outgoingCategoryUpdated) {
			populateCategory('#outgoing_category');
			outgoingCategoryUpdated = true;
		}
	}
	
	/* SET CURRENT CATEGORY LIST OUTDATED */
	function setCategoriesOutdated() {
		personalCategoryUpdated = false;
		incomingCategoryUpdated = false;
		outgoingCategoryUpdated = false;
	}
	
	/* OPEN MODAL FUNCTION */
	function openAddCategoryModal() {
		$('#category_dia').modal({
			closeable: false,
			onHide: () => {
				removeCSSClass('#category_form', 'loading');
				$('#category_submit').prop("disabled", "");
				$('#category_cancel').prop("disabled", "");
			}
		}).modal('show');
	}
	
	/* OPEN MODAL - From Personal Documents Upload Form */
	$('#personal_category_add').click(() => {
		openAddCategoryModal();
	});
	
	/* OPEN MODAL - From Incoming Documents Upload Form */
	$('#incoming_category_add').click(() => {
		openAddCategoryModal();
	});
	
	/* OPEN MODAL - From Outgoing Documents Upload Form */
	$('#outgoing_category_add').click(() => {
		openAddCategoryModal();
	});
	
	/* SUBMIT - Add New Category */
	$('#category_submit').click(() => {
		if(!$('#category_input').val() == '')
		{
			addCSSClass('#category_form', 'loading');
			$('#category_submit').prop("disabled", "disabled");
			$('#category_cancel').prop("disabled", "disabled");
			removeCSSClass('#category_input_field', 'error');
			
			var categoryData = {
				category: $('#category_input').val()
			};
			
			$.post(getContextPath() + '/AddCategory', $.param(categoryData), (response) => {
				if(response)
				{
					callSuccessModal('Success', 'A new category has been successfully added');
					localCategoriesData.push($('#category_input').val());
					$('#category_input').val('');
					setCategoriesOutdated();
					updateCategoryList(currentPageView);
				}
				else
				{
					callFailRequestModal();
				}
			})
			.fail((response) => {
				callFailRequestModal();
			});
		}
		else
		{
			addCSSClass('#category_input_field', 'error');
		}
	});

/*
 *  DOUCMENT SOURCE / RECIPIENT
 */
	/* GET SOURCES / RECIPIENT */
	function retrieveSources() {
		$.get(getContextPath() + '/RetrieveSource', (responseList) => {
			if(!responseList.length == 0)
			{
				localSourceRecipientData = responseList;
				isSourceNotEmpty = true;
				setSourcesOutdated();
				updateSourceList(currentPageView);
			}
			else if(responseList.length == 0)
			{
				localSourceRecipientData = ['Source|Recipient List Empty. Please Add One'];
				setSourcesOutdated();
				updateSourceList(currentPageView);
			}
			else
			{
				callFailModal('Retrieve Source/Recipient Error', 'We are unable to retrieve the document source/recipient list. ');
			}
		})
		.fail((response) => {
			callFailModal('Retrieve Source/Recipient Error', 'We are unable to retrieve the document source/recipient list. ');
		});
	}
	
	/* SET CURRENT SOURCE/RECIPIENT LIST OUTDATED */
	function setSourcesOutdated() {
		incomingSourceUpdated = false;
		outgoingRecipientUpdated = false;
	}
	
	/* UPDATE SOURCE/RECIPIENT */
	function updateSourceList(doctype) {
		if(firstTimeToLoadSources) {
			retrieveSources();
			firstTimeToLoadSources = false;
		}
		
		if(doctype == 'Incoming' && !incomingSourceUpdated) {
			populateSource('#incoming_source');
			incomingSourceUpdated = true;
		} else if(doctype == 'Outgoing' && !outgoingRecipientUpdated) {
			populateSource('#outgoing_recipient');
			outgoingRecipientUpdated = true;
		}
	}
	
	/* POPULATE SOURCE/RECIPIENT */
	function populateSource(categoryDropdown) {
		if(isSourceNotEmpty) {
			$(categoryDropdown).empty();
			
			if(currentPageView == 'Incoming')
				$(categoryDropdown).append($('<option value="">').text('Select Document Source'));
			else if (currentPageView == 'Outgoing')
				$(categoryDropdown).append($('<option value="">').text('Select Document Recipient'));

			
			$.each(localSourceRecipientData, (index, stringData) => {
				$(categoryDropdown).append($('<option value="'+stringData+'">').text(stringData));
			});
		}
		else {
			$(categoryDropdown).empty();
			$(categoryDropdown).append($('<option value="">').text(localSourceRecipientData[0]));
		}
		$(categoryDropdown).dropdown();
	}
		
	/* OPEN MODAL FUNCTION */
	function openAddSourceModal() {
		$('#source_dia').modal({
			closeable: false,
			onHide: () => {
				removeCSSClass('#source_form', 'loading');
				$('#source_submit').prop("disabled", "");
				$('#source_cancel').prop("disabled", "");
			}
		}).modal('show');
	}
	
	/* OPEN MODAL - From Incoming Documents Upload Form */
	$('#incoming_source_add').click(() => {
		openAddSourceModal();
	});
	
	/* OPEN MODAL - From Outgoing Documents Upload Form */
	$('#outgoing_recipient_add').click(() => {
		openAddSourceModal();
	});
	
	/* SUBMIT - Add New Category */
	$('#source_submit').click(() => {
		if(!$('#source_input').val() == '')
		{
			addCSSClass('#source_form', 'loading');
			$('#source_submit').prop("disabled", "disabled");
			$('#source_cancel').prop("disabled", "disabled");
			removeCSSClass('#source_input_field', 'error');
			
			var sourceData = {
					source: $('#source_input').val()
			};
			
			$.post(getContextPath() + '/AddSource', $.param(sourceData), (response) => {
				if(response)
				{
					callSuccessModal('Success', 'A new document source/recipient has been successfully added');
					localSourceRecipientData.push($('#source_input').val());
					$('#source_input').val('');
					setSourcesOutdated();
					updateSourceList(currentPageView);
				}
				else
				{
					callFailRequestModal();
				}
			})
			.fail((response) => {
				callFailRequestModal();
			});
		}
		else
		{
			addCSSClass('#source_input_field', 'error');
		}
	});