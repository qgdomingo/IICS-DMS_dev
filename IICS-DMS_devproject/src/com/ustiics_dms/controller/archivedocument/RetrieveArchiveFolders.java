package com.ustiics_dms.controller.archivedocument;

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
import com.ustiics_dms.controller.manageuser.ManageUserFunctions;
import com.ustiics_dms.controller.retrievedocument.RetrieveDocumentFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Archive;
import com.ustiics_dms.model.Document;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveArchiveFolders")
public class RetrieveArchiveFolders extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveArchiveFolders() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Archive> documents = new ArrayList<Archive>();
	    response.setCharacterEncoding("UTF-8");
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {

			
			ResultSet documentFiles = (ResultSet) RetrieveDocumentFunctions.retrieveArchivedFolders();
			
			while(documentFiles.next()) 
			{ 
				documents.add(new Archive(
						AesEncryption.encrypt(documentFiles.getString("id")),
						documentFiles.getString("archive_title"),
						documentFiles.getString("status"),
						documentFiles.getString("archive_timestamp"),
						documentFiles.getString("academic_year")
				));	
			}
			String json = new Gson().toJson(documents);
			
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
