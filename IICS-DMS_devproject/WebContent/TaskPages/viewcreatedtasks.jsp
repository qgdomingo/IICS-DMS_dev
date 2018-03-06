<%@page import="com.ustiics_dms.model.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	Account acc = (Account) session.getAttribute("currentCredentials");
	String userType = acc.getUserType();
	
	boolean restrictionCase1 = false;
	boolean restrictionCase2 = false;
	
	// Restriction Case 1 - not allowed for Faculty, Supervisor and Staff
	if(userType.equalsIgnoreCase("Faculty") || userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) { 
		restrictionCase1 = true;
	}
	
	// Restriction Case 2 - not allowed for Supervisor and Staff
	if(userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff")) {
		restrictionCase2 = true;
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Tasks | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
		      <i class="large cloud upload alternate icon side"></i>Upload Document
		    </a>
		    <a class="item" href="${pageContext.request.contextPath}/files/personaldocs.jsp">
		      <i class="large file icon side"></i>Documents
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
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
	<% if(!restrictionCase1) { %>
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
					<i class="large tasks icon side"></i>
					Tasks
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

		<!-- MENU -->
		<div class="ui secondary pointing menu ">
			<a class="item" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
				<i class="folder icon"></i>
				My Tasks
			</a>
			<a class="item active" href="${pageContext.request.contextPath}/task/viewcreatedtasks.jsp">
				<i class="folder open icon"></i>
				Tasks Created
			</a>
		</div>

		<!-- TASKS CREATED SEGMENT -->
		<div class="ui segment" id="taskscreated_segment">
			<div class="ui dimmer" id="taskscreated_loading">
				<div class="ui text loader">Retrieving Tasks</div>
			</div>
			
			<!-- SEARCH ROW -->
			<form class="ui form">
				<div class="six fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach Task" id="taskscreated_search"/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- CREATED BOX -->
					<div class="field">
						<div class="ui calendar" id="taskscreated_created_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Date Created" id="taskscreated_created"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- DEADLINE BOX -->
					<div class="field">
						<div class="ui calendar" id="taskscreated_deadline_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Deadline" id="taskscreated_deadline"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- CATEGORY DROPDOWN -->
					<div class="field">
						<select class="ui fluid search selection dropdown" id="taskscreated_category">
							<option value="">Category</option>
							<option value="Course Grades">Course Grades</option>
							<option value="Course Syllabus">Course Syllabus</option>
							<option value="Research">Research</option>
						</select>
					</div>
					
					<!-- STATUS DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="taskscreated_status">
							<option value="">Status</option>
							<option value="Done">Done</option>
							<option value="On-going">On-going</option>
						</select>
					</div>
					
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button" id="taskscreated_clear">
							Clear Search
						</button>
					</div>
	
				</div>
			</form>
			
			<button class="ui icon labeled green button element-mb" type="button" id="taskscreated_addtask_btn">
				<i class="plus icon"></i>
				Add Task
			</button>
			 
			<table class="ui compact selectable table" id="taskscreated_table">
				<thead>
					<tr>
						<th>Task</th>
						<th>Date Created</th>
						<th>Deadline Set</th>
						<th>Category</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody id="taskscreated_tablebody"></tbody>		
			</table>	
		</div>
		
<!-- END OF ACTUAL PAGE CONTENTS -->
		</div>

		<!-- ADD TASK MODAL -->
		<div class="ui small modal" id="addtask_dialog">
			<div class="header add-modal">
				<h3 class="ui header add-modal">
					<i class="plus icon"></i>
					<div class="content">Add New Task</div>
				</h3>
			</div>
			<div class="modal-content">
				<form class="ui form" method="POST" action="${pageContext.request.contextPath}/AddTask" id="add_task_form">
					<div class="required field">
						<label>Task Title:</label>
						<input type="text" name="title" id="addtask_title"/>
					</div>
					
					<div class="required field">
						<label>Task Deadline:</label>
						<div class="ui calendar" id="addtask_deadline_calendar">
							<div class="ui icon input">
								<input type="text" name="deadline" id="addtask_deadline"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<div class="required field">
						<label>Category:</label>
						<select class="ui fluid search selection dropdown" name="category" id="addtask_category">
							<option value="">Select Category</option>
						</select>
					</div>
					
					<div class="required field">
						<label>Instructions:</label>
						<textarea rows="3" name="instructions" id="addtask_instructions"></textarea>
					</div>
					
					<div class="required field">
						<label>Assign To:</label>
						<select class="ui fluid search selection dropdown" multiple="" name="assigned_to" id="addtask_assignto">
							<option value="">Select Users</option>
						</select>
					</div>
					
					<div class="ui error message"></div>
				</form>
			</div>
			<div class="actions">
				<button class="ui button" id="addtask_clear">
					Clear Fields
				</button>
				<button class="ui cancel grey button" id="addtask_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>				
				<button class="ui green button" type="submit" form="add_task_form" id="addtask_submit">
					<i class="checkmark icon"></i>
					Create Task
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
	<script src="${pageContext.request.contextPath}/resource/dataTable/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/dataTable/dataTables.semanticui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/calendarpicker/calendar.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/categories.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/directory.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/managetasks/view_createdtasks.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/managetasks/add_tasks.js"></script>
</html>