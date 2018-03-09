package com.ustiics_dms.controller.calendar;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;

public class ManageEventsFunctions {
	
	public static void addEvent(String title, String location, String startDateTime, String endDateTime, String description, String createdBy, String invited[]) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = 
					con.prepareStatement("INSERT INTO events (title, location, start_date, end_date, description, created_by) VALUES (?,?,?,?,?,?)");
			prep.setString(1, title);
			prep.setString(2, location);
			prep.setString(3, startDateTime);
			prep.setString(4, endDateTime);
			prep.setString(5, description);
			prep.setString(6, createdBy);
			prep.executeUpdate();
			
			if(invited != null) {
				inviteUsers(invited);
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
		PreparedStatement prep = con.prepareStatement("SELECT title, start_date, end_date FROM events WHERE created_by = ? "
				+ "UNION SELECT title, start_date, end_date FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ?)");
		
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
	
	public static ResultSet getEventsData(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, description, created_by FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		return prep.executeQuery();
	}
	
	public static void updateInvitationResponse(String id, String email, String response, String responseText) throws SQLException {
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events_invitation SET status = ?, response = ?, date_response = ? WHERE email = ? AND event_id = ?");
		prep.setString(1, response);
		prep.setString(2, responseText);
		prep.setString(3, timeStamp);
		prep.setString(4, email);
		prep.setString(5, id);
		
		prep.executeUpdate();
	}
	
}
