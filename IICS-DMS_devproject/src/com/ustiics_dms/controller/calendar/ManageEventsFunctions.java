package com.ustiics_dms.controller.calendar;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;

public class ManageEventsFunctions {
	
	public static void addEvent(String title, String location, int allDayEvent, String startDateTime, String endDateTime, String description, String createdBy, String invited[]) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = 
					con.prepareStatement("INSERT INTO events (title, location, all_day_event, start_date, end_date, description, created_by) VALUES (?,?,?,?,?,?,?)");
			prep.setString(1, title);
			prep.setString(2, location);
			prep.setInt(3, allDayEvent);
			prep.setString(4, startDateTime);
			prep.setString(5, endDateTime);
			prep.setString(6, description);
			prep.setString(7, createdBy);
			prep.executeUpdate();
			
			if(invited != null) {
				inviteUsers(invited);
				
				String des = getFullName(createdBy) +" is inviting you to an event, "+ title;
				NotificationFunctions.addNotification("Calendar Page", des, invited);
			}
			
	}
	
	public static void inviteUsers(String invited[]) throws SQLException
	{
			int id = getIncrement();
			Connection con = DBConnect.getConnection();
			
			for(String email: invited)
			{
				PreparedStatement prep = con.prepareStatement("INSERT INTO events_invitation (event_id, email) VALUES (?,?)");
				
				prep.setInt(1, id);
				prep.setString(2, email);
				prep.executeUpdate();
			}
	}
	
	public static String getFullName(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT full_name FROM accounts WHERE email = ?");
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("full_name");
			
	}
	
	public static String getEventTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("title");
			
	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'events'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}
	
	public static ResultSet getCalendarEventsData(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, description, created_by FROM events WHERE created_by = ? "
				+ "UNION SELECT event_id, title, location, start_date, end_date, description, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted')");
		
		prep.setString(1, email);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getPendingInvitations(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id FROM events_invitation WHERE email = ? AND status = 'No Response'");
		prep.setString(1, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventInvitedList(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email, status, response, date_response FROM events_invitation WHERE event_id = ?");
		prep.setString(1, id);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventList(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE created_by = ? "
				+ "UNION SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted')");
		
		prep.setString(1, email);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventsData(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, all_day_event, start_date, end_date, description, created_by FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventResponseDetails(String id, String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT status, response, date_response FROM events_invitation "
				+ "WHERE event_id = ? AND email = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static void updateInvitationResponse(String id, String email, String response, String responseText) throws SQLException {
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events_invitation SET status = ?, response = ? WHERE email = ? AND event_id = ?");
		prep.setString(1, response);
		prep.setString(2, responseText);
		prep.setString(3, email);
		prep.setString(4, id);
		
		prep.executeUpdate();
		
		String des = getFullName(email) +" has responded " + response + " to your event, "+ retrieveEventTitle(id);
		NotificationFunctions.addNotification("Calendar Page", des, retrieveEventOwner(id) );
	}
	
	public static ResultSet getUpcomingEvents(String email) throws SQLException
	{
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE created_by = ? "
				+ "AND start_date >= ? "
				+ "UNION SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted') AND start_date >= ? ORDER BY start_date ASC");
		
		prep.setString(1, email);
		prep.setString(2, timeStamp);
		prep.setString(3, email);
		prep.setString(4, timeStamp);
		
		return prep.executeQuery();
	}
	
	public static void updateEvent(String email, String id, String title, String location, int allDayEvent, String startDateTime, String endDateTime, String description, String invited[]) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events SET title = ?, location = ?, all_day_event = ?, start_date = ?, end_date = ?, description = ? WHERE event_id = ? AND created_by = ?");
		prep.setString(1, title);
		prep.setString(2, location);
		prep.setInt(3, allDayEvent);
		prep.setString(4, startDateTime);
		prep.setString(5, endDateTime);
		prep.setString(6, description);
		prep.setString(7, id);
		prep.setString(8, email);
				
		prep.executeUpdate();
		
		assiginEditUsers(invited, id);
	}
	
	public static void assiginEditUsers(String invited[], String id) throws SQLException
	{
		String tempID = id;
		Connection con = DBConnect.getConnection();
		
		if(invited != null) { 
			String eventOwner = getFullName(retrieveEventOwner(tempID));
			String title = retrieveEventTitle(tempID);
			boolean ifExistingOnInvitation;
			
			for(String user: invited)
			{
				ifExistingOnInvitation = checkExists(tempID, user);
				
				if( !ifExistingOnInvitation )
				{
					PreparedStatement prep = con.prepareStatement("INSERT INTO events_invitation (event_id, email) VALUES (?,?)");
					prep.setString(1, tempID);
					prep.setString(2, user);
					prep.executeUpdate();
					
					String des = eventOwner +" is inviting you to an event, "+ title;
					NotificationFunctions.addNotification("Calendar Page", des, user);
				}
			}
			
			String des = eventOwner +" has updated the event details of "+ title;
			NotificationFunctions.addNotification("Calendar Page", des, invited);
			
			String deleteNotInvitedUserSQL = "DELETE FROM events_invitation WHERE event_id = ?";
			
			for(String user: invited)
			{
				deleteNotInvitedUserSQL += " AND NOT email = ?";
			}
			
			PreparedStatement prep = con.prepareStatement(deleteNotInvitedUserSQL);
			prep.setString(1, tempID);
			
			int userCount = 2;
			
			for(String user: invited)
			{
				prep.setString(userCount, user);
				userCount++;
			}
			prep.executeUpdate();
		}
		else
		{
			PreparedStatement prep = con.prepareStatement("DELETE FROM events_invitation WHERE event_id = ?");
			prep.setString(1, tempID);
			prep.executeUpdate();
		}
	}
	
	public static boolean checkExists(String id, String email) throws SQLException 
	{
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id FROM events_invitation WHERE event_id = ? AND email = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		ResultSet rs = prep.executeQuery();
		
		boolean flag = false;
		
		if (rs.isBeforeFirst())
		{
			flag = true;
		}
		return flag;
		
	}
	
	public static void deleteEvent(String id, String email) throws SQLException
	{
		String eventOwner = getFullName(retrieveEventOwner(id));
		String title = retrieveEventTitle(id);
		
		String des = eventOwner +" has cancelled the event, "+ title;
		NotificationFunctions.addNotification("Calendar Page", des, retrieveInvitedUsers(id));
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("DELETE FROM events WHERE event_id = ? AND created_by = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		prep.executeUpdate();
		
		prep = con.prepareStatement("DELETE FROM events_invitation WHERE event_id = ? ");
		prep.setString(1, id);
		prep.executeUpdate();
		
	}
	
	public static String retrieveEventOwner(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT created_by FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet owner = prep.executeQuery();
		owner.next();
		
		return owner.getString("created_by");
	}
	
	public static String retrieveEventTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet owner = prep.executeQuery();
		owner.next();
		
		return owner.getString("title");
	}
	
	public static String[] retrieveInvitedUsers(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email FROM events_invitation WHERE event_id = ?");
		prep.setString(1, id);
		
		ArrayList<String> invited = new ArrayList<String>();
		ResultSet eventList = prep.executeQuery();
		
		while(eventList.next())
		{
			invited.add(eventList.getString("email"));
		}
		
		return invited.toArray(new String[invited.size()]);
	}
}

