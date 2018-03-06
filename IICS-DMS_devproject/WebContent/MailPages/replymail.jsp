<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

	<form  method="post" action="${pageContext.request.contextPath}/RespondToExternalMail" enctype="multipart/form-data">
				
				<!-- SENDER'S INFORMATION --> 
					<h3 class="ui dividing header">
						<i class="user icon"></i>
						<div class="content">Sender's Informations</div>
					</h3>
					
					<div class="fields">
						<div class="required field">
							<label>Thread Number:</label>
							<input name="thread_number" type="text" placeholder="e.g. 1" />
						</div>
				<!-- MESSAGE BODY -->
					<h3 class="ui dividing header">
						<i class="mail icon"></i>
						<div class="content">Message</div>
					</h3>
					<div class="required field">
						<label>Subject:</label>
						<input name="subject" type="text" required/>
					</div>
					<div class="required field">
						<label>Message:</label>
						<textarea name="message"></textarea>
					</div>
					<div class="inline field">
						<label>Attachment:</label>
						<input type="file" name="file"/>
					</div>
					
					<p>*INSERT CAPTCHA HERE*</p>
					
					<button class="fluid ui large green button" type="submit">
						<i class="send icon"></i>
						Send Message
					</button>
		</form>
</body>
</html>