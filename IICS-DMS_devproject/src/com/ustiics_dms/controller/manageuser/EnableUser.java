package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.SessionChecking;

/**
 * EnableUser.java
 *  - this servlet controller is responsible for enabling users in the database
 */
@WebServlet("/EnableUser")
public class EnableUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public EnableUser() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String selected [] = request.getParameter("selected[]").split(",");
			String purpose = request.getParameter("enable_user_purpose");
			ArrayList<Account> updatedUserList = new ArrayList<Account>();
			
			
			for(String email : selected)
			{
				ManageUserFunctions.enableStatus(email);
				updatedUserList.add(ManageUserFunctions.getAccount(email));
				String additonalInfo = ManageTasksFunctions.getFullName(email) + "(" + email + ")";
				LogsFunctions.addLog("System", "Enable User", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), additonalInfo, purpose);
			}
			
			String json = new Gson().toJson(updatedUserList);
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(json);
			
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
