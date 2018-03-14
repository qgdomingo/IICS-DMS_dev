package com.ustiics_dms.controller.mail;

import java.io.IOException;

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
		response.setCharacterEncoding("UTF-8");
		
		try {
			
			String id = request.getParameter("id");
		
			MailFunctions.approveRequestMail(id);
			
			response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		} catch (Exception e) {

			e.printStackTrace();
		}
	}

}
