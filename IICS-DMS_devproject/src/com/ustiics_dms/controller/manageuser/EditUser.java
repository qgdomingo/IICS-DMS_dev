package com.ustiics_dms.controller.manageuser;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.utility.SessionChecking;

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
		
		//if(SessionChecking.checkSession(request.getSession()) != false) //if there is no session redirects to login page
		//{
		//			RequestDispatcher dispatcher =
		//			getServletContext().getRequestDispatcher("/index.jsp");
		//			dispatcher.forward(request,response);
		//}
		
		String email = request.getParameter("email");
		String facultyNo = request.getParameter("facultyNo");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String userType = request.getParameter("userType");
		String department = request.getParameter("department");
		String originalEmail = request.getParameter("originalEmail");
		
		try {
			ManageUserFunctions.updateAccount(email, facultyNo, firstName, lastName, userType, department, originalEmail);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

}
