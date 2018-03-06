package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
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
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/RetrieveSpecificTask")
public class RetrieveSpecificTask extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSpecificTask() {
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
		    String id = AesEncryption.decrypt(request.getParameter("id"));
			String email = "";
		    
		    if(!(request.getParameter("email") == null)) {
		    	email = request.getParameter("email");
		    }
		    else {
		    	email = acc.getEmail();
		    }
		    
			ResultSet specificTask = (ResultSet) ManageTasksFunctions.getSpecificTask(email, id);
			
			if(specificTask.next())
			{ 
				task.add(specificTask.getString("title"));	
				task.add(specificTask.getString("upload_date"));	
				task.add(specificTask.getString("status"));	
				task.add(specificTask.getString("file_name"));	
				task.add(specificTask.getString("description"));
				task.add(AesEncryption.encrypt(specificTask.getString("id")));	
				task.add(AesEncryption.encrypt(specificTask.getString("email")));	
				task.add( ManageTasksFunctions.getFullName(specificTask.getString("email")) );
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
