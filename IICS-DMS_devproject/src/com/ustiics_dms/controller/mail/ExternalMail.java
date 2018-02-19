package com.ustiics_dms.controller.mail;

import java.sql.Connection;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.ustiics_dms.databaseconnection.DBConnect;

public class ExternalMail {

	 public static void send(String to, String sub, String msg, final String user,final String pass)
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
		   

		for(String recipientMail : recipient)
		{
		   MimeMessage message = new MimeMessage(session);
	       message.setFrom(new InternetAddress(user));
	       message.addRecipient(Message.RecipientType.TO,new InternetAddress(recipientMail));
	       message.setSubject(sub);
	       message.setText(msg);

	       Transport.send(message);
		}
	 
	   }
	    catch(Exception e)
	    {
	    	

	    }
	   }
}
