package com.ustiics_dms.controller.mail;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import com.ustiics_dms.databaseconnection.DBConnect;

public class MailFunctions {
	
	public static void saveMailInformation(String type, String recipient, String externalRecipient, String  subject, String  message, String  name, String  sentBy) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO mail (type, external_recipient, subject, message, sender_name, sent_by) VALUES (?,?,?,?,?,?)");
			prep.setString(1, type);
			prep.setString(2, externalRecipient);
			prep.setString(3, subject);
			prep.setString(4, message);
			prep.setString(5, name);
			prep.setString(6, sentBy);
			
			prep.executeUpdate();
			
			sendInternalMail(recipient);
	}
	
	public static void sendInternalMail(String recipient) throws SQLException
	{
			List<String> emailList = Arrays.asList(recipient.split(","));
			Connection con = DBConnect.getConnection();
			
			for(String tempEmail : emailList)
			{
				String email = getEmail(tempEmail.trim());
				
				PreparedStatement prep = con.prepareStatement("INSERT INTO sent_mail_to (id, recipient_mail) VALUES (?,?)");
				prep.setInt(1, getIncrement());
				prep.setString(2, email);
				
				prep.executeUpdate();
			}
	}
	
	public static String getEmail(String recipient) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email FROM accounts WHERE full_name LIKE ?");
			recipient = "%" + recipient + "%";
			prep.setString(1, recipient);
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getString("email");
	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'mail'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}

	public static ResultSet getInbox(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id FROM sent_mail_to WHERE recipient_mail = ?");
			
			prep.setString(1, email);
			
			ResultSet rs = prep.executeQuery();

			return rs;
	}
	
	public static ResultSet getInboxInformation(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE id = ?");
			
			prep.setString(1, id);
			
			ResultSet rs = prep.executeQuery();
			

			return rs;
	}
	public static ResultSet getSentMail(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE sent_by = ?");
			
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
}
