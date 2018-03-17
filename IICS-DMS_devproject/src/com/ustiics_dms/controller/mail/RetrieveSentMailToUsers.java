package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Mail;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveSentMailToUsers")
public class RetrieveSentMailToUsers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSentMailToUsers() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Mail> mail = new ArrayList<Mail>();
	    response.setCharacterEncoding("UTF-8");
	    
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {
		    String mailID = AesEncryption.decrypt(request.getParameter("id"));
		    
			ResultSet mailInfo = (ResultSet) MailFunctions.getSentMailToUsersInformation(mailID);
			
			while(mailInfo.next())
			{ 
				mail.add(new Mail(
						ManageTasksFunctions.getFullName(mailInfo.getString("recipient_mail")) 
							+ " (" + mailInfo.getString("recipient_mail") + ")",
						mailInfo.getString("acknowledgement"),
						mailInfo.getString("time_acknowledged"),
						mailInfo.getString("remarks")
				));	
			}
			
			String json = new Gson().toJson(mail);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			try {
				LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
