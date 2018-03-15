package com.ustiics_dms.controller.sources;

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
import com.ustiics_dms.model.Mail;
import com.ustiics_dms.model.Sources;


@WebServlet("/RetrieveSource")
public class RetrieveSource extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RetrieveSource() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		List<Sources> sources = new ArrayList<Sources>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet source = (ResultSet) SourcesFunctions.getSourcesList();
			
			while(source.next())
			{
				sources.add(new Sources(
						source.getString("sources_name"),
						source.getString("default_reference")
						 ));		
			}
			String json = new Gson().toJson(sources);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}




}
