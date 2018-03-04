package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;
import com.ustiics_dms.utility.SessionChecking;


@WebServlet("/DownloadTask")
public class DownloadTask extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public DownloadTask() {
        super();

    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			 int id = Integer.parseInt(AesEncryption.decrypt(request.getParameter("id")));
			 String email = request.getParameter("email");
			 
			 File file = ManageTasksFunctions.getFile(id, email);
			 
			 String contentType = this.getServletContext().getMimeType(file.getFileName());
			 
			 response.setCharacterEncoding("UTF-8");
			 response.setHeader("Content-Type", contentType);
	         response.setHeader("Content-Length", String.valueOf(file.getFileData().length()));
	         response.setHeader("Content-Disposition", "inline; filename=\"" + file.getFileName() + "\"");
		
			 Blob fileData = file.getFileData();
	         InputStream is = fileData.getBinaryStream();
	
	         byte[] bytes = new byte[1024];
	         int bytesRead;
	
	         while ((bytesRead = is.read(bytes)) != -1) 
	         {
	            response.getOutputStream().write(bytes, 0, bytesRead);
	         }
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}		
	}
}
