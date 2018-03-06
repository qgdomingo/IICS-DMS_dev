package com.ustiics_dms.controller.sources;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/AddSource")
public class AddSource extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddSource() {
        super();

    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		try {	
			String source = request.getParameter("source");
			SourcesFunctions.addSource(source);
			
		    response.setContentType("text/plain");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write("success");
		    
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}



}
