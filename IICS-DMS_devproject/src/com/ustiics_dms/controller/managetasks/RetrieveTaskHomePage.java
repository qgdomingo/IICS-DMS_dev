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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Task;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/RetrieveTaskHomePage")
public class RetrieveTaskHomePage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveTaskHomePage() {
        super();
        
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


		List<Task> task = new ArrayList<Task>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
		    
			ResultSet getTasks = (ResultSet) ManageTasksFunctions.getUnfinishedTasks(acc.getEmail());
			
			while(getTasks.next())
			{ 
				ResultSet tasksInfo = (ResultSet) ManageTasksFunctions.getTaskInfo(getTasks.getInt("id"));
				
				while(tasksInfo.next())
				{
					String assignedBy = tasksInfo.getString("assigned_by");
					task.add(new Task(
							tasksInfo.getString("title"),
							tasksInfo.getString("deadline"),
							tasksInfo.getString("category"),
							ManageTasksFunctions.getFullName(assignedBy),
							assignedBy
							 ));	
				}
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
