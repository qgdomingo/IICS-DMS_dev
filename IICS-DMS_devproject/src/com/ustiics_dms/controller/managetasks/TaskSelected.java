package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;


@WebServlet("/TaskSelected")
public class TaskSelected extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TaskSelected() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Account acc = (Account) session.getAttribute("currentCredentials");
		String id = request.getParameter("id");
		String email = acc.getEmail();
		String redirectURL = "";
		try 
		{
			
			if(ManageTasksFunctions.checkAssignedTask(email, id))
			{
				redirectURL = "/submittask.jsp";
			}
			else
			{
				redirectURL = "/selecttask.jsp";
			}
			
			RequestDispatcher dispatcher =
			getServletContext().getRequestDispatcher(redirectURL);
			dispatcher.forward(request,response);
		} 
		catch (SQLException e) 
		{

		}
	}

}
