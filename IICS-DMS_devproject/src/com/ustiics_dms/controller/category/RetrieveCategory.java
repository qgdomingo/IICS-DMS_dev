package com.ustiics_dms.controller.category;

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


@WebServlet("/RetrieveCategory")
public class RetrieveCategory extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveCategory() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<String> category = new ArrayList<String>();
	    response.setCharacterEncoding("UTF-8");
		
		try {
			
		    HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
			
			ResultSet categoryList = (ResultSet) CategoryFunctions.getCategoryList();
			
			while(categoryList.next())
			{
				category.add(categoryList.getString("category_name"));		
			}
			String json = new Gson().toJson(category);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}




}
