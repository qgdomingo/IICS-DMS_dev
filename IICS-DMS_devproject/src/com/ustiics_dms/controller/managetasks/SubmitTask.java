package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.SessionChecking;


@WebServlet("/SubmitTask")
public class SubmitTask extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public SubmitTask() {
        super();

    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<FileItem> multifiles;
		response.setCharacterEncoding("UTF-8");
		
		try {
			multifiles = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

			int counter = 0;
			String[] tempStorage = new String[5];
			FileItem fileData = null;
			
			for(FileItem item : multifiles)
			{
				if (item.isFormField()) 
				{
	                String fieldname = item.getFieldName();
	                String fieldvalue = item.getString();
	                tempStorage[counter++] = item.getString();
	            } 
				else 
				{
	               fileData = item;
	            }
            }
			
			String documentTitle = tempStorage[0];
			String documentDescription = tempStorage[1];
			String id = tempStorage[2];
			String deadline = tempStorage[3];
			HttpSession session = request.getSession();
			
			Account acc = (Account)session.getAttribute("currentCredentials");
			
			ManageTasksFunctions.submitTask(documentTitle,  fileData, documentDescription, acc.getEmail(), id, deadline);
			
			//TODO: return new submitted task data to update row
			//ResultSet rsUpdatedTask = ManageTasksFunctions.getSpecificTask(acc.getEmail(), id);
			//List<String> updatedTask = new ArrayList<String>();
			
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("success");
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
