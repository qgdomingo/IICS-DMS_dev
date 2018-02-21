package com.ustiics_dms.controller.mail;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
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
				String email = tempEmail.trim();

				PreparedStatement prep = con.prepareStatement("INSERT INTO sent_mail_to (id, recipient_mail) VALUES (?,?)");
				prep.setInt(1, getIncrement());
				prep.setString(2, email);
				
				prep.executeUpdate();
			}
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
	
	//Requests
	public static void forwardRequestMail(String type, String recipient, String externalRecipient, String  subject, String  message, String  name, String  sentBy, String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO request (type, recipient, external_recipient, subject, message, sender_name, sent_by, department) VALUES (?,?,?,?,?,?,?,?)");
			prep.setString(1, type);
			prep.setString(2, recipient);
			prep.setString(3, externalRecipient);
			prep.setString(4, subject);
			prep.setString(5, message);
			prep.setString(6, name);
			prep.setString(7, sentBy);
			prep.setString(8, department);
			
			prep.executeUpdate();
			
	}
	
	public static ResultSet getRequestMail(String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE department = ?");
			
			prep.setString(1, department);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
	
	public static ResultSet getRequesterMail(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE sent_by = ?");
			
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
	
	public static void approveRequestMail(String id) throws SQLException
	{
			
			ResultSet requestInfo = getRequestInformation(id);
			
			requestInfo.next();
			
			String type = requestInfo.getString("type");
			String recipient = requestInfo.getString("recipient");
			String externalRecipient = requestInfo.getString("external_recipient");
			String subject = requestInfo.getString("subject");
			String message = requestInfo.getString("message");
			String senderName = requestInfo.getString("sender_name");
			String sentBy = requestInfo.getString("sent_by");

			saveMailInformation(type, recipient, externalRecipient, subject, message, senderName, sentBy);
			
			deleteRequest(id);

	}
	
	public static ResultSet getRequestInformation(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE id = ?");
			prep.setString(1, id);
			
			ResultSet rs = prep.executeQuery();
		
			return rs;
	}
	
	public static void deleteRequest(String id) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("DELETE FROM request WHERE id = ?");
			prep.setString(1, id);
			
			prep.executeUpdate();
			
	}
	// to be updated
	public static void editRequestNote(String editedNote, String id) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE request SET note = ? WHERE id = ?");
			
			prep.setString(1, editedNote);
			prep.setString(2, id);
			
			prep.executeUpdate();
			
	}
	
	public static void updateReadTimeStamp(String emailID, String email) throws SQLException
	{
		if(hasRead(emailID,email))
		{
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE sent_mail_to SET acknowledgement = ?, time_read = ? WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, "Read");
			prep.setString(2, timeStamp);
			prep.setString(3, emailID);
			prep.setString(4, email);
			
			prep.executeUpdate();
		}
			
	}
	
	public static void updateAcknowledgeTimeStamp(String emailID, String email) throws SQLException
	{
		if(hasAcknowledged(emailID,email))
		{
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE sent_mail_to SET acknowledgement = ?, time_acknowledged = ? WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, "Acknowledged");
			prep.setString(2, timeStamp);
			prep.setString(3, emailID);
			prep.setString(4, email);
			
			prep.executeUpdate();
		}
	}
	
	public static boolean hasRead(String id, String email) throws SQLException
	{
			boolean result = true;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT acknowledgement FROM sent_mail_to WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, id);
			prep.setString(2, email);
			
			ResultSet rs = prep.executeQuery();
		
			if(rs.getString("acknowledgement").equals("Read"))
			{
				result = false;
			}
			
			return result;
	}
	
	public static boolean hasAcknowledged(String id, String email) throws SQLException
	{
			boolean result = true;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT acknowledgement FROM sent_mail_to WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, id);
			prep.setString(2, email);
			
			ResultSet rs = prep.executeQuery();
		
			if(rs.getString("acknowledgement").equals("Acknowledged"))
			{
				result = false;
			}
			
			return result;
	}
}
