package com.ustiics_dms.utility;

import java.io.IOException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DatabaseContextServlet
 */
@WebServlet("/DatabaseContextServlet")
public class DatabaseContextServlet extends HttpServlet implements ServletContextListener {
	private static final long serialVersionUID = 1L;
       

    public DatabaseContextServlet() {
        super();

    }


    public void contextDestroyed(ServletContextEvent arg0)  { 

    }


    public void contextInitialized(ServletContextEvent arg0)  { 

    }




}
