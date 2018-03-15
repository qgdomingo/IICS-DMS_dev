package com.ustiics_dms.controller.mail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;


@WebServlet("/EditRequesterMail")
public class EditRequesterMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public EditRequesterMail() {
        super();
        
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		 try {
			
		String id = request.getParameter("id");
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		String type = request.getParameter("type");
		String[] recipient = request.getParameterValues("internal_to");
		String[] externalRecipient = request.getParameterValues("external_to");
		String subject = request.getParameter("subject");
		String message = request.getParameter("message");
		String button = request.getParameter("submit");
		String closingLine = request.getParameter("closing_line");
					
		if(type.equalsIgnoreCase("Letter"))
		{
			String addressLine1 = request.getParameter("addressee_line1");
			String addressLine2 = request.getParameter("addressee_line2");
			String addressLine3 = request.getParameter("addressee_line3");

			MailFunctions.forwardRequestMail(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment(), addressLine1, addressLine2, addressLine3, closingLine);
		}
		else if(type.equalsIgnoreCase("Memo"))
		{
			String addressee = request.getParameter("addressee");
			String from = request.getParameter("from");
			String subjectName = request.getParameter("subject");
			
			MailFunctions.forwardRequestMail(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment(), addressee, from, subjectName, closingLine);
		}
		else if(type.equalsIgnoreCase("Notice Of Meeting"))
		{
			String addressee = request.getParameter("addressee");
			String from = request.getParameter("from");
			String subjectName = request.getParameter("subject");
			
			MailFunctions.forwardRequestMail(id, type, recipient, externalRecipient, subject, message, acc.getFullName(), acc.getEmail(), acc.getUserType(), acc.getDepartment(), addressee, from, subjectName, closingLine);
		}
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
	}

}
