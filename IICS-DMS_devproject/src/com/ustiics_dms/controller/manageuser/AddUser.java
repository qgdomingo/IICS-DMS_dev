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

/**
 * Servlet implementation class AddUser
 */
@WebServlet("/AddUser")
public class AddUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public AddUser() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: add user").append(request.getContextPath());
		doPost(request, response);
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if(SessionChecking.checkSession(request.getSession()) != false) //if there is no session redirects to login page
		{
					RequestDispatcher dispatcher =
					getServletContext().getRequestDispatcher("/index.jsp");
					dispatcher.forward(request,response);
		}
		
		String email = request.getParameter("email");
		String facultyNo = request.getParameter("facultyNo");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String userType = request.getParameter("userType");
		String department = request.getParameter("department");
		
		try {
			ManageUserFunctions.addAccount(email, facultyNo, firstName, lastName, userType, department);
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		
		RequestDispatcher dispatcher =
		getServletContext().getRequestDispatcher("/admin/manageusers.jsp");
		dispatcher.forward(request,response);
	}

}
