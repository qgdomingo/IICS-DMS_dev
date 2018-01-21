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
				<form class="ui form element-mb" method="Login" action="POST">
					<div class="field">
						<label>Username</label>
						<input placeholder="Username" name="user_email" type="text" required/>
					</div>
					<div class="field">
						<label>Password</label>
						<input placeholder="Password" name="user_password" type="password" required/>
					</div>
					<input class="fluid medium ui green button" type="submit" value="Login"/>
				</form>
				
				<!-- AFTER FORM -->	
				<p>Having trouble remembering your password? Click <a href="#" id="forgotpass_btn">here</a>!</p>
				<p>Do you have some lovely messages for the Director? <a href="#"> Send a message</a>.</p>
			</div>
		</div>
		
		<!-- MODALS -->
			<!-- FORGOT PASSWORD MODAL - 1 -->
			<div class="ui tiny modal" id="forgotpass_dia">
				<div class="header">
					<h3 class="ui header">
						<i class="help circle outline icon"></i>
						<div class="content">Forgot Password</div>
					</h3>
				</div>
				<div class="modal-content">
					<p class="element-mb">
						Let us help you with that by sending you an email! 
						But first we're going to need the email address of your registered account.
					</p>
					<form class="ui form">
						<div class="field">
							<label>Email Address</label>
							<input id="forgotpass_email" type="email" placeholder="Email Address">
						</div>
					</form>
					<p class="microcopy-hint">
						Pst! Cant remember your email? It's your gbiz account.
					</p>

				</div>
				<div class="actions">
					<button class="ui grey button" id="cancelforgot_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="positive ui button" id="submitforgot_btn">
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