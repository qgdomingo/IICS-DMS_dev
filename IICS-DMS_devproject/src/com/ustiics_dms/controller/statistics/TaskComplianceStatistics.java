package com.ustiics_dms.controller.statistics;

import java.io.IOException;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.controller.mail.MailFunctions;


@WebServlet("/TaskComplianceStatistics")
public class TaskComplianceStatistics extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TaskComplianceStatistics() {
        super();
       
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userType = request.getParameter("view_by");
		String email = request.getParameter("email");
		
		ResultSet user = StatisticsFunctions.getFromUserType(userType);
		while(user.next())
		{
			totalTasksReceived = StatisticsFunctions.
		}
		//
		while(rs.next())
		{
			totalTasksReceived = SELECT * FROM  tasks_assigned_to WHERE email = rs.getString("email") AND status = "On-Time Submission";
		}
		int complied =
		int lateComplied =
		int notComplied = 
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
