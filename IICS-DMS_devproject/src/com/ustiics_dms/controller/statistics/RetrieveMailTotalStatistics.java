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
import com.ustiics_dms.model.MailStatistics;
import com.ustiics_dms.model.SentMail;


@WebServlet("/RetrieveMailTotalStatistics")
public class RetrieveMailTotalStatistics extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveMailTotalStatistics() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
		    String viewBy = request.getParameter("view_by"); // example "Department", "Faculty", or "Staff"
			String source = request.getParameter("source"); // example "Information Systems", "coleensy@gmail.com"
			String year = request.getParameter("year"); // example "2017-2018"
			String json = null;
			
		    List<MailStatistics> departmentStats = new ArrayList<MailStatistics>(); // used for department
		    List<SentMail> facultyOrStaffStats = new ArrayList<SentMail>(); // used for staff or faculty
		    
			if(viewBy.equalsIgnoreCase("Faculty")||viewBy.equalsIgnoreCase("Staff"))
			{
				facultyOrStaffStats = StatisticsFunctions.getTotalMailPerPerson(source, year);
				json = new Gson().toJson(facultyOrStaffStats);
			}
			else if(viewBy.equalsIgnoreCase("Department"))
			{
				departmentStats = StatisticsFunctions.getTotalMailDepartment(source, year);
				json = new Gson().toJson(departmentStats);
			}
	
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
