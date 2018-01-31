<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Message for the Director | IICS DMS</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" href="resource/semanticui/semantic.min.css">
		<link rel="stylesheet" href="resource/css/master.css">
		<link rel="stylesheet" href="resource/css/login.css">
	</head>
	<body>
		<div class="ui centered grid container">
			<div class="fourteen wide computer fourteen wide table sixteen wide mobile column login-form-area">
				<div class="messagepage-header">
					<h2 class="ui header">
					  <a href="index.jsp"><i class="red chevron left icon"></i></a> 
					  Send a Message to the Director
					</h2>
				</div>
				<br>
				
			<!-- START OF MESSAGE FORM -->
				<form class="ui equal width form">
				
				<!-- SENDER'S INFORMATION -->
					<h3 class="ui dividing header">
						<i class="user icon"></i>
						<div class="content">Sender's Information</div>
					</h3>
					<div class="fields">
						<div class="required field">
							<label>First Name:</label>
							<input type="text" placeholder="e.g. James" required/>
						</div>
						<div class="required field">
							<label>Last Name:</label>
							<input type="text" placeholder="e.g. Gosling" required/>
						</div>
					</div>
					<div class="fields">
						<div class="required field">
							<label>Email Address:</label>
							<input type="text" placeholder="e.g. jamesgosling@java.com" required/>
							<p class="microcopy-hint">
								We will use your email to send the Director's response. We won't send spam, promise!
							</p>
						</div>
						<div class="required field">
							<label>Contact Number:</label>
							<input type="text" placeholder="e.g. 09171234567" required/>
						</div>
					</div>
					<div class="required field">
						<label>Affiliation:</label>
						<input type="text" placeholder="e.g. Dean of the Faculty of Java" required/>
					</div>
					
				<!-- MESSAGE BODY -->
					<h3 class="ui dividing header">
						<i class="mail icon"></i>
						<div class="content">Message</div>
					</h3>
					<div class="required field">
						<label>Subject:</label>
						<input type="text" required/>
					</div>
					<div class="required field">
						<label>Message:</label>
						<textarea></textarea>
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
			</div>
		</div>	
	</body>
</html>