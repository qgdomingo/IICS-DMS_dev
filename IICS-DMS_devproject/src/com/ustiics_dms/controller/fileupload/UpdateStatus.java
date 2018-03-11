package com.ustiics_dms.controller.fileupload;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.login.LoginFunctions;
import com.ustiics_dms.model.Account;
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
			
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String id = AesEncryption.decrypt(request.getParameter("id"));
			String button = request.getParameter("button_choice");
		
			if(button.equalsIgnoreCase("Edit Note"))
			{
				String note = request.getParameter("note");

				FileUploadFunctions.addNote(id, note, acc.getEmail());
			}
			else if(button.equalsIgnoreCase("Mark as Done"))
			{
				String type = AesEncryption.decrypt(request.getParameter("type"));
				FileUploadFunctions.markAsDone(id, type, acc.getEmail());
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}

}
