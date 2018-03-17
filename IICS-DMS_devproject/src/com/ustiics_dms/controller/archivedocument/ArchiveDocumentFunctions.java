package com.ustiics_dms.controller.archivedocument;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;

public class ArchiveDocumentFunctions
{
	
	public static void transferToArchived() throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			
			int counter = getArchiveFolderCounter();
			
			createFolder();
			PreparedStatement prep = con.prepareStatement("INSERT INTO archived_documents (folder_id, type, source_recipient, title, "
					+ "category, file_name, file_data, checksum, description, uploaded_by, email, upload_date, department, reference_no,"
					+ " academic_year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			
			ResultSet currentDocuments = getCurrentDocuments();
			
			
			
			String academicYear = getAcademicYear();
			
			while(currentDocuments.next())
		    {
				String type = currentDocuments.getString("type");
				
				String refValue = "N/A";
				
				if(type.equals("Incoming"))
				{
					refValue = currentDocuments.getString("reference_no");
				}
				
				Blob tempBlob = currentDocuments.getBlob("file_data");
				String md5 = org.apache.commons.codec.digest.DigestUtils.md5Hex(tempBlob.getBinaryStream());
				prep.setInt(1, counter);
				prep.setString(2, type);
				prep.setString(3, currentDocuments.getString("source_recipient"));
				prep.setString(4, currentDocuments.getString("title"));
				prep.setString(5, currentDocuments.getString("category"));
				prep.setString(6, currentDocuments.getString("file_name"));
				prep.setBinaryStream(7, tempBlob.getBinaryStream(),(int) tempBlob.length());
				prep.setString(8, md5);
				prep.setString(9, currentDocuments.getString("description"));
				prep.setString(10, currentDocuments.getString("created_by"));
				prep.setString(11, currentDocuments.getString("email"));
				prep.setString(12, currentDocuments.getString("time_created"));
				prep.setString(13, currentDocuments.getString("department"));
				prep.setString(14, refValue);
				prep.setString(15, academicYear);
				
				prep.executeUpdate();
				
		    }
	
			
			deleteCurrentDocuments();
	}
	
	private static ResultSet getCurrentDocuments() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement(
					"SELECT type, source_recipient, title, category, file_name, file_data, description, created_by, email, "
					+ "time_created, department, reference_no FROM incoming_documents"
					+ " UNION "
					+ "SELECT type, source_recipient, title, category, file_name, file_data, description, created_by, email, "
					+ "time_created, department, null FROM outgoing_documents ORDER BY time_created DESC" );

