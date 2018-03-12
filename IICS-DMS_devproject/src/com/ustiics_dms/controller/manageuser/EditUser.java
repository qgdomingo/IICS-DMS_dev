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
 * EditUser.java
 *  - this servlet controller is responsible for retrieving updates to user account data and storing it into the database
 */
@WebServlet("/EditUser")
public class EditUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EditUser() {
        super();
   
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		
		try {
			String email = request.getParameter("email");
			String facultyNo = request.getParameter("faculty_no");
			String firstName = request.getParameter("first_name");
			String lastName = request.getParameter("last_name");
			String userType = request.getParameter("user_type");
			String department = request.getParameter("department");
			String originalEmail = request.getParameter("original_email");	
			String title = request.getParameter("title");
			String contactNumber = request.getParameter("cellphone_number");
			
			if(userType.equalsIgnoreCase("Director") || userType.equalsIgnoreCase("Faculty Secretary") 
					|| userType.equalsIgnoreCase("Supervisor") || userType.equalsIgnoreCase("Staff"))
			{
				department = "IICS";
			}
			
			ManageUserFunctions.updateAccount(email, facultyNo, firstName, lastName, userType, department, title, contactNumber, originalEmail);
			
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			String fullName = firstName + " " + lastName;
			String additonalInfo = fullName + "(" + email + ")";
			LogsFunctions.addLog("System", "Update User", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), additonalInfo);
				
			ArrayList<Account> updatedUserList = new ArrayList<Account>();
			updatedUserList.add(ManageUserFunctions.getAccount(email));
				
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
