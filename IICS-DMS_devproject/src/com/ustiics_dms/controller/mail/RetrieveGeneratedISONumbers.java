package com.ustiics_dms.controller.mail;

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
import com.ustiics_dms.model.ISONumbers;
import com.ustiics_dms.model.Mail;
import com.ustiics_dms.utility.AesEncryption;


@WebServlet("/RetrieveGeneratedISONumbers")
public class RetrieveGeneratedISONumbers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveGeneratedISONumbers() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			HttpSession session = request.getSession();
		    Account acc = (Account) session.getAttribute("currentCredentials");
		    
			ResultSet rs = MailFunctions.getGeneratedISONumbers(acc.getDepartment());
			
			List <ISONumbers> isoNumbers = new ArrayList <ISONumbers> ();
			
		
				ResultSet isoInfo = MailFunctions.getGeneratedISONumbers(acc.getDepartment());
				while(isoInfo.next())
				{	
				isoNumbers.add(new ISONumbers(
						isoInfo.getString("iso_number"),
						isoInfo.getString("purpose"),
						isoInfo.getString("type"),
						isoInfo.getString("generated_by"),
						isoInfo.getString("department")
				));		
			}
			
			String json = new Gson().toJson(isoNumbers);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
	
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
