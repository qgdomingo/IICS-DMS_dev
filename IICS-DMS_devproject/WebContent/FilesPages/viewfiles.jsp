<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
    
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="com.ustiics_dms.controller.filedownload.FileDownloadFunctions"%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>View Files</title>
</head>
<body>


	<% 
						ResultSet file = FileDownloadFunctions.viewFiles();
						while(file.next()) { 
	%>
					<br>
					<tr>
						<form method="get" action="${pageContext.request.contextPath}/FileDownload">
							<input type = "hidden" name = "id" value = "<%=file.getInt("id")%>">
							<td>TYPE: <%=file.getString("type")%></td>
							<td>TITLE: <%=file.getString("title")%></td>
							<td>CATEGORY: <%=file.getString("category")%></td>
							<td>NAME: <%=file.getString("file_name")%></td>
							<td>DESCRIPTION: <%=file.getString("description")%></td>
							<td>CREATED BY: <%=file.getString("created_by")%></td>
							<td>TIME CREATED: <%=file.getString("time_created")%></td>
							<input type = "submit" value = "download">
						</form>
					</tr>
					
					
	<%}%>

</body>
</html>