package com.ustiics_dms.controller.directory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.GroupList;

@WebServlet("/RetrieveExternalTo")
public class RetrieveExternalTo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveExternalTo() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<GroupList> users = new ArrayList<GroupList>();
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet groupRS = (ResultSet) RetrieveUsersFunctions.retrieveExternalTo();

			while(groupRS.next()) { 
				users.add(new GroupList(groupRS.getString("group_name"),
										groupRS.getString("first_name"),
										groupRS.getString("last_name"),
										groupRS.getString("email"))
						 );	
			}
			String json = new Gson().toJson(users);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
