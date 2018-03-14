<%@page import="com.ustiics_dms.model.Account"%>
<%@page import="com.ustiics_dms.controller.archivedocument.ArchiveDocumentFunctions"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	boolean archive = false;
	boolean isThereAnArchive = false;

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		
		if( !(acc.getUserType().equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
		
		isThereAnArchive = ArchiveDocumentFunctions.isThereASetArchive();
		if(isThereAnArchive) {
			archive = ArchiveDocumentFunctions.compareTime();
		}
		
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Archive Documents | IICS DMS</title>
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
			<a class="item mobile only user-account-bgcolor" href="${pageContext.request.contextPath}/admin/profile.jsp">
				<h5 class="ui header ">
					<i class="large user circle icon user-account-color"></i>
					<div class="content user-account-color">
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item" href="${pageContext.request.contextPath}/admin/manageusers.jsp">
		      <i class="large users icon side"></i>User Management
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/admin/acadyear.jsp">
		      <i class="large student icon side"></i>Academic Year
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/admin/archive.jsp">
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
			<div class="ui large top inverted borderless fixed menu">
				<a class="item" id="togglenav">
					<i class="large sidebar icon"></i>
				</a>
				<div class="item">
					<i class="large archive icon"></i>
					Archive Documents
				</div>
				<div class="right menu">
					<a class="item user-account-bgcolor mobile hidden" href="${pageContext.request.contextPath}/admin/profile.jsp">
						<h5 class="ui header">
						  <i class="large user circle icon user-account-color"></i>
						  <div class="content user-account-color">
						    <%= acc.getFullName() %>
						    <div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
						  </div>
						</h5>
					</a>
					<a class="item mobile hidden" id="logout_btn">
						<i class="large power icon"></i>
					</a>
				</div>
			</div>
		
<!-- ACTUAL PAGE CONTENTS -->

		<div class="ui segment">
			<div class="ui dimmer" id="archive_folder_loading">
				<div class="ui text loader">Retrieving Archive Folders</div>
			</div>
			
			<!-- SEARCH ROW -->
			<form class="ui form">
				<div class="six fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach Archive" id="search_archive"/>
							<i class="search icon"></i>
						</div>
					</div>
							
					<!-- MAIL SENT FROM -->
					<div class="field">
						<div class="ui calendar" id="search_archivefrom_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Archive Date From" id="search_archivefrom"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
								
					<!-- MAIL SENT TO -->
					<div class="field">
						<div class="ui calendar" id="search_archiveto_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Archive Date To" id="search_archiveto"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- ARCHIVE STATUS BOX -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_status">
							<option value="">Status</option>
							<option value="Enabled">Enabled</option>
							<option value="Disabled">Disabled</option>
						</select>
					</div>	
						
					<!-- ACAD YEAR BOX -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_acad_year">
							<option value="">Academic Year</option>
						</select>
					</div>					
										
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button" id="clear_search">
							Clear Search
						</button>
					</div>
					
				</div>
			</form>
			
		<form method="POST" action="${pageContext.request.contextPath}/DownloadArchivedFolder">
			
		<% if(!isThereAnArchive)  { %>
			<button type="button" class="ui labeled icon green button element-mb" id="set_archive_date_btn">
				<i class="calendar alternate icon"></i>
				Set Archive Date
			</button>
		<% } %>
		<% if(archive) { %>
			<button type="button" class="ui labeled icon orange button element-mb" id="archive_docs_now_btn">
				<i class="archive icon"></i>
				Archive Documents Now
			</button>
		<% } %>
			
			<button type="button" class="ui labeled icon blue button element-mb" id="enable_archive_btn">
				<i class="check circle icon"></i>
				Enable Archive
			</button>
				
			<button type="button" class="ui labeled icon red button element-mb" id="disable_archive_btn">
				<i class="remove circle icon"></i>
				Disable Archive
			</button>

			
			<input type="hidden" name="id" id="download_folder_id" />
			<button type="submit" class="ui labeled icon teal button element-mb" id="download_archive_btn">
				<i class="download icon"></i>
				Download Archive
			</button>
					
		</form>	

			<!-- TABLE AREA -->
			<table class="ui compact selectable table" id="archive_folders_table">
				<thead>
					<tr>
						<th>Archive Title</th>
						<th>Timestamp</th>
						<th>Status</th>
						<th>Academic Year</th>
					</tr>
				</thead>
				<tbody id="archive_folders_tablebody"></tbody>
			</table>
			
		
		</div>
			

<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<% if(archive) { %>
		<!-- ARCHIVE DOCUMENTS NOW CONFIRMATION MODAL -->
		<div class="ui tiny modal" id="confirm_archive_dia">
			<div class="ui header edit-modal">
				<i class="archive icon"></i>
				<div class="content">Archive Documents Now</div>
			</div>
			<div class="modal-content">
				<h4 class="element-rmb">Are you sure you want to archive now?</h4>
				
				<div class="ui error message">
    				<div class="header">INFORMATION:</div>
    				<p>THIS ARCHIVE ACTION IS IRREVERSIBLE</p>
   					<p class="element-rmb">Archiving documents would:</p>
   					<div class="ui bulleted list">
   						<div class="item">Transfer all Incoming and Outgoing documents into one archive folder</div>
   					</div>
   					<p class="element-rmb">
   						The archived folder can be later enabled for users to view and download these documents but can
   						no longer modify any modifiable data on the document such as the incoming document's note and status.
   					</p>
  				</div>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="confirm_archive_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui ok orange button" id="confirm_archive_submit">
					<i class="checkmark icon"></i>
					Confirm Archive
				</button>
			</div>
		</div> 
		<% } %> 	 
		 	 
		<!-- ENABLE ARCHIVE MODAL -->
		<div class="ui tiny modal" id="enable_archive_dia">
			<div class="ui header neutral-modal">
				<i class="check circle icon"></i>
				<div class="content">Enable Archive</div>
			</div>
			<div class="modal-content">
				<h4 class="element-rmb">Are you sure you want to enable this archive folder?</h4>
				<p class="microcopy-hint">
					Enabling this archive would make the documents in this archive accessible to the users.
				</p>
				
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/EnableArchive" id="enable_archive_form"> 
					<input type="hidden" name="selected[]" id="enable_archive_selected" />
					
					<div class="required field">
						<label>Purpose of Enabling this Archive</label>
						<textarea rows="2" name="enable_archive_purpose"></textarea>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="enable_archive_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui blue button" type="submit" form="enable_archive_form" id="enable_archive_submit">
					<i class="checkmark icon"></i>
					Confirm Enable
				</button>
			</div>
		</div>
		
		<!-- DISABLE ARCHIVE MODAL -->
		<div class="ui tiny modal" id="diable_archive_dia">
			<div class="ui header delete-modal">
				<i class="remove circle icon"></i>
				<div class="content">Disable Archive</div>
			</div>
			<div class="modal-content">
				<h4 class="element-rmb">Are you sure you want to disable this archive folder?</h4>
				<p class="microcopy-hint">
					Disabling this archive would NO longer make the documents in this archive accessible to the users.
				</p>
				
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/DisableArchive" id="disable_archive_form"> 
					<input type="hidden" name="selected[]" id="disable_archive_selected" />
					
					<div class="required field">
						<label>Purpose of Disabling this Archive</label>
						<textarea rows="2" name="disable_archive_purpose"></textarea>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="disable_archive_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui red button" type="submit" form="disable_archive_form" id="disable_archive_submit">
					<i class="checkmark icon"></i>
					Confirm Disable
				</button>
			</div>
		</div>
		
		<% if(!isThereAnArchive) { %>
		<!-- SET ARCHIVE DATE MODAL -->
		<div class="ui tiny modal" id="set_archive_date_modal">
			<div class="header add-modal">
				<h3 class="ui header add-modal">
					<i class="calendar alternate icon"></i>
					Set Archive Date
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui error message">
    				<div class="header">INFORMATION:</div>
    				<p>THE ARCHIVE DATE SET IS IRREVSERIBLE</p>
   					<p class="element-rmb">Setting an archive date would:</p>
   					<div class="ui bulleted list">
   						<div class="item">Notify the users via the Login page that an archive date is set</div>
   						<div class="item">Enable the 'Archive Documents Now' button once that set date is reached</div>
   						<div class="item">Transfer all Incoming and Outgoing documents into one archive folder</div>
   					</div>
   					<p class="element-rmb">
   						The archived folder can be later enabled for users to view and download these documents but can
   						no longer modify any modifiable data on the document such as the incoming document's note and status.
   					</p>
  				</div>
  				<form class="ui form" action="${pageContext.request.contextPath}/SetArchiveDate" method="POST" id="set_archive_date_form">
  					<div class="required field">
						<label>Archive Date:</label>
						<div class="ui calendar" id="archive_date_calendar">
							<div class="ui icon input">
								<input type="text" name="archive_date" id="archive_date"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
  					<p class="element-rmb">For authentication, please enter your account password.</p>
					<div class="required field">
						<label>Password:</label>
						<input type="password" name="current_password"/>
					</div>
					
					<div class="ui orange message" id="invalid_password_message">
						The password you entered is incorrect
					</div>
					<div class="ui error message"></div>
  				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="cancel_set_archive">
					<i class="remove icon"></i>
					Cancel
				</button>				
				<button class="ui green button" type="submit" form="set_archive_date_form" id="confirm_set_archive">
					<i class="checkmark icon"></i>
					Confirm Date
				</button>
			</div>
		</div>
		<% } %>
		
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
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/retrieve_acad_year.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/archive/view_archive_folders.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/archive/enable_disable_archive.js"></script>
</html>