package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;


@WebServlet("/ArchiveDocument")
public class ArchiveDocument extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ArchiveDocument() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try 
		{
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			ArchiveDocumentFunctions.transferToArchived();
			ArchiveDocumentFunctions.deleteDateFromArchiveDate();
			//String additonalInfo = ManageTasksFunctions.getFullName(email) + "(" + email + ")";
			//LogsFunctions.addLog("System", "Disable User", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), additonalInfo, purpose);
			
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	

}
