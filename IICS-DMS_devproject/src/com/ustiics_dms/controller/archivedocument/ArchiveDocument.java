package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ArchiveDocument")
public class ArchiveDocument extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ArchiveDocument() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		

		try 
		{
			String button = request.getParameter("archive");
			
			if(button.equals("archive"))
			{
				ArchiveDocumentFunctions.transferToArchived();
			}
			

		} 
		catch (Exception e) 
		{
			
		}
		
		RequestDispatcher dispatcher =
		getServletContext().getRequestDispatcher("/archivedocuments.jsp");
		dispatcher.forward(request,response);
	}


	

}
