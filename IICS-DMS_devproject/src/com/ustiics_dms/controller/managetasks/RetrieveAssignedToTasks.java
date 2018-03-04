package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.model.AssignedToTask;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveAssignedToTasks")
public class RetrieveAssignedToTasks extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public RetrieveAssignedToTasks() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<AssignedToTask> task = new ArrayList<AssignedToTask>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			String id = AesEncryption.decrypt(request.getParameter("id"));
			ResultSet getTasks = (ResultSet) ManageTasksFunctions.getTask(id);
			
			while(getTasks.next())
			{
				task.add(new AssignedToTask(
						AesEncryption.encrypt(getTasks.getString("id")),
						getTasks.getString("name"),
						getTasks.getString("email"),
						getTasks.getString("title"),
						getTasks.getString("file_name"),
						getTasks.getString("description"),
						getTasks.getString("status"),
						getTasks.getString("upload_date")
						 ));	
			}
			
			String json = new Gson().toJson(task);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		    
		} catch(Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
