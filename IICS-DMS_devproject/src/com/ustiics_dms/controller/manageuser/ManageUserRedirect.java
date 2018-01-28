package com.ustiics_dms.controller.manageuser;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ManageUserRedirect
 */
@WebServlet("/ManageUserRedirect")
public class ManageUserRedirect extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ManageUserRedirect() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String buttonPress = request.getParameter("buttonPress");
		String url = "";
		
				
		if(buttonPress.equals("Add User"))
		{
			url = "/admin/adduser.jsp";
		}
		else if(buttonPress.equals("Edit User"))
		{
			url = "/edituser.jsp";
		}
		else if(buttonPress.equals("Enable User"))
		{
			url = "/EnableUser";
		}
		else if(buttonPress.equals("Disable User"))
		{
			url = "/DisableUser";
		}
		request.setAttribute("selected", request.getParameter("selected"));
		RequestDispatcher dispatcher =
		getServletContext().getRequestDispatcher(url);
		dispatcher.forward(request,response);
		
	}

}
