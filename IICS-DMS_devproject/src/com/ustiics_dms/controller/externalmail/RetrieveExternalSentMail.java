package com.ustiics_dms.controller.externalmail;

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
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		try {
			
			ResultSet externalMail = (ResultSet) ExternalMailFunctions.getSentExternalMail();
			
			
			while(externalMail.next())
			{
				ResultSet externalUser = (ResultSet) ExternalMailFunctions.getExternalUserDetails(externalMail.getString("thread_number"));
				
				if(externalUser.next())
				{
					String recipientName = externalUser.getString("first_name") + " " + externalUser.getString("last_name") + " (" + externalUser.getString("email") + ")";
					String senderName = ManageTasksFunctions.getFullName(externalMail.getString("sent_by")) + " (" + externalMail.getString("sent_by") + ")";
					external.add(new SentExternalMail(
							externalMail.getString("type"),
							recipientName,
							externalUser.getString("affiliation"),
							externalUser.getString("contact_number"),
							senderName,
							externalMail.getString("date_created"),
							externalMail.getString("subject"),
							externalMail.getString("message"),
							externalMail.getString("id"),
							externalMail.getString("file_name"),
							externalMail.getString("thread_number")
							 ));	
				}
			}
			String json = new Gson().toJson(external);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
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

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
