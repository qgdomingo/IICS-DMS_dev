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
						+ " email, status, time_created, due_on, department FROM incoming_documents WHERE department = ?";
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
			PreparedStatement prep = con.prepareStatement("SELECT type, id, reference_no, source_recipient, title, category, action_required, file_name, description, created_by, email, status,  time_created, department  FROM incoming_documents WHERE email = ? " + 
					"UNION" + 
					" SELECT type, id, reference_no, source_recipient, title, category, null, file_name, description, created_by, email, null, time_created, department  FROM outgoing_documents WHERE email = ? " + 
					"UNION" + 
					" SELECT type, id, null, null, title, category, null,  file_name, description, created_by, email, null, time_created , null FROM personal_documents WHERE email = ? ORDER BY time_created DESC");
			
			prep.setString(1,  email);
			prep.setString(2,  email);
			prep.setString(3,  email);
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveThread(String threadNumber) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, type, thread_number, reference_no, source_recipient, title, category, action_required, file_name, description, created_by, email, status,  time_created, department, due_on  FROM incoming_documents WHERE thread_number = ?" + 
					" UNION " + 
					"SELECT id, type, thread_number, null, source_recipient, title, category, null, file_name, description, created_by, email, null, time_created, department, null  FROM outgoing_documents WHERE thread_number = ? ORDER BY time_created DESC");
			
			prep.setString(1,  threadNumber);
			prep.setString(2,  threadNumber);
			
			ResultSet result = prep.executeQuery();

			return result;
	}
	
	public static ResultSet retrieveIncomingThread(String source, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT thread_number, title, category, time_created FROM outgoing_documents "
					+ "WHERE source_recipient = ? AND department = ? ");
			prep.setString(1, source);
			prep.setString(2, department);
			ResultSet result = prep.executeQuery();

			return result;
	}
	


	public static ResultSet retrieveOutgoingThread(String source, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT thread_number, title, category, time_created FROM incoming_documents "
					+ "WHERE source_recipient = ? AND department = ?");
			prep.setString(1, source);
			prep.setString(2, department);
			ResultSet result = prep.executeQuery();

			return result;
	}

}
