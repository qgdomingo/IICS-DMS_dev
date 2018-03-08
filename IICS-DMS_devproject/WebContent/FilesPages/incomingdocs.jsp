<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	String userType = "";
	
	boolean restrictionCase2 = false;

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} else if (userType.equalsIgnoreCase("Faculty")) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
		
		// Restriction Case 2 - not allowed for Supervisor and Staff
		if(userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
			restrictionCase2 = true;
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Documents | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.css">
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
		    <a class="item active" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
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
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
	<%  } %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!restrictionCase2) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
	<%  } %>
		    	</div>
		    </div>
	<% if(!restrictionCase2) { %>
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
					<i class="large file icon"></i>
					Documents
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
					<a class="item">
						<i class="large alarm icon"></i>
					</a>
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->
		
		<!-- DOCUMENT TYPE SELECTOR FOR MOBILE -->
		<div class="ui form mobile only">
			<div class="field">
				<label>View Document Type:</label>
				<select class="ui fluid dropdown" id="doctype_select">
					<option value="">Navigate to</option>
				  	<option value="personaldocs.jsp">Personal</option>
				<% if(!userType.equalsIgnoreCase("Faculty")) { %>
				  	<option value="incomingdocs.jsp">Incoming</option>
				  	<option value="outgoingdocs.jsp">Outgoing</option>
				  	<option value="archivedocs.jsp">Archived</option>
				  	<option value="alldocs.jsp">All Documents</option>
				<% } %>
				</select>
			</div>
		</div> 
		
		<!-- DOCUMENT TYPE SELECTOR FOR NON-MOBILE -->
		<div class="mobile hidden">
			<div class="ui secondary pointing menu">
				<a class="item" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
					<i class="folder icon"></i>
					Personal
				</a>
				<% if(!userType.equalsIgnoreCase("Faculty")) { %>
				<a class="item active" href="${pageContext.request.contextPath}/files/incomingdocs.jsp">
					<i class="folder open icon"></i>
					Incoming
				</a>
				<a class="item" href="${pageContext.request.contextPath}/files/outgoingdocs.jsp">
					<i class="folder icon"></i>
					Outgoing
				</a>
				<% } %>
				<a class="item" href="${pageContext.request.contextPath}/files/archivedocs.jsp">
					<i class="folder icon"></i>
					Archived
				</a>
				<a class="item" href="${pageContext.request.contextPath}/files/alldocs.jsp">
					<i class="folder icon"></i>
					All Files
				</a>
			</div>		
		</div>
		
		<br>
			
		<!-- SEGMENT FOR INCOMING DOCUMENTS -->
		<div id="incomingdocs_table">
			<h3 class="ui dividing header">
				<i class="sign in icon"></i>
				<div class="content">
					Incoming Documents
					<div class="sub header">
						Here lists all documents which have concerns to the institution.
					</div>
				</div>
			</h3>
				
			<div class="ui segment">
				<div class="ui dimmer" id="incoming_loading">
					<div class="ui text loader">Retrieving Incoming Documents</div>
				</div>
				
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="five fields">
						
						<!-- SEARCH BOX -->
						<div class="field">
							<div class="ui icon input">
								<input type="text" placeholder="Seach Document" id="search_incoming"/>
								<i class="search icon"></i>
							</div>
						</div>
						
						<!-- UPLOAD FROM DATE BOX -->
						<div class="field">
							<div class="ui calendar" id="search_uploadfrom_calendar">
								<div class="ui icon input">
									<input type="text" placeholder="Upload From" id="search_uploadfrom"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
						
						<!-- UPLOAD TO DATE BOX -->
						<div class="field">
							<div class="ui calendar" id="search_uploadto_calendar">
								<div class="ui icon input">
									<input type="text" placeholder="Upload To" id="search_uploadto"/>
									<i class="calendar icon"></i>
								</div>
							</div>
						</div>
							
						<!-- CATEGORY DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" id="search_category">
								<option value="">Category</option>
							</select>
						</div>

						<!-- ACTION REQUIRED DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" id="search_action">
								<option value="">Action</option>
								<option value="None">None</option>
								<option value="For Dissemination">For Dissemination</option>
								<option value="Approval">Approval</option>
								<option value="Endorsement">Endorsement</option>
								<option value="Response">Response</option>
							</select>
						</div> 
						
						<!-- ACTION DUE BOX -->
						<div class="field">
							<div class="ui calendar" id="search_action_due_calendar">
								<div class="ui icon input">
									<input type="text" placeholder="Action Due" id="search_action_due"/>
									<i class="calendar outline icon"></i>
								</div>
							</div>
						</div>
						
						<!-- STATUS DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" id="search_status">
								<option value="">Status</option>
								<option value="Received">Received</option>
								<option value="Done">Done</option>
							</select>
						</div>
							
						<!-- CLEAR SEARCH BUTTON -->
						<div class="field">
							<button class="ui grey button" type="button" id="search_clear">
								Clear Search
							</button>
						</div>
					</div>
				</form>
					
				<!-- TABLE AREA -->
				<table class="ui compact selectable table" id="incoming_table">
					<thead>
						<tr>
							<th>Document Title</th>
							<th>Document Source</th>
							<th>Upload Timestamp</th>
							<th>Category</th>
							<th>Action</th>
							<th>Action Due</th>
							<th>Status</th>
							<th>Reference No.</th>
						</tr>
					</thead>
					<tbody id="incoming_tablebody"></tbody>
				</table>
			</div>
		</div>

	
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW - INCOMING DOCUMENT -->
		<div class="ui modal" id="viewincoming_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="file icon"></i>
					<div class="content" id="viewincoming_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui stackable grid">
					<div class="eight wide column">
						<p class="element-rmb"><b>Document Source: </b><span id="viewincoming_source"></span></p>
						<p class="element-rmb"><b>Reference No.: </b><span id="viewincoming_refno"></span></p>
						<p class="element-rmb"><b>Action Required: </b><span id="viewincoming_action"></span></p>
						<p class="element-rmb"><b>Action Due: </b><span id="viewincoming_due"></span></p>
						<p class="element-rmb"><b>Status: </b><span id="viewincoming_status"></span></p>
						<br>
						<h5 class="ui horizontal header divider element-rmb element-rmt">
						  <i class="info circle icon"></i>
						  File Details
						</h5>
						<p class="element-rmb"><b>Uploaded By: </b><span id="viewincoming_uploadedby"></span></p>
						<p class="element-rmb"><b>Upload Date: </b><span id="viewincoming_uploaddate"></span></p>
						<p class="element-rmb"><b>Category: </b><span id="viewincoming_category"></span></p>
						<p class="element-rmb"><b>Document Type: </b><span id="viewincoming_type"></span></p>
						<p class="element-rmb"><b>File Name: </b><span id="viewincoming_file"></span></p>
						<p><b>Description: </b><span id="viewincoming_description"></span></p>
						
						<form method="GET" action="${pageContext.request.contextPath}/FileDownload">
							<input type="hidden" name="id" id="viewincoming_download_id">
							<input type="hidden" name="type" id="viewincoming_download_type">
							<input type="hidden" id="viewincoming_threadno">
							<div class="two ui buttons">
								<button class="ui small button" type="submit">
									<i class="file icon"></i>View File
								</button>
								<button class="ui small blue button" type="button" id="viewincoming_view_thread">
									<i class="folder icon"></i>View Thread
								</button>
							</div>
						</form>
					</div>
					
					<div class="eight wide column">
						<!-- NOTE FORM -->
						<form class="ui form" id="edit_note_form">
							<input type="hidden" name="id" id="viewincoming_note_id">
							<input type="hidden" name="type" id="viewincoming_note_type">
						
							<div class="field element-rmb">
								<label>Note:</label>
								<textarea rows="2"></textarea>
							</div>
							<button class="ui tiny fluid orange button">
								<i class="pencil icon"></i>
								Edit Note
							</button>
							
							<div class="ui orange message" id="note_orange_message">
								<i class="close icon" id="close_note_orange_message"></i>
								<div class="header">Note update failed.</div>
							</div>
							<div class="ui green message" id="note_green_message">
								<i class="close icon" id="close_note_green_message"></i>
								<div class="header">Note updated!</div>
							</div>
						</form>
						
						<br>
						
						<!-- SET DOCUMENT AS DONE FORM -->
						<form class="ui form" id="mark_as_done_form">
							<input type="hidden" name="id" id="viewincoming_done_id">
							<input type="hidden" name="type" id="viewincoming_done_type">
						
							<button class="ui tiny fluid green button" type="button" id="mark_as_done_btn">
								<i class="check icon"></i>
								Mark as Done
							</button>
							<div class="ui compact segment element-rmt" id="mark_as_done_conf">
								<h4>Are you sure you want to set this document as done?</h4>
								<div class="ui buttons">
							 		<button class="ui green button" type="submit">Yes</button>
							  		<div class="or"></div>
							  		<button class="ui button" type="button" id="mark_as_done_no">No</button>
								</div>
							</div>
							
						</form>
					</div>
				
				</div>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewincoming_close">Close</button>
				
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
	<script src="${pageContext.request.contextPath}/resource/js/session/non_faculty_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/categories.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/documents/view_incoming_documents.js"></script>
</html>