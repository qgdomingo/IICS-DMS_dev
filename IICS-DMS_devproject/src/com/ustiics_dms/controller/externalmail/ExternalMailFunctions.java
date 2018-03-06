package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;

public class ExternalMailFunctions {
	
	public static void SendMailToDirector (String firstName, String lastName, String emailAddress, String contactNumber, String affiliation, String subject, String message, FileItem fileData) throws SQLException, IOException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (id, first_name, last_name, email, contact_number, affiliation, subject, message, file_name, file_data) VALUES (?,?,?,?,?,?,?,?,?,?)");
		
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
		

	}
	
	public static void SendMailToDirector (String threadNumber, String message, FileItem fileData) throws SQLException, IOException 
	{
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (id, first_name, last_name, email, contact_number, affiliation, subject, message, file_name, file_data) VALUES (?,?,?,?,?,?,?,?,?,?)");
		
		ResultSet rs = getExternalMail(threadNumber);
		rs.next();
		
		prep.setString(1, threadNumber);
		prep.setString(2, rs.getString("first_name"));
		prep.setString(3, rs.getString("last_name"));
		prep.setString(4, rs.getString("email"));
		prep.setString(5, rs.getString("contact_number"));
		prep.setString(6, rs.getString("affiliation"));
		prep.setString(7, rs.getString("subject"));
		prep.setString(8, message);
		prep.setString(9, fileData.getName());
		prep.setBinaryStream(10, fileData.getInputStream(), (int) fileData.getSize());

		prep.executeUpdate();
		

	}
	
	public static ResultSet getExternalMail(String threadNumber) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name, email, contact_number, affiliation, subject, file_name FROM external_mail WHERE id = ?");
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
	public static ResultSet getExternalMail() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT id, first_name, last_name, email, contact_number, affiliation, subject, message, file_name FROM external_mail");

		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static void send(String to, String subject, String msg, String threadNumber, int id, final String user,final String pass)
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
  	 	 return new PasswordAuthentication(user,pass);
  	  }
   });
    
   try
   {
	   
	   File file = ExternalMailFunctions.getPdf(id);
	 
	   MimeMessage message = new MimeMessage(session);
       message.setFrom(new InternetAddress(user));
       message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
       message.setSubject(subject);


        int length = (int) file.getFileData().length();
        byte[] data = file.getFileData().getBytes(1, length);
       
        Multipart multipart = new MimeMultipart();
        
        MimeBodyPart messageContent = new MimeBodyPart();
        messageContent.setText("http://localhost:8080/IICS-DMS_devproject/mail/replyfromemail.jsp?thread_number=" + threadNumber);
        MimeBodyPart attachment = new MimeBodyPart();
        attachment = new MimeBodyPart();
        DataSource source = new ByteArrayDataSource( data , "application/octet-stream");
        attachment.setDataHandler(new DataHandler(source));
        attachment.setFileName(file.getFileName());
        
        multipart.addBodyPart(messageContent);
        multipart.addBodyPart(attachment);

        message.setContent(multipart);
        Transport.send(message);
	}
 
  
    catch(Exception e)
    {
    	e.printStackTrace();

    }
   }
	
	public static File getPdf (int id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM sent_external_mail WHERE id = ?");
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           String fileName = rs.getString("file_name");
	           Blob fileData = rs.getBlob("file_data");
	           String description = "";

	           return new File(id, fileName, fileData, description);
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
	
	public static void saveSentExternalMail(String threadNumber, String subject, String message, FileItem fileData, String sentBy) throws SQLException, IOException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO sent_external_mail (thread_number, recipient, subject, message, file_name, file_data, sent_by) VALUES (?,?,?,?,?,?,?)");
		String recipient = getEmail(threadNumber);
		prep.setString(1, threadNumber);
		prep.setString(2, recipient);
		prep.setString(3, subject);
		prep.setString(4, message);
		prep.setString(5, fileData.getName());
		prep.setBinaryStream(6, fileData.getInputStream(), (int) fileData.getSize());
		prep.setString(7, sentBy);

		prep.executeUpdate();
		threadNumber = AesEncryption.encrypt(threadNumber);
		ExternalMailFunctions.send(recipient, subject, message, threadNumber , ExternalMailFunctions.getIncrement(), "iics2014dmsystem@gmail.com", "bluespace09");
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
		PreparedStatement prep = con.prepareStatement("SELECT email FROM external_mail WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		String email = rs.getString("email");
		System.out.println(email);
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
}
