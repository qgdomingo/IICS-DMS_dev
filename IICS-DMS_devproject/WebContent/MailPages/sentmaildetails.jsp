<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	String userType = "";
	
	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} 
		else if(userType.equalsIgnoreCase("Faculty") || userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}

	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Sent Mail | IICS DMS</title>
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
		    <a class="item" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
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
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
			    	<a class="item active" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
		    	</div>
		    </div>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstatstask.jsp">
			    		<i class="large bar chart icon side"></i>Semestral Statistics
			    	</a>
		    	</div>
		    </div>
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
					<i class="large send icon"></i>
					Sent Mail
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
		
		<h3 class="ui dividing header element-rmt">
			<a href="${pageContext.request.contextPath}/mail/sentmail.jsp">
				<i class="black chevron left icon"></i>
			</a> 
			View Sent Mail Details
		</h3>
		
		<div class="ui segment">
			<div class="ui dimmer" id="sent_mail_loading">
				<div class="ui text loader">Retrieving Sent Mail Details</div>
			</div>
			
			<p class="element-rmb"><b>Sent By: </b><span id="view_mail_sender"></span></p>
			<p class="element-rmb"><b>Subject: </b><span id="view_mail_subject"></span></p>
			<p class="element-rmb"><b>Mail Type: </b><span id="view_mail_type"></span></p>
			<p class="element-rmb"><b>Academic Year: </b><span id="view_mail_acad_year"></span></p>
			<p class="element-rmb"><b>ISO Number: </b><span id="view_mail_iso_number"></span></p>
			<p><b>Mail Timestamp: </b><span id="view_mail_timestamp"></span></p>
			
			<form method="GET" action="${pageContext.request.contextPath}/ViewPdf">
				<input type="hidden" name="id" id="view_mail_id">

				<button class="ui small button" type="submit">
					<i class="envelope icon icon"></i>View Mail
				</button>
			</form>
			
			<h4 class="ui horizontal divider header">
				<i class="users icon"></i>
				Sent To Users
			</h4>
			
			<!-- SEARCH AREA -->
			<form class="ui form">
				<div class="four fields">
						
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach User" id="search_user"/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- ACKNOWLEDGE STATUS BOX -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_status">
							<option value="">Status</option>
							<option value="Unread">Unread</option>
							<option value="Read">Read</option>
							<option value="Acknowledged">Acknowledged</option>
						</select>
					</div>	
					
					<!-- ACKNOWLEDGE Date -->
					<div class="field">
						<div class="ui calendar" id="search_acknowledge_date_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Acknowledged Date" id="search_acknowledge_date"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
										
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button" id="clear_search">
							Clear Search
						</button>
					</div>
				</div>
			</form>
					
			<!-- TABLE AREA -->
			<table class="ui compact selectable table" id="sent_mail_to_table">
				<thead>
					<tr>
						<th>Sent to</th>
						<th>Status</th>
						<th>Acknowledge Timestamp</th>
					</tr>
				</thead>
				<tbody id="sent_mail_to_tablebody"></tbody>			
			</table>	
		
		</div>
		
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW USER ACKNOWLEDGEMENT DETAILS MODAL -->
		<div class="ui tiny modal" id="acknowledgement_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="envelope icon"></i>
					<div class="content">Acknowledgement Details</div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Status: </b><span id="view_mail_acknowledgment_status"></span></p>
				<p class="element-rmb"><b>Acknowledge Timestamp: </b><span id="view_mail_acknowledgement_timestamp"></span></p>
				<p><b>Acknowledge Remarks: </b><span id="view_mail_acknowledgement_remarks"></span></p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
			</div>
		</div>
		
		<!-- VIEW NO USER ACKNOWLEDGEMENT MODAL -->
		<div class="ui tiny modal" id="no_acknowledgement_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="envelope icon"></i>
					<div class="content">Not Acknowledged</div>
				</h3>
			</div>
			<div class="modal-content">
				<p>This user has not acknowledged this mail.</p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
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
	<script src="${pageContext.request.contextPath}/resource/js/session/regular_user_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/mail/internal_sent_details.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/notifications.js"></script>
</html>