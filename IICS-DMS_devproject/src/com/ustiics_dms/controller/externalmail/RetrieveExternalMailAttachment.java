package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RetrieveExternalMailAttachment")
public class RetrieveExternalMailAttachment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveExternalMailAttachment() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO: GET MAIL ATTACHMENT
		// given: encrypted ID
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
