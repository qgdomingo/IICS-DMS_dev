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
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
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
				<div class="five fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach User.."/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- USER TYPE DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown">
							<option value="none">User Type</option>
							<option value="dir">Director</option>
							<option value="sec">Faculty Secretary</option>
							<option value="dep">Department Head</option>
							<option value="fac">Faculty</option>
							<option value="sta">Staff</option>
						</select>
					</div>
					
					<!-- DEPARTMENT DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown">
							<option value="none">Department</option>
							<option value="cs">Computer Science</option>
							<option value="it">Information Technology</option>
							<option value="is">Information Systems</option>
						</select>
					</div>
					
					<!-- STATUS DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown">
							<option value="none">Status</option>
							<option value="ac">Active</option>
							<option value="inac">Inactive</option>
						</select>
					</div>
					
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button">
							Search
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
				<i class="write square icon"></i>
				Edit User
			</button>
				
			<button class="ui labeled icon blue button element-mb" id="enableuser_btn">
				<i class="add check circle icon"></i>
				Enable User/s
			</button>
				
			<button class="ui labeled icon red button element-mb" id="disableuser_btn">
				<i class="add remove circle icon"></i>
				Disable User/s
			</button>
			
			<div class="dimmable">
				<div class="ui active inverted dimmer" id="table-loading">
					<div class="ui text loader">Loading</div>
				</div>
				<!-- TABLE AREA -->
				<table class="ui compact selectable definition sortable table">
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
								<th>Creation Timestamp</th>
							</tr>
						</thead>
						<tbody id="usertable-body"></tbody>		
				</table>	
			</div>

<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- ADD USER MODAL -->
		<div class="ui modal" id="adduser_dia">
			<div class="ui header add-modal">
				<i class="add user icon"></i>
				<div class="content">Add User</div>
			</div>
			<div class="modal-content">
				<form class="ui form" id="adduser_form">
					<div class="fields">
					<div class="four wide required field">
						<label>Faculty No.</label>
						<input type="number" id="add_facultyno" required />
					</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>First Name</label>
							<input type="text" id="add_firstname" required />
						</div>
						<div class="required field">
							<label>Last Name</label>
							<input type="text" id="add_lastname" required />
						</div>
					</div>
					
					<div class="three fields">
						<div class="eight wide required field">
							<label>Email Address</label>
							<input type="email" id="add_email" required />
						</div>
						
							<div class="four wide required field">
								<label>User Type</label>
								<select class="ui fluid dropdown" id="add_usertype">
									<option value="">Select User Type</option>
									<option value="Director">Director</option>
									<option value="Secretary">Faculty Secretary</option>
									<option value="Head">Department Head</option>
									<option value="Faculty">Faculty</option>
									<option value="Staff">Staff</option>
								</select>
							</div>
							<div class="four wide field">
								<label>Department</label>
								<select class="ui fluid dropdown" id="add_department">
									<option value="">Select Department</option>
									<option value="IT">Information Technology</option>
									<option value="CS">Computer Science</option>
									<option value="IS">Information Systems</option>
								</select>
							</div>
			
					</div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" id="adduser_submit">
					<i class="checkmark icon"></i>
					Submit
				</button>
			</div>
		</div>
		
		<!-- EDIT USER MODAL -->
		<div class="ui modal" id="edituser_dia">
			<div class="ui header edit-modal">
				<i class="write icon"></i>
				<div class="content">Edit User</div>
			</div>
			<div class="modal-content">
				<form class="ui form" id="edituser_form">
					<div class="fields">
					<div class="four wide required field">
						<label>Faculty No.</label>
						<input type="number" required />
					</div>
					</div>
					
					<div class="two fields">
						<div class="required field">
							<label>First Name</label>
							<input type="text" required />
						</div>
						<div class="required field">
							<label>Last Name</label>
							<input type="text" required />
						</div>
					</div>
					
					<div class="three fields">
						<div class="eight wide required field">
							<label>Email Address</label>
							<input type="email" required />
						</div>
						
							<div class="four wide required field">
								<label>User Type</label>
								<select class="ui fluid dropdown">
									<option value="">Select User Type</option>
									<option value="Director">Director</option>
									<option value="Secretary">Faculty Secretary</option>
									<option value="Head">Department Head</option>
									<option value="Faculty">Faculty</option>
									<option value="Staff">Staff</option>
								</select>
							</div>
							<div class="four wide field">
								<label>Department</label>
								<select class="ui fluid dropdown">
									<option value="">Select Department</option>
									<option value="IT">Information Technology</option>
									<option value="CS">Computer Science</option>
									<option value="IS">Information Systems</option>
								</select>
							</div>
			
					</div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button">
					<i class="checkmark icon"></i>
					Confirm Edit
				</button>
			</div>
		</div>
		
		<!-- SUCCESS MESSAGE MODAL -->
		<div class="ui tiny modal" id="successdia">
			<div class="header">
				<h3 class="ui header">
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
			<div class="header">
				<h3 class="ui header">
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
	<script src="${pageContext.request.contextPath}/resource/js/manage_users.js"></script>
</html>