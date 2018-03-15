package com.ustiics_dms.controller.mail;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SendRequestMail
 */
@WebServlet("/SendRequestMail")
public class SendRequestMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public SendRequestMail() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
				doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
		String id = request.getParameter("id");
		
		
			MailFunctions.sendRequestMail(id);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}

}
