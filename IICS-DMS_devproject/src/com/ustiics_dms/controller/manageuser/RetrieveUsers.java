package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.model.Account;

@WebServlet("/RetrieveUsers")
public class RetrieveUsers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveUsers() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Account> users = new ArrayList<Account>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			ResultSet accounts = (ResultSet) ManageUserFunctions.viewAccounts();
			while(accounts.next()) { 
				users.add(new Account(accounts.getTimestamp("time_created"),
									  Integer.parseInt(accounts.getString("faculty_number")),
									  accounts.getString("first_name"),
									  accounts.getString("last_name"),
									  accounts.getString("email"),
									  accounts.getString("user_type"),
									  accounts.getString("department"),
									  accounts.getString("status"))
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
