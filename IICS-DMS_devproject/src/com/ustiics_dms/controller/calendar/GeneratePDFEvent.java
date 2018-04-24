package com.ustiics_dms.controller.calendar;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.DocumentException;
import com.ustiics_dms.controller.archivedocument.ArchiveDocumentFunctions;


@WebServlet("/GeneratePDFEvent")
public class GeneratePDFEvent extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public GeneratePDFEvent() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		try {
			
			String eventId = "1";// request.getParameter("event_id");
			
			InputStream pdf = ManageEventsFunctions.createPDF(eventId);
			int size = pdf.available();
			
			String contentType = this.getServletContext().getMimeType("test" + ".pdf");
			 
			response.setHeader("Content-Type", contentType);
			 
	        response.setHeader("Content-Length", String.valueOf(size));
	 
	        response.setHeader("Content-Disposition", "inline; filename=\"" + "EventTable"+ ".pdf"+ "\"");
		
	        
	        byte[] bytes = new byte[1024];
	        int bytesRead;
	
	        while ((bytesRead = pdf.read(bytes)) != -1) 
	        {
	        	 // Write image data to Response.
	            response.getOutputStream().write(bytes, 0, bytesRead);
	        }
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


	}

}
