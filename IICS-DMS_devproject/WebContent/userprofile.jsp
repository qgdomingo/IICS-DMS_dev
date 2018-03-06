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
		<title>User Profile | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/master.css">
		<link rel="stylesheet" href="resource/css/generalpages.css">
		
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
			<a class="item mobile only user-account-bgcolor" href="userprofile.jsp">
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
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstats.jsp">
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
					<i class="large user icon"></i>
					User Profile
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="userprofile.jsp">
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
		<div class="ui centered grid container">
				<div class="ui center aligned eight wide computer eight wide table sixteen wide mobile column">
					<h2 class="ui icon header">
						<i class="circular user icon"></i>
						<div class="content"><%= acc.getFullName() %></div>
						<div class="sub header"><%= acc.getUserType() %></div>
				<% if(!userType.equalsIgnoreCase("Director") && !userType.equalsIgnoreCase("Faculty Secretary") 
					&& !userType.equalsIgnoreCase("Staff") && !userType.equalsIgnoreCase("Supervisor")) { %>	
						<div class="sub header"><%= acc.getDepartment() %> Department</div>
				<% } %>
					</h2><br>
					
					<div class="ui red mini statistic">
						<div class="value">
							<%= acc.getFacultyNumber() %>
						</div>
						<div class="label">
							Faculty No.
						</div>
					</div><br>
					
					<div class="ui red mini statistic">
						<div class="value" style="text-transform: none;">
							<%= acc.getEmail() %>
						</div>
						<div class="label">
							Email Address
						</div>
					</div><br>
					
					<div class="actions">
						<button class="ui labeled icon orange button element-mb" id="edit_user_profile">
							<i class="edit icon"></i>
							Edit User Profile
						</button>
						<button class="ui labeled icon grey button element-mb" id="change_password">
							<i class="lock icon"></i>
							Change Password
						</button>
					</div>
					
				</div>
				<br>
			</div>
		
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- EDIT USER PROFILE MODAL -->
		<div class="ui tiny modal" id="edit_profile_dialog">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="edit icon"></i>
					Edit User Profile
				</h3> 
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" id="edit_profile_form">
					<div class="two fields">
						<div class="required field">
							<label>Faculty No.:</label>
							<input type="text" name="faculty_no" value="<%= acc.getFacultyNumber() %>"/>
						</div>
						<div class="field">
							<label>Title:</label>
							<input type="text" name="title" value=""/>
						</div>
					</div>
					<div class="two fields">
						<div class="required field">
							<label>First Name:</label>
							<input type="text" name="first_name" value="<%= acc.getFirstName() %>"/>
						</div>
						<div class="required field">
							<label>Last Name:</label>
							<input type="text" name="last_name" value="<%= acc.getLastName() %>"/>
						</div>
					</div>
					<div class="two fields">
						<div class="required field">
							<label>Email:</label>
							<input type="email" name="email" value="<%= acc.getEmail() %>"/>
						</div>
						<div class="field">
							<label>Cellphone Number:</label>
							<input type="text" name="cellphone_number" placeholder="09000000000" value=""/>
						</div>
					</div>
					<p class="element-rmb">For authentication, please enter your account password.</p>
					<div class="required field">
						<label>Password:</label>
						<input type="password" name="current_password"/>
					</div>
					
					<div class="ui orange message" id="invalid_email_message">
						The email address you entered already exists
					</div>
					<div class="ui orange message" id="invalid_password_message">
						The password you entered is incorrect
					</div>
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="edit_profile_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>				
				<button class="ui green button" type="submit" form="edit_profile_form" id="edit_profile_submit">
					<i class="checkmark icon"></i>
					Confirm Edit
				</button>
			</div>
		</div>
		
		<!-- CHANGE PASSWORD MODAL -->
		<div class="ui tiny modal" id="change_password_dialog">
			<div class="header grey-modal">
				<h3 class="ui header grey-modal">
					<i class="lock icon"></i>
					Change Password
				</h3> 
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" id="change_password_form">
					<div class="ui message">
						<div class="header">
							Password Rules
						</div>
						<ul class="list">
							<li>Your password must be at least 6 characters in length</li>
						</ul>
					</div>
					<div class="required field">
						<label>Current Password:</label>
						<input type="password" name="current_password" />
					</div>
					<div class="required field">
						<label>New Password:</label>
						<input type="password" name="new_password" />
					</div>
					<div class="required field">
						<label>Repeat New Password:</label>
						<input type="password" name="repeat_password" />
					</div>
					
					<div class="ui orange message" id="invalid_change_password_message">
						The password you entered is incorrect
					</div>
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="change_password_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>				
				<button class="ui green button" type="submit" form="change_password_form" id="change_password_submit">
					<i class="checkmark icon"></i>
					Confirm Edit
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
	<script src="resource/js/jquery-3.2.1.min.js"></script>
	<script src="resource/semanticui/semantic.min.js"></script>
	<script src="resource/js/jquery.form.min.js"></script>
	<script src="resource/js/master.js"></script>
	<script src="resource/js/generalpages.js"></script>
	<script src="resource/js/profile/regular_user.js"></script>
	<script src="resource/js/profile/changepass_user.js"></script>
</html>