package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.itextpdf.text.DocumentException;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.File;


@WebServlet("/ForwardMail")
public class ForwardMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ForwardMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain");
		
		 try {
		
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String type = request.getParameter("type");
			String[] recipient = request.getParameterValues("internal_to");
			String[] externalRecipient = request.getParameterValues("external_to");
			String subject = request.getParameter("subject");
			String message = request.getParameter("message");
			String button = request.getParameter("submit");
			

			if(button.equalsIgnoreCase("Send Mail"))
			{
				if(recipient == null) {
					response.setStatus(HttpServletResponse.SC_OK);
					response.getWriter().write("invalid send mail");
					return;
				}
				
				String title = acc.getTitle() + acc.getFullName();
				
				MailFunctions.saveMailInformation(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment());
				LogsFunctions.addLog("System", "Send Mail", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), subject);
				
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("success");
			}
			else if(button.equalsIgnoreCase("Mail Request") && acc.getUserType().equals("Faculty") || acc.getUserType().equals("Faculty Secretary"))
			{
				MailFunctions.forwardRequestMail(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment());
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("success");
			}
			else if(button.equalsIgnoreCase("Save and Export"))
			{
				MailFunctions.saveMailInformation(type, null, null, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment());
				
				int latestID = MailFunctions.getIncrement();
				File file = MailFunctions.getPdf(latestID);
				MailFunctions.addExportedMail (latestID, acc.getEmail());
				LogsFunctions.addLog("System", "Export Mail", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), subject);
				
				String contentType = this.getServletContext().getMimeType(file.getFileName());

				response.setHeader("Content-Type", contentType);
		        response.setHeader("Content-Length", String.valueOf(file.getFileData().length()));
		        response.setHeader("Content-Disposition", "inline; filename=\"" + file.getFileName() + "\"");

				Blob fileData = file.getFileData();
		        InputStream is = fileData.getBinaryStream();
		
		        byte[] bytes = new byte[1024];
		        int bytesRead;
		
		        while ((bytesRead = is.read(bytes)) != -1) 
		        {
		        	// Write image data to Response.
		           response.getOutputStream().write(bytes, 0, bytesRead);
		        }

			}	

		} 
		catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}		
	}

}
