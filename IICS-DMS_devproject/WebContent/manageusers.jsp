<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="manageuser.controller.ManageUserFunctions"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>User Management | IICS DMS</title>
	</head>
	<body>
		<form action="ManageUserRedirect" method="post">
		
			<input type="submit" name ="buttonPress" value="Add User"/>
			<input type="submit" name ="buttonPress" value="Edit User"/>
			<input type="submit" name ="buttonPress" value="Enable User"/>
			<input type="submit" name ="buttonPress" value="Disable User"/>

			
			<% ResultSet accounts = ManageUserFunctions.viewAccounts();
			%>
			<%while(accounts.next()){%>
			<br>Select <input type="checkbox" name="selected" value="<%=accounts.getString("email")%>">
			<br>Faculty Number:<%=accounts.getString("faculty_number")%>
			<br>First Name:<%=accounts.getString("first_name")%>
			<br>Last Name:<%=accounts.getString("last_name")%>
			<br>Email:<%=accounts.getString("email")%>
			<br>User Type:<%=accounts.getString("user_type")%>
			<br>Department:<%=accounts.getString("department")%>
			<br>Status:<%=accounts.getString("status")%>
			<br>
			<br>
			<%} %>
		</form>
	</body>
</html>