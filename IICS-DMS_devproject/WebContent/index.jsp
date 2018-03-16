<%@page import="com.ustiics_dms.model.Account"%>
<%@page import="com.ustiics_dms.controller.archivedocument.ArchiveDocumentFunctions"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	boolean archive = false;
	String archiveDate = "";
	
	archive = ArchiveDocumentFunctions.isThereASetArchive();
	if(archive) {
		archiveDate = ArchiveDocumentFunctions.retrieveArchiveDate();
	}

	if(request.getSession(false) != null && request.getSession(false).getAttribute("currentCredentials") != null) {
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		if( (acc.getUserType().equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} 
		else {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Login | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/master.css">
		<link rel="stylesheet" href="resource/css/generalpages.css">
		<link rel="stylesheet" href="resource/css/login.css">
		
		<!-- SITE ICON CONFIGS -->
		<link rel="apple-touch-icon" sizes="180x180" href="${pageContext.request.contextPath}/resource/siteicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resource/siteicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resource/siteicon/favicon-16x16.png">
		<link rel="manifest" href="${pageContext.request.contextPath}/resource/siteicon/site.webmanifest">
		<link rel="mask-icon" href="${pageContext.request.contextPath}/resource/siteicon/safari-pinned-tab.svg" color="#be152f">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="theme-color" content="#ffffff">
	</head>
	<body class="login-background">
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
		<!-- LOADING INDICATOR FOR THE WHOLE PAGE -->
		<div class="ui dimmer" id="page_loading">
			<div class="ui huge text loader" id="page_loading_text"></div>
		</div>
		<div class="ui centered grid container">
			<div class="eight wide computer ten wide tablet sixteen wide mobile column login-form-area">
			
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
				
			<% if(archive) { %>
				<!-- ARCHIVE DATE AREA -->
				<div class="ui warning message">
					<div class="header">
				    	ARCHIVE DOCUMENT DATE SET
				 	</div>
  					The Administrator has set an archive date: <b><%= archiveDate %></b>. 
  					Please download files needed after the archive date and accomplish remaining tasks that
  					concerns incoming documents.
				</div>
			<% } %>	
			
				<!-- LOGIN FORM -->
				<h1 class="ui grey header">Login</h1>
				<form class="ui form element-mb" method="POST" action="Login" id="login_form">
					<div class="field" id="user_email_field">
						<label>Username</label>
						<input placeholder="Username" name="user_email" type="text" />
					</div>
					<div class="field" id="user_password_field">
						<label>Password</label>
						<input placeholder="Password" name="user_password" type="password" />
					</div>
					<div class="ui error message"></div>
					<button class="fluid medium ui green button" type="submit" id="login_submit">
						Login
					</button>
				</form>
				
				<!-- AFTER FORM -->	
				<p>Having trouble remembering your password? Click <a href="#" id="forgotpass_btn">here</a>!</p>
				<p>Do you have some inquiries to the Director? <a href="messagedirector.jsp"> Send a message</a>.</p>
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
					
					<form class="ui form" method="POST" action="${pageContext.request.contextPath}/sendemail" 
							id="forgotpass_form">
						
						<div class="field element-rmb">
							<label>Email Address</label>
							<div class="ui left icon input">
								<i class="envelope icon"></i>
								<input type="email" name="email" id="forgotpass_email" placeholder="Email Address">
							</div>
						</div>
						<p class="microcopy-hint">
							Pst! Cant remember your email? It's your gbiz account.
						</p>
						
						<div class="ui error message"></div>
					</form>

				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelforgot_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" type="submit" id="submitforgot_btn" form="forgotpass_form">
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
					<form class="ui form" method="POST" action="${pageContext.request.contextPath}/InputRecoveryCode" 
							id="resetcode_form">
							
						<input type="hidden" name="email" id="resetcode_email">
						<div class="field">
							<label>Reset Code</label>
							<input type="text" name="code" id="resetcode" placeholder="00000">
						</div>
						
						<div class="ui error message"></div>
					</form>
					<div class="ui message" id="invalid_code_msg">
						<p>You have entered an incorrect reset code.</p>
					</div>
					
				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelreset_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" id="submitreset_btn" form="resetcode_form">
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
					<div class="ui message">
						<div class="header">
							Password Rules
						</div>
						<ul class="list">
							<li>Your password must be at least 6 characters in length</li>
						</ul>
					</div>
					<form class="ui form" method="POST" action="${pageContext.request.contextPath}/PasswordChange"  
							id="newpass_form">
						<input type="hidden" name="email" id="newpass_email">
						<input type="hidden" name="code" id="newpass_code">
						
						<div class="field">
							<label>New Password</label>
							<input name="new_password" type="password" placeholder="New Password">
						</div>
						<div class="field">
							<label>Repeat New Password</label>
							<input name="confirm_password" type="password" placeholder="Repeat New Password">
						</div>
						
						<div class="ui error message"></div>
					</form>
				</div>
				<div class="actions">
					<button class="ui cancel grey button" id="cancelnewpass_btn">
						<i class="remove icon"></i>
						Cancel
					</button>
					<button class="ui green button" id="submitnewpass_btn" form="newpass_form">
						<i class="checkmark icon"></i>
						Submit
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
		
	</body>
	<script src="resource/js/jquery-3.2.1.min.js"></script>
	<script src="resource/semanticui/semantic.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/session_check.js"></script>
	<script src="resource/js/jquery.form.min.js"></script>
	<script src="resource/js/master.js"></script>
	<script src="resource/js/login.js"></script>
	<script src="resource/js/password_recovery.js"></script>
</html>