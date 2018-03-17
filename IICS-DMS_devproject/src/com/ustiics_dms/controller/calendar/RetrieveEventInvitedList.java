package com.ustiics_dms.controller.calendar;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.EventResponse;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveEventInvitedList")
public class RetrieveEventInvitedList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveEventInvitedList() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<EventResponse> eventsList = new ArrayList<EventResponse>();
		response.setCharacterEncoding("UTF-8");
		
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		try {
			String id = AesEncryption.decrypt(request.getParameter("id"));
			
			ResultSet events = (ResultSet) ManageEventsFunctions.getEventInvitedList(id);

			while(events.next()) { 
				eventsList.add(new EventResponse(
					ManageEventsFunctions.getFullName(events.getString("email")),
					events.getString("email"),
					events.getString("status"),
					events.getString("response"),
					events.getString("date_response")
				));
			}
			
			String json = new Gson().toJson(eventsList);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
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

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
