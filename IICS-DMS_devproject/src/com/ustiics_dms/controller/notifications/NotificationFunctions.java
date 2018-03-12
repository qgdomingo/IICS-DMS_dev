package com.ustiics_dms.controller.notifications;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import com.ustiics_dms.databaseconnection.DBConnect;

public class NotificationFunctions {

	public static void addNotification(String page, String description,String email []) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO notification (page, description) VALUES (?,?)");
		prep.setString(1, page);
		prep.setString(2, description);
		
		prep.executeUpdate();
		
		addToNotificationList(email);
	}
	
	public static void addToNotificationList(String email []) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		int id = getIncrement();
		for(String mailList: email)
		{
			PreparedStatement prep = con.prepareStatement("INSERT INTO notification_list (id, email) VALUES (?,?)");
			prep.setInt(1, id);
			prep.setString(2, mailList);
			
			prep.executeUpdate();
		}
	}
	
	public static void addToNotificationList(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		int id = getIncrement();

		PreparedStatement prep = con.prepareStatement("INSERT INTO notification_list (id, email) VALUES (?,?)");
		prep.setInt(1, id);
		prep.setString(2, email);
		
		prep.executeUpdate();

	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'notification'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}

	public static void addNotification(String page, String description, String email) throws SQLException {

		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO notification (page, description) VALUES (?,?)");
		prep.setString(1, page);
		prep.setString(2, description);
		
		prep.executeUpdate();
		
		addToNotificationList(email);
		
	}
	
	public static ResultSet retrieveUserNotifications(String email) throws SQLException {

		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("SELECT id, email, flag FROM notification_list WHERE email = ? AND flag = ?");
		prep.setString(1, email);
		prep.setString(2, "Unread");
		
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet retrieveNotificationDetails(String id) throws SQLException {

		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("SELECT page, description, notif_timestamp FROM notification WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		return rs;
	}
	
	public static void updateNotificationStatus(String id, String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE notification_list SET flag = ? WHERE id = ? AND email = ?");
			prep.setString(1, "Read");
			prep.setString(2, id);
			prep.setString(3, email);
			prep.executeUpdate();

	}
	
	public static void updateAllNotificationStatus(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE notification_list SET flag = ? WHERE email = ?");
			prep.setString(1, "Read");
			prep.setString(2, email);
			prep.executeUpdate();

	}
}
