package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.model.Account;

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
		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String email = request.getParameter("email");
			String facultyNo = request.getParameter("faculty_no");
			String firstName = request.getParameter("first_name");
			String lastName = request.getParameter("last_name");
			String fullName = firstName + " " + lastName;
			String userType = request.getParameter("user_type");
			String department = request.getParameter("department");
			
			if(userType.equalsIgnoreCase("Director") || userType.equalsIgnoreCase("Faculty Secretary") 
					|| userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff"))
			{
				department = "IICS";
			}
			
				
				ManageUserFunctions.addAccount(email, facultyNo, firstName, lastName, fullName, userType, department);

				String additonalInfo = fullName + "(" + email + ")";
				
				LogsFunctions.addLog("System", "Add User", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), additonalInfo);
				
				ArrayList<Account> newUserList = new ArrayList<Account>();
				newUserList.add(ManageUserFunctions.getAccount(email));
				
				String json = new Gson().toJson(newUserList);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write(json);
				
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
