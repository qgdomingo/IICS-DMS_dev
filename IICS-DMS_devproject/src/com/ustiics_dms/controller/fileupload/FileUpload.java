package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.*;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.SessionChecking;



/**
 * Servlet implementation class FileUpload
 */
@WebServlet("/FileUpload")
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FileUpload() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<FileItem> multifiles;
		response.setCharacterEncoding("UTF-8");
		
		try {
			HttpSession session = request.getSession();
			Account acc = (Account)session.getAttribute("currentCredentials");
			multifiles = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

			int counter = 0;
			String[] tempStorage = new String[10];
			
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
			
			//used by all documents
			String documentType = tempStorage[0];
			String documentTitle = "";
			String category = "";
			String description = "";
			String fullName = acc.getFullName();
			
			//used by incoming and outgoing
			String threadNo = "";
			
			//used by incoming documents
			String documentSource = "";
			String referenceNo = "";
			String actionRequired = "";
			String actionDue = "";
			String returningReferenceNo = "";
			
			//used by outgoing documents
			String documentRecipient = "";
			
			if(documentType.equalsIgnoreCase("Personal"))
			{
				category = tempStorage[1];
				documentTitle = tempStorage[2];
				description = tempStorage[3];
				
				FileUploadFunctions.uploadPersonalDocument(documentTitle, category, fileData, description, fullName, acc.getEmail());
				
			}
			else if(documentType.equalsIgnoreCase("Incoming"))
			{
				category = tempStorage[1];
				documentSource = tempStorage[2];
				documentTitle = tempStorage[3];
				description = tempStorage[4];
				actionRequired = tempStorage[5];
				actionDue = tempStorage[6];
				referenceNo = tempStorage[7];
				threadNo = tempStorage[8];
				
				returningReferenceNo = FileUploadFunctions.uploadIncomingDocument(threadNo, referenceNo, documentSource, documentTitle, category, actionRequired, fileData, description, fullName, acc.getEmail(),acc.getDepartment(), actionDue);
				
				String des = ManageTasksFunctions.getFullName(acc.getEmail()) +" has uploaded a new incoming document, " + documentTitle;
				NotificationFunctions.addNotification("Incoming Documents Page", des, FileUploadFunctions.getGroupByDepartment(acc.getDepartment(), acc.getEmail()));
			}
			else if(documentType.equalsIgnoreCase("Outgoing"))
			{
				category = tempStorage[1];
				documentRecipient = tempStorage[2];
				documentTitle = tempStorage[3];
				description = tempStorage[4];
				threadNo = tempStorage[5];
				
				FileUploadFunctions.uploadOutgoingDocument(threadNo, documentRecipient, documentTitle, category, fileData, description, fullName, acc.getEmail(),acc.getDepartment());
				
				String des = ManageTasksFunctions.getFullName(acc.getEmail()) +" has uploaded a new outgoing document, " + documentTitle;
				NotificationFunctions.addNotification("Outgoing Documents Page", des, FileUploadFunctions.getGroupByDepartment(acc.getDepartment(), acc.getEmail()));
			}
				
			response.setContentType("text/plain");
			response.setStatus(HttpServletResponse.SC_OK);
			
			if(documentType.equalsIgnoreCase("Incoming")) {
				response.getWriter().write(returningReferenceNo);
			} 
			else {
				response.getWriter().write("success upload");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		} 
	}

}
