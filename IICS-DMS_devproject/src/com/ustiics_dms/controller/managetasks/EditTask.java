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


@WebServlet("/EditTask")
public class EditTask extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public EditTask() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		
		Account acc = (Account) session.getAttribute("currentCredentials");
		
		String id = request.getParameter("id");
		String userEmail = acc.getEmail();
		String title = request.getParameter("title");
		String deadline = request.getParameter("deadline");
		String category = request.getParameter("category");
		String instructions = request.getParameter("instructions");
		String email [] = request.getParameterValues("assigned_to");
		
		try {
			ManageTasksFunctions.editTask(id, userEmail, title, deadline, category, instructions, email);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		//edit task
		
	}

}
