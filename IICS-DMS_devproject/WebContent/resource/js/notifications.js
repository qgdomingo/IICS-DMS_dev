/**
 * 
 */
	
	$(document).ready( function() {
		getNotifications();
	});

	//$('#notification_count').text(15);
	$('#notification_button').click( function() {
		$('#notification_dialog').modal({
			closable: false,
			observeChanges: true,
			allowMultiple: true,
			centered: false
		}).modal('show')
	});
	
	function getNotifications() {
		
	}
	
	function mapNotification() {
		$('<div class="row">').appendTo('#thread_area')
	}
	
//	<div class="item" id=""> <!-- INDEX ID (row1) -->
//	<div class="right floated content">
//	    <button class="ui blue circular icon button notif_read" id=""> <!-- notif encrypted ID -->
//				<i class="check circle outline icon"></i>
//		</button>
//    </div>
//	<i class="large bullhorn middle aligned icon"></i>
//    <div class="content">
//      	<a class="header">Semantic-Org/Semantic-UI</a>
//      	<div class="description">
//      		Updated 10 mins ago Updated 10 mins ago Updated 10 mins ago Updated 10 mins ago 
//      		Updated 10 mins ago Updated 10 mins ago Updated 10 mins ago Updated 10 mins ago 
//      	</div>
//      	<div class="description">Updated 10 mins ago</div>
//    </div>
//</div>
//	

	
//		.append($('<div class="right floated ten wide computer twelve wide tablet sixteen wide mobile column">')
//			.append($('<div class="ui orange segment">')
//				.append($('<h3>').text( data.title ))
//				.append($('<div class="ui grid stackable">')
//					.append($('<div class="row">')
//						.append($('<div class="left floated eight wide column">')	
//							.append($('<p class="element-rmb">')
//								.append('<b>Upload by: </b>' + data.createdBy + ' <i>(' + data.email + ')</i>')
//							)
//							.append($('<p class="element-rmb">')
//								.append('<b>Upload Date: </b>' + data.timeCreated)
//							)
//							.append($('<p class="element-rmb">')
//								.append('<b>Category: </b>' + data.category)
//							)
//						)
//						.append($('<div class="right floated eight wide column">')	
//							.append($('<p class="element-rmb">')
//								.append('<b>File Name: </b>' + data.fileName)
//							)
//							.append($('<p class="element-rmb">')
//								.append('<b>Description: </b>' + data.description)
//							)
//						)
//					)
//				)
//				.append('<br>')
//				.append($('<form method="GET" action="' + getContextPath() + '/FileDownload">')
//					.append('<input type="hidden" name="id" value="'+ data.id +'">')
//					.append('<input type="hidden" name="type" value="'+ data.type +'">')
//					.append($('<button class="ui fluid small button" type="submit">')
//							.append('<i class="file icon"></i>View File')
//					)
//				)
//				
//			)
//		)	

	function getNotificationLink(page) {
		
	}