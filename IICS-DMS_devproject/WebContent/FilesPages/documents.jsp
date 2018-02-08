<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Documents | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/semanticui/semantic.min.css">
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
						Jeddi Boi
						<div class="sub header user-accountsub-color">Department Head</div>
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
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large write icon side"></i>Create Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large exchange icon side"></i>Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/viewmemoletter.jsp">
			    		<i class="large open envelope icon side"></i>View All Memos/Letters
			    	</a>
		    	</div>
		    </div>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item" href="${pageContext.request.contextPath}/reports/semestralstats.jsp">
			    		<i class="large bar chart icon side"></i>Semestral Statistics
			    	</a>
		    	</div>
		    </div>
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
						    Jeddi Boi
						    <div class="sub header user-accountsub-color">Department Head</div>
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
		
		<!-- DOCUMENT TYPE SELECTOR -->
		<div class="ui grid form element-rpt">
			<div class="three wide computer three wide tablet sixteen wide mobile column">
				<div class="field">
					<label>View Document Type:</label>
					<select class="ui fluid dropdown" id="doctype_select">
			  			<option value="Personal">Personal</option>
			  			<option value="Incoming">Incoming</option>
			  			<option value="Outgoing">Outgoing</option>
			  			<option value="Archived">Archived</option>
			  			<option value="All">All Documents</option>
					</select>
				</div>
			</div>
			
			<br>
			
			<div class="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
			
		<!-- AREA FOR PERSONAL DOCUMENTS -->
			<div id="personaldocs_table">
				<h2 class="ui dividing header">
					<i class="user outline icon"></i>
					<div class="content">Personal Documents</div>
				</h2>
			
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="three fields">
						<input type="hidden" name="doctype" value="Personal"/>
					
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
						<td>12-12-2018 12:00:00</td>
						<td>Werpa point</td>
					</tr>				
				</table>
			</div>
			
		<!-- AREA FOR INCOMING DOCUMENTS -->
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
			
				<!-- SEARCH AREA -->
				<form class="ui form">
					<div class="five fields">
						<input type="hidden" name="doctype" value="Incoming"/>
					
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
			
			
			</div>
		</div>
		
<!-- END OF ACTUAL PAGE CONTENTS -->
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
	<script src="${pageContext.request.contextPath}/resource/js/tablesort.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/documents.js"></script>
</html>