package com.ustiics_dms.controller.statistics;

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
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.TaskStatistics;


@WebServlet("/PieChartTasksStatistics")
public class PieChartTasksStatistics extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public PieChartTasksStatistics() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
		    String viewBy = request.getParameter("view_scope"); // example "Department", "Faculty", or "Staff"
		    String source = "";  // example "Information Systems", "coleensy@gmail.com"
		    
		    if(viewBy.equalsIgnoreCase("Department")) {
		    	source = request.getParameter("department_selection");
		    }
		    else {
		    	source = request.getParameter("user_selection");
		    }

			String year = request.getParameter("view_academic_year"); // example "2017-2018"
			String json = null;
			
		    List<TaskStatistics> stats = new ArrayList<TaskStatistics>(); // used for department
		    
			if(viewBy.equalsIgnoreCase("Faculty")||viewBy.equalsIgnoreCase("Staff"))
			{
				stats = StatisticsFunctions.getTaskPieChartPerson(source, year);
				
			}
			else if(viewBy.equalsIgnoreCase("Department"))
			{
				stats = StatisticsFunctions.getTaskPieChartDepartment(source, year);
			}
			
			json = new Gson().toJson(stats);
			response.setCharacterEncoding("UTF-8");
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
