<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Login | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/masterstyle.css">
		<link rel="stylesheet" href="resource/css/loginstyle.css">
	</head>
	<body class="login-background">
		<div class="ui centered grid container">
			<div class="seven wide computer ten wide table sixteen wide mobile column login-form-area">
			
				<!-- PAGE HEADER -->
				<h2 class="ui center aligned icon header">
				<div class="ui images">
					<img class="ui small image" src="resource/icons/ust_logo.png">
					<img class="ui smaller image" src="resource/icons/iics_logo.png">
				</div>
				<div class="content">
					<div class="sub header">University of Santo Tomas</div>
					<div class="sub header">Institute of Information and Computing Sciences</div>
					Document Management System
				</div>
				</h2>

				<!-- LOGIN FORM -->
				<h1 class="ui grey header">Login</h1>
				<form class="ui form element-mb" method="Post" action="Login">
					<div class="field">
						<label>Username</label>
						<input placeholder="Username" name="user_email" type="text"/>
					</div>
					<div class="field">
						<label>Password</label>
						<input placeholder="Password" name="user_password" type="password" />
					</div>
					<input class="fluid medium ui green button" type="submit" value="Login"/>
				</form>
				
				<!-- AFTER FORM -->	
				<a href="#" id="forgotpass_btn">Forgot Password?</a>
				<br>
				<a>Contact the Director</a>
				
				<br>
			</div>
		</div>
		
		<!-- MODALS -->
			<!-- FORGOT PASSWORD MODAL - 1 -->
			<div class="ui tiny modal" id="forgotpass_1">
				<div class="header">
					<h3 class="ui header">
						<i class="help circle outline icon"></i>
						<div class="content">Forgot Password</div>
					</h3>
				</div>
				<div class="modal-content">
					<p class="element-mb">Please enter your account's email address.</p>
					<form class="ui form">
						<div class="field">
							<label>Email Address</label>
							<input id="forgotpass_email" type="email" placeholder="Email Address">
						</div>
					</form>
				</div>
				<div class="actions">
					<button class="ui grey button" id="cancelforgot_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="positive ui button">
						<i class="checkmark icon"></i>
						Submit
					</button>
				</div>
			</div>
			
			
			<!-- CONTACT THE DIRECTOR MODAL -->
			<div class="ui modal"></div>
						
	</body>
	<script src="resource/js/jquery-3.2.1.min.js"></script>
	<script src="resource/semanticui/semantic.min.js"></script>
	<script src="resource/js/login_script.js"></script>
</html>