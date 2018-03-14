package com.ustiics_dms.controller.filedownload;

import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;

public class FileDownloadFunctions {
	
	public static File getFile (int id, String type) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null;
			
			if(type.equalsIgnoreCase("Personal"))
			{
				sqlStatement = "SELECT * FROM personal_documents WHERE id = ?";
			}
			else if(type.equalsIgnoreCase("Incoming"))
			{
				sqlStatement = "SELECT * FROM incoming_documents WHERE id = ?";
			}
			else if(type.equalsIgnoreCase("Outgoing"))
			{
				sqlStatement = "SELECT * FROM outgoing_documents WHERE id = ?";
			}

	       PreparedStatement prep = con.prepareStatement(sqlStatement);
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           String fileName = rs.getString("file_name");
	           Blob fileData = rs.getBlob("file_data");
	           InputStream fileStream = rs.getBinaryStream("file_data");
	           String description = rs.getString("description");

	           return new File(id, fileName, fileData, fileStream, description);
	       }
	       return null;
	}
	
	public static String checkSum (int id, String type) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null;
			
			if(type.equalsIgnoreCase("Personal"))
			{
				sqlStatement = "SELECT checksum FROM personal_documents WHERE id = ?";
			}
			else if(type.equalsIgnoreCase("Incoming"))
			{
				sqlStatement = "SELECT checksum FROM incoming_documents WHERE id = ?";
			}
			else if(type.equalsIgnoreCase("Outgoing"))
			{
				sqlStatement = "SELECT checksum FROM outgoing_documents WHERE id = ?";
			}

	       PreparedStatement prep = con.prepareStatement(sqlStatement);
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           return rs.getString("checksum");
	       }
	       return null;
	}
	
	public static ResultSet viewFiles() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, type, title, category, file_name, description, created_by, email, time_created  FROM incoming_documents" + 
					" UNION " + 
					"SELECT id, type, title, category, file_name, description, created_by, email, time_created FROM outgoing_documents" + 
					" UNION " + 
					"SELECT id, type, title, category, file_name, description, created_by, email, time_created  FROM personal_documents");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	


}
