<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Login | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/master.css">
		<link rel="stylesheet" href="resource/css/login.css">
	</head>
	<body class="login-background">
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
		<div class="ui centered grid container">
			<div class="eight wide computer eight wide tablet sixteen wide mobile column login-form-area">
			
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
				
				<!-- NOTIFICATIONS AREA -->
				<div></div>
				
				<!-- LOGIN FORM -->
				<h1 class="ui grey header">Login</h1>
				<form class="ui form element-mb" id="login_form">
					<div class="field" id="user_email_field">
						<label>Username</label>
						<input placeholder="Username" id="user_email" type="text" required/>
					</div>
					<div class="field" id="user_password_field">
						<label>Password</label>
						<input placeholder="Password" id="user_password" type="password" required/>
					</div>
					<button class="fluid medium ui green button" id="login_submit">
						Login
					</button>
				</form>
				
				<!-- AFTER FORM -->	
				<p>Having trouble remembering your password? Click <a href="#" id="forgotpass_btn">here</a>!</p>
				<p>Do you have some lovely messages for the Director? <a href="messagedirector.jsp"> Send a message</a>.</p>
			</div>
		</div>
		
		<!-- MODALS -->
			<!-- FORGOT PASSWORD MODAL - GET EMAIL -->
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
					<form class="ui form" id="forgotpass_form">
						<div class="field" id="forgotpass_emailfield">
							<label>Email Address</label>
							<input id="forgotpass_email" type="email" placeholder="Email Address">
						</div>
					</form>
					<p class="microcopy-hint">
						Pst! Cant remember your email? It's your gbiz account.
					</p>
				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelforgot_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" id="submitforgot_btn" disabled="disabled">
						<i class="checkmark icon"></i>
						Submit
					</button>
				</div>
			</div>
			
			<!-- FORGOT PASSWORD MODAL - INPUPT RESET CODE -->
			<div class="ui tiny modal" id="resetcode_dia">
				<div class="header">
					<h3 class="ui header">
						<i class="lock icon"></i>
						<div class="content">Enter Reset Code</div>
					</h3>
				</div>
				<div class="modal-content">
					<p>
						We've sent you an email containing the <b> five (5) number reset code </b>. 
						If you can't find the email in your inbox, please it check under your Spam or Junk mail. 
					</p>
					<p class="microcopy-hint">
						<b>NOTE:</b> You won't be receiving any email if the address you entered is not
						registered.
					</p>
					<form class="ui form" id="resetcode_form">
						<div class="field" id="resetcode_field">
							<label>Reset Code</label>
							<input id="resetcode" type="text" placeholder="00000">
						</div>
						<div class="ui error message">
						    <p>The reset code you entered is incorrect.</p>
						</div>
					</form>
				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelreset_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" id="submitreset_btn" disabled="disabled">
						<i class="checkmark icon"></i>
						Submit
					</button>
				</div>
			</div>
			
			<!-- FORGOT PASSWORD MODAL - INPUPT NEW PASSWORD -->
			<div class="ui tiny modal" id="newpassword_dia">
				<div class="header">
					<h3 class="ui header">
						<i class="lock icon"></i>
						<div class="content">Enter New Password</div>
					</h3>
				</div>
				<div class="modal-content">
					<p>
						This is the last step! Please enter your new password below. 
						If you cancel, you will have to repeat the whole process. 	
					</p>
					<div class="ui message microcopy-hint">
						<p> The submit button will be disabled until: </p>
						<ul>
							<li>your passwords have a minimum of six (6) characters</li>
							<li>both of the password fields match</li>
						</ul>
					</div>
					<form class="ui form" id="newpass_form">
						<div class="field" id="newpass_field">
							<label>New Password</label>
							<input id="new_password" type="password" placeholder="New Password">
						</div>
						<div class="field" id="confnewpass_field">
							<label>Repeat New Password</label>
							<input id="confirm_password" type="password" placeholder="Repeat New Password">
						</div>
		
					</form>
				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelnewpass_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" id="submitnewpass_btn" disabled="disabled">
						<i class="checkmark icon"></i>
						Submit
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
		
		
	</body>
	<script src="resource/js/jquery-3.2.1.min.js"></script>
	<script src="resource/semanticui/semantic.min.js"></script>
	<script src="resource/js/master.js"></script>
	<script src="resource/js/login.js"></script>
</html>