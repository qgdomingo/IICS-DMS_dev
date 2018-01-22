package passwordrecovery.controller;

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
 * Servlet implementation class EmailRecovery
 */
@WebServlet("/EmailRecovery")
public class EmailRecovery extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmailRecovery() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		String recipient = "2014069003@ust-ics.mygbiz.com";//request.getParameter("email");
		String subject = "Password Recovery";
		
		/***********************start of message**********************/
		String message = "Good day " +  recipient + ",";
		String code = GenerateCode.generateRecoveryCode();
		message += "Your security code is : " + code;
		/************************end of message**********************/
		
		String userName = "jlteoh23@gmail.com";
		String password = "jed231096";
		 
		try {
			PasswordRecoveryFunctions.addRecoveryCode(recipient, code);//add to database
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		SendMail.send(recipient,subject, message, userName, password);//send email
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
