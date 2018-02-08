package com.ustiics_dms.controller.passwordrecovery;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * PasswordChange.java
 *  - a servlet controller that takes the new password of the user and would update it to the database
 */
@WebServlet("/PasswordChange")
public class PasswordChange extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public PasswordChange() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {			
		String email = request.getParameter("email");
		String code = request.getParameter("code");
        String newPassword = request.getParameter("new_password");
        String confirmPassword = request.getParameter("confirm_password");
        
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
        
        try {
			if(PasswordRecoveryFunctions.updatePassword(email, newPassword, confirmPassword, code)) {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("changed");
			} 
			else {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("unchanged");
			}
        } catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
