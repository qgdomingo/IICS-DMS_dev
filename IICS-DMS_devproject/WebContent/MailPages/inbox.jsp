<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	String userType = "";
	
	boolean restrictionCase1 = false;
	boolean restrictionCase2 = false;

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} 
		
		// Restriction Case 1 - not allowed for Faculty, Supervisor and Staff
		if(userType.equalsIgnoreCase("Faculty") || userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) { 
			restrictionCase1 = true;
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
		<title>Inbox | IICS DMS</title>
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
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
	<%  } %>
			    	<a class="item active" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!restrictionCase1) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
	<%  } %>
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
	<%  } %>
		    	</div>
		    </div>
	<% if(!restrictionCase1) { %>
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
					<i class="large inbox icon"></i>
					Inbox
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

		<% if(userType.equalsIgnoreCase("Director")) { %>
		<div class="ui secondary pointing menu element-rmt">
			<a class="item active" href="${pageContext.request.contextPath}/mail/inbox.jsp">
				<i class="folder open icon"></i>
				Internal Inbox
			</a>
			<a class="item" href="${pageContext.request.contextPath}/mail/externalinbox.jsp">
				<i class="folder icon"></i>
				External Inbox
			</a>
		</div>
		<% } %>

		<div class="ui segment">
			<div class="ui dimmer" id="inbox_loading">
				<div class="ui text loader">Retrieving Inbox</div>
			</div>
		
			<!-- SEARCH AREA -->
			<form class="ui form">
				<div class="six fields">
						
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach Mail" id="search_mail"/>
							<i class="search icon"></i>
						</div>
					</div>
						
					<!-- MAIL TYPE BOX -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_type">
							<option value="">Mail Type</option>
							<option value="Memo">Memo</option>
							<option value="Letter">Letter</option>
							<option value="Notice Of Meeting">Notice Of Meeting</option>
						</select>
					</div>	
						
					<!-- MAIL SENT FROM -->
					<div class="field">
						<div class="ui calendar" id="search_sentfrom_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Received From" id="search_sentfrom"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
								
					<!-- MAIL SENT TO -->
					<div class="field">
						<div class="ui calendar" id="search_sentto_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Received To" id="search_sentto"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
										
					<!-- ACAD YEAR BOX -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_acad_year">
							<option value="">Academic Year</option>
						</select>
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
			<table class="ui compact selectable table" id="inbox_table">
				<thead>
					<tr>
						<th>Sender</th>
						<th>Subject</th>
						<th>Type</th>
						<th>ISO</th>
						<th>Academic Year</th>
						<th>Timestamp</th>
					</tr>
				</thead>
				<tbody id="inbox_tablebody"></tbody>			
			</table>	
		
		</div>
			
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW MAIL -->
		<div class="ui modal" id="view_mail_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="envelope icon"></i>
					View Mail
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui stackable grid">
					<div class="eight wide column">
						<p class="element-rmb"><b>Sender: </b><span id="view_mail_sender"></span></p>
						<p class="element-rmb"><b>Subject: </b><span id="view_mail_subject"></span></p>
						<p class="element-rmb"><b>Mail Type: </b><span id="view_mail_type"></span></p>
						<p class="element-rmb"><b>Academic Year: </b><span id="view_mail_acad_year"></span></p>
						<p class="element-rmb"><b>ISO Number: </b><span id="view_mail_iso_number"></span></p>
						<p><b>Mail Timestamp: </b><span id="view_mail_timestamp"></span></p>
						
						<form method="GET" action="${pageContext.request.contextPath}/ViewPdf">
							<input type="hidden" name="id" id="view_mail_id">

							<button class="ui fluid small button" type="submit">
								<i class="envelope icon icon"></i>View Mail
							</button>
						</form>
					</div>
					
					<div class="eight wide column">
						<!-- ACKNOWLEDGEMENT FORM -->
						<form class="ui form" method="POST" action="${pageContext.request.contextPath}/UpdateAcknowledgeTimeStamp" 
								id="acknowledge_form">
							<input type="hidden" name="mail_id" id="acknowledge_mail_id">
						
							<div class="ui checkbox" id="confirmation_checkbox" style="margin-bottom: 14px;">
								<label>I have read and understood this mail I received.</label>
  								<input type="checkbox" name="confirmation" />
							</div>
							<div class="field element-rmb">
								<label>Remarks:</label>
								<textarea name="remark" id="acknowledge_remarks" rows="2"></textarea>
							</div>
							<button type="submit" class="ui tiny fluid green button">
								<i class="check icon"></i>
								Submit
							</button>
							
							<div class="ui error message"></div>
							
							<div class="ui orange message" id="ack_orange_message">
								<i class="close icon" id="close_ack_orange_message"></i>
								<div class="header">Failed to Update Acknowledgement.</div>
							</div>
						</form>
						
						<div class="ui green message" id="ack_green_message">
							<i class="close icon" id="close_ack_green_message"></i>
							<div class="header">Acknowledgment updated!</div>
						</div>

						<!-- ACKNOWLEGED FORM -->
						<div class="ui segment" id="acknowledgement_info">
							<p class="element-rmb"><b>Status: </b><span id="view_mail_acknowledgment_status"></span></p>
							<p class="element-rmb"><b>Acknowledge Timestamp: </b><span id="view_mail_acknowledgement_timestamp"></span></p>
							<p><b>Acknowledge Remarks: </b><span id="view_mail_acknowledgement_remarks"></span></p>
						</div>
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
	<script src="${pageContext.request.contextPath}/resource/js/session/non_admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/retrieve_acad_year.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/mail/internal_inbox.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/notifications.js"></script>
</html>