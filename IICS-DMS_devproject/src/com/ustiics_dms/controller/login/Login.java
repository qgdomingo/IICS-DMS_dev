package com.ustiics_dms.controller.login;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.ustiics_dms.model.Account;

/*
 * Login.java
 *  - a servlet controller that would check if the credentials entered by the user is valid or not
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Login() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String email = request.getParameter("user_email");
		String password = request.getParameter("user_password");
		String redirectURL = "";
		
		response.setCharacterEncoding("UTF-8");
		
		try {
			if(LoginFunctions.authenticate(email, password) == true)//authenticates if username and password is valid
			{
				HttpSession session = request.getSession();
				session.setAttribute("currentCredentials", LoginFunctions.authorize(email));
				Account acc = (Account) session.getAttribute("currentCredentials");
				
				if(acc.getUserType().equalsIgnoreCase("Administrator")) 
				{
					redirectURL = "/admin/manageusers.jsp";
				} 
				else 
				{
					redirectURL = "/home.jsp"; 
				}
				
				Map<String, String> data = new HashMap<>();
				data.put("redirect", redirectURL);
				String json = new Gson().toJson(data);

				response.setContentType("application/json");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write(json);
			}	
			else 
			{
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("invalid");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
