package com.ustiics_dms.controller.passwordrecovery;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * InputRecoveryCode.java 
 *  - a servlet controller that would check if the reset code entered is valid or not
 * 
 */
@WebServlet("/InputRecoveryCode")
public class InputRecoveryCode extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public InputRecoveryCode() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String email = request.getParameter("email");
		String code = request.getParameter("code");
		
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");

		try {
			//checks if recovery code is valid
			if(PasswordRecoveryFunctions.checkRecoveryCode(email, code)) {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("valid code");
			} else {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("invalid");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

}
