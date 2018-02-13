package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.login.LoginFunctions;
import com.ustiics_dms.model.Account;


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
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String type = request.getParameter("type");
			String recipient = request.getParameter("recipient");
			String externalRecipient = request.getParameter("external_recipient");
			String subject = request.getParameter("subject");
			String message = request.getParameter("message");
			String button = request.getParameter("submit");
			
			if(button.equalsIgnoreCase("Send Mail"))
			{
				
					MailFunctions.saveMailInformation(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail());
				
			}
			else if(button.equalsIgnoreCase("Mail Request") && acc.getUserType().equals("Faculty") || acc.getUserType().equals("Faculty Secretary"))
			{
				MailFunctions.forwardRequestMail(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail());
			}
			else if(button.equalsIgnoreCase("Save Mail"))
			{
				//MailFunctions.forwardRequest(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail());
			}
			else if(button.equalsIgnoreCase("Save And Export"))
			{
				//MailFunctions.forwardRequest(type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail());
			}
				
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			//insert redirection back to page 
	}

}
