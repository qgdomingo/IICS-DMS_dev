<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
		<form action="AddUser" method="post">
		
			Email:<input type="text" name ="email"/>
			
			Faculty No:<input type="text" name ="facultyNo"/>
			
			First Name:<input type="text" name ="firstName"/>
			
			Last Name:<input type="text" name ="lastName"/>
			
			User Type:<select name="userType">
		  				<option value="Director">Director</option>
		  				<option value="Faculty Secretary">Faculty Secretary</option>
		  				<option value="Department Head">Department Head</option>
		  				<option value="Faculty">Faculty</option>
		  				<option value="Staff">Staff</option>
					</select>
			
			Department:<select name="department">
		  				<option value="Computer Science">Computer Science</option>
		  				<option value="Information Systems">Information Systems</option>
		  				<option value="Information Technology">Information Technology</option>
					</select>
					
			<input type="submit" name ="Submit" value="Submit"/>
		
		</form>
</body>
</html>