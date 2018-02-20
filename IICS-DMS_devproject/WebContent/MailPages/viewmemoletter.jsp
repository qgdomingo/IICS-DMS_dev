<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>

<%
	Account acc = (Account) session.getAttribute("currentCredentials");
	String userType = acc.getUserType();
%>
<!DOCTYPE html>
<html>
	<head>
		<title>View All Memos / Letters | IICS DMS</title>
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
		    <a class="item" href="${pageContext.request.contextPath}/files/fileupload.jsp">
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
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large write icon side"></i>Create Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
	<% if(!userType.equalsIgnoreCase("Faculty")) { %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
	<%  } %>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large exchange icon side"></i>Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/viewmemoletter.jsp">
			    		<i class="large open envelope icon side"></i>View All Memos/Letters
			    	</a>
		    	</div>
		    </div>
	<% if(!userType.equalsIgnoreCase("Faculty")) { %>
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
					<i class="large open envelope icon"></i>
					View All Memos / Letters
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
		<!-- SEARCH AREA -->
		<form class="ui form">
			<div class="three fields">
					
				<!-- SEARCH BOX -->
				<div class="field">
					<div class="ui icon input">
						<input type="text" placeholder="Seach Mail"/>
						<i class="search icon"></i>
					</div>
				</div>
						
				<!-- MAIL TIMESTAMP RANGE BOX -->
				<div class="field">
					<input type="text" placeholder="Mail Timestamp Range"/>
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
					<th>To</th>
					<th>Created by</th>
					<th>Subject</th>
					<th>Timestamp</th>
				</tr>
			</thead>
			<tr>
				<td>Princess Daisy</td>
				<td>Princess Peach</td>
				<td class="selectable"><a href="../index.jsp">
					<i class="mail icon"></i>
					A Princess' Diary
					</a>
				</td>
				<td>12-12-2018 12:00:00</td>
			</tr>				
		</table>	
		
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
</html>