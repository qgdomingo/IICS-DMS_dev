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
<title>New Task</title>
</head>
<body>
	<% 
		Account acc = (Account) session.getAttribute("currentCredentials");
		ResultSet account = ManageTasksFunctions.getAccountsList(acc.getEmail());%>
	
		<form action="${pageContext.request.contextPath}/AddTask" method="post">
		
			Task Title:<input type="text" name="title">
			Task Due Date & Time:<input type="date" name="date"> <input type="time" name="time">
			Category:<input type="text" name="category">
			Instructions:<input type="text" name="instructions">
			Assign To:
			<% 
			while(account.next())
			{ 
				String fullName = account.getString("first_name") + " " + account.getString("last_name"); 
			%>
				<br><input type="checkbox" name="assigned_to" value="<%=account.getString("email")%>"> <%=fullName%><br>
			<%}%>
			<input type = "submit" value = "Submit">
		</form>
</body>
</html>