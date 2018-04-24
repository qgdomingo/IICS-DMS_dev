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
import com.ustiics_dms.model.Event;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveInvitationList")
public class RetrieveInvitationList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveInvitationList() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Event> eventsList = new ArrayList<Event>();
		response.setCharacterEncoding("UTF-8");
		
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		try {
		
			
			ResultSet pendingEvents = (ResultSet) ManageEventsFunctions.getPendingInvitations(acc.getEmail());

			while(pendingEvents.next()) { 
				ResultSet event = (ResultSet) ManageEventsFunctions.getEventsData(pendingEvents.getString("event_id"));
				
				while(event.next()) {
					eventsList.add(new Event(
								AesEncryption.encrypt(event.getString("event_id")),
								event.getString("title"),
								event.getString("location"),
								event.getString("start_date"),
								event.getString("end_date"),
								event.getString("description"),
								ManageEventsFunctions.getFullName(event.getString("created_by")) 
									+ "<" + event.getString("created_by") + ">",
								event.getInt("display_invited")
					));
				}
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
