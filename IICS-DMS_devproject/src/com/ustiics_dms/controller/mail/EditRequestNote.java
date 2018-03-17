package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.model.Account;


@WebServlet("/EditRequestNote")
public class EditRequestNote extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EditRequestNote() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		try {

			
			String editedNote =  request.getParameter("note");
			String requestId = request.getParameter("id");

			MailFunctions.editRequestNote(editedNote, requestId);
			ResultSet mailInfo = MailFunctions.getRequestInformation(requestId);
			mailInfo.next();
			
			String des = acc.getFullName() + " has sent a response to your mail request, " + mailInfo.getString("subject");
			NotificationFunctions.addNotification("Request Mail Page", des, mailInfo.getString("sent_by"));
			
			response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		} catch (Exception e) {

			try {
					LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

}
