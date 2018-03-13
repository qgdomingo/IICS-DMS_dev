package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.ResultSet;
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
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Task;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/AddTask")
public class AddTask extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AddTask() {
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
			
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String title = request.getParameter("title");
			String deadline = request.getParameter("deadline");
			String category = request.getParameter("category");
			String instructions = request.getParameter("instructions");
			String email [] = request.getParameterValues("assigned_to");
			String assignedBy = acc.getEmail();
		
			
			ManageTasksFunctions.addTask(title, deadline, category, instructions, email, assignedBy);
			
			String description = acc.getFullName() +" assigned you a new task, " + title;
			NotificationFunctions.addNotification("Task Page", description, email);
			
			LogsFunctions.addLog("System", "New Task", acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment(), title);
			
			String id = Integer.toString(ManageTasksFunctions.getIncrement());

			ResultSet specificCreatedTask = (ResultSet) ManageTasksFunctions.getSpecificCreatedTask(id);
			
			if(specificCreatedTask.next()) {
				task.add(AesEncryption.encrypt(id));	
				task.add(specificCreatedTask.getString("title"));
				task.add(specificCreatedTask.getString("date_created"));	
				task.add(specificCreatedTask.getString("deadline"));
				task.add(specificCreatedTask.getString("category"));	
				task.add(specificCreatedTask.getString("status"));		
			 }	
			 
			String json = new Gson().toJson(task);
				
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(json);
		} 
		catch (SQLException e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

	}

}
