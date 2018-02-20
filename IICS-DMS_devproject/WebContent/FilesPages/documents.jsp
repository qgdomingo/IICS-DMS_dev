<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>

<%
	Account acc = (Account) session.getAttribute("currentCredentials");
	String userType = acc.getUserType();
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Documents | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/master.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/generalpages.css">
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
		      <i class="large cloud upload icon side"></i>Upload Document
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/files/documents.jsp">
		      <i class="large file icon side"></i>Documents
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
		      <i class="large folder open icon side"></i>Task Folders
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/calendar/viewcalendar.jsp">
		      <i class="large calendar icon side"></i>Calendar
		    </a>
		    <div class="item">
		   		Mail
		   		<div class="menu">
	<% if(!userType.equalsIgnoreCase("Staff")) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large write icon side"></i>Create Mail
			    	</a>
	<%  } %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!userType.equalsIgnoreCase("Faculty") && !userType.equalsIgnoreCase("Staff")) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
	<%  } %>
	<% if(!userType.equalsIgnoreCase("Staff")) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large exchange icon side"></i>Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/viewmemoletter.jsp">
			    		<i class="large open envelope icon side"></i>View All Memos/Letters
			    	</a>
	<%  } %>
		    	</div>
		    </div>
	<% if(!userType.equalsIgnoreCase("Faculty") && !userType.equalsIgnoreCase("Staff")) { %>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstats.jsp">
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
		
		<!-- DOCUMENT TYPE SELECTOR FOR MOBILE // mobile only-->
		<div class="">
			<div class="field">
				<label>View Document Type:</label>
				<select class="ui fluid dropdown" id="doctype_select">
				  	<option value="Personal">Personal</option>
				<% if(!userType.equalsIgnoreCase("Faculty")) { %>
				  	<option value="Incoming">Incoming</option>
				  	<option value="Outgoing">Outgoing</option>
				  	<!-- <option value="Archived">Archived</option>
				  	<option value="All">All Documents</option>  -->
				<% } %>
				</select>
			</div>
		</div>
			
		<!-- DOCUMENT TYPE SELECTOR FOR NON-MOBILE -->
		<!-- <div class="mobile hidden">
			<div class="ui secondary pointing menu">
				<a class="item active" id="personaldocs_button">
					<i class="folder open icon"></i>
					Personal
				</a>
				<a class="item" id="incomingdocs_button">
					<i class="folder icon"></i>
					Incoming
				</a>
				<a class="item" id="outgoingdocs_button">
					<i class="folder icon"></i>
					Outgoing
				</a>
				<a class="item" id="archiveddocs_button">
					<i class="folder icon"></i>
					Archived
				</a>
				<a class="item" id="alldocs_button">
					<i class="folder icon"></i>
					All Files
				</a>
			</div>		
		</div>
		 -->
		<br>
			
		<!-- SEGMENT FOR PERSONAL DOCUMENTS -->
			<div id="personaldocs_table">
				<h2 class="ui dividing header">
					<i class="user outline icon"></i>
					<div class="content">Personal Documents</div>
				</h2>
			
				<div class="ui segment">
					<div class="ui dimmer" id="personal_loading">
						<div class="ui text loader" >Retrieving Personal Documents</div>
					</div>
				
					<!-- SEARCH AREA -->
					<form class="ui form">
						<div class="four fields">
						
							<!-- SEARCH BOX -->
							<div class="field">
								<div class="ui icon input">
									<i class="search icon"></i>
									<input type="text" placeholder="Seach Document" id="personal_search"/>
								</div>
							</div>
							
							<!-- UPLOAD FROM DATE BOX -->
							<div class="field">
								<div class="ui calendar" id="personal_uploadfrom_calendar">
									<div class="ui icon input">
										<input type="text" placeholder="Upload From" id="personal_uploadfrom"/>
										<i class="calendar icon"></i>
									</div>
								</div>
							</div>
							
							<!-- UPLOAD TO DATE BOX -->
							<div class="field">
								<div class="ui calendar" id="personal_uploadto_calendar">
									<div class="ui icon input">
										<input type="text" placeholder="Upload To" id="personal_uploadto"/>
										<i class="calendar icon"></i>
									</div>
								</div>
							</div>
							
							<!-- CATEGORY DROPDOWN -->
							<div class="field">
								<select class="ui fluid dropdown" id="personal_category">
									<option value="">Category</option>
									<option value="Course Grades">Course Grades</option>
									<option value="Course Syllabus">Course Syllabus</option>
									<option value="Research">Research</option>
								</select>
							</div>
							
							<!-- SEARCH BUTTON -->
							<div class="field">
								<button class="ui grey button" type="button" id="personal_clear">
									Clear Search
								</button>
							</div>
						</div>
					</form>
					
					<!-- TABLE AREA -->
					<table class="ui compact selectable table" id="personal_table">
						<thead>
							<tr>
								<th>Document Title</th>
								<th>Upload Timestamp</th>
								<th>Category</th>
							</tr>
						</thead>
						<tbody id="personal_tablebody"></tbody>			
					</table>
				</div>		
			</div>
		
	<% if(!userType.equalsIgnoreCase("Faculty")) { %>	
	
		<!-- SEGMENT FOR INCOMING DOCUMENTS -->
			<div id="incomingdocs_table">
				<h2 class="ui dividing header">
					<i class="sign in icon"></i>
					<div class="content">
						Incoming Documents
						<div class="sub header">
							Here lists all documents which have concerns to the institution.
						</div>
					</div>
				</h2>
				
				<div class="ui segment">
					<div class="ui dimmer" id="incoming_loading">
						<div class="ui text loader" >Retrieving Incoming Documents</div>
					</div>
				
					<!-- SEARCH AREA -->
					<form class="ui form">
						<div class="five fields">
							<input type="hidden" value="Incoming"/>
						
							<!-- SEARCH BOX -->
							<div class="field">
								<div class="ui icon input">
									<input type="text" placeholder="Seach Document" id="incoming_search"/>
									<i class="search icon"></i>
								</div>
							</div>
							
							<!-- UPLOAD TIMESTAMP RANGE BOX -->
							<div class="field">
								<input type="text" placeholder="Upload Date"/>
							</div>
							
							<!-- CATEGORY DROPDOWN -->
							<div class="field">
								<select class="ui fluid dropdown" name="category">
									<option value="">Select Category..</option>
									<option value="memo">Memo</option>
									<option value="letter">Letter</option>
								</select>
							</div>
							
							<!-- ACTION REQUIRED DROPDOWN -->
							<div class="field">
								<select class="ui fluid dropdown">
									<option value="">Select Action</option>
									<option value="none">None</option>
									<option value="appr">Approval</option>
									<option value="endor">Endorsement</option>
									<option value="resp">Response</option>
								</select>
							</div>
							
							<!-- STATUS DROPDOWN -->
							<div class="field">
								<select class="ui fluid dropdown" name="status">
									<option value="">Select Status</option>
									<option value="forwarded">Forwarded to Director</option>
									<option value="received">Received by Director</option>
									<option value="done">Done</option>
								</select>
							</div>
							
							<!-- SEARCH BUTTON -->
							<div class="field">
								<button class="ui grey button" type="button">
									Search
								</button>
							</div>
						</div>
					</form>
					
					<!-- TABLE AREA -->
					<table class="ui compact selectable sortable table">
						<thead>
							<tr>
								<th>Document Title</th>
								<th>Document Source</th>
								<th>Upload Timestamp</th>
								<th>Category</th>
								<th>Action Required</th>
								<th>Status</th>
								<th>Reference No.</th>
							</tr>
						</thead>
						<tr>
							<td class="selectable"><a href="../index.jsp">
								<i class="file icon"></i>
								A Princess' Diary
								</a>
							</td>
							<td>Princess Peach</td>
							<td>12-12-2018 12:00:00</td>
							<td>Werpa point</td>
							<td>Response</td>
							<td>Forwarded to Director</td>
							<td>IN0069</td>
						</tr>
										
					</table>
				</div>
			</div>
			
		<!-- AREA FOR OUTGOING DOCUMENTS -->
			<div id="outgoingdocs_table">
				<h2 class="ui dividing header">
					<i class="sign out icon"></i>
					<div class="content">
						Outgoing Documents
						<div class="sub header">
							Here lists all documents which have concerns outside the institution.
						</div>
					</div>
				</h2>
			
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="three fields">
						<input type="hidden" name="doctype" value="Outgoing"/>
					
						<!-- SEARCH BOX -->
						<div class="field">
							<div class="ui icon input">
								<input type="text" placeholder="Seach Document.."/>
								<i class="search icon"></i>
							</div>
						</div>
						
						<!-- UPLOAD TIMESTAMP RANGE BOX -->
						<div class="field">
							<input type="text" placeholder="Upload Timestamp"/>
						</div>
						
						<!-- CATEGORY DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" name="category">
								<option value="">Category</option>
								<option value="memo">Memo</option>
								<option value="letter">Letter</option>
							</select>
						</div>
						
						<!-- SEARCH BUTTON -->
						<div class="field">
							<button class="ui grey button" type="button">
								Search
							</button>
						</div>
					</div>
				</form>
				
				<!-- TABLE AREA -->
				<table class="ui compact selectable sortable table">
					<thead>
						<tr>
							<th>Document Title</th>
							<th>Recipient</th>
							<th>Upload Timestamp</th>
							<th>Category</th>
						</tr>
					</thead>
					<tr>
						<td class="selectable"><a href="../index.jsp">
							<i class="file icon"></i>
							A Princess' Diary
							</a>
						</td>
						<td>Princess Daisy</td>
						<td>12-12-2018 12:00:00</td>
						<td>Werpa point</td>
					</tr>
									
				</table>
				
			</div>
	
		<!-- AREA FOR ARCHIVED DOCUMENTS -->
			<div id="archiveddocs_table">
				<h2 class="ui dividing header">
					<i class="archive icon"></i>
					<div class="content">
						Archived Documents
						<div class="sub header">
							Here lists past documents which are now archived and enabled by the administrator.
						</div>
					</div>
				</h2>
			
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="five fields">
					
						<!-- SEARCH BOX -->
						<div class="field">
							<div class="ui icon input">
								<input type="text" placeholder="Seach Document.."/>
								<i class="search icon"></i>
							</div>
						</div>
						
						<!-- UPLOAD TIMESTAMP RANGE BOX -->
						<div class="field">
							<input type="text" placeholder="Upload Timestamp"/>
						</div>
						
						<!-- DOCUMENT TYPE DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown">
					  			<option value="">Select Document Type</option>
					  			<option value="Personal">Personal</option>
					  			<option value="Incoming">Incoming</option>
					  			<option value="Outgoing">Outgoing</option>
							</select>
						</div>
						
						<!-- CATEGORY DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" name="category">
								<option value="">Select Category..</option>
								<option value="memo">Memo</option>
								<option value="letter">Letter</option>
							</select>
						</div>
						
						<!-- SEARCH BUTTON -->
						<div class="field">
							<button class="ui grey button" type="button">
								Search
							</button>
						</div>
					</div>
				</form>
				
				<!-- TABLE AREA -->
				<table class="ui compact selectable sortable table">
					<thead>
						<tr>
							<th>Document Title</th>
							<th>Uploader</th>
							<th>Upload Timestamp</th>
							<th>Document Type</th>
							<th>Category</th>
						</tr>
					</thead>
					<tr>
						<td class="selectable"><a href="../index.jsp">
							<i class="file icon"></i>
							A Princess' Diary
							</a>
						</td>
						<td>Mario</td>
						<td>12-12-2018 12:00:00</td>
						<td>Incoming</td>
						<td>Werpa point</td>
					</tr>
									
				</table>
				
			</div>
			
		<!-- AREA FOR ALL DOCUMENTS -->
			<div id="alldocs_table">
				<h2 class="ui dividing header">
					<i class="server icon"></i>
					<div class="content">
						All Documents
						<div class="sub header">
							Here lists all document types except for archived documents.
						</div>
					</div>

				</h2>
			
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="five fields">
					
						<!-- SEARCH BOX -->
						<div class="field">
							<div class="ui icon input">
								<input type="text" placeholder="Seach Document.."/>
								<i class="search icon"></i>
							</div>
						</div>
						
						<!-- UPLOAD TIMESTAMP RANGE BOX -->
						<div class="field">
							<input type="text" placeholder="Upload Timestamp"/>
						</div>
						
						<!-- DOCUMENT TYPE DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown">
					  			<option value="">Select Document Type</option>
					  			<option value="Personal">Personal</option>
					  			<option value="Incoming">Incoming</option>
					  			<option value="Outgoing">Outgoing</option>
							</select>
						</div>
						
						<!-- CATEGORY DROPDOWN -->
						<div class="field">
							<select class="ui fluid dropdown" name="category">
								<option value="">Select Category..</option>
								<option value="memo">Memo</option>
								<option value="letter">Letter</option>
							</select>
						</div>
						
						<!-- SEARCH BUTTON -->
						<div class="field">
							<button class="ui grey button" type="button">
								Search
							</button>
						</div>
					</div>
				</form>
				
				<!-- TABLE AREA -->
				<table class="ui compact selectable sortable table">
					<thead>
						<tr>
							<th>Document Title</th>
							<th>Uploader</th>
							<th>Upload Timestamp</th>
							<th>Document Type</th>
							<th>Category</th>
						</tr>
					</thead>
					<tr>
						<td class="selectable"><a href="../index.jsp">
							<i class="file icon"></i>
							A Princess' Diary
							</a>
						</td>
						<td>Mario</td>
						<td>12-12-2018 12:00:00</td>
						<td>Incoming</td>
						<td>Werpa point</td>
					</tr>
									
				</table>
			</div>
		<% } %>	
	
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
		<!-- VIEW - PERSONAL DOCUMENT -->
		<div class="ui tiny modal" id="viewpersonal_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="file icon"></i>
					<div class="content" id="viewpersonal_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Uploaded By: </b><span id="viewpersonal_uploadedby"></span></p>
				<p class="element-rmb"><b>Upload Date: </b><span id="viewpersonal_uploaddate"></span></p>
				<p class="element-rmb"><b>Category: </b><span id="viewpersonal_category"></span></p>
				<p class="element-rmb"><b>Document Type: </b><span id="viewpersonal_type"></span></p>
				
				<p class="element-rmb"><b>File: </b><span id="viewpersonal_file"></span>
					<form method="GET" action="${pageContext.request.contextPath}/FileDownload">
						<input type="hidden" name="id" id="viewpersonal_download_id">
						<input type="hidden" name="type" id="viewpersonal_download_type">
						<button class="ui small button" type="submit">View File</button>
					</form>
				</p>
				
				<p><b>Description: </b><span id="viewpersonal_description"></span></p>

			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewpersonal_close">Close</button>
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
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/documents.js"></script>
</html>