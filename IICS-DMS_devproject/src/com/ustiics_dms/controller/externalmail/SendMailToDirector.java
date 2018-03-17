package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.SendMail;
import com.ustiics_dms.utility.VerifyRecaptcha;


@WebServlet("/SendMailToDirector")
public class SendMailToDirector extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SendMailToDirector() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<FileItem> multifiles;
		response.setCharacterEncoding("UTF-8");
		
		try {
			
			multifiles = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

			int counter = 0;
			String[] tempStorage = new String[10];
			
			FileItem fileData = null;
			for(FileItem item : multifiles)
			{
				if (item.isFormField()) 
				{
	                String fieldname = item.getFieldName();
	                String fieldvalue = item.getString();
	                tempStorage[counter++] = item.getString();
	            } 
				else 
				{
	                fileData = item;
	            }
            }

			String contentType = fileData.getContentType();
			if(	!contentType.equals("application/pdf")||
					!contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")||
					!contentType.equals("application/x-zip-compressed")||
					!contentType.equals("text/plain")||
					!contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")||
					!contentType.equals("image/jpeg")||
					!contentType.equals("image/png"))
				{
					response.setContentType("text/plain");
					response.setStatus(HttpServletResponse.SC_OK);
					response.getWriter().write("incorrect upload type");
				}
			if(fileData != null && fileData.getSize() > 26214400)
			{

				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("above maximum size");
			}
			
			String firstName = tempStorage[0];
			String lastName = tempStorage[1];
			String emailAddress = tempStorage[2];
			String contactNumber = tempStorage[3];
			String affiliation = tempStorage[4];
			String subject = tempStorage[5];
			String message = tempStorage[6];
			String captcha = tempStorage[8];

			boolean verify = VerifyRecaptcha.verify(captcha);
			
			if(verify)
			{
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("invalid captcha");
			}
			if(fileData != null)
			{
				ExternalMailFunctions.SendMailToDirector(firstName, lastName, emailAddress, contactNumber, affiliation ,subject, message, fileData);
			}
			else if(fileData == null)
			{
				ExternalMailFunctions.SendMailToDirector(firstName, lastName, emailAddress, contactNumber, affiliation ,subject, message);
			}
			response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		} 
		catch(Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}