package com.ustiics_dms.controller.fileupload;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.controller.retrievedocument.RetrieveDocumentFunctions;
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
	
	public static String uploadIncomingDocument(String threadNumber, String referenceNo, String source, String documentTitle, String category, String actionRequired, FileItem item, String description, String fullName, String email, String department, String actionDue) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();

			String statement = "INSERT INTO incoming_documents (thread_number, reference_no, source_recipient, title, category, action_required, file_name, file_data, description, created_by, email, department, due_on) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			
			if(actionRequired.equalsIgnoreCase("None")||actionRequired.equalsIgnoreCase("For Dissemination"))
			{
				statement = "INSERT INTO incoming_documents (thread_number, reference_no, source_recipient, title, category, action_required, file_name, file_data, description, created_by, email, department) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";		
			}
			
			if(threadNumber.isEmpty())
			{
				threadNumber = Integer.toString(getThreadCounter());
			}
			
			String returningReferenceNo = getReferenceNo(source) + referenceNo;
			
			PreparedStatement prep = con.prepareStatement(statement);
			prep.setString(1, threadNumber);
			prep.setString(2, returningReferenceNo);
			prep.setString(3, source);
			prep.setString(4, documentTitle);
			prep.setString(5, category);
			prep.setString(6, actionRequired);
			prep.setString(7, item.getName());//file name
			prep.setBinaryStream(8, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(9, description);
			prep.setString(10, fullName);
			prep.setString(11, email);
			prep.setString(12, department);
			
			if(!actionRequired.equalsIgnoreCase("None")&&!actionRequired.equalsIgnoreCase("For Dissemination"))
			{
				prep.setString(13, actionDue);
			}
			
			prep.executeUpdate();
			
			return returningReferenceNo;
	}
	
	public static void uploadOutgoingDocument(String threadNumber, String recipient, String documentTitle, String category, FileItem item, String description, String fullName, String email, String department) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO outgoing_documents (thread_number, source_recipient, title, category, file_name, file_data, description, created_by, email, department) VALUES (?,?,?,?,?,?,?,?,?,?)");
			
			if(threadNumber.isEmpty())
			{
				threadNumber = Integer.toString(getThreadCounter());
			}
			
			prep.setString(1, threadNumber);
			prep.setString(2, recipient);
			prep.setString(3, documentTitle);
			prep.setString(4, category);
			prep.setString(5, item.getName());//file name
			prep.setBinaryStream(6, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(7, description);
			prep.setString(8, fullName);
			prep.setString(9, email);
			prep.setString(10, department);
			
			prep.executeUpdate();
	}

	public static String getReferenceNo(String source) throws SQLException
	{
			String referenceNo = getAcadYear();
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT default_reference FROM sources_list WHERE sources_name = ?");
			prep.setString(1, source);	
			
			ResultSet rs = prep.executeQuery();

			if (rs.isBeforeFirst())
			{
				prep = con.prepareStatement("SELECT default_reference FROM sources_list WHERE sources_name = ?");
				rs.next();
				referenceNo += rs.getString("default_reference");
				return referenceNo;
			}
			
			prep = con.prepareStatement("SELECT default_reference, counter FROM external_list WHERE sources_name = ?");
			prep.setString(1, source);
			rs = prep.executeQuery();

			//if source does not exist in column sources_name, generates a row and labeled as external
			if (!rs.isBeforeFirst())
			{
				referenceNo += addExternalSource(source);
			}
			else
			{	
				rs.next();
				int updatedCounter = rs.getInt("counter") + 1;

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
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year WHERE status = ?");
			prep.setString(1, "Current");

			ResultSet rs = prep.executeQuery();
			
			rs.next();
			
			String start = rs.getString("start_year").substring(2);
			String end = rs.getString("end_year").substring(2);
			String year = start + "-" + end + "-";
			return year;
	}
	
	public static int getThreadCounter() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT counter FROM thread_number WHERE type = 'documents'");
			

			ResultSet rs = prep.executeQuery();
			
			rs.next();
			
			int counter = rs.getInt("counter") + 1;
			incrementThreadCounter(counter);
			return counter;
	}
	
	public static void incrementThreadCounter(int counter) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE thread_number SET counter = ? WHERE type = 'documents'");
			
			prep.setInt(1, counter);

			prep.executeUpdate();

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
	
	public static String [] getGroupByDepartment(String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null;
			if(department.equalsIgnoreCase("IICS"))
			{
				sqlStatement = "SELECT email FROM accounts WHERE department = ?";
			}
			else
			{
				sqlStatement = "SELECT email FROM accounts WHERE department = ? AND user_type = ?";
			}
			PreparedStatement prep = con.prepareStatement(sqlStatement);
			
			prep.setString(1, department);
			
			if(!department.equalsIgnoreCase("IICS"))
			{
				prep.setString(2, "Department Head");
			}

			ResultSet rs = prep.executeQuery();
			
			String emailList = "";
			
			while(rs.next())
			{
				emailList += rs.getString("email") + ",";
			}
			
			String list [] = emailList.split(",");
			
			return list;
	}
	
	public static String getGroupHead(String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null;
			if(department.equalsIgnoreCase("IICS"))
			{
				sqlStatement = "SELECT email FROM accounts WHERE department = ?";
			}
			else
			{
				sqlStatement = "SELECT email FROM accounts WHERE department = ? AND user_type = ?";
			}
			PreparedStatement prep = con.prepareStatement(sqlStatement);
			
			prep.setString(1, department);
			
			if(!department.equalsIgnoreCase("IICS"))
			{
				prep.setString(2, "Department Head");
			}

			ResultSet rs = prep.executeQuery();
			
			String email = "";
			
			rs.next();
			
			email = rs.getString("email");
			
			
			String name = ManageTasksFunctions.getFullName(email);
			
			return name;
	}
	
	public static void addNote(String id, String note,String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE incoming_documents SET note = ? WHERE id = ?");
			
			prep.setString(1, note);
			prep.setString(2, id);

			prep.executeUpdate();
			
			ResultSet info = RetrieveDocumentFunctions.retrieveSpecificIncoming(id);
			
			if(info.next())
			{
				String title = info.getString("title");
				String department = info.getString("department");
				
				String des = title + "‘s note has been updated by " + ManageTasksFunctions.getFullName(email);
				NotificationFunctions.addNotification("Outgoing Documents Page", des, FileUploadFunctions.getGroupByDepartment(department));
			}
	}
	
	public static String getIncomingDocTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM incoming_documents WHERE id = ?");
		
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		String title = "";
		if(rs.next())
		{
			title = rs.getString("title");
		}
		
		return title;
			
	}
	public static void markAsDone(String id, String type, String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE incoming_documents SET status = ? WHERE id = ? AND type = ?");
			
			prep.setString(1, "Done");
			prep.setString(2, id);
			prep.setString(3, type);

			prep.executeUpdate();
			
			ResultSet info = RetrieveDocumentFunctions.retrieveSpecificIncoming(id);
			info.next();
			String title = info.getString("title");
			String department = info.getString("department");
			
			String des = title + " has been marked as done by  " + ManageTasksFunctions.getFullName(email);
			NotificationFunctions.addNotification("Outgoing Documents Page", des, FileUploadFunctions.getGroupByDepartment(department));
	}

}
