package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Mail;


@WebServlet("/RetrieveExportedMail")
public class RetrieveExportedMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveExportedMail() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
		    
			List <String> exportedID =MailFunctions.getExportedMailID(acc.getEmail());
			response.setCharacterEncoding("UTF-8");
			
		    
		    
			List <Mail> mail = new ArrayList <Mail> ();
			for(String id:exportedID)
			{
				ResultSet mailInfo = MailFunctions.getInboxInformation(id);
				mailInfo.next();
					
				mail.add(new Mail(
						mailInfo.getString("id"),
						mailInfo.getString("type"),
						mailInfo.getString("iso_number"),
						mailInfo.getString("external_recipient"),
						mailInfo.getString("subject"),
						mailInfo.getString("sender_name"),
						mailInfo.getString("sent_by"),
						mailInfo.getString("date_created")
						 ));	
				
			}
				String json = new Gson().toJson(mail);
				
			    response.setContentType("application/json");
			    response.setStatus(HttpServletResponse.SC_OK);
			    response.getWriter().write(json);
				
			
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
