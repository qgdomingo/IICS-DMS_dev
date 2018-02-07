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
<title>View Progress</title>
</head>
<body>

<% 
	String id = request.getParameter("id");
	ResultSet userInfo = ManageTasksFunctions.getTask(id);
%>

	<table>
		<tr>
			<th>Assigned to</th>
			<th>Document Title</th>
			<th>Upload Date</th>
			<th>Status</th>
		</tr>
	<%while(userInfo.next())
	{ %>
		<form method="get" action="DownloadTask">
			<tr>
				<td><%=userInfo.getString("name")%></td>
				<td><%=userInfo.getString("title")%></td>
				<td><%=userInfo.getString("upload_date")%></td>
				<td><%=userInfo.getString("status")%></td>
				<td><input type="submit" value="View File"></td>
				<input type="hidden" name="id" value="<%=userInfo.getString("id")%>">
				<input type="hidden" name="email" value="<%=userInfo.getString("email")%>">
			</tr>
		</form>
	<%} %>
	</table>
</body>
</html>