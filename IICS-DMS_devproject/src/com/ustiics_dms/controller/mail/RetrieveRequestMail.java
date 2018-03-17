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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.RequestMail;


@WebServlet("/RetrieveRequestMail")
public class RetrieveRequestMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveRequestMail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<RequestMail> mail = new ArrayList<RequestMail>();
	    response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		try {

			
			ResultSet requestInfo = (ResultSet) MailFunctions.getRequestMail(acc.getDepartment());
			
			while(requestInfo.next())
			{ 
				mail.add(new RequestMail(
						requestInfo.getString("id"),
						requestInfo.getString("type"),
						requestInfo.getString("sender_name"),
						requestInfo.getString("sent_by"),
						requestInfo.getString("status"),
						requestInfo.getString("date_created"),
						requestInfo.getString("recipient"),
						requestInfo.getString("external_recipient"),
						requestInfo.getString("address_line1"),
						requestInfo.getString("address_line2"),
						requestInfo.getString("address_line3"),
						requestInfo.getString("subject"),
						requestInfo.getString("message"),
						requestInfo.getString("closing_remarks"),
						requestInfo.getString("note"),
						requestInfo.getString("paper_size")
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


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
