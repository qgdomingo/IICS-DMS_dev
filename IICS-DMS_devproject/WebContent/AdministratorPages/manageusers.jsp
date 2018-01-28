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
		<link rel="stylesheet" href="../resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="../resource/css/master.css">
		<link rel="stylesheet" href="../resource/css/generalpages.css">
	</head>
	<body>
		<!-- LEFT SIDE MENU -->
		<div class="ui large left vertical menu sidebar" id="side_nav">
			<a class="item mobile only user-account-bgcolor" href="profile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						Admin
						<div class="sub header user-accountsub-color">Administrator</div>
					</div>
				</h5>
			</a>
			<a class="item active" href="manageusers.jsp">
		      <i class="large users icon side"></i>User Management
		    </a>
		    <a class="item" href="acadyear.jsp">
		      <i class="large student icon side"></i>Academic Year
		    </a>
		    <a class="item" href="archive.jsp">
		      <i class="large archive icon side"></i>Archive Documents
		    </a>
		    <a class="item" href="logs.jsp">
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
					<a class="item user-account-bgcolor mobile hidden" href="profile.jsp">
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
			<form action="../ManageUserRedirect" method="post">
			
				<input type="submit" name ="buttonPress" value="Add User"/>
				<input type="submit" name ="buttonPress" value="Edit User"/>
				<input type="submit" name ="buttonPress" value="Enable User"/>
				<input type="submit" name ="buttonPress" value="Disable User"/>
				
				
				<table class="ui sortable table">
					<thead>
						<tr>
							<th></th>
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
	<script src="../resource/js/jquery-3.2.1.min.js"></script>
	<script src="../resource/semanticui/semantic.min.js"></script>
	<script src="../resource/js/tablesort.js"></script>
	<script src="../resource/js/generalpages.js"></script>
</html>