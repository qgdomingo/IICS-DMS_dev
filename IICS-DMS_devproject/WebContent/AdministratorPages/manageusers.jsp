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
		<title>User Management | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
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
			<a class="item mobile only user-account-bgcolor" href="${pageContext.request.contextPath}/admin/profile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item active" href="${pageContext.request.contextPath}/admin/manageusers.jsp">
		      <i class="large users icon side"></i>User Management
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/acadyear.jsp">
		      <i class="large student icon side"></i>Academic Year
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/archive.jsp">
		      <i class="large archive icon side"></i>Archive Documents
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/logs.jsp">
		      <i class="large file text icon side"></i>Log Files
		    </a>
		    <a class="item mobile only" id="logout_btn2">
		      <i class="large power icon side"></i>Logout
		    </a>
		</div>
		
		<!-- PAGE CONTENTS -->
		<div class="pusher page-content-spacing page-background">
		
			<!-- TOP MENU -->
			<div class="ui top inverted borderless fixed menu">
				<a class="item" id="togglenav">
					<i class="large sidebar icon"></i>
				</a>
				<div class="item">
					<i class="large users icon"></i>
					User Management
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="${pageContext.request.contextPath}/admin/profile.jsp">
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
			<!-- SEARCH ROW -->
			<form class="ui form" id="search_form">
				<div class="five fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach User.." id="search_textfield"/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- USER TYPE DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_usertype">
							<option value="">User Type</option>
							<option value="Director">Director</option>
							<option value="Faculty Secretary">Faculty Secretary</option>
							<option value="Department Head">Department Head</option>
							<option value="Faculty">Faculty</option>
							<option value="Supervisor">Supervisor</option>
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
					
					<!-- STATUS DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_status">
							<option value="">Status</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>
					
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button" id="search_clear">
							Clear Search
						</button>
					</div>
					
				</div>
			</form>
			
			<!-- ACTION ROW -->
			<button class="ui labeled icon green button element-mb" id="adduser_btn">
				<i class="add user icon"></i>
				Add User
			</button>
				
			<button class="ui labeled icon orange button element-mb" id="edituser_btn">
				<i class="edit icon"></i>
				Edit User
			</button>
				
			<button class="ui labeled icon blue button element-mb" id="enableuser_btn">
				<i class="check circle icon"></i>
				Enable User/s
			</button>
				
			<button class="ui labeled icon red button element-mb" id="disableuser_btn">
				<i class="remove circle icon"></i>
				Disable User/s
			</button>
			
			<div class="dimmable">
				<div class="ui active inverted dimmer" id="table-loading">
					<div class="ui text loader">Loading</div>
				</div>
				<!-- TABLE AREA -->
				<table class="ui compact selectable table" id="userstable">
						<thead>
							<tr>
								<th>Faculty No.</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>User Type</th>
								<th>Department</th>
								<th>Status</th>
								<th>Creation Timestamp</th>
							</tr>
						</thead>
						<tbody id="usertable-body"></tbody>		
				</table>	
			</div>
		
		<br>
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- ADD USER MODAL -->
		<div class="ui small modal" id="adduser_dia">
			<div class="ui header add-modal">
				<i class="add user icon"></i>
				<div class="content">Add User</div>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/AddUser"
					id="adduser_form">
					<div class="two fields">
						<div class="required field">
							<label>Faculty No.</label>
							<input type="text" name="faculty_no"/>
						</div>
						<div class="field">
							<label>Title:</label>
							<input type="text" name="title"/>
						</div>
					</div>
					
					<div class="three fields">
						<div class="required six wide field"">
							<label>First Name</label>
							<input type="text" name="first_name"/>
						</div>
						<div class="required six wide field">
							<label>Last Name</label>
							<input type="text" name="last_name"/>
						</div>
						<div class="four wide field">
							<label>Middle Initial</label>
							<input type="text" name="middle_initial"/>
						</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>Email Address</label>
							<input type="email" name="email"/>
						</div>
						<div class="field">
							<label>Cellphone Number</label>
							<input type="text" name="cellphone_number" placeholder="09000000000"/>
						</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>User Type</label>
							<select class="ui fluid dropdown" name="user_type" id="add_usertype">
								<option value="">Select User Type</option>
								<option value="Director">Director</option>
								<option value="Faculty Secretary">Faculty Secretary</option>
								<option value="Department Head">Department Head</option>
								<option value="Faculty">Faculty</option>
								<option value="Supervisor">Supervisor</option>
								<option value="Staff">Staff</option>
							</select>
						</div>
						<div class="required field" id="add_department_field">
							<label>Department</label>
							<select class="ui fluid dropdown" name="department" id="add_department">
								<option value="">Select Department</option>
								<option value="Information Technology">Information Technology</option>
								<option value="Computer Science">Computer Science</option>
								<option value="Information Systems">Information Systems</option>
							</select>
						</div>
					</div>
					
					<div class="ui orange message" id="add_invalid_email_message">
						The email address you entered already exists
					</div>
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui button" id="adduser_clear"> 
					Clear Fields
				</button>
				<button class="ui cancel grey button" id="adduser_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" type="submit" form="adduser_form" id="adduser_submit">
					<i class="checkmark icon"></i>
					Submit
				</button>
			</div>
		</div>
		
		<!-- EDIT USER MODAL -->
		<div class="ui small modal" id="edituser_dia">
			<div class="ui header edit-modal">
				<i class="edit icon"></i>
				<div class="content">Edit User</div>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/EditUser" 
						id="edituser_form">
					<input type="hidden" name="original_email" id="edit_original_email"/>
				
					<div class="two fields">
						<div class="required field">
							<label>Faculty No.</label>
							<input type="text" name="faculty_no" id="edit_facultyno"/>
						</div>
						<div class="field">
							<label>Title:</label>
							<input type="text" name="title" id="edit_title"/>
						</div>
					</div>
					
					<div class="three fields">
						<div class="required six wide field">
							<label>First Name</label>
							<input type="text" name="first_name" id="edit_firstname"/>
						</div>
						<div class="required six wide field">
							<label>Last Name</label>
							<input type="text" name="last_name" id="edit_lastname"/>
						</div>
						<div class="four wide field">
							<label>Middle Initial</label>
							<input type="text" name="middle_initial" id="edit_middleinitial"/>
						</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>Email Address</label>
							<input type="email" name="email" id="edit_email"/>
						</div>
						<div class="field">
							<label>Cellphone Number</label>
							<input type="text" name="cellphone_number" id="edit_cellphone_number"  placeholder="09000000000"/>
						</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>User Type</label>
							<select class="ui fluid dropdown" name="user_type" id="edit_usertype">
								<option value="">Select User Type</option>
								<option value="Director">Director</option>
								<option value="Faculty Secretary">Faculty Secretary</option>
								<option value="Department Head">Department Head</option>
								<option value="Faculty">Faculty</option>
								<option value="Supervisor">Supervisor</option>
								<option value="Staff">Staff</option>
							</select>
						</div>
						<div class="required field" id="edit_department_field">
							<label>Department</label>
							<select class="ui fluid dropdown" name="department" id="edit_department">
								<option value="">Select Department</option>
								<option value="Information Technology">Information Technology</option>
								<option value="Computer Science">Computer Science</option>
								<option value="Information Systems">Information Systems</option>
							</select>
						</div>
					</div>
					
					<div class="ui orange message" id="edit_invalid_email_message">
						The email address you entered already exists
					</div>
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="edituser_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" type="submit" form="edituser_form" id="edituser_submit">
					<i class="checkmark icon"></i>
					Confirm Edit
				</button>
			</div>
		</div>
		
		<!-- ENABLE USER MODAL -->
		<div class="ui tiny modal" id="enableuser_dia">
			<div class="ui header neutral-modal">
				<i class="check circle icon"></i>
				<div class="content">Enable User/s</div>
			</div>
			<div class="modal-content">
				<p class="element-rmb">Are you sure you want to enable the selected user/s?</p>
				<p class="microcopy-hint">Enabling users would make them able to login into the system.</p>
				
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/EnableUser" 
						id="enableuser_form"> 
					<input type="hidden" name="selected[]" id="enable_user_selected" />
					
					<div class="required field">
						<label>Purpose of Enable Users</label>
						<textarea rows="2" name="enable_user_purpose"></textarea>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="enableuser_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui blue button" type="submit" form="enableuser_form" id="enableuser_submit">
					<i class="checkmark icon"></i>
					Confirm Enable
				</button>
			</div>
		</div>
		
		<!-- DISABLE USER MODAL -->
		<div class="ui tiny modal" id="disableuser_dia">
			<div class="ui header delete-modal">
				<i class="remove circle icon"></i>
				<div class="content">Disable User/s</div>
			</div>
			<div class="modal-content">
				<p class="element-rmb">Are you sure you want to disable the selected user/s?</p>
				<p class="microcopy-hint">Disabling users would prevent them from logging into the system.</p>
				
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/DisableUser" 
						id="disableuser_form"> 
					<input type="hidden" name="selected[]" id="disable_user_selected" />
					
					<div class="required field">
						<label>Purpose of Disabling Users</label>
						<textarea rows="3" name="disable_user_purpose"></textarea>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="disableuser_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui red button" type="submit" form="disableuser_form" id="disableuser_submit">
					<i class="checkmark icon"></i>
					Confirm Disable
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
	<script src="${pageContext.request.contextPath}/resource/js/session/admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/manageusers/edit_user.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/manageusers/manage_users.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/manageusers/add_user.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/manageusers/enable_disable_user.js"></script>
</html>