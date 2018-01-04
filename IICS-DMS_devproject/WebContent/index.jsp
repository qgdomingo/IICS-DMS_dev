<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Login | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/loginstyle.css">
	</head>
	<body class="login-background">
		<div class="ui two column stackable grid">
		
			<div class="ten wide column title-area">
				<h1>University of Santo Tomas</h1>
				<h1>Institute of Information and Computing Sciences</h1>
				<h1>Document Management System</h1>
			</div>
			
			<div class="six wide column login-form-area">
				<!-- LOGIN FORM -->
				<form class="ui form" method="Login" action="POST">
					<div class="field">
						<input placeholder="Username" name="user_email" type="text"/>
					</div>
					<div class="field">
						<input placeholder="Password" name="user_password"type="password" />
					</div>
					<input class="fluid medium ui green button" type="submit" value="Login"/>
				</form>
					
				<a>Forgot Password?</a><br>
				<a>Contact the Director</a>
			</div>
			
		</div>
	</body>
</html>