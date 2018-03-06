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

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.SendMail;


@WebServlet("/SendMailToDirector")
public class SendMailToDirector extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public SendMailToDirector() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<FileItem> multifiles;
		response.setCharacterEncoding("UTF-8");
		
		try {
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
			
			String firstName = tempStorage[0];
			String lastName = tempStorage[1];
			String emailAddress = tempStorage[2];
			String contactNumber = tempStorage[3];
			String affiliation = tempStorage[4];
			String subject = tempStorage[5];
			String message = tempStorage[6];
		
			ExternalMailFunctions.SendMailToDirector(firstName, lastName, emailAddress, contactNumber, affiliation ,subject, message, fileData);
		} 
		catch(Exception e) {
			e.printStackTrace();
		}
	}

}