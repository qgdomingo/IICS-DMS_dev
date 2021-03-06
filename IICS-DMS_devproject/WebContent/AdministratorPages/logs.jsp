<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		
		if( !(acc.getUserType().equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Log Files | IICS DMS</title>
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
			<a class="item mobile only user-account-bgcolor" href="profile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item" href="${pageContext.request.contextPath}/admin/manageusers.jsp">
		      <i class="large users icon side"></i>User Management
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/acadyear.jsp">
		      <i class="large student icon side"></i>Academic Year
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/archive.jsp">
		      <i class="large archive icon side"></i>Archive Documents
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/admin/logs.jsp">
		      <i class="large file text icon side"></i>Log Files
		    </a>
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
					<i class="large file text icon"></i>
					Log Files
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="profile.jsp">
						<h5 class="ui header">
						  <i class="large user circle icon user-account-color"></i>
						  <div class="content user-account-color">
						    <%= acc.getFullName() %>
						    <div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
						  </div>
						</h5>
					</a>
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->

		<div class="ui segment">
			<div class="ui dimmer" id="logs_loading">
				<div class="ui text loader">Retrieving Logs</div>
			</div>
		
			<!-- SEARCH ROW -->
			<form class="ui form">
				<div class="seven fields">
					
					<!-- LOG SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Find Log" id="search_log"/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- LOG TYPE DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_log_type">
							<option value="">Log Type</option>
							<option value="System">System Logs</option>
							<option value="Error">Error Logs</option>
						</select>
					</div>
					
					<!-- TIMESTAMP FROM BOX -->
					<div class="field">
						<div class="ui calendar" id="search_timestamp_from_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Log Timestamp From" id="search_timestamp_from"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- TIMESTAMP TO BOX -->
					<div class="field">
						<div class="ui calendar" id="search_timestamp_to_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Log Timestamp To" id="search_timestamp_to"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- USER TYPE DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_user_type">
							<option value="">User Type</option>
							<option value="Director">Director</option>
							<option value="Faculty Secretary">Faculty Secretary</option>
							<option value="Department Head">Department Head</option>
							<option value="Faculty">Faculty</option>
							<option value="Staff">Staff</option>
						</select>
					</div>
					
					<!-- DEPARTMENT DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_department">
							<option value="">Department</option>
							<option value="Computer Science">Computer Science</option>
							<option value="Information Technology">Information Technology</option>
							<option value="Information Systems">Information Systems</option>
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
			<table class="ui compact selectable table" id="logs_table">
				<thead>
					<tr>
						<th>Log Timestamp</th>
						<th>Log Type</th>
						<th>Log Information</th>
						<th>User</th>
						<th>User Type</th>
						<th>Department</th>
					</tr>
				</thead>
				<tbody id="logs_tablebody"></tbody>			
			</table>

		</div>

<!-- END OF ACTUAL PAGE CONTENTS -->
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
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/view_logs.js"></script>
</html>