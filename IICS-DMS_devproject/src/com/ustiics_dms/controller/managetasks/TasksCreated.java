package com.ustiics_dms.controller.managetasks;

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
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.retrievedocument.RetrieveDocumentFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Document;
import com.ustiics_dms.model.Task;


@WebServlet("/TasksCreated")
public class TasksCreated extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public TasksCreated() {
        super();

    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Task> task = new ArrayList<Task>();
		response.setCharacterEncoding("UTF-8");
		
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet tasksCreated = (ResultSet) ManageTasksFunctions.getTasksCreated(acc.getEmail());
			
			while(tasksCreated.next())
			{ 
				task.add(new Task(
						tasksCreated.getString("id"),
						tasksCreated.getString("title"),
						tasksCreated.getString("deadline"),
						tasksCreated.getString("category"),
						tasksCreated.getString("instructions"),
						tasksCreated.getString("status"),
						tasksCreated.getString("assigned_by"),
						tasksCreated.getString("date_created")
						 ));	
			}
			String json = new Gson().toJson(task);
			
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
