package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.ustiics_dms.model.Account;

/**
 * Disableuser.java
 *  - this servlet controller is responsible for disabling users in the database
 */
@WebServlet("/DisableUser")
public class DisableUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DisableUser() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			String[] selected = request.getParameterValues("selected[]");
			ArrayList<Account> updatedUserList = new ArrayList<Account>();
			
			for(String email : selected)
			{
				ManageUserFunctions.disableStatus(email);
				updatedUserList.add(ManageUserFunctions.getAccount(email));
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
