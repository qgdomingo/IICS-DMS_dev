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

@WebServlet("/EditEvent")
public class EditEvent extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EditEvent() {
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
			String title = request.getParameter("event_title");
			String location = request.getParameter("event_location");
			String allDayEvent = request.getParameter("event_all_day");
			int allDayEvent_flag = 0;
			String startDateTime = "";
			String endDateTime = "";
			
			if(allDayEvent == null) {
				startDateTime = request.getParameter("event_start_datetime");
				endDateTime = request.getParameter("event_end_datetime");
			}
			else {
				startDateTime = request.getParameter("event_start_date");
				endDateTime = request.getParameter("event_end_date");
				startDateTime += " 00:00";
				endDateTime += " 23:59";
				allDayEvent_flag = 1;
			}
			
			String eventDescription = request.getParameter("event_description");
			String invited[] = request.getParameterValues("event_invite");
			
			int displayInvitedList = ( (request.getParameter("display_invited_list") != null) ? 1 : 0 );
			
			ManageEventsFunctions.updateEvent(acc.getEmail(), id, title, location, allDayEvent_flag, startDateTime, endDateTime, eventDescription, invited, displayInvitedList);
			
			LogsFunctions.addLog("System", "Update Event", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), title);
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} catch(Exception e) {
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
