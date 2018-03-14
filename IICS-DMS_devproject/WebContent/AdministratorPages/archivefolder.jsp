<%@page import="com.ustiics_dms.model.Account"%>
<%@page import="com.ustiics_dms.controller.archivedocument.ArchiveDocumentFunctions"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		
		if( !(acc.getUserType().equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
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

		<h3 class="ui dividing header element-rmt">
			<a href="${pageContext.request.contextPath}/admin/archive.jsp">
				<i class="black chevron left icon"></i>
			</a> 
			<span id="folder_title"></span>
		</h3>

		<div class="ui segment">
			<div class="ui dimmer" id="archive_folder_loading">
				<div class="ui text loader">Retrieving Archived Documents</div>
			</div>
			
			<!-- SEARCH ROW -->
			<form class="ui form">
				<div class="eight fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Search Archive" id="search_archive"/>
							<i class="search icon"></i>
						</div>
					</div>
							
					<!-- DOCUMENT TYPE -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_type">
							<option value="">Document Type</option>
							<option value="Incoming">Incoming</option>
							<option value="Outgoing">Outgoing</option>
						</select>
					</div>	
							
					<!-- CATEGORY DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_category">
							<option value="">Category</option>
						</select>
					</div>		
					
					<!-- SOURCE/RECIPIENT DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="search_source_recipient">
							<option value="">Source/Recipient</option>
						</select>
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

			<!-- TABLE AREA -->
			<table class="ui compact selectable table" id="archive_folders_table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Type</th>
						<th>Category</th>
						<th>Source/Recipient</th>
						<th>Uploader</th>
						<th>Upload Timestamp</th>
						<th>Academic Year</th>
					</tr>
				</thead>
				<tbody id="archive_folders_tablebody"></tbody>
			</table>
		</div>

<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW - INCOMING DOCUMENT -->
		<div class="ui tiny modal" id="viewincoming_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="file icon"></i>
					<div class="content" id="viewincoming_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Document Source: </b><span id="viewincoming_source"></span></p>
				<p class="element-rmb"><b>Reference No: </b><span id="viewincoming_refno"></span></p>
				<p class="element-rmb"><b>Note: </b><span id="viewincoming_note"></span></p>
				<p class="element-rmb"><b>Department: </b><span id="viewincoming_department"></span></p>
				<p class="element-rmb"><b>Academic Year: </b><span id="viewincoming_academic_year"></span></p>
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
				
				<form method="GET" action="">
					<input type="hidden" name="id" id="viewincoming_download_id">
					<input type="hidden" name="type" id="viewincoming_download_type">
					<!-- ${pageContext.request.contextPath}  -->
					<button class="ui small button" type="submit">
						<i class="file icon"></i>View File
					</button>
				</form>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewincoming_close">Close</button>
			</div>
		</div>
		
		<!-- VIEW - OUTGOING DOCUMENT -->
		<div class="ui tiny modal" id="viewoutgoing_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="file icon"></i>
					<div class="content" id="viewoutgoing_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Document Recipient: </b><span id="viewoutgoing_recipient"></span></p>
				<p class="element-rmb"><b>Department: </b><span id="viewoutgoing_department"></span></p>
				<p class="element-rmb"><b>Academic Year: </b><span id="viewoutgoing_academic_year"></span></p>
				<br>
				<h5 class="ui horizontal header divider element-rmb element-rmt">
				  <i class="info circle icon"></i>
				  File Details
				</h5>
				<p class="element-rmb"><b>Uploaded By: </b><span id="viewoutgoing_uploadedby"></span></p>
				<p class="element-rmb"><b>Upload Date: </b><span id="viewoutgoing_uploaddate"></span></p>
				<p class="element-rmb"><b>Category: </b><span id="viewoutgoing_category"></span></p>
				<p class="element-rmb"><b>Document Type: </b><span id="viewoutgoing_type"></span></p>
				<p class="element-rmb"><b>File Name: </b><span id="viewoutgoing_file"></span></p>
				<p><b>Description: </b><span id="viewoutgoing_description"></span></p>
				
				<form method="GET" action="">
					<input type="hidden" name="id" id="viewoutgoing_download_id">
					<input type="hidden" name="type" id="viewoutgoing_download_type">

					<button class="ui small button" type="submit">
						<i class="file icon"></i>View File
					</button>
				</form>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewoutgoing_close">Close</button>
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
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/session/admin_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/categories.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/retrieve_acad_year.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/archive/view_archive_folder_documents.js"></script>
</html>