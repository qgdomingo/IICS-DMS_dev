package com.ustiics_dms.controller.retrievedocument;

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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.ArchiveDocuments;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveEnabledArchiveDocuments")
public class RetrieveEnabledArchiveDocuments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveEnabledArchiveDocuments() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<ArchiveDocuments> documents = new ArrayList<ArchiveDocuments>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
		    ResultSet documentFiles = (ResultSet) RetrieveDocumentFunctions.retrieveEnabledArchivedDocuments(acc.getDepartment());

			while(documentFiles.next()) 
			{ 
				documents.add(new ArchiveDocuments(
						AesEncryption.encrypt(documentFiles.getString("id")),
						documentFiles.getString("folder_id"),
						documentFiles.getString("type"),
						documentFiles.getString("source_recipient"),
						documentFiles.getString("title"),
						documentFiles.getString("category"),
						documentFiles.getString("file_name"),
						documentFiles.getString("description"),
						documentFiles.getString("uploaded_by"),
						documentFiles.getString("email"),
						documentFiles.getString("upload_date"),
						documentFiles.getString("department"),
						documentFiles.getString("reference_no"),
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
		doGet(request, response);
	}

}
