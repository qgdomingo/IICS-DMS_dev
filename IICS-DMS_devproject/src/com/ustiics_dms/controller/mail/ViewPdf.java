package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/ViewPdf")
public class ViewPdf extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ViewPdf() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			int id = Integer.parseInt(AesEncryption.decrypt(request.getParameter("id")));
			File file = MailFunctions.getPdf(id);
			String contentType = this.getServletContext().getMimeType(file.getFileName());
			
			String md5 = org.apache.commons.codec.digest.DigestUtils.md5Hex(file.getDataStream());
			String checksum = MailFunctions.getCheckSum(id);
			System.out.println(md5);
			System.out.println(checksum);
			/*if(!md5.equalsIgnoreCase(checksum))
			 {
				 response.sendRedirect("fileerror.jsp");
			 }	*/
			response.setHeader("Content-Type", contentType);
			response.setHeader("Content-Length", String.valueOf(file.getFileData().length()));
			response.setHeader("Content-Disposition", "inline; filename=\"" + file.getFileName() + "\"");

			Blob fileData = file.getFileData();
	        InputStream is = fileData.getBinaryStream();
	
	        byte[] bytes = new byte[1024];
	        int bytesRead;
	
	        while ((bytesRead = is.read(bytes)) != -1) 
	        {
	        	// Write image data to Response.
	        	response.getOutputStream().write(bytes, 0, bytesRead);
	        }
	         
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
