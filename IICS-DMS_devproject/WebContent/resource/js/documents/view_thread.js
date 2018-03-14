/**
 * 
 */
	var localDocumentsData = [];
	var currentCursor = 0;
	var maxCursor = 0;
	var selectedIncomingID;
	
	$(document).ready(function() {
		$('#fail_request_message').hide();
		
		var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
	    for (var i = 0, l = params.length; i < l; i++) {
	         tmp = params[i].split('=');
	         data[tmp[0]] = tmp[1];
	    }
	    
	    setBackButtonLink(data.origin);
	    getDocumentsThread( decodeURIComponent(data.id) );
	    
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_form').hide();
	});
	
	
/*
 * FUNCTIONS
 */
	/* SET - Back Anchor Tag */
	function setBackButtonLink(origin) {
		if(origin == '1') {
			$('#page_origin').attr('href', getContextPath() + '/files/incomingdocs.jsp');
		}
		else if(origin == '2') {
			$('#page_origin').attr('href', getContextPath() + '/files/outgoingdocs.jsp');
		}
		else if(origin == '3') {
			$('#page_origin').attr('href', getContextPath() + '/files/alldocs.jsp');
		}
	}
	
	/* GET - Documents Thread */
	function getDocumentsThread(id) {
		addCSSClass('#thread_loading', 'active');
		
		var data = {
			thread_number: id
		}
		
		$.get(getContextPath() + '/Thread', $.param(data), function(response) {
			if(!response.length == 0) {
				
				$('#thread_source_recipient').text(response[0]['sourceRecipient']);
				$('#thread_capacity').text(response.length);
				
				localDocumentsData = response;
				for(currentCursor = 0; (currentCursor < 5) && !(localDocumentsData[currentCursor] == undefined); currentCursor++) {
					if(response[currentCursor]['type'] == 'JfkL3LhppTMte3SuOtRe/A==') {
						setIncomingDocumentSegment(response[currentCursor], currentCursor);
					}
					else if(response[currentCursor]['type'] == 'V2m+nDkHv8hyhX08f1QpBg==') {
						setOutgoingDocumentSegment(response[currentCursor]);
					}
				}
				
				if(!localDocumentsData[currentCursor]) {
					$('#load_more_data_btn').hide();
				} 
				
				bindViewIncomingDetailsClickEvent();
				removeCSSClass('#thread_loading', 'active');
			}
			else {
				$('#fail_request_message').show();
				$('#load_more_data_btn').hide();
				removeCSSClass('#thread_loading', 'active');
			}
		}) 
		.fail(function(response) {
			$('#fail_request_message').show();
			$('#load_more_data_btn').hide();
			removeCSSClass('#thread_loading', 'active');
		});
	}
	
	/* GET - Load More Data */
	$('#load_more_data_btn').click(function() {
		maxCursor = currentCursor + 5;
		
		for(currentCursor; (currentCursor < maxCursor) && !(localDocumentsData[currentCursor] == undefined); currentCursor++) {
			if(localDocumentsData[currentCursor]['type'] == 'JfkL3LhppTMte3SuOtRe/A==') {
				setIncomingDocumentSegment(localDocumentsData[currentCursor], currentCursor);
			}
			else if(localDocumentsData[currentCursor]['type'] == 'V2m+nDkHv8hyhX08f1QpBg==') {
				setOutgoingDocumentSegment(localDocumentsData[currentCursor]);
			}
		}
		 
		if(!localDocumentsData[currentCursor]) {
			$('#load_more_data_btn').hide();
		} 
		
		bindViewIncomingDetailsClickEvent();
	});
	
	/* SET - Incoming Document Segment (HTML) */
	function setIncomingDocumentSegment(data, index) {
		$('<div class="row">').appendTo('#thread_area')
			.append($('<div class="left floated ten wide computer twelve wide tablet sixteen wide mobile column">')
				.append($('<div class="ui blue segment">')
					.append($('<h3>').text( data.title ))
					.append($('<div class="ui grid stackable">')
						.append($('<div class="row">')
							.append($('<div class="left floated eight wide column">')	
								.append($('<p class="element-rmb">')
									.append('<b>Upload Date: </b>' + data.timeCreated)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Reference No.: </b>' + data.referenceNo)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Category: </b>' + data.category)
								)
							)
							.append($('<div class="right floated eight wide column">')	
								.append($('<p class="element-rmb">')
									.append('<b>Action Required: </b>' + data.actionRequired)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Action Due: </b>')
									.append(data.dueOn == undefined ? '' : data.dueOn)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Status: </b>' + data.status)
								)
							)
						)
					)
					.append('<br>')
					.append($('<button class="ui fluid blue small button" name="viewincoming_details" ' 
							+ 'type="button" id="'+index+'">')
						.append('<i class="info circle icon"></i>View File Details')
					)
				)
			)
	}
	
	/* SET - Outgoing Document Segment (HTML) */
	function setOutgoingDocumentSegment(data) {
		$('<div class="row">').appendTo('#thread_area')
			.append($('<div class="right floated ten wide computer twelve wide tablet sixteen wide mobile column">')
				.append($('<div class="ui orange segment">')
					.append($('<h3>').text( data.title ))
					.append($('<div class="ui grid stackable">')
						.append($('<div class="row">')
							.append($('<div class="left floated eight wide column">')	
								.append($('<p class="element-rmb">')
									.append('<b>Upload by: </b>' + data.createdBy + ' <i>(' + data.email + ')</i>')
								)
								.append($('<p class="element-rmb">')
									.append('<b>Upload Date: </b>' + data.timeCreated)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Category: </b>' + data.category)
								)
							)
							.append($('<div class="right floated eight wide column">')	
								.append($('<p class="element-rmb">')
									.append('<b>File Name: </b>' + data.fileName)
								)
								.append($('<p class="element-rmb">')
									.append('<b>Description: </b>' + data.description)
								)
							)
						)
					)
					.append('<br>')
					.append($('<form method="GET" action="' + getContextPath() + '/FileDownload">')
						.append('<input type="hidden" name="id" value="'+ data.id +'">')
						.append('<input type="hidden" name="type" value="'+ data.type +'">')
						.append($('<button class="ui fluid small button" type="submit">')
								.append('<i class="file icon"></i>View File')
						)
					)
					
				)
			)	
	}
	
