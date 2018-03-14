package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;


@WebServlet("/GenerateIsoNumber")
public class GenerateIsoNumber extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public GenerateIsoNumber() {
        super();
        
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
		    
			String type = request.getParameter("type");
			String purpose = request.getParameter("purpose");
			String department = acc.getDepartment();
			String generated_by = acc.getEmail();

			String isoNumber = MailFunctions.generateISONumber(type, generated_by, department, purpose);
			LogsFunctions.addLog(type, "Generate ISO", generated_by, ManageTasksFunctions.getFullName(generated_by), acc.getUserType(), department, isoNumber, purpose);
			} catch (Exception e) 
			{
				e.printStackTrace();
			}
	}

}
