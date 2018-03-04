/**
 * 
 */
	var localDocumentsData = [];
	var currentCursor = 0;
	var maxCursor = 0;
	
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
	    getDocumentsThread(data.id);
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
				removeCSSClass('#thread_loading', 'active');
			}
		}) 
		.fail(function(response) {
			$('#fail_request_message').show();
			removeCSSClass('#thread_loading', 'active');
		});
	}
	
	/* GET - Load More Data */
	$('#load_more_data_btn').click(function() {
		maxCursor = currentCursor + 5;
		
		for(currentCursor; (currentCursor < maxCursor) && !(localDocumentsData[currentCursor] == undefined); currentCursor++) {
			console.log('CURRENT CURSOR: ' + currentCursor);
			console.log(localDocumentsData[currentCursor]);
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
			getIncomingDocumentsData($(this).attr('id'));
			
		    $('#viewincoming_dialog').modal({
				closable: false,
				observeChanges: true,
				autofocus: false,
				onHidden: function() {
					$('#viewincoming_due').text('');
				}
			}).modal('show');
		});
	}
	
	/* GET - Populate Dialog For View File */
	function getIncomingDocumentsData(id) {
		var selectedData = localDocumentsData[id];
		console.log(selectedData);
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
	}