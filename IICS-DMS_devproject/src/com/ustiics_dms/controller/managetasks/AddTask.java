package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;

@WebServlet("/AddTask")
public class AddTask extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AddTask() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {
			
			HttpSession session = request.getSession();
			
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String title = request.getParameter("title");
			String deadline = request.getParameter("deadline");
			String category = request.getParameter("category");
			String instructions = request.getParameter("instructions");
			String email [] = request.getParameterValues("assigned_to");
			String assignedBy = acc.getEmail();
		
			ManageTasksFunctions.addTask(title, deadline, category, instructions, email, assignedBy);
			
			//TODO: return new task data to update new row
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} 
		catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
