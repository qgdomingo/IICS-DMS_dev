<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Archive Documents | IICS DMS</title>
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
			<a class="item" href="manageusers.jsp">
		      <i class="large users icon side"></i>User Management
		    </a>
		    <a class="item" href="acadyear.jsp">
		      <i class="large student icon side"></i>Academic Year
		    </a>
		    <a class="item active" href="archive.jsp">
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
			<div class="ui large top inverted borderless fixed menu">
				<a class="item" id="togglenav">
					<i class="large sidebar icon"></i>
				</a>
				<div class="item">
					<i class="large archive icon"></i>
					Archive Documents
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