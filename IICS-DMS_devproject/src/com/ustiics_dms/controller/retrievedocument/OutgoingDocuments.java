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
import com.ustiics_dms.model.OutgoingDocument;


@WebServlet("/OutgoingDocument")
public class OutgoingDocuments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public OutgoingDocuments() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<OutgoingDocument> outgoingFiles = new ArrayList<OutgoingDocument>();
	    response.setCharacterEncoding("UTF-8");
		
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {
			ResultSet documentFiles = (ResultSet) RetrieveDocumentFunctions.retrieveDocuments("Outgoing", acc.getDepartment());
			while(documentFiles.next()) 
			{ 
				outgoingFiles.add(new OutgoingDocument(
						documentFiles.getString("type"),
						documentFiles.getString("thread_number"),
						documentFiles.getString("source_recipient"),
						documentFiles.getString("title"),
						documentFiles.getString("category"),
						documentFiles.getString("file_name"),
						documentFiles.getString("description"),
						documentFiles.getString("created_by"),
						documentFiles.getString("email"),
						documentFiles.getString("time_created"),
						documentFiles.getString("department")
						 ));	
				
			}
			String json = new Gson().toJson(outgoingFiles);
			
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
