package com.ustiics_dms.controller.retrievedocument;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class RetrieveDocumentFunctions {
	
	public static ResultSet retrieveDocuments(String type, String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM documents WHERE type = ? AND email = ?");
			prep.setString(1,  type);
			prep.setString(2,  email);
			
			ResultSet result = prep.executeQuery();
			
			return result;
	}
	
	public static ResultSet retrieveArchivedDocuments() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM archived_documents");

			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveAllDocuments(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM documents WHERE email = ?");
			prep.setString(1,  email);
			
			ResultSet result = prep.executeQuery();

			return result;
	}
	

	
	


}
