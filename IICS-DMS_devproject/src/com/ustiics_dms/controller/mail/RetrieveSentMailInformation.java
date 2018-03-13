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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Mail;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveSentMailInformation")
public class RetrieveSentMailInformation extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSentMailInformation() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Mail> mail = new ArrayList<Mail>();
	    response.setCharacterEncoding("UTF-8");
	    
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
		    String mailID = AesEncryption.decrypt(request.getParameter("id"));
		    
			ResultSet mailInfo = (ResultSet) MailFunctions.getInboxInformation(mailID);
			
			while(mailInfo.next())
			{ 
				mail.add(new Mail(
						AesEncryption.encrypt(mailID),
						mailInfo.getString("type"),
						mailInfo.getString("iso_number"),
						mailInfo.getString("subject"),
						mailInfo.getString("sender_name"),
						mailInfo.getString("sent_by"),
						mailInfo.getString("date_created"),
						mailInfo.getString("school_year")
				));	
			}
			
			String json = new Gson().toJson(mail);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
