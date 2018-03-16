package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;

public class ExternalMailFunctions {
	
	public static void SendMailToDirector (String firstName, String lastName, String emailAddress, String contactNumber, String affiliation, String subject, String message, FileItem fileData) throws SQLException, IOException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (thread_number, first_name, last_name, email, contact_number, affiliation, subject, message, file_name, file_data) VALUES (?,?,?,?,?,?,?,?,?,?)");

		prep.setInt(1, getCounter());
		prep.setString(2, firstName);
		prep.setString(3, lastName);
		prep.setString(4, emailAddress);
		prep.setString(5, contactNumber);
		prep.setString(6, affiliation);
		prep.setString(7, subject);
		prep.setString(8, message);
		prep.setString(9, fileData.getName());
		prep.setBinaryStream(10, fileData.getInputStream(), (int) fileData.getSize());
		
		prep.executeUpdate();
		
		String fullName = firstName + " " + lastName;
		LogsFunctions.addLog("System", "External Sent to Director", emailAddress, fullName, "External", "None", subject);
		
		String des = fullName +", external user, has sent you a mail, " + subject;
		NotificationFunctions.addNotification("External Mail Page", des, getDirectorRecipient());
	}
	
	public static void SendMailToDirector (String firstName, String lastName, String emailAddress, String contactNumber, String affiliation, String subject, String message) throws SQLException, IOException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (thread_number, first_name, last_name, email, contact_number, affiliation, subject, message) VALUES (?,?,?,?,?,?,?,?)");

		prep.setInt(1, getCounter());
		prep.setString(2, firstName);
		prep.setString(3, lastName);
		prep.setString(4, emailAddress);
		prep.setString(5, contactNumber);
		prep.setString(6, affiliation);
		prep.setString(7, subject);
		prep.setString(8, message);

		prep.executeUpdate();
		
		String fullName = firstName + " " + lastName;
		LogsFunctions.addLog("System", "External Sent to Director", emailAddress, fullName, "External", "None", subject);
		
		String des = fullName +", external user, has sent you a mail, " + subject;
		NotificationFunctions.addNotification("External Mail Page", des, getDirectorRecipient());
	}
	
	public static void SendMailToDirector (String threadNumber, String message, FileItem fileData) throws SQLException, IOException 
	{
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (thread_number, first_name, last_name, email, contact_number, affiliation, subject, message, file_name, file_data) VALUES (?,?,?,?,?,?,?,?,?,?)");
		
		ResultSet rs = getExternalMailUsingThreadNo(threadNumber);
		
		if(rs.next())
		{
			String firstName = rs.getString("first_name");
			String lastName = rs.getString("last_name");
			String fullName = firstName + " " + lastName;
			String email = rs.getString("email");
			String contactNumber = rs.getString("contact_number");
			String affiliation = rs.getString("affiliation");
			String subject = rs.getString("subject");
			
			prep.setString(1, threadNumber);
			prep.setString(2, firstName);
			prep.setString(3, lastName);
			prep.setString(4, email);
			prep.setString(5, contactNumber);
			prep.setString(6, affiliation);
			prep.setString(7, subject);
			prep.setString(8, message);
			
			prep.setString(9, fileData.getName());
			prep.setBinaryStream(10, fileData.getInputStream(), (int) fileData.getSize());

			
		
			prep.executeUpdate();
		
			LogsFunctions.addLog("System", "External Reply to Director", email, fullName, "External", "None", subject);
			String des = fullName +", external user, has sent you a mail reply, " + subject;
			NotificationFunctions.addNotification("External Mail Page", des, getDirectorRecipient());
		}
	}
	
	public static void SendMailToDirector (String threadNumber, String message) throws SQLException, IOException 
	{
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (thread_number, first_name, last_name, email, contact_number, affiliation, subject, message) VALUES (?,?,?,?,?,?,?,?)");
		
		ResultSet rs = getExternalMailUsingThreadNo(threadNumber);
		
		if(rs.next())
		{
			String firstName = rs.getString("first_name");
			String lastName = rs.getString("last_name");
			String fullName = firstName + " " + lastName;
			String email = rs.getString("email");
			String contactNumber = rs.getString("contact_number");
			String affiliation = rs.getString("affiliation");
			String subject = rs.getString("subject");
			
			prep.setString(1, threadNumber);
			prep.setString(2, firstName);
			prep.setString(3, lastName);
			prep.setString(4, email);
			prep.setString(5, contactNumber);
			prep.setString(6, affiliation);
			prep.setString(7, subject);
			prep.setString(8, message);
		
			prep.executeUpdate();
		
			LogsFunctions.addLog("System", "External Reply to Director", email, fullName, "External", "None", subject);
			String des = fullName +", external user, has sent you a mail reply, " + subject;
			NotificationFunctions.addNotification("External Mail Page", des, getDirectorRecipient());
		}
		}
	
	public static ResultSet getExternalMail(String threadNumber) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name, email, contact_number, affiliation, subject, file_name FROM external_mail WHERE id = ?");
		prep.setString(1, threadNumber);
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet getExternalMailUsingThreadNo(String threadNumber) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT * FROM external_mail WHERE thread_number = ?");
		prep.setString(1, threadNumber);
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}

	public static int getCounter() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT counter FROM thread_number WHERE type = ?");
		prep.setString(1, "external mail");
		ResultSet rs = prep.executeQuery();
		rs.next();
		int counter = rs.getInt("counter");
		prep = con.prepareStatement("UPDATE thread_number SET counter = ? WHERE type = ?");
		prep.setInt(1, counter + 1);
		prep.setString(2, "external mail");
		prep.executeUpdate();
		return rs.getInt("counter");
		
	}
	public static ResultSet getExternalUserDetails(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT * FROM external_mail WHERE id = ?");
		prep.setString(1, id);
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet getExternalUserDetailsThread(String threadNo) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT thread_number, first_name, last_name, email, contact_number, affiliation, subject FROM external_mail WHERE thread_number = ?");
		prep.setString(1, threadNo);
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet getExternalMail() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT *  FROM external_mail");

		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet getSentExternalMail() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT *  FROM sent_external_mail");

		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static void send(String type,String to, String subject, String msg, String threadNumber, int id, final String user,final String pass, String contextPath, String title, String name , String position , String department) throws Exception
    { 
  
	    Properties props = new Properties();
	
	    props.put("mail.smtp.host", "smtp.gmail.com");
	    //below mentioned mail.smtp.port is optional
	    props.put("mail.smtp.port", "587");		
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	     
	    /* Pass Properties object(props) and Authenticator object   
	          for authentication to Session instance 
	       */

	    Session session = Session.getInstance(props,new javax.mail.Authenticator()
	    {
		  	  protected PasswordAuthentication getPasswordAuthentication() 
		  	  {
		  	 	 return new PasswordAuthentication(AesEncryption.decrypt(user),AesEncryption.decrypt(pass));
		  	  }
	    });
    
		   File file = ExternalMailFunctions.getPdf(id,type);
		 
		   MimeMessage message = new MimeMessage(session);
	       message.setFrom(new InternetAddress(AesEncryption.decrypt(user)));
	       message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
	       message.setSubject(subject);
	       Multipart multipart = new MimeMultipart();

	       if(file.getFileName() != null)
	       {
		       int length = (int) file.getFileData().length();
		       byte[] data = file.getFileData().getBytes(1, length);
		       DataSource source = new ByteArrayDataSource( data , "application/octet-stream");
		       MimeBodyPart attachment = new MimeBodyPart();
		       attachment = new MimeBodyPart();
		       attachment.setDataHandler(new DataHandler(source));
		       attachment.setFileName(file.getFileName());
		        
		       multipart.addBodyPart(attachment);
	       }
	       String first = title + name;
	       String second = position;
	       String third = department;
	       MimeBodyPart messageContent = new MimeBodyPart();
	       
	       String line = "";
	       for(int x = 0; x < 90;x++)
	       {
	    	   line += "-";
	       }
	       String parsedMessage = 
	    		   "The Director has sent you a message:" + "<br>" +
	    		    line + "<br>" +
	    			msg + "<br><br><br><br>" +
	    			"<b><i>" + first + "</i></b>" + "<br>" +
	    			"<i>" + second + "</i>" + "<br>" +
	    			"<i>" + third +  "</i>" + "<br><br>" + line + "<br><br>" + 
	    			"Use this link to reply to this message: " + contextPath + "/replyfromemail.jsp?thread_number=" + threadNumber;
	       

	       messageContent.setContent(parsedMessage, "text/html; charset=utf-8");
	       multipart.addBodyPart(messageContent);
	       message.setContent(multipart);
	       Transport.send(message);
    }
	
	public static File getPdf (int id, String type) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT file_name, file_data FROM sent_external_mail WHERE id = ? AND type = ?" + 
	       		" UNION " + 
	       		"SELECT file_name, file_data FROM external_mail WHERE id = ? AND type = ? ");

	       prep.setInt(1, id);
	       prep.setString(2, type);
	       prep.setInt(3, id);
	       prep.setString(4, type);
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	    	   
	           String fileName = rs.getString("file_name");
	           Blob fileData = rs.getBlob("file_data");
	           InputStream dataStream = rs.getBinaryStream("file_data");
	           String description = "";

	           return new File(id, fileName, fileData, dataStream, description);
	       }
	       return null;
	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'sent_external_mail'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}
	
	public static void saveSentExternalMail(String type, String threadNumber, String subject, String message, FileItem fileData, String sentBy, String contextPath, String title, String name, String position, String department, String username, String password) throws Exception
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO sent_external_mail (thread_number, recipient, subject, message, file_name, file_data, sent_by) VALUES (?,?,?,?,?,?,?)");
		String recipient = getEmail(threadNumber);
		prep.setString(1, AesEncryption.decrypt(threadNumber));
		prep.setString(2, recipient);
		prep.setString(3, subject);
		prep.setString(4, message);
		prep.setString(5, fileData.getName());
		prep.setBinaryStream(6, fileData.getInputStream(), (int) fileData.getSize());
		prep.setString(7, sentBy);

		prep.executeUpdate();
		threadNumber = AesEncryption.encrypt(threadNumber);
		ExternalMailFunctions.send(type,recipient, subject, message, threadNumber , ExternalMailFunctions.getIncrement(), username, password, contextPath ,title, name, position, department);
	}
	
	public static void saveSentExternalMail(String type, String threadNumber, String subject, String message, String sentBy, String contextPath, String title, String name, String position, String department,String username, String password) throws Exception
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO sent_external_mail (thread_number, recipient, subject, message, sent_by) VALUES (?,?,?,?,?)");
		String recipient = getEmail(threadNumber);
		prep.setString(1, AesEncryption.decrypt(threadNumber));
		prep.setString(2, recipient);
		prep.setString(3, subject);
		prep.setString(4, message);
		prep.setString(5, sentBy);

		prep.executeUpdate();
		threadNumber = AesEncryption.encrypt(threadNumber);
		ExternalMailFunctions.send(type,recipient, subject, message, threadNumber ,ExternalMailFunctions.getIncrement(), username, password, contextPath ,title, name, position, department);
	}
	
	public static String getName(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name FROM external_mail WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		String fullName = rs.getString("first_name") + " " + rs.getString("last_name");
		
		return fullName;
		
	}
	
	public static String getEmail(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email FROM external_mail WHERE thread_number = ?");
		String decryptedId = AesEncryption.decrypt(id);
		prep.setString(1, decryptedId);

		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		String email = rs.getString("email");

		return email;
		
	}
	
	public static String getSubject(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT subject FROM external_mail WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		String subject = rs.getString("subject");
		
		return subject;
		
	}
	
	public static String[] getDirectorRecipient() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		ArrayList<String> emailList = new ArrayList<String>();
		PreparedStatement prep = con.prepareStatement("SELECT email FROM accounts WHERE user_type = ?");
		prep.setString(1, "Director");
		ResultSet rs = prep.executeQuery();
		
		while(rs.next())
		{
			emailList.add(rs.getString("email"));
		}
		String[] returnEmailList = emailList.toArray(new String[emailList.size()]);
		
		return returnEmailList;
	}
	
	public static void updateReadStatus(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE external_mail SET status = ? WHERE id = ? ");
		prep.setString(1, "Read");
		prep.setString(2, id);
		
		prep.executeUpdate();
	}
	
	
}
