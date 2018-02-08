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
		Account acc = (Account) session.getAttribute("currentCredentials");
		ResultSet getTasks = ManageTasksFunctions.getTaskAssigned(acc.getEmail());
		ResultSet tasksCreated = ManageTasksFunctions.getTasksCreated(acc.getEmail());
		%>
	
		
		<b>Tasks you've created</b><br>
		<table>
		<tr>
			<th>Task</th>
			<th>Due Date</th>
			<th>Category</th>
			<th>Status</th>
		</tr>
		<%
		while(tasksCreated.next())
		{
			
			%>
			<form action="${pageContext.request.contextPath}/ManageTaskPages/viewtaskprogress.jsp" method="post">
				<tr>
					<input type="hidden" name="id" value="<%=tasksCreated.getString("id") %>">
					<td><%=tasksCreated.getString("title") %> </td>
					<td><%=tasksCreated.getString("deadline") %> </td>
					<td><%=tasksCreated.getString("category") %> </td>
					<td><%=tasksCreated.getString("status") %> </td>
					<td><input type="submit" value="View"></td>
					
					
				</tr>
			</form>
			<%
		}
		%>
		</table>
		<br>
		
		
		
		<br><b>Tasks you need to accomplish</b><br>
			<% 
			getTasks.beforeFirst();
			while(getTasks.next())
			{ 	
			
					ResultSet tasksInfo = ManageTasksFunctions.getTaskInfo(getTasks.getInt("id"));
					
					while(tasksInfo.next())
					{
			%>
					<form action="${pageContext.request.contextPath}/TaskSelected" method="post">
					
						<%=tasksInfo.getString("title")%>
						<%=tasksInfo.getString("deadline")%>
						<%=tasksInfo.getString("category")%>
						<%=tasksInfo.getString("instructions")%>
						<%=tasksInfo.getString("assigned_by")%>
						<input type="hidden" name="id" value="<%=tasksInfo.getInt("id")%>"><br>
						
						<%if(getTasks.getString("status").equals("No Submission"))
						{%>
							<input type="submit" value="Select">
						
					  <%}
						else
						{
						%>
							<input type="submit" value="View Submission">
					  <%}%>
					</form>
			<%		}
			}%>
			
		
</body>
</html>