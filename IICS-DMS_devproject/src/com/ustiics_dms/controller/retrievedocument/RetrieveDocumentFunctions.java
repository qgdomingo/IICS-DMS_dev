package com.ustiics_dms.controller.retrievedocument;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class RetrieveDocumentFunctions {
	
	public static ResultSet retrieveDocuments(String type, String departmentORemail) throws SQLException
	{
			String sqlStatement = null;
			if(type.equalsIgnoreCase("Incoming"))
			{
				sqlStatement = "SELECT id, type, thread_number, reference_no, source_recipient, title, category, action_required, file_name, description, created_by,"
						+ " email, status, time_created, due_on, department, note FROM incoming_documents WHERE department = ?";
			}
			else if(type.equalsIgnoreCase("Outgoing"))
			{
				sqlStatement = "SELECT type, id, thread_number, source_recipient, title, category, file_name, description, created_by, email, time_created, department"
						+ " FROM outgoing_documents WHERE department = ?";
			}
			else if(type.equalsIgnoreCase("Personal"))
			{
				sqlStatement = "SELECT type, id, title, category, file_name, description, created_by, email, time_created "
						+ "FROM personal_documents WHERE email = ?";
			}
			
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement(sqlStatement);
			prep.setString(1,  departmentORemail);
			
			ResultSet result = prep.executeQuery();
			
			return result;
	}
	
	public static ResultSet retrieveArchivedFolders() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, archive_title, status, archive_timestamp, academic_year FROM archived_folder");

			ResultSet result = prep.executeQuery();

			return result;
	}
		
	public static ResultSet retrieveArchivedDocuments(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, folder_id, type, source_recipient, title, category, file_name, description, uploaded_by, email, upload_date, department, reference_no, academic_year FROM archived_documents WHERE folder_id = ?");
			prep.setString(1, id);
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveEnabledArchivedDocuments(String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, folder_id, type, source_recipient, title, category, file_name, description, uploaded_by, email, upload_date, department, reference_no, academic_year "
					+ "FROM archived_documents WHERE folder_id IN (SELECT id FROM archived_folder WHERE status = ?) AND department = ?");
			prep.setString(1, "Enabled");
			prep.setString(2, department);
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveAllDocuments(String email, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement(
					"SELECT type, id, thread_number, source_recipient, title, category, file_name, description, created_by, email, time_created, reference_no, action_required, status, due_on, note FROM incoming_documents WHERE department = ? " + 
					"UNION" + 
					" SELECT type, id, thread_number, source_recipient, title, category, file_name, description, created_by, email, time_created, null, null, null, null, null  FROM outgoing_documents WHERE department = ? " + 
					"UNION" + 
					" SELECT type, id, null, null, title, category, file_name, description, created_by, email, time_created, null, null, null, null, null FROM personal_documents WHERE email = ? ORDER BY time_created DESC");
			
			prep.setString(1,  department);
			prep.setString(2,  department);
			prep.setString(3,  email);
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveThread(String threadNumber) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, type, thread_number, reference_no, source_recipient, title, category, action_required, file_name, description, created_by, email, status,  time_created, department, due_on, note  FROM incoming_documents WHERE thread_number = ?" + 
					" UNION " + 
					"SELECT id, type, thread_number, null, source_recipient, title, category, null, file_name, description, created_by, email, null, time_created, department, null, null  FROM outgoing_documents WHERE thread_number = ? ORDER BY time_created DESC");
			
			prep.setString(1,  threadNumber);
			prep.setString(2,  threadNumber);
			
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveIncomingThread(String source, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT thread_number, title, category, time_created FROM outgoing_documents "
					+ "WHERE source_recipient = ? AND department = ? ORDER BY time_created DESC");
			prep.setString(1, source);
			prep.setString(2, department);
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveSpecificIncoming(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM incoming_documents WHERE id = ?");
			prep.setString(1, id);
			ResultSet result = prep.executeQuery();

			return result;
	}
	


	public static ResultSet retrieveOutgoingThread(String source, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT thread_number, title, category, time_created FROM incoming_documents "
					+ "WHERE source_recipient = ? AND department = ? ORDER BY time_created DESC");
			prep.setString(1, source);
			prep.setString(2, department);
			ResultSet result = prep.executeQuery();

			return result;
	}

}
