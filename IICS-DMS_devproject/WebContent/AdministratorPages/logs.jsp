<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Log Files | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/generalpages.css">
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
				<div class="two fields">
					
					<!-- TIMESTAMP BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Log Timestamp Range"/>
							<i class="calendar icon"></i>
						</div>
					</div>
					
					<!-- LOG TYPE DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown">
							<option value="none">Log Type</option>
							<option value="sys">System Log</option>
							<option value="err">Error Log</option>
						</select>
					</div>
					
					<!-- LOG SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Find Log Information.."/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- USER SEARCH BOX -->
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
					

					
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button">
							Search
						</button>
					</div>
					
				</div>
			</form>
			
			<!-- TABLE AREA -->
			<table class="ui compact selectable sortable table">
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
				<tr>
					<td>12-12-2018 12:00:00</td>
					<td>System Log</td>
					<td>UPLOAD --- incoming document</td>
					<td>Jeddi Boi</td>
					<td>Department Head</td>
					<td>Computer Science</td>
				</tr>				
			</table>

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
	<script src="${pageContext.request.contextPath}/resource/js/jquery-3.2.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/semanticui/semantic.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/tablesort.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
</html>