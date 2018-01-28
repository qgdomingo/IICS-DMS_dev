<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
		<form action="FileUpload" method="post" enctype="multipart/form-data">
			Document Type
			<select name="document_type">
  				<option value="Personal">Personal</option>
  				<option value="Incoming">Incoming</option>
  				<option value="Outgoing">Outgoing</option>
			</select>
			Category<input type="text" name="category"/>
			Document Title<input type="text" name="document_title"/>
			Attachment<input type="file" name="file" multiple/>
			Description<input type="text" name="description"/>
			<input type="submit">
		</form>
</body>
</html>