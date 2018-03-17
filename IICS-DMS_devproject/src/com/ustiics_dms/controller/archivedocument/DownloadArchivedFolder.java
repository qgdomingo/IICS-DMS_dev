package com.ustiics_dms.controller.archivedocument;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.controller.filedownload.FileDownloadFunctions;
import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;

@WebServlet("/DownloadArchivedFolder")
public class DownloadArchivedFolder extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DownloadArchivedFolder() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Account acc = (Account)session.getAttribute("currentCredentials");
		try {

			
			int id = Integer.parseInt(AesEncryption.decrypt(request.getParameter("id")));
			String stringId = AesEncryption.decrypt(request.getParameter("id"));
			List <File> file = ArchiveDocumentFunctions.getBinaryStream(id);

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			ZipOutputStream zip = new ZipOutputStream(out);
			for(File f : file)
			{
				ZipEntry ze = new ZipEntry(f.getFileName());
	        	zip.putNextEntry(ze);
	        	InputStream in = f.getDataStream();
	        	
	        	int len;
	        	byte[] buffer = new byte[1024];
	        	
	    		while ((len = in.read(buffer)) > 0) {
	    			zip.write(buffer, 0, len);
	    		}
	
	    		in.close();
	    		zip.closeEntry();
			}
    		zip.finish();
    		zip.close();
    		
    		InputStream is = new ByteArrayInputStream(out.toByteArray());
    		int length = is.available();
    		
			String contentType = this.getServletContext().getMimeType(ArchiveDocumentFunctions.getArchiveFolderName(stringId) + ".zip");
			 
			response.setHeader("Content-Type", contentType);
			 
	        response.setHeader("Content-Length", String.valueOf(length));
	 
	        response.setHeader("Content-Disposition", "inline; filename=\"" + ArchiveDocumentFunctions.getArchiveFolderName(stringId) + ".zip"+ "\"");
		
	        byte[] bytes = new byte[1024];
	        int bytesRead;
	
	        while ((bytesRead = is.read(bytes)) != -1) 
	        {
	        	 // Write image data to Response.
	            response.getOutputStream().write(bytes, 0, bytesRead);
	        }
	         
		} catch (Exception e) {
			try {
				LogsFunctions.addErrorLog(e.getMessage(), acc.getEmail(), acc.getFullName(), acc.getUserType(), acc.getDepartment());
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
