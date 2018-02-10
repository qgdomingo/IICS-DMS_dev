package com.ustiics_dms.controller.filedownload;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.utility.AesEncryption;
import com.ustiics_dms.model.File;
public class FileDownloadFunctions {
	
	public static File getFile (int id) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			if

	       PreparedStatement prep = con.prepareStatement("SELECT *FROM documents WHERE id = ?");
	       prep.setInt(1, id);
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           String fileName = rs.getString("file_name");
	           Blob fileData = rs.getBlob("file_data");
	           String description = rs.getString("Description");

	           return new File(id, fileName, fileData, description);
	       }
	       return null;
	}
	
	public static ResultSet viewFiles() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM documents");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	


}
