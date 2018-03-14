package com.ustiics_dms.controller.externalmail;

import java.io.IOException;
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
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.ExternalMail;
import com.ustiics_dms.model.SentExternalMail;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveExternalSentMail")
public class RetrieveExternalSentMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveExternalSentMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<SentExternalMail> external = new ArrayList<SentExternalMail>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet externalMail = (ResultSet) ExternalMailFunctions.getSentExternalMail();
			
			
			while(externalMail.next())
			{
				ResultSet rs = (ResultSet) ExternalMailFunctions.getExternalUserDetails(externalMail.getString("id"));
				
				if(rs.next())
				{
					String recipientName = rs.getString("first_name") + " " + rs.getString("last_name") + " " + rs.getString("email");
					String senderName = ManageTasksFunctions.getFullName(externalMail.getString("sent_by")) + " " + externalMail.getString("sent_by");
					external.add(new SentExternalMail(
							recipientName,
							rs.getString("affiliation"),
							rs.getString("contact_number"),
							senderName,
							rs.getString("sent_timestamp"),
							rs.getString("subject"),
							rs.getString("message"),
							externalMail.getString("id"),
							rs.getString("file_name"),
							rs.getString("thread_number")
							 ));	
				}
			}
			String json = new Gson().toJson(external);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
