package com.ustiics_dms.controller.directory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.model.Account;

/**
 * Servlet implementation class RetrieveStaffUsers
 */
@WebServlet("/RetrieveStaffUsers")
public class RetrieveStaffUsers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveStaffUsers() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		List<Account> users = new ArrayList<Account>();
		response.setCharacterEncoding("UTF-8");
		
		try {
			ResultSet accounts = (ResultSet) RetrieveUsersFunctions.retrieveStaffUsers(acc.getEmail());

			while(accounts.next()) { 
				users.add(new Account(accounts.getString("full_name"),
									  accounts.getString("email"),
									  accounts.getString("user_type"),
									  accounts.getString("department"))
						 );	
			}
			String json = new Gson().toJson(users);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
