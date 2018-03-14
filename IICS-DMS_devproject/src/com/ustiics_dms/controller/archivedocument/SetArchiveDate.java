package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.login.LoginFunctions;
import com.ustiics_dms.model.Account;


@WebServlet("/SetArchiveDate")
public class SetArchiveDate extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SetArchiveDate() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			String archiveDate = request.getParameter("archive_date");
			String password = request.getParameter("current_password");
			
			boolean authenticate = LoginFunctions.authenticate(acc.getEmail(), password);
			if(authenticate)
			{
				ArchiveDocumentFunctions.updateArchiveDate(archiveDate);
				
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("success");
				return;
			}
			else
			{
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("invalid password");
				return;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

	}

}
