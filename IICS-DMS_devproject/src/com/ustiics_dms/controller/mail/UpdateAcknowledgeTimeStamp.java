package com.ustiics_dms.controller.mail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;


@WebServlet("/UpdateAcknowledgeTimeStamp")
public class UpdateAcknowledgeTimeStamp extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public UpdateAcknowledgeTimeStamp() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			    HttpSession session = request.getSession();
			    Account acc = (Account) session.getAttribute("currentCredentials");
			    
				String emailID = "1";//request.getParameter("emailID");
				String email = acc.getEmail();
				
				MailFunctions.updateAcknowledgeTimeStamp(emailID, email);
				
	} catch (Exception e) {

		e.printStackTrace();
	}
		
	}

}
