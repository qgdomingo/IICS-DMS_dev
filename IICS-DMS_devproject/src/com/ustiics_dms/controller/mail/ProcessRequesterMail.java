package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.File;


@WebServlet("/ProcessRequesterMail")
public class ProcessRequesterMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProcessRequesterMail() {
        super(); 
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			
			String id = request.getParameter("id");
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String type = request.getParameter("type");
			String[] recipient = request.getParameterValues("internal_to");
			String[] externalRecipient = request.getParameterValues("external_to");
			String subject = request.getParameter("subject");
			String message = request.getParameter("message");
			String closingLine = request.getParameter("closing_line");
			String addressLine1 = request.getParameter("addressee_line1");
			String addressLine2 = "";
			String addressLine3 = "";
			String from = "";
			String button = request.getParameter("submit_btn");
			String paperSize = request.getParameter("paper_size");
			
			if(type.equalsIgnoreCase("Letter"))
			{
				addressLine2 = request.getParameter("addressee_line2");
				addressLine3 = request.getParameter("addressee_line3");
			}
			else if(type.equalsIgnoreCase("Memo") || type.equalsIgnoreCase("Notice Of Meeting"))
			{
				from = request.getParameter("from");
			}
			
			// DEPENING ON THE BUTTON CLICKED
			if(button.equalsIgnoreCase("edit"))
			{
				if(type.equalsIgnoreCase("Letter"))
				{
					MailFunctions.forwardRequestMail(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment(), addressLine1, addressLine2, addressLine3, closingLine, paperSize);
				}
				else if(type.equalsIgnoreCase("Memo") || type.equalsIgnoreCase("Notice Of Meeting"))
				{
					MailFunctions.forwardRequestMail(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment(), addressLine1, from, subject, closingLine, paperSize);
				}	
				
				response.setContentType("text/plain");
			    response.setStatus(HttpServletResponse.SC_OK);
			    response.getWriter().write("success edit");
			    return;
			}
			else if(button.equalsIgnoreCase("send"))
			{
				if(recipient == null) {
					response.setStatus(HttpServletResponse.SC_OK);
					response.getWriter().write("invalid send mail");
					return;
				}
				
				if(type.equalsIgnoreCase("Letter"))
				{
					MailFunctions.saveRequestMailInformation(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment(), addressLine1, addressLine2, addressLine3, closingLine);
				}
				else if(type.equalsIgnoreCase("Memo") || type.equalsIgnoreCase("Notice Of Meeting"))
				{
					MailFunctions.saveRequestMailInformation(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment(), addressLine1, from, subject, closingLine);
				}	
				
				response.setContentType("text/plain");
			    response.setStatus(HttpServletResponse.SC_OK);
			    response.getWriter().write("success");
			    return;
			}
			else if(button.equalsIgnoreCase("export"))
			{
				if(recipient == null) {
					response.setStatus(HttpServletResponse.SC_OK);
					response.getWriter().write("invalid send mail");
					return;
				}
				
				if(type.equalsIgnoreCase("Letter"))
				{
					MailFunctions.saveRequestMailInformation(id, type, null, null, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment(), addressLine1, addressLine2, addressLine3, closingLine);
				}
				else if(type.equalsIgnoreCase("Memo") || type.equalsIgnoreCase("Notice Of Meeting"))
				{
					MailFunctions.saveRequestMailInformation(id, type, null, null, subject, message, acc.getFullName(), acc.getEmail(), acc.getDepartment(), addressLine1, from, subject, closingLine);
				}	
				
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
		        
		        return;
			}
		}
		catch(Exception e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

}
