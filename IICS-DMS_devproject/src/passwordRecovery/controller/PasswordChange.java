package passwordRecovery.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * PasswordChange.java
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
		System.out.println(request.getParameter("email"));
		System.out.println(request.getParameter("code"));
		System.out.println(request.getParameter("new_password"));
		System.out.println(request.getParameter("confirm_password"));
		
		
		String email = request.getParameter("email");
		String code = request.getParameter("code");
        String newPassword = request.getParameter("new_password");
        String confirmPassword = request.getParameter("confirm_password");
        
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
        
        try {
			if(PasswordRecoveryFunctions.updatePassword(email, newPassword, confirmPassword, code)) {
				response.setStatus(HttpServletResponse.SC_OK);
			} 
			else {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			}
        } catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
