package com.ustiics_dms.controller.profile;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.login.LoginFunctions;
import com.ustiics_dms.controller.manageuser.ManageUserFunctions;
import com.ustiics_dms.model.Account;


@WebServlet("/EditUserProfile")
public class EditUserProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public EditUserProfile() {
        super();
        
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
		    
			String facultyNo = request.getParameter("faculty_no");
			String title = request.getParameter("title");
			String contactNumber = request.getParameter("cellphone_number");
			String firstName = request.getParameter("first_name");
			String lastName = request.getParameter("last_name");
			String email = request.getParameter("email");
			String password = request.getParameter("current_password");

			boolean authenticate = LoginFunctions.authenticate(acc.getEmail(), password);;
			if(authenticate)
			{
				if(!ManageUserFunctions.checkMail("email"))
				{
				ProfileFunctions.editUserProfile(facultyNo, title, contactNumber, firstName, lastName, email, acc.getEmail());

				session.setAttribute("currentCredentials", LoginFunctions.authorize(email));
				acc = (Account) session.getAttribute("currentCredentials");
				
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("success");
				}
				else
				{
					response.setContentType("text/plain");
					response.setStatus(HttpServletResponse.SC_OK);
					response.getWriter().write("existing email");
				}
			}
			else
			{
				response.setContentType("text/plain");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write("invalid password");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

}
