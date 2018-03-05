package com.ustiics_dms.externalmail;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.ustiics_dms.controller.mail.ExternalMail;
import com.ustiics_dms.model.Account;


@WebServlet("/RespondToExternalMail")
public class RespondToExternalMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RespondToExternalMail() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<FileItem> multifiles;
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account)session.getAttribute("currentCredentials");
			multifiles = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

			int counter = 0;
			String[] tempStorage = new String[10];
			
			FileItem fileData = null;
			for(FileItem item : multifiles)
			{
				if (item.isFormField()) 
				{
	                String fieldname = item.getFieldName();
	                String fieldvalue = item.getString();
	                tempStorage[counter++] = item.getString();
	            } 
				else 
				{
	                fileData = item;
	            }
            }
			String threadNumber = tempStorage[0];
			String recipient = tempStorage[1];
			String subject = tempStorage[2];
			String message = tempStorage[3];

			ExternalMailFunctions.saveSentExternalMail(threadNumber, recipient, subject, message, fileData, acc.getEmail());
			
			System.out.println(ExternalMailFunctions.getIncrement());
			ExternalMailFunctions.send(recipient, subject, message, ExternalMailFunctions.getIncrement(), "iics2014dmsystem@gmail.com", "bluespace09");

		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
