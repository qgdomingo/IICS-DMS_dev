package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/UpdateReadExternalMail")
public class UpdateReadExternalMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UpdateReadExternalMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO UPDATE STATUS AS READ OF THE EXTERNAL MAIL
		// Given data: Encrypted External Mail ID
		// Update the status of External Mail to Read
	}

}
