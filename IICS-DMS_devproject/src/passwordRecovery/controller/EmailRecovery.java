package passwordRecovery.controller;

import utility.SendMail;
import utility.GenerateCode;
import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
		
		// ADD CODE TO CHECK IF THE EMAIL IS AN EXISTING USER
		// IF EXISTING, PROCEED TO SEND EMAIL
		// ELSE, DO NOT SEND EMAIL
		
		System.out.println(request.getParameter("foo"));
		
		String recipient = "2014069003@ust-ics.mygbiz.com"; //request.getParameter("email");
		String subject = "IICS DMS Password Reset";
		
		/*********************** Start of E-Mail Message **********************/
		String message = "Good day " +  recipient + ",";
		String code = GenerateCode.generateRecoveryCode();
		message += "your security code is: " + code;
		/************************ End of E-Mail Message **********************/
		
		String userName = "jlteoh23@gmail.com";
		String password = "jed231096";
		
		//SendMail.send(recipient, subject, message, userName, password); //send email
		
		//try {
		//	PasswordRecoveryFunctions.addRecoveryCode(recipient, code); //add to database
		//} catch (SQLException e) {
		//	e.printStackTrace();
		//}

		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("done");
		// after the process, this servlet should send a response that the process is finished
	}

}
