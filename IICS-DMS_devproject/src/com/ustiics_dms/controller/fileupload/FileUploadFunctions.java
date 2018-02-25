package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
	
	public static void uploadIncomingDocument(String referenceNo, String source, String documentTitle, String category, String actionRequired, FileItem item, String description, String fullName, String email, String department) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO incoming_documents (reference_no, source_recipient, title, category, action_required, file_name, file_data, description, created_by, email, department) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
			
			prep.setString(1, getReferenceNo(source) + referenceNo);
			prep.setString(2, source);
			prep.setString(3, documentTitle);
			prep.setString(4, category);
			prep.setString(5, actionRequired);
			prep.setString(6, item.getName());//file name
			prep.setBinaryStream(7, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(8, description);
			prep.setString(9, fullName);
			prep.setString(10, email);
			prep.setString(11, department);
			
			prep.executeUpdate();
	}
	
	public static void uploadOutgoingDocument(String recipient, String documentTitle, String category, FileItem item, String description, String fullName, String email, String department) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO outgoing_documents (source_recipient, title, category, file_name, file_data, description, created_by, email, department) VALUES (?,?,?,?,?,?,?,?,?)");
			
			prep.setString(1, recipient);
			prep.setString(2, documentTitle);
			prep.setString(3, category);
			prep.setString(4, item.getName());//file name
			prep.setBinaryStream(5, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(6, description);
			prep.setString(7, fullName);
			prep.setString(8, email);
			prep.setString(9, department);
			
			prep.executeUpdate();
	}

	public static String getReferenceNo(String source) throws SQLException
	{
			String referenceNo = getAcadYear();
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT default_reference, null FROM sources_list WHERE sources_name = ?" +
					" UNION " 
					+ "SELECT default_reference, counter FROM external_list WHERE sources_name = ?");
			
			prep.setString(1, source);
			prep.setString(2, source);

			ResultSet rs = prep.executeQuery();
			
					
			//if source does not exist in column sources_name, generates a row and labeled as external

			if (!rs.isBeforeFirst())
			{
				referenceNo += addExternalSource(source);
			}
			else
			{
				
				rs.next();
				int updatedCounter = rs.getInt("null") + 1;
				
				referenceNo += rs.getString("default_reference");
				referenceNo += appendZeroes(updatedCounter) + updatedCounter;
				updateCounter(source, updatedCounter);
			}
			return referenceNo;
	}
	
	public static void updateCounter(String source, int updatedCounter) throws SQLException
	{

		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE external_list SET counter = ? WHERE sources_name = ?");
		prep.setInt(1, updatedCounter);
		prep.setString(2, source);
		
		prep.executeUpdate();
	}
	public static String addExternalSource(String source) throws SQLException
	{
			String defaultReference = "EXT:"+ appendZeroes(getIncrement()) + getIncrement() + "-";
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO external_list (sources_name, default_reference) VALUES (?,?)");
			
			prep.setString(1, source);
			prep.setString(2, defaultReference);
			
			prep.executeUpdate();
			
			return defaultReference;
	}
	
	public static int getIncrement() throws SQLException
	{
			int rows = 1;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT COUNT(sources_name) FROM external_list");
			

			ResultSet rs = prep.executeQuery();
			rs.next();
			rows += rs.getInt("COUNT(sources_name)");
			
			return rows;
	}
	
	public static String getAcadYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year");
			

			ResultSet rs = prep.executeQuery();
			
			rs.next();
			
			String start = rs.getString("start_year").substring(2);
			String end = rs.getString("end_year").substring(2);
			String year = start + "-" + end + "-";
			return year;
	}
	
	public static String appendZeroes(int word)
	{
			int zeroes = 4 - String.valueOf(word).length();
			String append = "";
			for(int ct = 0 ; ct < zeroes ; ct ++)
			{
				append += "0";
			}
			
			return append;
	}
}
