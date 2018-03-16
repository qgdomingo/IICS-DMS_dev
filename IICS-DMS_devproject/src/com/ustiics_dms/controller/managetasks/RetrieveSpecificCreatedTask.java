package com.ustiics_dms.controller.managetasks;

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
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveSpecificCreatedTask")
public class RetrieveSpecificCreatedTask extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSpecificCreatedTask() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<String> task = new ArrayList<String>();
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account)session.getAttribute("currentCredentials");
			
			 String id = AesEncryption.decrypt(request.getParameter("id"));
			 ResultSet specificCreatedTask = (ResultSet) ManageTasksFunctions.getSpecificCreatedTask(id);
			 
			 if(specificCreatedTask.next()) {
				task.add(specificCreatedTask.getString("title"));	
				task.add(specificCreatedTask.getString("category"));
				task.add(specificCreatedTask.getString("date_created"));	
				task.add(specificCreatedTask.getString("status"));
				task.add(specificCreatedTask.getString("deadline"));	
				task.add(specificCreatedTask.getString("instructions"));	
				task.add(specificCreatedTask.getString("school_year"));		
			 }
			 
			 String json = new Gson().toJson(task);
				
			 response.setContentType("application/json");
			 response.setStatus(HttpServletResponse.SC_OK);
			 response.getWriter().write(json);
			 
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
