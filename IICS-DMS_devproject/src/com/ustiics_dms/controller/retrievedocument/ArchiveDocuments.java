package com.ustiics_dms.controller.retrievedocument;

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
import com.ustiics_dms.controller.manageuser.ManageUserFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Archive;
import com.ustiics_dms.model.Document;


@WebServlet("/ArchiveDocuments")
public class ArchiveDocuments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ArchiveDocuments() {
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
						documentFiles.getString("id"),
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
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


	}

}
