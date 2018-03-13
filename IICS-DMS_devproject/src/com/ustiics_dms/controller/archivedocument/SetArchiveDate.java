package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
		try {
			
			String archiveDate = request.getParameter("archive_date");
		
			ArchiveDocumentFunctions.updateArchiveDate(archiveDate);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

}
