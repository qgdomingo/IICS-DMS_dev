package com.ustiics_dms.controller.mail;

import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.BodyPart;
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

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;

public class ExternalMail {

	 public static void send(String to, String subject, int id, final String user,final String pass)
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
		 List<String> recipient = Arrays.asList(to.split(","));
		   
		 File file = MailFunctions.getPdf(id);
		 
		 Blob fileData = file.getFileData();
		 
         InputStream is = fileData.getBinaryStream();
         
		for(String recipientMail : recipient)
		{
		   MimeMessage message = new MimeMessage(session);
	       message.setFrom(new InternetAddress(user));
	       message.addRecipient(Message.RecipientType.TO,new InternetAddress(recipientMail));
	       message.setSubject(subject);
	       message.setText("Auto Generated");

	       int length = (int) file.getFileData().length();
	       byte[] data = file.getFileData().getBytes(1, length);
	       
	       MimeBodyPart messageBodyPart = new MimeBodyPart();
	       Multipart multipart = new MimeMultipart();

	        messageBodyPart = new MimeBodyPart();
	        DataSource source = new ByteArrayDataSource( data , "application/octet-stream");
	        messageBodyPart.setDataHandler(new DataHandler(source));
	        messageBodyPart.setFileName(file.getFileName());
	        multipart.addBodyPart(messageBodyPart);

	        message.setContent(multipart);
	       Transport.send(message);
		}
	 
	   }
	    catch(Exception e)
	    {
	    	

	    }
	   }
}
