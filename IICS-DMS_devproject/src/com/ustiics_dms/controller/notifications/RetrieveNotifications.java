package com.ustiics_dms.controller.notifications;

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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Notification;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/RetrieveNotifications")
public class RetrieveNotifications extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveNotifications() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Notification> notifList = new ArrayList<Notification>();
	    response.setCharacterEncoding("UTF-8");
	    
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet userNotif = (ResultSet) NotificationFunctions.retrieveUserNotifications(acc.getEmail());
			
			while(userNotif.next()) 
			{ 
				ResultSet notifDetails = (ResultSet) NotificationFunctions.retrieveNotificationDetails(userNotif.getString("id"));
				if(notifDetails.next())
				{
					notifList.add(new Notification(
							AesEncryption.encrypt(userNotif.getString("id")),
							notifDetails.getString("page"),
							notifDetails.getString("description"),
							notifDetails.getString("notif_timestamp")
							 ));	
				}
			}
			
			String json = new Gson().toJson(notifList);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
