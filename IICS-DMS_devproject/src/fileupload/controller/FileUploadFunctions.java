package fileupload.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.commons.fileupload.FileItem;

import databaseConnection.DBConnect;


public class FileUploadFunctions {
	
	public static void uploadDocument( String documentType, String documentTitle, String category, FileItem item, String description, String fullName) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Insert into documents (type, title, category, file_name, file_data, description, created_by) values (?,?,?,?,?,?,?)");
			
			prep.setString(1, documentType);
			prep.setString(2, documentTitle);
			prep.setString(3, category);
			prep.setString(4, item.getName());//file name
			prep.setBinaryStream(5, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(6, description);
			prep.setString(7, fullName);

			prep.executeUpdate();
	}

}
