package passwordrecovery.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class InputRecoveryCode
 */
@WebServlet("/InputRecoveryCode")
public class InputRecoveryCode extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InputRecoveryCode() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		String email = "quennelgiodomingo@gmail.com";//request.getParameter("email");
		String code = "27250";//request.getParameter("code");
		
		try {
			
			 PasswordRecoveryFunctions.checkRecoveryCode(email, code);//checks if recovery code is valid
			 request.setAttribute("email", email);
			 request.setAttribute("code", code);
			 
	         RequestDispatcher rd = request.getRequestDispatcher("InputPassword.jsp");
	         rd.forward(request, response);
	         
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
