package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/EditRequestMail")
public class EditRequestMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public EditRequestMail() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			
			String editedNote = request.getParameter("editedNote");
			String requestId = request.getParameter("requestId");
		
			MailFunctions.editRequest(editedNote, requestId);
		} catch (Exception e) {

			e.printStackTrace();
		}
	}

}
