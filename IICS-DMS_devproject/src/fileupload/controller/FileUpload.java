package fileupload.controller;

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

import model.Account;



/**
 * Servlet implementation class FileUpload
 */
@WebServlet("/FileUpload")
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileUpload() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		List<FileItem> multifiles;
		try {
			multifiles = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

			int counter = 0;
			String[] tempStorage = new String[6];
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
			
			String documentType = tempStorage[0];
			String documentTitle = tempStorage[1];
			String category = tempStorage[2];
			String description = tempStorage[3];
            
			HttpSession session = request.getSession();
			
			Account acc = (Account)session.getAttribute("currentCredentials");
			String fullName = acc.getFirstName() + " " + acc.getLastName();
			
			FileUploadFunctions.uploadDocument(documentType, documentTitle, category, fileData, description, fullName);
				
				
			} catch (FileUploadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		

		
		
	}

}
