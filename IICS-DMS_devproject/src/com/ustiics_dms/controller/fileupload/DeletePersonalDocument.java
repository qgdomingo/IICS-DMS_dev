package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/DeletePersonalDocument")
public class DeletePersonalDocument extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public DeletePersonalDocument() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			
			String selected [] = request.getParameter("selected[]").split(",");
			HttpSession session = request.getSession();
			
			Account acc = (Account) session.getAttribute("currentCredentials");
			for(String id : selected)
			{
					String tempId = AesEncryption.decrypt(id);
					FileUploadFunctions.DeletePersonalDocument(tempId);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
