package com.ustiics_dms.controller.notifications;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;
import com.ustiics_dms.controller.notifications.NotificationFunctions;;


@WebServlet("/UpdateNotificationStatus")
public class UpdateNotificationStatus extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UpdateNotificationStatus() {
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
			    
			String id = AesEncryption.decrypt(request.getParameter("id"));
			String email = acc.getEmail();
			
			NotificationFunctions.updateNotificationStatus(id, email);
			
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}