/*
 *  VIEW INCOMING DOCUMENT DETAILS
 */
	
	/* OPEN - Incoming Document Details */
	function bindViewIncomingDetailsClickEvent() {
		$('button[name="viewincoming_details"]').on('click', function () {
			selectedIncomingID = $(this).attr('id');
			
			getIncomingDocumentsData($(this).attr('id'));
			
		    $('#viewincoming_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false,
				onHidden: function() {
					$('#viewincoming_due').text('');
					$('#view_incoming_note').val('');
					reinitializeMarkAsDone();
					hideNoteMessages();
				}
			}).modal('show');
		});
	}
	
	/* GET - Populate Dialog For View File */
	function getIncomingDocumentsData(id) {
		var selectedData = localDocumentsData[id];
		$('#viewincoming_title').text(selectedData['title']);
		$('#viewincoming_source').text(selectedData['sourceRecipient']);
		$('#viewincoming_refno').text(selectedData['referenceNo']);
		$('#viewincoming_action').text(selectedData['actionRequired']);
		$('#viewincoming_due').text(selectedData['dueOn']);
		$('#viewincoming_status').text(selectedData['status']);
		$('#viewincoming_uploadedby')
			.text(selectedData['createdBy'] + ' <' + selectedData['email'] + '>');
		$('#viewincoming_uploaddate').text(selectedData['timeCreated']);
		$('#viewincoming_category').text(selectedData['category']);
		$('#viewincoming_type').text('Incoming');
		$('#viewincoming_file').text(selectedData['fileName']);
		$('#viewincoming_description').text(selectedData['description']);
		$('#viewincoming_download_id').val(selectedData['id']);
		$('#viewincoming_download_type').val(selectedData['type']);
		$('#viewincoming_threadno').val(selectedData['threadNumber']);
		
		$('#viewincoming_note_id').val(selectedData['id']);
		$('#viewincoming_note_type').val(selectedData['type']);
		$('#view_incoming_note').val(selectedData['note']);
		
		if(!(selectedData['status'] == 'Done')) {
			$('#viewincoming_done_id').val(selectedData['id']);
			$('#viewincoming_done_type').val(selectedData['type']);
			$('#mark_as_done_form').show();
		}
	}
	
/*
 * EDIT NOTE
 */
	
	/* SUBMIT - Update Document Note */
	$('#edit_note_form').ajaxForm({
		success: function(response) {
			localDocumentsData[selectedIncomingID]['note'] = $('#view_incoming_note').val();
			$('#note_green_message').show();
		},
		error: function(response) { 
			$('#note_orange_message').show();
		}
	});
	
	/* CLICK - Hide the Orange Message */
	$('#close_note_orange_message').on('click', function() {
		$('#note_orange_message').hide();
	});
	
	/* CLICK - Hide the Green Message */
	$('#close_note_green_message').on('click', function() {
		$('#note_green_message').hide();
	});
	
	function hideNoteMessages() {
		$('edit_note_form').form('reset');
		$('#note_orange_message').hide();
		$('#note_green_message').hide();
	}
	
/*
 * MARK AS DONE
 */
	/* CLICK - Mark as Done: Show Confirmation */
	$('#mark_as_done_btn').click( function() {
		$('#mark_as_done_conf').show();
		$(this).prop("disabled", true);
	});
	
	/* CLICK - Mark as Done: Cancel Confirmation */
	$('#mark_as_done_no').click( function() {
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	});

	/* SUBMIT - Mark Document as Done */
	$('#mark_as_done_form').ajaxForm({
		beforeSubmit: initializePageForMarkAsDone,
		success: function(response) {  
			deactivatePageLoading();
			callSuccessModal('Document Status Update Success', 
					'The incoming document has been updated to done. The page will refresh to update data.');
			setTimeout(function(){  window.location.reload(); }, 2000);
		},
		error: function(response) { 
			deactivatePageLoading();
			callFailRequestModal();
		}
	});
	
	/* ON SUBMIT - Hide Modal and Activate Loading */
	function initializePageForMarkAsDone() {
		$('#viewincoming_dialog').modal('hide');
		activatePageLoading('Updating Document Status');
		return true;
	}
	
	/* Fix Elements on Modal Hide */
	function reinitializeMarkAsDone() {
		$('#mark_as_done_form').hide();
		$('#mark_as_done_conf').hide();
		$('#mark_as_done_btn').prop("disabled", false);
	}