<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="com.ustiics_dms.controller.manageuser.ManageUserFunctions"%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
String selectedUser = (String) request.getAttribute("selected");
ResultSet user = ManageUserFunctions.getAccount(selectedUser);
user.next();
%>


		<form action="EditUser" method="post">
			<input type="hidden" name ="originalEmail" value="<%=user.getString("email")%>"/>
			Email:<input type="text" name ="email" value="<%=user.getString("email")%>"/>
			
			Faculty No:<input type="text" name ="facultyNo" value="<%=user.getString("faculty_number")%>"/>
			
			First Name:<input type="text" name ="firstName" value="<%=user.getString("first_name")%>"/>
			
			Last Name:<input type="text" name ="lastName" value="<%=user.getString("last_name")%>"/>
			
			User Type:<select name="userType" selected="<%=user.getString("user_type")%>">
		  				<option value="Director">Director</option>
		  				<option value="Faculty Secretary">Faculty Secretary</option>
		  				<option value="Department Head">Department Head</option>
		  				<option value="Faculty">Faculty</option>
		  				<option value="Staff">Staff</option>
					</select>
			
			Department:<select name="department" selected="<%=user.getString("department")%>">
		  				<option value="Computer Science">Computer Science</option>
		  				<option value="Information Systems">Information Systems</option>
		  				<option value="Information Technology">Information Technology</option>
					</select>
					
			<input type="submit" name ="Submit" value="Submit"/>
		
		</form>
</body>
</html>