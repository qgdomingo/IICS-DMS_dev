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
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.Task;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/AssignedTask")
public class AssignedTask extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AssignedTask() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<Task> task = new ArrayList<Task>();
	    response.setCharacterEncoding("UTF-8");
		
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
	    
		try {
		    
			ResultSet getTasks = (ResultSet) ManageTasksFunctions.getTaskAssigned(acc.getEmail());
			
			while(getTasks.next())
			{ 
				ResultSet tasksInfo = (ResultSet) ManageTasksFunctions.getTaskInfo(getTasks.getInt("id"));
				
				while(tasksInfo.next())
				{
					task.add(new Task(
							AesEncryption.encrypt(tasksInfo.getString("id")),
							tasksInfo.getString("title"),
							tasksInfo.getString("deadline"),
							tasksInfo.getString("category"),
							tasksInfo.getString("instructions"),
							getTasks.getString("status"),
							ManageTasksFunctions.getFullName(tasksInfo.getString("assigned_by")),
							tasksInfo.getString("date_created"),
							tasksInfo.getString("school_year")
							 ));	
				}
			}
			
			String json = new Gson().toJson(task);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		    
		} catch (SQLException e) {
			try {
				LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
