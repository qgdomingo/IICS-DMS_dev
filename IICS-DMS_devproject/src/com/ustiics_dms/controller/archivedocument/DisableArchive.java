package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
		try {
		
			String id = request.getParameter("archive_id");
	
			ArchiveDocumentFunctions.updateFolderToDisable(id);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
