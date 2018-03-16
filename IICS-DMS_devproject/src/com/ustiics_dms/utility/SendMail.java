package com.ustiics_dms.utility;

import java.io.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.servlet.http.HttpServletResponse;

public class SendMail 
{ 
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
  	 	 return new PasswordAuthentication(AesEncryption.decrypt(user),AesEncryption.decrypt(pass));
  	  }
   });
    
   try
   {
 
    MimeMessage message = new MimeMessage(session);
       message.setFrom(new InternetAddress(AesEncryption.decrypt(user)));
       message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
       message.setSubject(sub);
       String line = "";
       for(int x = 0; x < 90;x++)
       {
    	   line += "-";
       }
       String messageParsed = 
    		   "Password Recovery" + "<br><br>" +
   	    		    line + "<br><br>" +
   	    		 "Use this code to reset your password: " + "<b>" + msg + "</b>";
   	    		

       message.setContent(messageParsed, "text/html; charset=utf-8");


       
       Transport.send(message);
 
 
    }
    catch(Exception e)
    {
    	e.printStackTrace();
    }
  }  
}