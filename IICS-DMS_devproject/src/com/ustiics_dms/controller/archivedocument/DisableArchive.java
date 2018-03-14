package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/DisableArchive")
public class DisableArchive extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DisableArchive() {
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
			
			String id[] = request.getParameter("selected[]").split(",");
			String purpose = request.getParameter("disable_archive_purpose");
	
			for(String archiveID : id)
			{
				ArchiveDocumentFunctions.updateFolderToDisable(AesEncryption.decrypt(archiveID));
				
				//String additonalInfo = ManageTasksFunctions.getFullName(email) + "(" + email + ")";
				//LogsFunctions.addLog("System", "Disable User", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), additonalInfo, purpose);
			}
			
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
			
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
