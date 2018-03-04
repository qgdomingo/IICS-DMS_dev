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
import com.ustiics_dms.utility.AesEncryption;


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

		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String id = AesEncryption.decrypt(request.getParameter("id"));
			String userEmail = acc.getEmail();
			String title = request.getParameter("title");
			String deadline = request.getParameter("deadline");
			String category = request.getParameter("category");
			String instructions = request.getParameter("instructions");
			String email [] = request.getParameterValues("assigned_to");
			
			ManageTasksFunctions.editTask(id, userEmail, title, deadline, category, instructions, email);
			
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		
	}

}
