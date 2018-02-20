<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>

<%
	Account acc = (Account) session.getAttribute("currentCredentials");
	String userType = acc.getUserType();
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Upload Document | IICS DMS</title>
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
						<%= acc.getFullName() %>
						<div class="sub header user-accountsub-color"><%= acc.getUserType() %></div>
					</div>
				</h5>
			</a>
			<a class="item" href="${pageContext.request.contextPath}/home.jsp">
		      <i class="large home icon side"></i>Home
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/files/fileupload.jsp">
		      <i class="large cloud upload icon side"></i>Upload Document
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/files/documents.jsp">
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
					<i class="large cloud upload icon"></i>
					Upload Document
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

		<!-- DOCUMENT TYPE SELECTOR -->
		<div class="ui grid form element-rpt">
			<div class="three wide computer four wide tablet sixteen wide mobile column">
				<div class="field">
					<label>Upload Document Type:</label>
					<select class="ui fluid dropdown" id="doctype_select">
			  			<option value="Personal">Personal</option>
			  		<% if(!userType.equalsIgnoreCase("Faculty")) { %>
					  	<option value="Incoming">Incoming</option>
					  	<option value="Outgoing">Outgoing</option>
					<% } %>
					</select>
				</div>
			</div>
			
			<br>
			
			<div class="ten wide computer ten wide tablet sixteen wide mobile column">
			
		<!-- FORM FOR PERSONAL DOCUMENTS -->
			<form class="ui form" action="${pageContext.request.contextPath}/FileUpload"
					method="post" enctype="multipart/form-data" id="personaldocs_form">
					
				<input type="hidden" name="document_type" value="Personal"/>
				
				<div class="required field">
					<label>Category:</label>
					<div class="inline two fields">
						<div class="field">
						<select class="ui fluid dropdown" name="category" id="personal_category" required>
							<option value="">Select Category..</option>
						</select>
						</div>
						<div class="field">
				<% if(!userType.equalsIgnoreCase("Faculty")) { %>	
						<button class="ui inverted orange button" type="button" id="personal_category_add">
							<i class="pencil icon"></i>
							Add Category
						</button>
				<% } %>
						</div>
					</div>
				</div>
				
				<div class="required field">
					<label>Document Title:</label>
					<input type="text" name="document_title" placeholder="e.g. ICS 111 Grades" required/>
				</div>
			
				<div class="field">
					<label>Document Description:</label>
					<p class="microcopy-hint">
						Give a short description about the document to give you, future you, or others a hint about the document.
					</p>
					<textarea name="description"></textarea>
				</div>
				
				
				<div class="required inline field">
					<label>File to Upload:</label>
					<input type="file" name="file" required/>
				</div>
				
				<button class="ui labeled icon green button" type="submit">
					<i class="upload icon"></i>
					Upload Personal File
				</button>
				
				<button class="ui grey button" type="button" id="personal_clear">
					Clear Fields
				</button>
				
			</form>
	
	<% if(!userType.equalsIgnoreCase("Faculty")) { %>	
		
		<!-- FORM FOR INCOMING DOCUMENTS -->
			<form class="ui form" action="${pageContext.request.contextPath}/FileUpload"
					method="post" enctype="multipart/form-data" id="incomingdocs_form">
					
				<input type="hidden" name="document_type" value="Incoming"/>
				
				<div class="required field">
					<label>Category:</label>
					<div class="inline two fields">
						<div class="field">
						<select class="ui fluid dropdown" name="category" id="incoming_category" required>
							<option value="">Select Category</option>
						</select>
						</div>
						<div class="field">	
						<button class="ui inverted orange button" type="button" id="incoming_category_add">
							<i class="pencil icon"></i>
							Add Category
						</button>
						</div>
					</div>
				</div>
				
				<div class="required field">
					<label>Document Source:</label>
					<p class="microcopy-hint">
						This indicates from whom the document was received.
					</p>
					<div class="inline two fields">
						<div class="field">
						<select class="ui fluid dropdown" name="document_source" id="incoming_source" required>
							<option value="">Select Document Source</option>
						</select>
						</div>
						<div class="field">	
						<button class="ui inverted orange button" type="button" id="incoming_source_add">
							<i class="pencil icon"></i>
							Add Source 
						</button>
						</div>
					</div>
				</div>
				
				<div class="required field">
					<label>Document Title:</label>
					<input type="text" name="document_title" placeholder="e.g. Announcement from the Dean of Eng'g" required/>
				</div>
			
				<div class="field">
					<label>Document Description:</label>
					<p class="microcopy-hint">
						Give a short description about the document to give you, future you, or others a hint about the document.
					</p>
					<textarea name="description"></textarea>
				</div>
				
				<div class="two fields">
					<div class="required field">
						<label>Action Required:</label>
						<select class="ui fluid dropdown" name="action_required" id="incoming_action">
							<option value="">Select Action..</option>
							<option value="None">None</option>
							<option value="Approval">Approval</option>
							<option value="Endorsement">Endorsement</option>
							<option value="Response">Response</option>
						</select>
					</div>
					<div class="field">
						<label>Reference No.</label>
						<input type="text" placeholder="IN0000"  name="reference_no"/>
						<p class="microcopy-hint">This is used for linking incoming documents.</p>
					</div>
				</div>
				
				<div class="required inline field">
					<label>File to Upload:</label>
					<input type="file" name="file" required/>
				</div>
				
				<button class="ui labeled icon green button" type="submit">
					<i class="upload icon"></i>
					Upload Incoming File
				</button>
				
				<button class="ui grey button" type="button" id="incoming_clear">
					Clear Fields
				</button>
				
			</form>
			
		<!-- FORM FOR OUTGOING DOCUMENTS -->
			<form class="ui form" action="${pageContext.request.contextPath}/FileUpload"
					method="post" enctype="multipart/form-data" id="outgoingdocs_form">
					
				<input type="hidden" name="document_type" value="Outgoing"/>
				
				<div class="required field">
					<label>Category:</label>
					<div class="inline two fields">
						<div class="field">
						<select class="ui fluid dropdown" name="category" id="outgoing_category">
							<option value="">Select Category..</option>
						</select>
						</div>
						<div class="field">
						<button class="ui inverted orange button" type="button" id="outgoing_category_add">
							<i class="pencil icon"></i>
							Add Category
						</button>
						</div>
					</div>
				</div>
				
				<div class="required field">
					<label>Document Recipient:</label>
					<p class="microcopy-hint">
						This indicates to whom the document is for.
					</p>
					<div class="inline two fields">
						<div class="field">
						<select class="ui fluid dropdown" name="document_recipient" id="outgoing_recipient" required>
							<option value="">Select Document Recipient</option>
						</select>
						</div>
						<div class="field">	
						<button class="ui inverted orange button" type="button" id="outgoing_recipient_add">
							<i class="pencil icon"></i>
							Add Source 
						</button>
						</div>
					</div>
				</div>
				
				<div class="required field">
					<label>Document Title:</label>
					<input type="text" name="document_title" placeholder="e.g. Announcement from the Director of IICS" required/>
				</div>
			
				<div class="field">
					<label>Document Description:</label>
					<p class="microcopy-hint">
						Give a short description about the document to give you, future you, or others a hint about the document.
					</p>
					<textarea name="description"></textarea>
				</div>
				
				<div class="required inline field">
					<label>File to Upload:</label>
					<input type="file" name="file" required/>
				</div>
				
				<button class="ui labeled icon green button" type="submit">
					<i class="upload icon"></i>
					Upload Outgoing File
				</button>
				
				<button class="ui grey button" type="button" id="outgoing_clear">
					Clear Fields
				</button>
				
			</form>

			</div>
		</div>
		
	<% } %>
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>
		
	<% if(!userType.equalsIgnoreCase("Faculty")) { %>	
		<!-- ADD CATEGORY DIALOG BOX -->
		<div class="ui tiny modal" id="category_dia">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="pencil icon"></i>
					<div class="content">Add New Category</div>
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui form" id="category_form">
					<div class="field" id="category_input_field">
						<label>Category</label>
						<input type="text" id="category_input"/>
					</div>
				</div>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="category_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" id="category_submit">
					<i class="checkmark icon"></i>
					Add Category
				</button>
			</div>
		</div>
		
		<!-- ADD SOURCE/RECIPIENT DIALOG BOX -->
		<div class="ui tiny modal" id="source_dia">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="pencil icon"></i>
					<div class="content">Add New Document Source/Recipient</div>
				</h3>
			</div>
			<div class="modal-content">
				<div class="ui form" id="source_form">
					<div class="field" id="source_input_field">
						<label>Document Source/Recipient</label>
						<input type="text" id="source_input"/>
					</div>
				</div>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="source_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" id="source_submit">
					<i class="checkmark icon"></i>
					Add Source/Recipient
				</button>
			</div>
		</div>
	<% } %>
		
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
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/fileupload.js"></script>
</html>