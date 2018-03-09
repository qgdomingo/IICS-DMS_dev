<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = new Account();
	String userType = "";
	String department = "";

	if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
		response.sendRedirect(request.getContextPath() + "/index.jsp");
	} else {
		acc = (Account) session.getAttribute("currentCredentials");
		userType = acc.getUserType();
		department = acc.getDepartment();
		
		if( (userType.equalsIgnoreCase("Administrator")) ) {
			response.sendRedirect(request.getContextPath() + "/admin/manageusers.jsp");
		} 
		else if (userType.equalsIgnoreCase("Faculty") || userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
			response.sendRedirect(request.getContextPath() + "/home.jsp");
		}
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Semestral Statistics | IICS DMS</title>
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
			    	<a class="item" href="${pageContext.request.contextPath}/mail/newmail.jsp">
			    		<i class="large pencil alternate icon side"></i>Create Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/inbox.jsp">
			    		<i class="large inbox icon side"></i>Inbox
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/sentmail.jsp">
			    		<i class="large send icon side"></i>Sent Mail
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/requests.jsp">
			    		<i class="large envelope square icon side"></i>Mail Requests
			    	</a>
			    	<a class="item" href="${pageContext.request.contextPath}/mail/exportedmail.jsp">
			    		<i class="large external link square alternate icon side"></i>Exported Mail
			    	</a>
		    	</div>
		    </div>
			<div class="item">
		   		Reports
		   		<div class="menu">
			    	<a class="item active" href="${pageContext.request.contextPath}/reports/semestralstatstask.jsp">
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
					<i class="large bar chart icon"></i>
					Semestral Statistics
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
		<div class="ui secondary pointing menu element-rmt">
			<a class="item active" href="${pageContext.request.contextPath}/reports/semestralstatstask.jsp">
				<i class="folder open icon"></i>
				Task Compliance
			</a>
			<a class="item" href="${pageContext.request.contextPath}/reports/semestralstatsmail.jsp">
				<i class="folder icon"></i>
				Mail Acknowledgement
			</a>
		</div>		
		
		<div class="ui segment element-rpt">
			<div class="ui dimmer" id="task_statistics_loading">
				<div class="ui text loader">Retrieving Task Statistics</div>
			</div>
			
			<form class="ui form" id="view_stats_form">
				<h4 class="element-rmb element-mt">View Task Statistics:</h4>
				<div class="four fields">
					<div class="field">
						<select class="ui fluid dropdown" name="view_academic_year" id="view_academic_year">
							<option value="">Academic Year</option>
						</select>
					</div>
					
					<div class="field">
						<select class="ui fluid dropdown" name="view_scope" id="view_scope">
							<option value="">View By</option>
						<% if(!userType.equalsIgnoreCase("Department Head")) { %>
							<option value="Staff">Staff</option>
						<% } %>	
							<option value="Faculty">Faculty</option>
							<option value="Department">Department</option>
						</select>
					</div>
					
					<div class="field" id="department_selection">
						<select class="ui fluid dropdown" name="department_selection" id="department_selection_dropdown">
							<option value="">Select Department</option>
						<% if(department.equalsIgnoreCase("Information Technology") || department.equalsIgnoreCase("IICS")) { %>
							<option value="Information Technology">Information Technology</option>
						<% } %>
						<% if(department.equalsIgnoreCase("Computer Science") || department.equalsIgnoreCase("IICS")) { %>
							<option value="Computer Science">Computer Science</option>
						<% } %>
						<% if(department.equalsIgnoreCase("Information Systems") || department.equalsIgnoreCase("IICS")) { %>
							<option value="Information Systems">Information Systems</option>
						<% } %>
						</select>
					</div>
					
					<div class="field" id="user_selection">
						<select class="ui fluid searchable dropdown" name="user_selection" id="user_selection_dropdown">
							<option value="">Select User</option>
						</select>
					</div>
					
					<div class="field">
						<button class="ui green button" type="submit" id="view_stats_submit">
							Go
						</button>
					</div>
				</div>
				
				<div class="ui error message"></div>
			</form>
			
			<br>
			
			<div class="ui stackable grid">
				<div class="seven wide computer sixteen wide tablet sixteen wide mobile column">
					<canvas id="myChart"></canvas>
				</div>
				
				<div class="nine wide computer sixteen wide tablet sixteen wide mobile column">
					<h4 id="no_of_tasks_title">Total No. of Tasks on the Statistics: <span id="no_of_tasks"></span></h4>
				
					<table class="ui compact selectable table" id="task_department_table">
						<thead>
							<tr>
								<th class="seven wide">Task Title</th> 
								<th class="three wide">No. of On-time Submission</th>
								<th class="three wide">No. of Late Submission</th>
								<th class="three wide">No. of Unaccomplishment</th>
							</tr>
						</thead>
						<tbody id="task_department_tablebody"></tbody>
					</table>
					
					<div class="ui action input" id="task_facultystaff_filter">
 						<select class="ui fluid dropdown">
							<option value="">Filter Task Status</option>
							<option value="On-time Submission">On-time Submission</option>
							<option value="Late Submission">Late Submission</option>
							<option value="No Submission">No Submission</option>
						</select>
  						<div class="ui grey button">Clear Filter</div>
					</div>
									
					<table class="ui compact selectable table" id="task_facultystaff_table">
						<thead>
							<tr>
								<th class="thirteen wide">Task Title</th> 
								<th class="three wide">Status</th>
							</tr>
						</thead>
						<tbody id="task_facultystaff_tablebody"></tbody>
					</table>
					
				</div>
			 
			</div>
			
		</div>
<!-- END OF ACTUAL PAGE CONTENTS -->
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
	<script src="${pageContext.request.contextPath}/resource/js/session/regular_user_check.js"></script>
	<script src="${pageContext.request.contextPath}/resource/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/chartjs/Chart.js"></script>
	<script src="${pageContext.request.contextPath}/resource/chartjs/Chart.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/reports/directory_statistics.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/reports/task_statistics.js"></script>
</html> 