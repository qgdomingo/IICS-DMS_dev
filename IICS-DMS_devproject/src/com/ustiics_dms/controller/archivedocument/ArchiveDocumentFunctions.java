package com.ustiics_dms.controller.archivedocument;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class ArchiveDocumentFunctions
{
	
	public static void transferToArchived() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO archived_documents (type, title, category, file_name, file_data, description, created_by, academic_year) VALUES (?,?,?,?,?,?,?,?)");
			
			ResultSet currentDocuments = getCurrentDocuments();
			
			String academicYear = getAcademicYear();
			
			while(currentDocuments.next())
		    {
				Blob tempBlob = currentDocuments.getBlob("file_data");
				prep.setString(1, currentDocuments.getString("type"));
				prep.setString(2, currentDocuments.getString("title"));
				prep.setString(3, currentDocuments.getString("category"));
				prep.setString(4, currentDocuments.getString("file_name"));//file name
				prep.setBinaryStream(5, tempBlob.getBinaryStream(),(int) tempBlob.length());//file data 
				prep.setString(6, currentDocuments.getString("description"));
				prep.setString(7, currentDocuments.getString("created_by"));
				prep.setString(8, academicYear);
				prep.executeUpdate();
		    }
			
			deleteCurrentDocuments();
			
			
	}
	
	private static ResultSet getCurrentDocuments() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM documents");

			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	private static String getAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM academic_year");

			ResultSet rs = prep.executeQuery();
			rs.next();
			
			String academicYear = "";
			academicYear += rs.getString("start_month") + " ";
			academicYear += rs.getString("start_year") +"-";
			academicYear += rs.getString("end_month") + " ";
			academicYear += rs.getString("end_year");

			return academicYear;
	}
	
	private static void deleteCurrentDocuments() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("DELETE FROM documents");

			prep.executeUpdate();
			
	}

}
