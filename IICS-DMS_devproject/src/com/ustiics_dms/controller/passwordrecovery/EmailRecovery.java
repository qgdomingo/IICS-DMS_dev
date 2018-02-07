package com.ustiics_dms.controller.passwordrecovery;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.utility.GenerateCode;
import com.ustiics_dms.utility.SendMail;


/**
 * EmailRecovery.java 
 * - a servlet controller that would handle the sending of an email to the user that contains
 * 		the reset code for authorization of changing the password of the user
 */
@WebServlet("/sendemail")
public class EmailRecovery extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EmailRecovery() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String recipient = request.getParameter("email");

		try {
			//TODO: HOW ABOUT PREVIOUS RESET CODES? WHAT IF IT IS EXISTING. RESEND CODE INSTEAD?
			if(PasswordRecoveryFunctions.checkEmailExists(recipient))
			{
				PasswordRecoveryFunctions.deleteExistingRecoveryCode(recipient);
				String subject = "IICS DMS Password Reset";
				
				/*********************** Start of E-Mail Message **********************/
				String message = "Good day " +  recipient + ",";
				String code = GenerateCode.generateRecoveryCode();
				message += "your security code is: " + code;
				/************************ End of E-Mail Message **********************/
				
				String userName = "2014069493@ust-ics.mygbiz.com";
				String password = "bluespace09";
				
				SendMail.send(recipient, subject, message, userName, password); //send email
				
				PasswordRecoveryFunctions.addRecoveryCode(recipient, code); //add to database
			
				response.setContentType("text/html");
				response.setCharacterEncoding("UTF-8");
				response.setStatus(HttpServletResponse.SC_OK);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
