package com.ustiics_dms.controller.logs;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Log;

@WebServlet("/RetrieveLogs")
public class RetrieveLogs extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveLogs() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Log> logs = new ArrayList<Log>();
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet logsRS = (ResultSet) LogsFunctions.getLogs();
			
			while(logsRS.next())
			{ 
				logs.add(new Log(
						logsRS.getString("timestamp"),
						logsRS.getString("type"),
						logsRS.getString("information"),
						logsRS.getString("user"),
						logsRS.getString("user_type"),
						logsRS.getString("department")
						));
			}
			String json = new Gson().toJson(logs);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
