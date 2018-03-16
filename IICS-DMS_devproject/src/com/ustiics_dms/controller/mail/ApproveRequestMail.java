package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.model.Account;


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
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			String id = request.getParameter("id");
			MailFunctions.approveRequestMail(id);
			
			ResultSet mailInfo = MailFunctions.getRequestInformation(id);
			mailInfo.next();
			
			String des = acc.getFullName() + " has approved your mail request, " + mailInfo.getString("subject");
			NotificationFunctions.addNotification("Request Mail Page", des, mailInfo.getString("sent_by"));
			
			response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		    
		} catch (Exception e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

}
