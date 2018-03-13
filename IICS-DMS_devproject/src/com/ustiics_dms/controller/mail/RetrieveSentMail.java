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


@WebServlet("/RetrieveSentMail")
public class RetrieveSentMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSentMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<Mail> mail = new ArrayList<Mail>();
	    response.setCharacterEncoding("UTF-8");
	    
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet inboxInfo = (ResultSet) MailFunctions.getSentMail(acc.getEmail());
			
			while(inboxInfo.next())
			{ 
				mail.add(new Mail(
						AesEncryption.encrypt(inboxInfo.getString("id")),
						inboxInfo.getString("type"),
						inboxInfo.getString("iso_number"),
						inboxInfo.getString("subject"),
						inboxInfo.getString("date_created"),
						inboxInfo.getString("school_year")
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

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
