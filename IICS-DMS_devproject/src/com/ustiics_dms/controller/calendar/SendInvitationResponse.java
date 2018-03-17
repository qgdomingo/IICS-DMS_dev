package com.ustiics_dms.controller.calendar;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/SendInvitationResponse")
public class SendInvitationResponse extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public SendInvitationResponse() {
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

			
			String id = AesEncryption.decrypt(request.getParameter("event_id"));
			String responseText = request.getParameter("event_response_text");
			String buttonResponse = request.getParameter("event_response");
			
			ManageEventsFunctions.updateInvitationResponse(id, acc.getEmail(), buttonResponse, responseText);
			String title = ManageEventsFunctions.getEventTitle(id);
			LogsFunctions.addLog("System", "Respond To Event", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), buttonResponse, title);
			response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(buttonResponse);
		} 
		catch(Exception e) {
			try {
				LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
