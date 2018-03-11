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
		<title>Calendar | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/fullcalendar/fullcalendar.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.css">
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
					Calendar
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
					<a class="item">
						<i class="large alarm icon"></i>
					</a>
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->

		<div class="ui stackable grid element-rpt">
			<div class="six wide computer sixteen wide tablet sixteen wide mobile column">
				<div class="two ui buttons">
					<button class="ui labeled icon green button" id="add_event_btn">
						<i class="plus icon"></i>
						Add Event 
					</button>
					
					<button class="ui labeled icon orange button" id="event_list_btn">
						<i class="list icon"></i>
						Event List
					</button>
				</div>
				
				<!-- EVENT INVITATION LIST -->
				<h3 class="element-rmb">Event Invitations</h3>
				<div class="ui segment element-rmt" id="invitation_list_segment">
					<!-- LIST -->
					<div class="ui relaxed divided selection list" id="invitation_list"></div>
				</div>
			</div>
			
			<!-- CALENDAR -->
			<div class="ten wide computer sixteen wide tablet sixteen wide mobile column">
				<div id="calendar" style="background: #ffff;"></div>
			</div>
		</div>
		
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- ADD EVENT MODAL -->
		<div class="ui small modal" id="add_event_modal">
			<div class="header add-modal">
				<h3 class="ui header add-modal">
					<i class="plus icon"></i>
					Add Event
				</h3>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/AddEvent" 
						id="add_event_form">
					<div class="required field">
						<label>Event Title:</label>
						<input type="text" name="event_title" />
					</div>
					<div class="required field">
						<label>Location:</label>
						<input type="text" name="event_location" />
					</div>
					<div class="ui checkbox" id="event_all_day_toggle" style="margin-bottom: 14px;">
						<label>All Day Event</label>
  						<input type="checkbox" name="event_all_day" />
					</div>
					<div class="two fields" id="event_datetime_input">
						<div class="required field">
							<label>Start Date and Time:</label>
							<div class="ui calendar" id="event_start_datetime_calendar">
								<div class="ui icon input">
									<input type="text" name="event_start_datetime" id="event_start_datetime"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						<div class="required field">
							<label>End Date and Time:</label>
							<div class="ui calendar" id="event_end_datetime_calendar">
								<div class="ui icon input">
									<input type="text" name="event_end_datetime" id="event_end_datetime"/>
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
									<input type="text" name="event_start_date" id="event_start_date"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						<div class="required field">
							<label>End Date:</label>
							<div class="ui calendar" id="event_end_date_calendar">
								<div class="ui icon input">
									<input type="text" name="event_end_date" id="event_end_date"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="required field">
						<label>Event Description:</label>
						<textarea rows="3" name="event_description"></textarea>
					</div>
					<div class="field">
						<label>Invite:</label>
						<div class="ui action input">
							<select class="ui fluid search selection dropdown" multiple="" name="event_invite" id="event_invite">
								<option value="">Select Users</option>
							</select>
						  	<div class="ui orange buttons" id="directory_options_btn">
						  		<div class="ui button">Options</div>
						  		<div class="ui floating dropdown icon button">
    								<i class="dropdown icon"></i>
								    <div class="menu"> 
								      <div class="item">
								    		<div class="ui checkbox">
												<label>All Users</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="divider"></div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>All Department Head</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>All Faculty</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>All Staff</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>IT Department</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>IS Department</label>
  												<input type="checkbox" />
											</div>
								      </div>
								      <div class="item">
								      		<div class="ui checkbox">
												<label>CS Department</label>
  												<input type="checkbox" />
											</div>
								      </div>
								    </div>
								</div> 
						  	</div> 
						</div>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui button" id="add_event_clear">
					Clear Fields
				</button>
				<button class="ui cancel grey button" id="add_event_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" form="add_event_form" id="add_event_submit">
					<i class="plus icon"></i>
					Add Event
				</button>
			</div>
		</div>
		
		<!-- EVENT INVITATION MODAL -->
		<div class="ui tiny modal" id="event_invitation_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="calendar outline icon"></i>
					Event Invitation
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Event Title: </b><span id="view_event_title"></span></p>
				<p class="element-rmb"><b>Location: </b><span id="view_event_location"></span></p>
				<p class="element-rmb"><b>Start Date and Time: </b><span id="view_event_start_datetime"></span></p>
				<p class="element-rmb"><b>End Date and Time: </b><span id="view_event_end_datetime"></span></p>
				<p class="element-rmb"><b>Invited by: </b><span id="view_event_invited_by"></span></p>
				<p><b>Event Description: </b><span id="view_event_description"></span></p>
				
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/SendInvitationResponse" 
						id="event_response_form">
					<input type="hidden" name="event_id" id="view_event_id" />
					<input type="hidden" name="event_response_timestamp" id="event_response_timestamp"/>
					
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
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/fullcalendar/fullcalendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/directory.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/calendar/view_calendar.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/calendar/add_event.js"></script>
</html>