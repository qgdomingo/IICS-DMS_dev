<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="com.ustiics_dms.model.Account"%>
<%@page import="com.ustiics_dms.controller.managetasks.ManageTasksFunctions"%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Submit Task</title>
</head>
<body>
	<% 
	String id = request.getParameter("id");
	Account acc = (Account) session.getAttribute("currentCredentials");
	ResultSet getTasks = ManageTasksFunctions.getSpecificTask(acc.getEmail(), id);%>
	
		
		
			<% 
			while(getTasks.next())
			{ 	
			
				ResultSet tasksInfo = ManageTasksFunctions.getTaskInfo(getTasks.getInt("id"));
					while(tasksInfo.next())
					{
			%>
					<br>
						Task Title: <%=tasksInfo.getString("title")%> <br>
						Deadline: <%=tasksInfo.getString("deadline")%> <br>
						Category: <%=tasksInfo.getString("category")%> <br>
						Instruction: <%=tasksInfo.getString("instructions")%> <br>
						Created by: <%=tasksInfo.getString("assigned_by")%> <br>
						
						<%if(getTasks.getString("status").equals("No Submission"))
						{
						%>
							<form method="post" action="${pageContext.request.contextPath}/SubmitTask" enctype="multipart/form-data">
								Document Title: <input type="text" name="document_title" required/><br>
								File: <input type="file" name="file" required/><br>
								Description: <input type="text" name="description" required/><br>
								<input type="hidden" name="id" value="<%=getTasks.getInt("id")%>">
								<input type="hidden" name="deadline" value="<%=tasksInfo.getString("deadline")%>">
								<input type="submit" name="Submits">
							</form>
				<%		} 
						else
						{
						%>
							<form method="get" action="${pageContext.request.contextPath}/DownloadTask">
								<input type="hidden" name="id" value="<%=request.getParameter("id")%>">
								<input type="hidden" name="email" value="<%=acc.getEmail()%>">
								<input type="submit" value="View File">
							</form>
						<%} 
						%>

						
			<%		}
			}%>
			
		</form>
</body>
</html>