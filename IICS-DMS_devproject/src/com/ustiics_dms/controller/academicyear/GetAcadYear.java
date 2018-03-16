package com.ustiics_dms.controller.academicyear;

import java.io.IOException;
import java.sql.ResultSet;
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

/**
 *  GetAcadYear.java
 *   - this controller is used to get the academic year configurations from the database
 */
@WebServlet("/getacademicyear")
public class GetAcadYear extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetAcadYear() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account)session.getAttribute("currentCredentials");

			ResultSet rs = (ResultSet) AcademicYearFunctions.getAcademicYear();
			List<String> acadyearConfig = new ArrayList<>();

			if(rs.next())
			{
				 acadyearConfig.add(Integer.toString(rs.getInt("start_year")));
				 acadyearConfig.add(Integer.toString(rs.getInt("end_year")));
			}
			String json = new Gson().toJson(acadyearConfig);

		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
		    response.getWriter().write(json);
		    
		} catch(Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
