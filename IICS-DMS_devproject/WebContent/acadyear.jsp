<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.servlet.http.HttpSession"%> 
<%@page import="academicyear.controller.AcademicYearFunctions"%> 

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Academic Year Settings | IICS DMS</title>
	</head>
	<body>
	
			<% ResultSet acadYear = AcademicYearFunctions.getAcademicYear();
				acadYear.next();
			%>
			
			<form action="editYear" method="post">
				Current Academic Year: <%=acadYear.getInt("start_year") %> - <%=acadYear.getInt("end_year") %> <br>
				Academic Year Range: <%=acadYear.getString("start_month") %> - <%=acadYear.getString("end_month") %> <br>
				Year from:	
				Year to : <select name="year_to">
				  				<option value="2018">2018</option>
				  				<option value="2019">2019</option>
				  				<option value="2020">2020</option>
				  				<option value="2021">2021</option>
				  				<option value="2022">2022</option>
							</select>
						 <br>
				Start Month: <select name="month_start">
				  				<option value="January">January</option>
				  				<option value="February">February</option>
				  				<option value="March">March</option>
				  				<option value="April">April</option>
				  				<option value="May">May</option>
				  				<option value="June">June</option>
				  				<option value="July">July</option>
				  				<option value="August">August</option>
				  				<option value="September">September</option>
				  				<option value="October">October</option>
				  				<option value="November">November</option>
				  				<option value="December">December</option>
							</select>
						 <br>
				End Month: <select name="month_end">
				  				<option value="January">January</option>
				  				<option value="February">February</option>
				  				<option value="March">March</option>
				  				<option value="April">April</option>
				  				<option value="May">May</option>
				  				<option value="June">June</option>
				  				<option value="July">July</option>
				  				<option value="August">August</option>
				  				<option value="September">September</option>
				  				<option value="October">October</option>
				  				<option value="November">November</option>
				  				<option value="December">December</option>
							</select>
						 <br>
						 <input type="submit" name ="Submit" value="Submit"/>
			</form>
	</body>
</html>