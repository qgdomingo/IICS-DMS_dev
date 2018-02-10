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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Document;


@WebServlet("/IncomingDocument")
public class IncomingDocuments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public IncomingDocuments() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Document> documents = new ArrayList<Document>();
	    response.setCharacterEncoding("UTF-8");
		
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {
			ResultSet documentFiles = (ResultSet) RetrieveDocumentFunctions.retrieveDocuments("Incoming", acc.getEmail());
			while(documentFiles.next()) 
			{ 
				documents.add(new Document(
						documentFiles.getString("id"),
						"Incoming",
						documentFiles.getString("title"),
						documentFiles.getString("category"),
						documentFiles.getString("file_name"),
						documentFiles.getString("description"),
						documentFiles.getString("created_by"),
						documentFiles.getString("time_created")
						 ));	
			}
			String json = new Gson().toJson(documents);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
