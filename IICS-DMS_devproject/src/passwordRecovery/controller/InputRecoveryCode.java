package passwordRecovery.controller;

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
		
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		
		try {
			//checks if recovery code is valid
			if(PasswordRecoveryFunctions.checkRecoveryCode(email, code)) {
				response.setStatus(HttpServletResponse.SC_CONTINUE);
			} else {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST, "The Reset Code submitted is invalid.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

}
