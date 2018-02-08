package com.ustiics_dms.controller.academicyear;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ustiics_dms.utility.SessionChecking;

/**
 *  EditYear.java
 *   - this controller is used to get user input and update the academic year configurations in the database
 */
@WebServlet("/EditYear")
public class EditYear extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EditYear() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int yearEnd = Integer.parseInt(request.getParameter("year_to"));
		int yearStart = Integer.parseInt(request.getParameter("year_from"));
		String monthStart = request.getParameter("month_start");
		String monthEnd = request.getParameter("month_end");
		
		try {
			AcademicYearFunctions.updateYear(yearStart, monthStart, yearEnd, monthEnd);
			
			response.setContentType("text/html");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

}
