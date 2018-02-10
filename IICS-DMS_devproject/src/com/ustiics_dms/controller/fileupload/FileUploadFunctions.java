package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.databaseconnection.DBConnect;


public class FileUploadFunctions {
	
	public static void uploadPersonalDocument(String documentTitle, String category, FileItem item, String description, String fullName, String email) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO personal_documents (title, category, file_name, file_data, description, created_by, email) VALUES (?,?,?,?,?,?,?)");
			
			prep.setString(1, documentTitle);
			prep.setString(2, category);
			prep.setString(3, item.getName());//file name
			prep.setBinaryStream(4, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(5, description);
			prep.setString(6, fullName);
			prep.setString(7, email);
			
			prep.executeUpdate();
	}
	
	public static void uploadIncomingDocument(String referenceNo, String source, String documentTitle, String category, String actionRequired, FileItem item, String description, String fullName, String email) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO incoming_documents (reference_no, source, title, category, action_required, file_name, file_data, description, created_by, email) VALUES (?,?,?,?,?,?,?,?,?,?)");
			
			prep.setString(1, referenceNo);
			prep.setString(2, source);
			prep.setString(3, documentTitle);
			prep.setString(4, category);
			prep.setString(5, actionRequired);
			prep.setString(6, item.getName());//file name
			prep.setBinaryStream(7, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(8, description);
			prep.setString(9, fullName);
			prep.setString(10, email);
			
			prep.executeUpdate();
	}
	
	public static void uploadOutgoingDocument(String recipient, String documentTitle, String category, FileItem item, String description, String fullName, String email) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO outgoing_documents (recipient, title, category, file_name, file_data, description, created_by, email) VALUES (?,?,?,?,?,?,?,?)");
			
			prep.setString(1, recipient);
			prep.setString(2, documentTitle);
			prep.setString(3, category);
			prep.setString(4, item.getName());//file name
			prep.setBinaryStream(5, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(6, description);
			prep.setString(7, fullName);
			prep.setString(8, email);
			
			prep.executeUpdate();
	}

}
