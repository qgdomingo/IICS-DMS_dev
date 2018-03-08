package com.ustiics_dms.controller.fileupload;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.controller.mail.MailFunctions;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/UpdateStatus")
public class UpdateStatus extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public UpdateStatus() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
		String id = AesEncryption.decrypt(request.getParameter("id"));
		String button = request.getParameter("buttonChoice");
		
			if(button.equalsIgnoreCase("Edit Note"))
			{
				String note = request.getParameter("note");
				
				MailFunctions.addNote(id, note);
			}
			else if(button.equalsIgnoreCase("Mark as Done"))
			{
				MailFunctions.markAsDone(id);
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}

}
