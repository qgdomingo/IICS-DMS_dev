package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ApproveRequestMail")
public class ApproveRequestMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ApproveRequestMail() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			
			String id = "1";//request.getParameter("id");
		
			MailFunctions.approveRequestMail(id);
		} catch (Exception e) {

			e.printStackTrace();
		}
	}

}
