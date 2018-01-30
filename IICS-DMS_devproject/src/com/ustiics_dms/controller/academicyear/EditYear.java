package com.ustiics_dms.controller.academicyear;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class editYear
 */
@WebServlet("/editYear")
public class EditYear extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditYear() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		int yearEnd = Integer.parseInt(request.getParameter("year_to"));
		int yearStart = yearEnd - 1 ;
		String monthStart = request.getParameter("month_start");
		String monthEnd = request.getParameter("month_end");
		
		try {
			AcademicYearFunctions.updateYear(yearStart, monthStart, yearEnd, monthEnd);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
				RequestDispatcher dispatcher =
				getServletContext().getRequestDispatcher("/admin/acadyear.jsp");
				dispatcher.forward(request,response);
		
		
	}

}
