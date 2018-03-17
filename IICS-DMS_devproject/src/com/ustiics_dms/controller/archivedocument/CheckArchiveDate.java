package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.ResultSet;
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
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.mail.MailFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Mail;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/CheckArchiveDate")
public class CheckArchiveDate extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CheckArchiveDate() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {

		    
			boolean result = ArchiveDocumentFunctions.compareTime();	
			
		    response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(String.valueOf(result));
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
