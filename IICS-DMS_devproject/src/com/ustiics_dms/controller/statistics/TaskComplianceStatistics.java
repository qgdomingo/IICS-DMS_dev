package com.ustiics_dms.controller.statistics;

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

import com.ustiics_dms.controller.mail.MailFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.TaskStatistics;


@WebServlet("/TaskComplianceStatistics")
public class TaskComplianceStatistics extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TaskComplianceStatistics() {
        super();
       
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
				HttpSession session = request.getSession();
				Account acc = (Account)session.getAttribute("currentCredentials");
				
				String viewBy = "Department";//request.getParameter("view_by");
				String email =  //request.getParameter("email");
				String schoolYear = ManageTasksFunctions.getSchoolYear();
				
				int onTimeSubmission = 0;
				int lateSubmission = 0;
				int noSubmission = 0;
				
				if(viewBy.equalsIgnoreCase("Faculty"))
				{
					String email = 
					String department = acc.getDepartment();
					
				}
				else if(viewBy.equalsIgnoreCase("Staff"))
				{
					
				}
				else if(viewBy.equalsIgnoreCase("Department"))
				{
					String department = "Information Systems";//request.getParameter("department");
					
					
					ResultSet task = StatisticsFunctions.getTasksByDepartment(schoolYear, department);
					List <TaskStatistics> taskList = new ArrayList <TaskStatistics> ();
					while(task.next())
					{
						String taskName = task.getString("title");
						
						ResultSet status = StatisticsFunctions.getStatusByID(task.getString("id"));
						
						while(status.next())
						{
							String tempStatus = status.getString("status");
							
							if(tempStatus.equalsIgnoreCase("On-Time Submission"))
							{
								onTimeSubmission++;
							}
							else if(tempStatus.equalsIgnoreCase("Late Submission"))
							{
								lateSubmission++;
							}
							else if(tempStatus.equalsIgnoreCase("No Submission"))
							{
								noSubmission++;
							}
						}
						taskList.add(new TaskStatistics(
										taskName,
										onTimeSubmission,
										lateSubmission,
										noSubmission));
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
