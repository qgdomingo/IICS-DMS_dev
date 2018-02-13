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


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		try {
			
			String source = request.getParameter("source");
		
			SourcesFunctions.addSource(source);
			
			
		} catch (Exception e) {

			e.printStackTrace();
		}
	}



}
