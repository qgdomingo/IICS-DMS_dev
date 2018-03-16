<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
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
		<title>Send a Reply to the Director | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/login.css">
		
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
		<!-- RETRIEVE CONTEXT PAGE FOR JS -->
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
		<!-- LOADING INDICATOR FOR THE WHOLE PAGE -->
		<div class="ui dimmer" id="page_loading">
			<div class="ui huge text loader" id="page_loading_text"></div>
		</div>
	
		<div class="ui centered grid container">
			<div class="fourteen wide computer fourteen wide table sixteen wide mobile column login-form-area">
				<div class="messagepage-header">
					<h2 class="ui header">
					  Send a Reply to the Director
					</h2>
				</div>
				<br>
				
			<!-- START OF MESSAGE FORM -->
			<form class="ui equal width form" method="post" action="${pageContext.request.contextPath}/ReplyMailFromExternal" enctype="multipart/form-data"
					id="reply_to_director_form">
				
				<!-- SENDER'S INFORMATION --> 
					<h4 class="ui dividing header">
						<i class="user icon"></i>
						<div class="content">Sender's Information</div>
					</h4>
					
					<div class="ui segment">
						<p class="element-rmb"><b>Sender: </b><span id="sender_info"></span></p>
						<p class="element-rmb"><b>Contact Number: </b><span id="contact_info"></span></p>
						<p class="element-rmb"><b>Affiliation: </b><span id="affiliation_info"></span></p>
						<p class="element-rmb"><b>Reply to Subject: </b><span id="subject_info"></span></p>
					</div>
					
					<input name="thread_number" type="hidden" id="thread_number"/>
					
				<!-- MESSAGE BODY -->
					<h4 class="ui dividing header">
						<i class="mail icon"></i>
						<div class="content">Message</div>
					</h4>
					<div class="required field">
						<label>Subject:</label>
						<input name="subject" type="text"/>
					</div>
					<div class="required field">
						<label>Message:</label>
						<textarea rows="5" name="message"></textarea>
					</div>
					<div class="inline field">
						<label>Attachment:</label>
						<input type="file" name="file"/>
					</div>
					
					<p><p><div class="g-recaptcha" data-sitekey="6LcVCE0UAAAAAHGbM4gbrmOD5aWy7_YXjaDAextQ"></div></p></p>
					
					<br>
					
					<div class="ui error message"></div>
					
					<button class="fluid ui large green button" type="submit">
						<i class="send icon"></i>
						Send Message
					</button>
				</form>
			</div>
		</div>	
		
		<!-- PROGRESS MODAL -->
		<div class="ui small modal" id="progressbar_modal">
			<div class="ui indicating progress" data-percent="0" id="upload_progress_bar">
			  <div class="bar">
			  	<div class="progress"></div>
			  </div>
			  <div class="label">Uploading Document</div>
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
	<script src='https://www.google.com/recaptcha/api.js'></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery-3.2.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/semanticui/semantic.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/session_check.js"></script> 
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/externalmail/external_response.js"></script>
</html>