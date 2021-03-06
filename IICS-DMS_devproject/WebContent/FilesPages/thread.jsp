<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	Account acc = new Account();
	String userType = "";
	
	boolean restrictionCase2 = false;

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} else if (userType.equalsIgnoreCase("Faculty")) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
		
		// Restriction Case 2 - not allowed for Supervisor and Staff
		if(userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
			restrictionCase2 = true;
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Documents Thread | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/generalpages.css">
		
		<!-- SITE ICON CONFIGS -->
		<link rel="apple-touch-icon" sizes="180x180" href="${pageContext.request.contextPath}/resource/siteicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resource/siteicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resource/siteicon/favicon-16x16.png">
		<link rel="manifest" href="${pageContext.request.contextPath}/resource/siteicon/site.webmanifest">
		<link rel="mask-icon" href="${pageContext.request.contextPath}/resource/siteicon/safari-pinned-tab.svg" color="#be152f">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="theme-color" content="#ffffff">
	</head>
	<body>
		<!-- LOADING INDICATOR FOR THE WHOLE PAGE -->
		<div class="ui dimmer" id="page_loading">
			<div class="ui huge text loader" id="page_loading_text"></div>
		</div>
		<!-- RETRIEVE CONTEXT PAGE FOR JS -->
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
		
		<!-- LEFT SIDE MENU -->
		<div class="ui large left vertical menu sidebar" id="side_nav">
			<a class="item mobile only user-account-bgcolor" href="${pageContext.request.contextPath}/userprofile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item" href="${pageContext.request.contextPath}/home.jsp">
		      <i class="large home icon side"></i>Home
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/files/fileupload.jsp">
		      <i class="large cloud upload alternate icon side"></i>Upload Document
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
		      <i class="large file icon side"></i>Documents
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
		      <i class="large tasks icon side"></i>Tasks
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/calendar/viewcalendar.jsp">
		      <i class="large calendar alternate outline icon side"></i>Calendar
		    </a>
		    <div class="item">
		   		Mail
		   		<div class="menu">
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
	<%  } %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
	<%  } %>
		    	</div>
		    </div>
	<% if(!restrictionCase2) { %>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstatstask.jsp">
			    		<i class="large bar chart icon side"></i>Semestral Statistics
			    	</a>
		    	</div>
		    </div>
	<%  } %>
		    <a class="item mobile only" id="logout_btn2">
		      <i class="large power icon side"></i>Logout
		    </a>
		</div>
		
		<!-- PAGE CONTENTS -->
		<div class="pusher page-content-spacing page-background">
		
			<!-- TOP MENU -->
			<div class="ui large top inverted borderless fixed menu">
				<a class="item" id="togglenav">
					<i class="large sidebar icon"></i>
				</a>
				<div class="item">
					<i class="large file icon"></i>
					Documents Thread
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="${pageContext.request.contextPath}/userprofile.jsp">
						<h5 class="ui header">
						  <i class="large user circle icon user-account-color"></i>
						  <div class="content user-account-color">
						    <%= acc.getFullName() %>
						    <div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
						  </div>
						</h5>
					</a>
					<a class="item" id="notification_button">
						<i class="large alarm icon"></i>
						<div class="ui circular teal label element-rml" id="notification_count">0</div>
					</a> 
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->
		
		<h2 class="ui dividing header element-rmt">
			<a id="page_origin">
				<i class="black chevron left icon"></i>
			</a>
			View Documents Thread
		</h2>
		
		<h3 class="ui header">
			<i class="user icon"></i>
			<div class="content">
				<span style="color: gray;">Document Source and Recipient: </span>
				<span id="thread_source_recipient"></span>
				<div class="sub header">
					No. of Documents in this thread: <span id="thread_capacity"></span>
				</div>
			</div>
		</h3>
					
		<div class="ui segment">
			<div class="ui dimmer" id="thread_loading">
				<div class="ui text loader">Retrieving Documents Thread</div>
			</div>
			
			<div class="ui icon message" id="fail_request_message">
				<i class="times icon"></i>
  				<div class="content">
      				We are unable to retrieve the documents thread. Please try refreshing the page.
					If the problem persists, please contact your administrator.
  				</div>
			</div>
			
			<div class="ui centered grid" id="thread_area"></div>
			
			<br>
			
			<div class="center-text element-mt" id="load_more_data_btn">
				<button class="ui grey button">
					<i class="sync icon"></i>
					Load More
				</button>
			</div>
		</div> 
			
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>

		<!-- VIEW - INCOMING DOCUMENT -->
		<div class="ui modal" id="viewincoming_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="file icon"></i>
					<div class="content" id="viewincoming_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui stackable grid">
					<div class="eight wide column">
						<p class="element-rmb"><b>Document Source: </b><span id="viewincoming_source"></span></p>
						<p class="element-rmb"><b>Reference No.: </b><span id="viewincoming_refno"></span></p>
						<p class="element-rmb"><b>Action Required: </b><span id="viewincoming_action"></span></p>
						<p class="element-rmb"><b>Action Due: </b><span id="viewincoming_due"></span></p>
						<p class="element-rmb"><b>Status: </b><span id="viewincoming_status"></span></p>
						<br>
						<h5 class="ui horizontal header divider element-rmb element-rmt">
						  <i class="info circle icon"></i>
						  File Details
						</h5>
						<p class="element-rmb"><b>Uploaded By: </b><span id="viewincoming_uploadedby"></span></p>
						<p class="element-rmb"><b>Upload Date: </b><span id="viewincoming_uploaddate"></span></p>
						<p class="element-rmb"><b>Category: </b><span id="viewincoming_category"></span></p>
						<p class="element-rmb"><b>Document Type: </b><span id="viewincoming_type"></span></p>
						<p class="element-rmb"><b>File Name: </b><span id="viewincoming_file"></span></p>
						<p><b>Description: </b><span id="viewincoming_description"></span></p>
						
						<form method="GET" action="${pageContext.request.contextPath}/FileDownload">
							<input type="hidden" name="id" id="viewincoming_download_id">
							<input type="hidden" name="type" id="viewincoming_download_type">
							<input type="hidden" id="viewincoming_threadno">
							<button class="ui fluid small button" type="submit">
								<i class="file icon"></i>View File
							</button>
						</form>
					</div>
					
					<div class="eight wide column">
						<!-- NOTE FORM -->
						<form class="ui form" action="${pageContext.request.contextPath}/UpdateStatus" method="POST" id="edit_note_form">
							<input type="hidden" name="id" id="viewincoming_note_id">
							<input type="hidden" name="type" id="viewincoming_note_type">
						
							<div  class="field element-rmb">
								<label>Note:</label>
								<textarea name="note" rows="2" id="view_incoming_note"></textarea>
							</div>
							<button type="submit"name="button_choice" value="Edit Note" class="ui tiny fluid orange button">
								<i class="pencil icon"></i>
								Edit Note
							</button>
							
							<div class="ui orange message" id="note_orange_message">
								<i class="close icon" id="close_note_orange_message"></i>
								<div class="header">Note update failed.</div>
							</div>
							<div class="ui green message" id="note_green_message">
								<i class="close icon" id="close_note_green_message"></i>
								<div class="header">Note updated!</div>
							</div>
						</form>
						
						<br>
						
						<!-- SET DOCUMENT AS DONE FORM -->
						<form class="ui form" action="${pageContext.request.contextPath}/UpdateStatus" method="POST" id="mark_as_done_form">
							<input type="hidden" name="id" id="viewincoming_done_id">
							<input type="hidden" name="type" id="viewincoming_done_type">
						
							<button class="ui tiny fluid green button" type="button" id="mark_as_done_btn">
								<i class="check icon"></i>
								Mark as Done
							</button>
							<div class="ui compact segment element-rmt" id="mark_as_done_conf">
								<h4>Are you sure you want to set this document as done?</h4>
								<div class="ui buttons">
							 		<button type="submit"name="button_choice" value="Mark as Done" class="ui green button" type="submit">Yes</button>
							  		<div class="or"></div>
							  		<button class="ui button" type="button" id="mark_as_done_no">No</button>
								</div>
							</div>
							
						</form>
					</div>
					
				</div>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewincoming_close">Close</button>
			</div>
		</div>
		
		<!-- NOTIFICATIONS MODAL -->
		<div class="ui tiny modal" id="notification_dialog">
			<div class="header center-text">
				<i class="alarm icon"></i>
				<div class="content">Notifications</div>
			</div>
			<div class="scrolling content">
				<div class="ui relaxed divided selection list" id="notification_list"></div> 
		 	</div>					    	
		    <div class="actions center-text">
		    	<button class="ui blue button" id="mark_all_as_read_btn">
		    		Mark All as Read
		    	</button>
				<button class="ui ok grey button">
					Close
				</button>
			</div>
		</div>
		
		<!-- SUCCESS MESSAGE MODAL -->
		<div class="ui tiny modal" id="successdia">
			<div class="header add-modal">
				<h3 class="ui header add-modal">
					<i class="checkmark icon"></i>
					<div class="content" id="successdia_header"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p id="successdia_content"></p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Okay</button>
			</div>
		</div>
		
		<!-- FAIL MESSAGE MODAL -->
		<div class="ui tiny modal" id="faildia">
			<div class="header delete-modal">
				<h3 class="ui header delete-modal">
					<i class="remove icon"></i>
					<div class="content" id="faildia_header"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p id="faildia_content"></p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Okay</button>
			</div>
		</div>
		
		<!-- LOGOUT MODAL -->
		<div class="ui basic tiny modal" id="logout_dia">
		  <div class="ui icon header">
		    <i class="power icon"></i>
		    Logout
		  </div>
		  <div class="content center-text">
		    <p>Are you sure you want to logout from the system?</p>
		  </div>
		  <div class="actions center-text">
		  	<div class="ui green inverted button" id="logout_submit">
		      <i class="checkmark icon"></i>
		      Yes
		    </div>
		    <div class="ui red basic cancel inverted button">
		      <i class="remove icon"></i>
		      No
		    </div>
		  </div>
		</div>
		
	</body>
	<script src="${pageContext.request.contextPath}/resource/js/jquery-3.2.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/semanticui/semantic.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/non_faculty_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/documents/view_thread.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/notifications.js"></script>
</html>