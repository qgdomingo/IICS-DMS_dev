<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	String userType = "";
	
	boolean restrictionCase1 = false;

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} 
		else if(userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
		
		// Restriction Case 1 - not allowed for Faculty, Supervisor and Staff
		if(userType.equalsIgnoreCase("Faculty")) { 
			restrictionCase1 = true;
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Create Mail | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/generalpages.css">
		
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
		<!-- LOADING INDICATOR FOR THE WHOLE PAGE -->
		<div class="ui dimmer" id="page_loading">
			<div class="ui huge text loader" id="page_loading_text"></div>
		</div>
		<!-- RETRIEVE CONTEXT PAGE FOR JS -->
		<input type="hidden" value="${pageContext.request.contextPath}" id="context_path"/> 
		 
		<!-- LEFT SIDE MENU -->
		<div class="ui large left vertical menu sidebar" id="side_nav">
			<a class="item mobile only user-account-bgcolor" href="${pageContext.request.contextPath}/userprofile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item" href="${pageContext.request.contextPath}/home.jsp">
		      <i class="large home icon side"></i>Home
		    </a>
		   	<a class="item" href="${pageContext.request.contextPath}/files/fileupload.jsp">
		      <i class="large cloud upload alternate icon side"></i>Upload Document
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
		      <i class="large file icon side"></i>Documents
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
		      <i class="large tasks icon side"></i>Tasks
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/calendar/viewcalendar.jsp">
		      <i class="large calendar alternate outline icon side"></i>Calendar
		    </a>
		    <div class="item">
		   		Mail
		   		<div class="menu">
			    	<a class="item active" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!restrictionCase1) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
	<%  } %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
		    	</div>
		    </div>
	<% if(!restrictionCase1) { %>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstatstask.jsp">
			    		<i class="large bar chart icon side"></i>Semestral Statistics
			    	</a>
		    	</div>
		    </div>
	<%  } %>
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
					<i class="large pencil alternate icon"></i>
					Create Mail
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="${pageContext.request.contextPath}/userprofile.jsp">
						<h5 class="ui header">
						  <i class="large user circle icon user-account-color"></i>
						  <div class="content user-account-color">
						    <%= acc.getFullName() %>
						    <div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
						  </div>
						</h5>
					</a>
					<a class="item" id="notification_button">
						<i class="large alarm icon"></i>
						<div class="ui circular teal label element-rml" id="notification_count">0</div>
					</a> 
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->
		<input type="hidden" id="user_type" value="<%= userType %>" />

		<div class="ui grid form element-rpt">
		
			<div class="three wide computer four wide tablet sixteen wide mobile column">
				<div class="field">
					<label>New Mail:</label>
					<select class="ui fluid dropdown" id="new_mail_type_select">
					  	<option value="Letter">Letter</option>
					  	<option value="Memo">Memo</option>
					  	<option value="Notice Of Meeting">Notice Of Meeting</option>
					  	<% if (!restrictionCase1) { %>
					  	<option value="ISO">Generate ISO Code</option>
					  	<% } %>
					</select>
				</div>
				<div class="field">
					<label>Mail PDF Size:</label>
					<select name="paper_size" class="ui fluid dropdown" id="new_mail_size_select">
						<option value="A4">A4</option>
					  	<option value="SHORTBOND">Short Bond Paper</option>
					  	<option value="LONGBOND">Long Bond Paper</option>
					</select>
				</div>
			</div>
		
			<br>
			
			<div class="twelve wide computer eleven wide tablet sixteen wide mobile column">
				
			<!-- FORM FOR LETTER -->
				<form class="ui form" method="post" action="${pageContext.request.contextPath}/ForwardMail" id="letter_form"> 
					<input type="hidden" name="type" id="mail_letter_type" />
					<input type="hidden" name="paper_size" id="mail_letter_size" />
				
				<% if(!restrictionCase1) { %>
					<h3 class="ui diving header">
						Mail Recipients
						<p class="microcopy-hint">
							Place here users that will be receiving the mail. You can indicate none if the mail is 
							to be exported.
						</p>
					</h3>
				
					<div class="field">
						<label>To:</label>
		  				<select class="ui fluid search selection dropdown" multiple="" name="internal_to" id="internal_letter_to">
							<option value="">Select Users</option>
						</select>
					</div>
					
					<div class="field">
						<label>External To:</label>
		  				<select class="ui fluid search selection dropdown" multiple="" name="external_to" id="external_letter_to">
							<option value="">Select Users</option>
						</select>
					</div>
				<% } %>
					
					<h3 class="ui diving header">
						Letter Content
					</h3>
					
					<div class="inline fields">
						<div class="required field">
							<label>Addressee:</label>
							<input type="text" placeholder="Header Line 1" name="addressee_line1" />
						</div>
						<div class="field">
							<input type="text" placeholder="Header Line 2" name="addressee_line2" />
						</div>
						<div class="field">
							<input type="text" placeholder="Header Line 3" name="addressee_line3" />
						</div>
					</div>
					
					<div class="required field">
						<label>Subject:</label>
						<input type="text" name="subject"/>
					</div>
					
					<div class="required field">
						<label>Message:</label>
						<textarea rows="6" name="message"></textarea>
					</div>
					
					<div class="required field">
						<label>Complimentary Closing Remarks:</label>
						<input type="text" placeholder="Yours Truly, " name="closing_line"/>
					</div>
					
					<div class="ui error message"></div>
					
					<!-- SENDING MAIL BUTTONS -->
					<% if(!restrictionCase1) { %>
					<button type="submit" name="submit" value="send mail" class="ui labeled icon green button element-mb">
						<i class="send icon"></i>
						Send Mail
					</button>
		
					<button type="submit" name="submit" value="save and export" class="ui labeled icon blue button element-mb">
						<i class="download icon"></i>
						Export Mail as PDF
					</button>
					<% } %>
					
					<% if(acc.getUserType().equals("Faculty Secretary") || acc.getUserType().equals("Faculty")) { %>
					<button type="submit" name="submit" value="mail request" class="ui labeled icon orange button element-mb">
						<i class="large envelope square icon"></i>
						Send Mail as Request
					</button>	
					<% } %>
					
					<button type="button" class="ui grey button element-mb" id="clear_letter_form">
						Clear Fields
					</button>
					
				</form>
				
			<!-- FORM FOR MEMO AND NOTICE -->
				<form class="ui form" method="post" action="${pageContext.request.contextPath}/ForwardMail" id="memo_notice_form"> 
					<input type="hidden" name="type" id="mail_memo_notice_type" />
					<input type="hidden" name="paper_size" id="mail_memo_notice_size" />
				
				<% if(!restrictionCase1) { %>
					<h3 class="ui diving header">
						Mail Recipients
						<p class="microcopy-hint">
							Place here users that will be receiving the mail. You can indicate none if the mail is 
							to be exported.
						</p>
					</h3>
				
					<div class="field">
						<label>To:</label>
		  				<select class="ui fluid search selection dropdown" multiple="" name="internal_to" id="internal_memo_notice_to">
							<option value="">Select Users</option>
						</select>
					</div>
					
					<div class="field">
						<label>External To:</label>
		  				<select class="ui fluid search selection dropdown" multiple="" name="external_to" id="external_memo_notice_to">
							<option value="">Select Users</option>
						</select>
					</div>
				<% } %>
					
					<h3 class="ui diving header">
						<span id="mail_type_label"></span> Content
					</h3>
					
					<div class="required field">
						<label>Addressee:</label>
						<input type="text" name="addressee"/>
					</div>
					
					<div class="required field">
						<label>From:</label>
						<input type="text" name="from"/>
					</div>
					
					<div class="required field">
						<label>Subject:</label>
						<input type="text" name="subject"/>
					</div>
					
					<div class="required field">
						<label>Message:</label>
						<textarea rows="6" name="message"></textarea>
					</div>
					
					<div class="required field">
						<label>Complimentary Closing Line:</label>
						<input type="text" placeholder="Yours Truly, " name="closing_line"/>
					</div>
					
					<div class="ui error message"></div>
					
					<!-- SENDING MAIL BUTTONS -->
					<% if(!restrictionCase1) { %>
					<button type="submit" name="submit" value="send mail" class="ui labeled icon green button element-mb">
						<i class="send icon"></i>
						Send Mail
					</button>
		
					<button type="submit" name="submit" value="save and export" class="ui labeled icon blue button element-mb">
						<i class="download icon"></i>
						Export Mail as PDF
					</button>
					<% } %>
					
					<% if(acc.getUserType().equals("Faculty Secretary") || acc.getUserType().equals("Faculty")) { %>
					<button type="submit" name="submit" value="mail request" class="ui labeled icon orange button element-mb">
						<i class="large envelope square icon"></i>
						Send Mail as Request
					</button>	
					<% } %>
					
					<button type="button" class="ui grey button element-mb" id="clear_mail_form">
						Clear Fields
					</button>
					
				</form>
			
			<!-- GENERATE ISO CODE FORM -->
				<% if(!restrictionCase1) { %>
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/GenerateIsoNumber" id="generate_iso_form">
					<div class="two fields">
						<div class="required four wide field">
							<label>Generate ISO Number for:</label>
							<select class="ui fluid dropdown" name="type" id="generate_iso_type">
								<option value="">Select Mail Type</option>
							  	<option value="Letter">Letter</option>
							  	<option value="Memo">Memo</option>
							  	<option value="Notice">Notice</option>
							</select>
						</div>
						
						<div class="required twelve wide field">
							<label>Purpose of ISO Number to be Generated:</label>
							<input type="text" name="purpose"/>
						</div>
					
					</div>
					
					<div class="ui error message"></div>
					
					<div class="ui success message">
					    <div class="header">ISO Generate Success!</div>
					    <p>Your ISO Number for <span id="generated_type"></span> is: <span id="generated_iso"></span></p>
  					</div>
					
					<button type="submit" class="ui fluid  green button">
						Generate ISO Code
					</button>
				</form>
				<% } %>
				
			</div>
		
		</div>
				
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- NOTIFICATIONS MODAL -->
		<div class="ui tiny modal" id="notification_dialog">
			<div class="header center-text">
				<i class="alarm icon"></i>
				<div class="content">Notifications</div>
			</div>
			<div class="scrolling content">
				<div class="ui relaxed divided selection list" id="notification_list"></div> 
		 	</div>					    	
		    <div class="actions center-text">
		    	<button class="ui blue button" id="mark_all_as_read_btn">
		    		Mark All as Read
		    	</button>
				<button class="ui ok grey button">
					Close
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
		  	<div class="ui green inverted button" id="logout_submit">
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
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/non_staff_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/directory.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/mail/new_mail.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/notifications.js"></script>
</html>