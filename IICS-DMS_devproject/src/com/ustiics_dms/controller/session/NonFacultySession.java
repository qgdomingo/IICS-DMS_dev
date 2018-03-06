package com.ustiics_dms.controller.session;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.model.Account;

@WebServlet("/checknonfacultysession")
public class NonFacultySession extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public NonFacultySession() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain");
		
		if(request.getSession(false) == null || request.getSession(false).getAttribute("currentCredentials") == null) {
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("not logged in");
		} else {
			HttpSession session = request.getSession(false);
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			if( (acc.getUserType().equalsIgnoreCase("Administrator")) ) {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("admin");
			} 
			else if ((acc.getUserType().equalsIgnoreCase("Faculty")) ) {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("faculty");
			}
			else {
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("authorized");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
