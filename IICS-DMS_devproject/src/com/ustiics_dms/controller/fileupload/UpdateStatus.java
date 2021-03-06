package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.login.LoginFunctions;
import com.ustiics_dms.controller.logs.LogsFunctions;
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
		response.setCharacterEncoding("UTF-8");
		
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		try {
			
			String id = AesEncryption.decrypt(request.getParameter("id"));
			String button = request.getParameter("button_choice");
			String title = FileUploadFunctions.getIncomingDocTitle(id);
			if(button.equalsIgnoreCase("Edit Note"))
			{
				String note = request.getParameter("note");

				FileUploadFunctions.addNote(id, note, acc.getEmail());

				LogsFunctions.addLog("System", "Change Note", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), title);
			}
			else if(button.equalsIgnoreCase("Mark as Done"))
			{
				String type = AesEncryption.decrypt(request.getParameter("type"));
				
				FileUploadFunctions.markAsDone(id, type, acc.getEmail());

				LogsFunctions.addLog("System", "Mark As Done", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), title);
			}
			
		    response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		} catch (Exception e) {
			try {
					LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

}
