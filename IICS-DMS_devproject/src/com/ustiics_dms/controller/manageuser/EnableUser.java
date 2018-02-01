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
 * Servlet implementation class EnableUser
 */
@WebServlet("/EnableUser")
public class EnableUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public EnableUser() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at:").append(request.getContextPath());
		doPost(request, response);
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if(SessionChecking.checkSession(request.getSession()) != false) //if there is no session redirects to login page
		{
					RequestDispatcher dispatcher =
					getServletContext().getRequestDispatcher("/index.jsp");
					dispatcher.forward(request,response);
		}
		
		String[] selected = request.getParameterValues("selected");
		
		for(String email : selected)
		{
			try {
				
				ManageUserFunctions.enableStatus(email);
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
				RequestDispatcher dispatcher =
				getServletContext().getRequestDispatcher("/admin/manageusers.jsp");
				dispatcher.forward(request,response);
	}

}
