<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
 <%
        String email = (String) request.getAttribute("email");
 	 	String code = (String) request.getAttribute("code");
 %>
 
         <form action="PasswordChange" method="POST">
            <input type="hidden" name="email" value="<%=email%>" /> 
            <input type="hidden" name="code" value="<%=code%>" />    
            <label class="align"> New Password:</label><input type="password" name="new_password" pattern=".{6,}" title="6 characters minimum"/>
            <label class="align"> Confirm Password:</label><input type="password" name="confirm_password" pattern=".{6,}" title="6 characters minimum"/>
            <input type="submit" class="button" value="Submit" />
        </form>
</body>
</html>