<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Task Folders | IICS DMS</title>
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
		    <a class="item" href="${pageContext.request.contextPath}/files/documents.jsp">
		      <i class="large file icon side"></i>Documents
		    </a>
		    <a class="item active" href="${pageContext.request.contextPath}/task/viewtasks.jsp">
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
					<i class="large folder open icon"></i>
					Task Folders
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

		<!-- MENU -->
		<div class="ui secondary pointing menu ">
			<a class="item active" id="mytasks_button">
				<i class="folder open icon"></i>
				My Tasks
			</a>
			<a class="item" id="taskscreated_button">
				<i class="folder icon"></i>
				Tasks Created
			</a>
		</div>
		
		<!-- MY TASKS SEGMENT -->
		<div class="ui segment" id="mytasks_segment">
			<div class="ui dimmer" id="mytasks_loading">
				<div class="ui text loader">Retrieving Tasks</div>
			</div>
			
			<!-- SEARCH ROW -->
			<form class="ui form">
				<div class="five fields">
				
					<!-- SEARCH BOX -->
					<div class="field">
						<div class="ui icon input">
							<input type="text" placeholder="Seach Task" id="mytask_search"/>
							<i class="search icon"></i>
						</div>
					</div>
					
					<!-- DEADLINE BOX -->
					<div class="field">
						<div class="ui calendar" id="mytask_deadline_calendar">
							<div class="ui icon input">
								<input type="text" placeholder="Deadline" id="mytask_deadline"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<!-- CATEGORY DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="mytask_category">
							<option value="">Category</option>
							<option value="Course Grades">Course Grades</option>
							<option value="Course Syllabus">Course Syllabus</option>
							<option value="Research">Research</option>
						</select>
					</div>
					
					<!-- STATUS DROPDOWN -->
					<div class="field">
						<select class="ui fluid dropdown" id="mytask_status">
							<option value="">Status</option>
							<option value="On-time Submission">On-time Submission</option>
							<option value="Late Submission">Late Submission</option>
							<option value="No Submission">No Submission</option>
						</select>
					</div>
					
					<!-- SEARCH BUTTON -->
					<div class="field">
						<button class="ui grey button" type="button" id="mytask_clear">
							Clear Search
						</button>
					</div>
	
				</div>
			</form>
			
			<table class="ui compact selectable table" id="mytasks_table">
				<thead>
					<tr>
						<th>Task</th>
						<th>Assigned By</th>
						<th>Deadline Set</th>
						<th>Category</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody id="mytasks_tablebody"></tbody>		
			</table>	
		</div>
		
		<!-- TASKS CREATED SEGMENT -->
		<div class="ui segment" id="taskscreated_segment">
			<div class="ui dimmer" id="taskscreated_loading">
				<div class="ui text loader" >Retrieving Tasks</div>
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
						<select class="ui fluid dropdown" id="taskscreated_category">
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
		
		<!-- VIEW MY TASK MODAL -->
		<div class="ui tiny modal" id="mytask_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="tasks icon"></i>
					<div class="content" id="mytask_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Category: </b><span id="mytask_viewcategory"></span></p>
				<p class="element-rmb"><b>Assigned by: </b><span id="mytask_assignedby"></span></p>
				<p class="element-rmb"><b>Date Created: </b><span id="mytask_datecreated"></span></p>
				<p class="element-rmb"><b>Deadline: </b><span id="mytask_viewdeadline"></span></p>
				<p><b>Instructions: </b><span id="mytask_instructions"></span></p>
				
				<form class="ui form" method="post" action="${pageContext.request.contextPath}/SubmitTask" 
						enctype="multipart/form-data" id="mytask_form">
					<div class="required field">
						<label>Document Title:</label>
						<input type="text" name="document_title" required/>
					</div>
					
					<div class="required inline field">
						<label>Attachment:</label>
						<input type="file" name="file" required/>
					</div>
					
					<div class="field">
						<label>Description:</label>
						<textarea rows="2" name="description" required></textarea>
					</div>
					
					<input type="hidden" name="id" id="mytask_submit_id">
					<input type="hidden" name="deadline" id="mytask_submit_deadline">
					
					<button class="ui labeled icon green button" type="submit">
						<i class="upload icon"></i>
						Upload File
					</button>
				</form>
				
				<div id="mytask_submissiondetails">
					<div class="ui dimmer" id="mytask_submissiondetails_loading">
						<div class="ui text loader">Retrieving Submission Details</div>
					</div>
					<h3 class="ui dividing header">
						<div class="content">My Submission</div>
					</h3>
					<p class="element-rmb"><b>Document Title: </b><span id="mytask_sub_title"></span></p>
					<p class="element-rmb"><b>Submission Date: </b><span id="mytask_submissiondate"></span></p>
					<p class="element-rmb"><b>Status: </b><span id="mytask_viewstatus"></span></p>
					<p class="element-rmb">
						<b>Attachment: </b><span id="mytask_file"></span>
						<form method="POST" action="${pageContext.request.contextPath}/DownloadTask">
							<input type="hidden" name="id" id="mytask_download_id">
							<input type="hidden" name="email" id="mytask_download_email">
							<button class="ui small button" type="submit">View File</button>
						</form>
					</p>
					<p><b>Description: </b><span id="mytask_description"></span></p>
				</div>
				
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button" id="viewmytask_close">Close</button>
			</div>
		</div>
		
		<!-- ADD TASK MODAL -->
		<div class="ui tiny modal" id="addtask_dialog">
			<div class="header add-modal">
				<h3 class="ui header add-modal">
					<i class="plus icon"></i>
					<div class="content">Add New Task</div>
				</h3>
			</div>
			<div class="modal-content">
				<form class="ui form">
					<div class="required field" id="addtask_title_field">
						<label>Task Title:</label>
						<input type="text" id="addtask_title"/>
					</div>
					
					<div class="required field" id="addtask_deadline_field">
						<label>Task Deadline:</label>
						<div class="ui calendar" id="addtask_deadline_calendar">
							<div class="ui icon input">
								<input type="text" id="addtask_deadline"/>
								<i class="calendar icon"></i>
							</div>
						</div>
					</div>
					
					<div class="required field" id="addtask_category_field">
						<label>Category:</label>
						<select class="ui fluid dropdown" id="addtask_category">
							<option value="">Category</option>
							<option value="Course Grades">Course Grades</option>
							<option value="Course Syllabus">Course Syllabus</option>
							<option value="Research">Research</option>
						</select>
					</div>
					
					<div class="required field" id="addtask_instructions_field">
						<label>Instructions:</label>
						<textarea rows="3" id="addtask_instructions"></textarea>
					</div>
					
					<div class="required field" id="addtask_assignto_field">
						<label>Assign To:</label>
						<div class="inline two fields">
							<div class="twelve wide field">
								<input type="text" id="addtask_assignto"/>
							</div>
							<div class="four wide field">
								<button class="ui inverted orange button" type="button" id="addtask_directory">
									Directory 
								</button>
							</div>
						</div>
						
					</div>
				</form>
			</div>
			<div class="actions">
				<button class="ui cancel grey button" id="addtask_cancel">
					<i class="remove icon"></i>
					Cancel
				</button>
				<button class="ui green button" id="addtask_submit">
					<i class="checkmark icon"></i>
					Create Task
				</button>
			</div>
		</div>
		
		<!-- DIRECTORY MODAL -->
		<div class="ui modal" id="directory_dialog">
			<div class="header edit-modal">
				<h3 class="ui header edit-modal">
					<i class="pencil icon"></i>
					<div class="content">Directory</div>
				</h3>
			</div>
			<div class="modal-content">
				<p><b>No. of Selected Users: </b><span id="directory_usercount">0</span></p>
				
				<div class="dimmable">
					<div class="ui dimmer" id="directory_table_loading">
						<div class="ui text loader">Retrieving Users</div>
					</div>
				
					<table class="ui compact selectable table" id="directory_table">
						<thead>
							<tr>
								<th>Faculty No.</th>
								<th>Full Name</th>
								<th>Email</th>
								<th>User Type</th>
								<th>Department</th>
							</tr>
						</thead>
						<tbody id="directory_tablebody"></tbody>		
					</table>	
				</div>
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
			</div>
		</div>
		
		<!-- VIEW TASK CREATED MODAL -->
		<div class="ui tiny modal" id="taskscreated_dialog">
			<div class="header neutral-modal">
				<h3 class="ui header neutral-modal">
					<i class="tasks icon"></i>
					<div class="content" id="taskscreated_title"></div>
				</h3>
			</div>
			<div class="modal-content">
				<p class="element-rmb"><b>Category: </b><span id="taskscreated_viewcategory"></span></p>
				<p class="element-rmb"><b>Assigned by: </b><span id="taskscreated_assignedby"></span></p>
				<p class="element-rmb"><b>Date Created: </b><span id="taskscreated_datecreated"></span></p>
				<p class="element-rmb"><b>Deadline: </b><span id="taskscreated_viewdeadline"></span></p>
				<p><b>Instructions: </b><span id="taskscreated_instructions"></span></p>
				
				
			</div>
			<div class="actions center-text">
				<button class="ui ok secondary button">Close</button>
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
	<script src="${pageContext.request.contextPath}/resource/js/jquery.form.min.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/master.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/generalpages.js"></script>
	<script src="${pageContext.request.contextPath}/resource/js/managetasks.js"></script>
</html>