package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.ustiics_dms.utility.SessionChecking;

/**
 * AddUser.java
 *  - this servlet controller is responsible for retrieving new user account data and storing it into the database
 */
@WebServlet("/AddUser")
public class AddUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddUser() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);	
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String email = request.getParameter("email");
		String facultyNo = request.getParameter("faculty_no");
		String firstName = request.getParameter("first_name");
		String lastName = request.getParameter("last_name");
		String userType = request.getParameter("user_type");
		String department = request.getParameter("department");
		String displayTimestamp = "";
		
		try {
			ManageUserFunctions.addAccount(email, facultyNo, firstName, lastName, userType, department);
			ResultSet newUserRS = ManageUserFunctions.getAccountTimestamp(email);
			
			if(newUserRS.next()) {
				displayTimestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
						.format(newUserRS.getTimestamp("time_created"));
			}
			
			Map<String, String> data = new HashMap<>();
			data.put("timestamp", displayTimestamp);
			String json = new Gson().toJson(data);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(json);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
