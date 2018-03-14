package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RetrieveExternalSentMail")
public class RetrieveExternalSentMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveExternalSentMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO: GET EXTERNAL SENT MAIL
		// DATA NEEDED:
		// in one String - RECIPIENT full name + email
		// recipient affiliation
		// recipient contact number
		// in one String - Sender full name + email
		// sent timestamp
		// subject
		// message
		// mail ID
		// mail file name
		// thread number
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