			ResultSet rs = prep.executeQuery();
			return rs;
	}
	
	private static String getAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM academic_year WHERE status = ?");
			prep.setString(1, "Current");

			ResultSet rs = prep.executeQuery();
			String year = "";
			if(rs.next())
			{
				year = rs.getString("start_year") + "-" + rs.getString("end_year");
				rs.close();
				prep.close();
			}

			return year;
	}
	
	private static void deleteCurrentDocuments() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("DELETE FROM incoming_documents");

			prep.executeUpdate();
			
			prep = con.prepareStatement("DELETE FROM outgoing_documents");
			
			prep.executeUpdate();
			
			prep.close();
	}
	
	private static void createFolder() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("INSERT INTO archived_folder (archive_title, academic_year) VALUES (?,?)");
			
			String year = getAcadYear();
			int counter = getArchiveFolderCounter();
			String zeroes = appendZeroes(counter);
			
			String title = "ARCHIVE" + zeroes + counter + "_AY" + year;
			//ARCHIVE001_AY17-18
			prep.setString(1, title);
			prep.setString(2, getAcademicYear());
			
			prep.executeUpdate();
			
			prep.close();
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
			String year = start + "-" + end;
			
			rs.close();
			prep.close();
			
			return year;
	}
	
	public static String appendZeroes(int word)
	{
			int zeroes = 3 - String.valueOf(word).length();
			String append = "";
			for(int ct = 0 ; ct < zeroes ; ct ++)
			{
				append += "0";
			}
			
			return append;
	}
	
	private static int getArchiveFolderCounter() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("SELECT COUNT(*) FROM archived_folder WHERE academic_year = ?");
			prep.setString(1, getAcademicYear());

			ResultSet rs = prep.executeQuery();
			
			int counter = 0;
			if(rs.next())
			{
				counter = rs.getInt("COUNT(*)") + 1;
			}
			
			rs.close();
			prep.close();
			
			return counter;
	}
	
	public static void updateArchiveDate(String timestamp) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("INSERT INTO archive_date(date) VALUES(?)");
		prep.setString(1, timestamp);

		prep.executeUpdate();
		
		prep.close();
		
	}

	public static boolean compareTime () throws SQLException, ParseException 
	{
		   Connection con = DBConnect.getConnection();
		   String current = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		   PreparedStatement prep = con.prepareStatement("SELECT date FROM archive_date");
		   ResultSet rs = prep.executeQuery();
		   String archive = "";
		   if(rs.next())
		   {
			   archive = rs.getString("date");
		   }
		   
		   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Date currentDate = sdf.parse(current);
	       Date archiveDate = sdf.parse(archive);
	       
	       boolean result = false;
	       if(currentDate.after(archiveDate))
	       {
	    	   result = true;
	       }

	       
	       return result;
	}
	
	public static void updateFolderToEnable(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("UPDATE archived_folder set status = ? WHERE id = ?");
		prep.setString(1, "Enabled");
		prep.setString(2, id);
		prep.executeUpdate();

		prep.close();
		
	}
	
	public static void updateFolderToDisable(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("UPDATE archived_folder set status = ? WHERE id = ?");
		prep.setString(1, "Disabled");
		prep.setString(2, id);
		prep.executeUpdate();

		prep.close();
		
	}
	
	public static File getFile (int id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
		   
			
	       PreparedStatement prep = con.prepareStatement("SELECT file_name, file_data, description FROM archived_documents WHERE id = ?");
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           String fileName = rs.getString("file_name");
	           Blob fileData = rs.getBlob("file_data");
	           String description = rs.getString("description");
	           
		       rs.close();
		   	   prep.close();
		   	   
	           return new File(id, fileName, fileData, description);
	       }
	       return null;
	}
	
	public static List <File> getBinaryStream (int id) throws SQLException, IOException 
	{
		   Connection con = DBConnect.getConnection();
		   
		   List <File> archiveFiles = new ArrayList <File> ();
	       PreparedStatement prep = con.prepareStatement("SELECT file_name, file_data, checksum, description FROM archived_documents WHERE folder_id = ?");
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       while(rs.next()) 
	       {
	           String fileName = rs.getString("file_name");
	           InputStream fileData = rs.getBinaryStream("file_data");
	           String description = rs.getString("description");
	           //String checksum = rs.getString("checksum");
	          
	          archiveFiles.add( new File(id, fileName, fileData, description));
	           
	       }
	        rs.close();
			prep.close();
			 
	       return archiveFiles;
	}
	
	public static String getArchiveFolderName(String id) throws SQLException
	{
		   Connection con = DBConnect.getConnection();
		   	
	       PreparedStatement prep = con.prepareStatement("SELECT archive_title FROM archived_folder WHERE id = ?");
	       
	       prep.setString(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       rs.next();
	       String title = rs.getString("archive_title");
	       rs.close();
		   prep.close();
		    
	       return title;
	}
	
	public static String retrieveArchiveDate() throws Exception
	{
		   Connection con = DBConnect.getConnection();
		   PreparedStatement prep = con.prepareStatement("SELECT date FROM archive_date");
		   ResultSet rs = prep.executeQuery();
		   String archive = "";
		   
		   if(rs.next()) {
			   archive = rs.getString("date");
		   }
		   
		   rs.close();
		   prep.close();
		    
		   
		   String archiveDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		   
	       return archiveDate;
	}
	
	public static Boolean isThereASetArchive() throws Exception
	{
		   Connection con = DBConnect.getConnection();
		   PreparedStatement prep = con.prepareStatement("SELECT date FROM archive_date");
		   ResultSet rs = prep.executeQuery();
		   
		   boolean result = false;
		   
		   if(rs.next())
		   {
			   result = true;
		   }
		   rs.close();
		   prep.close();
		    
		   return result;
	}
	
	public static void deleteDateFromArchiveDate() throws Exception
	{
	   Connection con = DBConnect.getConnection();
	   PreparedStatement prep = con.prepareStatement("DELETE FROM archive_date");
	   prep.executeUpdate();

	   prep.close();
	    
	}
	
	public static ResultSet retrieveArchivedDocuments(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, folder_id, type, source_recipient, title, category, file_name, description, uploaded_by, "
					+ "email, upload_date, department, reference_no, academic_year FROM archived_documents WHERE folder_id = ?");
			prep.setString(1, id);
			ResultSet result = prep.executeQuery();

			return result;
	}
}
