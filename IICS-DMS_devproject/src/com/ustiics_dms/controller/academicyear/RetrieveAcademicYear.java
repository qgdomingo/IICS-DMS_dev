package com.ustiics_dms.controller.academicyear;

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

@WebServlet("/RetrieveAcademicYear")
public class RetrieveAcademicYear extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveAcademicYear() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<String> yearList = new ArrayList<String>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
	
			ResultSet year = (ResultSet) AcademicYearFunctions.getAllAcademicYear();
			
			while(year.next())
			{ 
				String tempYear = year.getString("start_year") + "-" + year.getString("end_year");
				yearList.add(new String(tempYear));	
			}
			
			String json = new Gson().toJson(yearList);
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
