<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
 
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="com.ustiics_dms.controller.manageuser.ManageUserFunctions"%> 
<!DOCTYPE html>
<html>
	<head>
		<title>User Management | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/generalpages.css">
	</head>
	<body>
		<!-- LEFT SIDE MENU -->
		<div class="ui large left vertical menu sidebar" id="side_nav">
			<a class="item mobile only user-account-bgcolor" href="${pageContext.request.contextPath}/admin/profile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						Admin
						<div class="sub header user-accountsub-color">Administrator</div>
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
						    Admin
						    <div class="sub header user-accountsub-color">Administrator</div>
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
			<form class="ui form">
				<div class="inline fields">
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach User.."/>
							<i class="search icon"></i>
						</div>
					</div>
					<div class="field">
						<select class="ui dropdown">
							<option value="none">User Type</option>
							<option value="dir">Director</option>
							<option value="sec">Faculty Secretary</option>
							<option value="dep">Department Head</option>
							<option value="fac">Faculty</option>
							<option value="sta">Staff</option>
						</select>
					</div>
					<div class="field">
						<select class="ui dropdown">
							<option value="none">Department</option>
							<option value="cs">Computer Science</option>
							<option value="it">Information Technology</option>
							<option value="is">Information Systems</option>
						</select>
					</div>
					<div class="field">
						<select class="ui dropdown">
							<option value="none">Status</option>
							<option value="ac">Active</option>
							<option value="inac">Inactive</option>
						</select>
					</div>
					<button class="ui grey button" type="button">
						Search
					</button>
				</div>
			</form>
			
			<!-- ACTION ROW -->
			<button class="ui labeled icon green button" id="adduser_btn">
				<i class="add user icon"></i>
				Add User
			</button>
				
			<button class="ui labeled icon orange button" id="edituser_btn">
				<i class="write square icon"></i>
				Edit User
			</button>
				
			<button class="ui labeled icon blue button" id="enableuser_btn">
				<i class="add check circle icon"></i>
				Enable User/s
			</button>
				
			<button class="ui labeled icon red button" id="disableuser_btn">
				<i class="add remove circle icon"></i>
				Disable User/s
			</button>

			<!-- TABLE AREA -->
			<form action="${pageContext.request.contextPath}/ManageUserRedirect" method="post">
			
				<input type="submit" name ="buttonPress" value="Add User"/>
				<input type="submit" name ="buttonPress" value="Edit User"/>
				<input type="submit" name ="buttonPress" value="Enable User"/>
				<input type="submit" name ="buttonPress" value="Disable User"/>
				
				
				<table class="ui definition sortable table">
					<thead>
						<tr>
							<th></th>
							<th>Timestamp</th>
							<th>Faculty No.</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>User Type</th>
							<th>Department</th>
							<th>Status</th>
						</tr>
					</thead>
					<% 
						ResultSet accounts = ManageUserFunctions.viewAccounts();
						while(accounts.next()) { 
					%>
					<tr>
						<td class="collapsing">
							<div class="ui fitted checkbox">
								<input type="checkbox" name="selected" value="<%=accounts.getString("email")%>" >
							</div>
						</td>
						<td>timestamp</td>
						<td><%=accounts.getString("faculty_number")%></td>
						<td><%=accounts.getString("first_name")%></td>
						<td><%=accounts.getString("last_name")%></td>
						<td><%=accounts.getString("email")%></td>
						<td><%=accounts.getString("user_type")%></td>
						<td><%=accounts.getString("department")%></td>
						<td><%=accounts.getString("status")%></td>
					</tr>
					<% } %>
				</table>
			</form>
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- ADD USER MODAL -->
		<div class="ui modal" id="adduser_dia">
			<div class="ui icon header">
				<i class="add user icon"></i>
				<div class="content">Add User</div>
			</div>
			<div class="modal-content">
				<form>
					
				</form>
			</div>
			<div class="actions">
				
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
		  	<div class="ui green inverted button">
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
	<script src="${pageContext.request.contextPath}/resource/js/tablesort.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
</html>