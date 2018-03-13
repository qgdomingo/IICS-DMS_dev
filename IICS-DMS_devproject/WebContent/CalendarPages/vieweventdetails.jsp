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
		<title>Event Details | IICS DMS</title>
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
				<h5 class="ui header">
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
		    <a class="item active" href="${pageContext.request.contextPath}/calendar/viewcalendar.jsp">
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
					<i class="large calendar alternate outline icon"></i>
					Event Details
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
			<span id="event_title"></span>
		</h2>
		
		<div class="ui segment">
			<div class="ui dimmer" id="eventdetails_loading">
				<div class="ui text loader">Retrieving Event Details</div>
			</div>
			
			<div id="owner_event_buttons">
				<button class="ui labeled icon orange button element-mb" id="edit_event_btn">
					<i class="edit icon"></i>
					Edit Event
				</button>
			
				<button class="ui labeled icon red button element-mb" id="delete_event_btn">
					<i class="caledar times outline icon"></i>
					Delete Event
				</button>
			</div>
			
			<div id="invited_event_button">
				<button class="ui labeled icon orange button element-mb" id="edit_response_btn">
					<i class="edit icon"></i>
					Edit Response
				</button>
			</div>
			
			<input type="hidden" id="account_email" value="<%= acc.getEmail() %>" />
			<p class="element-rmb"><b>Location: </b><span id="event_location"></span></p>
			<p class="element-rmb"><b>Start Date and Time: </b><span id="event_start_datetime"></span></p>
			<p class="element-rmb"><b>End Date and Time: </b><span id="event_end_datetime"></span></p>
			<p class="element-rmb"><b>Created By: </b><span id="event_createdby"></span></p>
			<p class="element-rmb"><b>Event Description: </b><span id="event_description"></span></p>
			
			<br>
			
			<div id="invited_event_response">
				<p class="element-rmb"><b>Response Status: </b><span id="event_response_status"></span></p>
				<p class="element-rmb"><b>Response Timestamp: </b><span id="event_response_timestamp"></span></p>
				<p class="element-rmb"><b>Response Details: </b><span id="event_response_details"></span></p>
			</div>
			
			
			<div id="owner_invited_users_table">
			
				<h4 class="ui horizontal divider header">
					<i class="users icon"></i>
					Invited Users
				</h4>
				
				<!-- TABLE FILTER -->
				
				<form class="ui form">
					<div class="four fields">
						<div class="field">
							<div class="ui icon input">
								<input type="text" placeholder="Search Responses" id="search_filter"/>
								<i class="search icon"></i>
							</div>
						</div>
						
						<div class="field">
							<select class="ui dropdown" id="response_status_filter">
								<option value="">Status</option>
								<option value="No Response">No Response</option>
								<option value="Declined">Declined</option>
								<option value="Accepted">Accepted</option>
							</select>
						</div>
						
						<div class="field">
							<div class="ui calendar" id="event_response_timestamp_calendar">
								<div class="ui icon input">
									<input type="text" placeholder="Response Timestamp" id="event_response_timestamp_filter"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						
						<div class="field">
							<button type="button" class="ui grey button" id="clear_filter">
								Clear Search
							</button>
						</div>
					</div>
				</form>
	
				<table class="ui compact selectable table" id="invitedusers_table">
					<thead>
						<tr>
							<th>Assigned To</th>
							<th>Response Status</th>
							<th>Response Timestamp</th>
						</tr>
					</thead>
					<tbody id="invitedusers_tablebody"></tbody>		
				</table>
				
			</div>
			
		</div>

		
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW RESPONSE MODAL -->
		<div class="ui tiny modal" id="view_response_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="calendar outline icon"></i>
					<div class="content">Event Response</div>
				</h3>
			</div>
			<div class="modal-content">
				<p><b>User: </b><span id="view_response_user"></span></p>
				<p class="element-rmb"><b>Response Status: </b><span id="view_response_status"></span></p>
				<p class="element-rmb"><b>Response Timestamp: </b><span id="view_response_timestamp"></span></p>
				<p><b>Response Details: </b><span id="view_response_details"></span></p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
			</div>
		</div>
		
		<!-- NO RESPONSE MODAL -->
		<div class="ui tiny modal" id="noresponse_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="calendar outline icon"></i>
					<div class="content">No Response Yet</div>
				</h3>
			</div>
			<div class="modal-content">
				<p>This user has not yet given a response to this event.</p>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
			</div>
		</div>
		
		<!-- EDIT EVENT MODAL -->
		<div class="ui small modal" id="edit_event_modal">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="edit icon"></i>
					Edit Event
				</h3>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/EditEvent" id="edit_event_form">
					<input type="hidden" name="event_id" id="edit_event_id"/>
					<div class="required field">
						<label>Event Title:</label>
						<input type="text" name="event_title" id="edit_event_title"/>
					</div>
					<div class="required field">
						<label>Location:</label>
						<input type="text" name="event_location" id="edit_event_location"/>
					</div>
					<div class="ui checkbox" id="event_all_day_toggle" style="margin-bottom: 14px;">
						<label>All Day Event</label>
  						<input type="checkbox" name="event_all_day" id="edit_event_all_day"/>
					</div>
					<div class="two fields" id="event_datetime_input">
						<div class="required field">
							<label>Start Date and Time:</label>
							<div class="ui calendar" id="event_start_datetime_calendar">
								<div class="ui icon input">
									<input type="text" name="event_start_datetime" id="edit_event_start_datetime"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						<div class="required field">
							<label>End Date and Time:</label>
							<div class="ui calendar" id="event_end_datetime_calendar">
								<div class="ui icon input">
									<input type="text" name="event_end_datetime" id="edit_event_end_datetime"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="two fields" id="event_date_input">
						<div class="required field">
							<label>Start Date:</label>
							<div class="ui calendar" id="event_start_date_calendar">
								<div class="ui icon input">
									<input type="text" name="event_start_date" id="edit_event_start_date"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						<div class="required field">
							<label>End Date:</label>
							<div class="ui calendar" id="event_end_date_calendar">
								<div class="ui icon input">
									<input type="text" name="event_end_date" id="edit_event_end_date"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="required field">
						<label>Event Description:</label>
						<textarea rows="3" name="event_description" id="edit_event_description"></textarea>
					</div>
					<div class="field">
						<label>Invite:</label>
						<div class="ui action input">
							<select class="ui fluid search selection dropdown" multiple="" name="event_invite" id="edit_event_invite">
								<option value="">Select Users</option>
							</select>
						  	<button class="ui orange button" type="button">
						  		<i class="address book outline icon"></i>
						  		Options 
						  	</button>
						</div>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="edit_event_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui orange button" form="edit_event_form" id="edit_event_submit">
					<i class="edit icon"></i>
					Confirm Edit
				</button>
			</div>
		</div>
		
		<!-- DELETE EVENT MODAL -->
		<div class="ui tiny modal" id="delete_event_modal">
			<div class="ui header delete-modal">
				<i class="times icon"></i>
				<div class="content">Delete Event</div>
			</div>
			<div class="modal-content">
				<p class="element-rmb">Are you sure you want to delete this event?</p>
				<p class="element-rmb">Invited users will be notified that the event was deleted.</p>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="delete_event_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui ok red button" type="submit" id="delete_event_submit">
					<i class="checkmark icon"></i>
					Confirm Event Delete
				</button>
			</div>
		</div>
		
		<!-- EDIT RESPONSE MODAL -->
		<div class="ui tiny modal" id="event_response_dialog">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="edit icon"></i>
					Edit Response
				</h3>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/SendInvitationResponse" 
						id="event_response_form">
					<input type="hidden" name="event_id" id="view_event_id" />
					<input type="hidden" name="event_response_timestamp" id="view_event_response_timestamp" />
					
					<div class="field">
						<label>Response Details:</label>
						<textarea rows="3" name="event_response_text"></textarea>
					</div>
					
					<div class="ui error message"></div>
					
					<div class="two ui buttons">
						<button class="ui green button" type="submit" name="event_response" value="Accepted">
							<i class="calendar check outline icon"></i>
							Accept Event
						</button>
						
						<button class="ui red button" type="submit" name="event_response" value="Declined">
							<i class="calendar times outline icon"></i>
							Decline Event
						</button>
					</div>
				</form>
			</div>
			<div class="actions center-text">
				<button class="ui cancel grey button" id="event_response_close">Close</button>
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
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/non_admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/directory.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/calendar/view_event_details.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/calendar/edit_event.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/notifications.js"></script>
</html>