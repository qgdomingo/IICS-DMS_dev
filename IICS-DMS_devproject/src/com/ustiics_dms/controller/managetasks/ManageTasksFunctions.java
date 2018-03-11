package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;
import com.ustiics_dms.utility.AesEncryption;

public class ManageTasksFunctions {
	
	public static ResultSet getAccountsList(String userMail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name, email, user_type, department FROM accounts WHERE NOT email = ? OR NOT user_type = ?");
			prep.setString(1, userMail);
			prep.setString(2, "Administrator");
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static void addTask(String title, String deadline, String category, String instructions, String email [], String assignedBy, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO tasks (title, deadline, category, instructions, assigned_by, school_year, department) VALUES (?,?,?,?,?,?,?)");
			prep.setString(1, title);
			prep.setString(2, deadline);
			prep.setString(3, category);
			prep.setString(4, instructions);
			prep.setString(5, assignedBy);
			prep.setString(6, getSchoolYear());
			prep.setString(7, department);
			prep.executeUpdate();
			
			assignUsers(email);
			
		

	}
	
	public static String getSchoolYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year WHERE status = ?");
			
			prep.setString(1, "Current");
			
			ResultSet rs = prep.executeQuery();
			String schoolYear = "";
			if(rs.next())
			{
				schoolYear = rs.getString("start_year") + "-" + rs.getString("end_year"); 
			}
			return schoolYear;

	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'tasks'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}
	
	public static void assignUsers(String email[]) throws SQLException
	{
			int id = getIncrement();
			Connection con = DBConnect.getConnection();
			
			for(String mail: email)
			{
				PreparedStatement prep = con.prepareStatement("INSERT INTO tasks_assigned_to (id, name, email, school_year) VALUES (?,?,?,?)");
				
				String fullName = getFullName(mail);
				prep.setInt(1, id);
				prep.setString(2, fullName);
				prep.setString(3, mail);
				prep.setString(4, ManageTasksFunctions.getSchoolYear());
				prep.executeUpdate();
			}
			
	}
	
	public static String getFullName(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT full_name FROM accounts WHERE email = ?");
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("full_name");
			
	}
	
	public static String getTaskTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM tasks WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("title");
			
	}
	
	public static ResultSet getTaskAssigned(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, status FROM tasks_assigned_to WHERE email = ?");
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTask(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, email, name, title, file_name, description, "
					+ "upload_date, status FROM tasks_assigned_to WHERE id = ?");
			prep.setString(1, id);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getSpecificTask(String email, String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id, email, title, file_name, description, "  
					+ "upload_date, status FROM tasks_assigned_to WHERE email = ? AND id = ?");
			prep.setString(1, email);
			prep.setString(2, id);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTaskInfo(int taskID) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			ResultSet rs;

			PreparedStatement prep = con.prepareStatement("SELECT id, title, deadline, category, instructions,"
					+ "status, assigned_by, date_created, school_year FROM tasks WHERE id = ?");
			prep.setInt(1, taskID);
			rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTaskInfoHomePage(int taskID) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			ResultSet rs;

			PreparedStatement prep = con.prepareStatement("SELECT title, deadline, category, assigned_by,"
					+ "FROM tasks WHERE id = ?");
			prep.setInt(1, taskID);
			rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTasksCreated(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			ResultSet rs;

			PreparedStatement prep = con.prepareStatement("SELECT id, title, deadline, category, instructions, "
					+ "status, assigned_by, date_created, school_year FROM tasks WHERE assigned_by = ?");
			prep.setString(1, email);
			rs = prep.executeQuery();
			
			return rs;
	}
	
	public static void submitTask(String documentTitle, FileItem item, String description, String email, String id, String deadline) throws SQLException, IOException, ParseException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE tasks_assigned_to SET title = ?, file_name = ?, file_data = ?, description = ?, upload_date = ? , status = ? WHERE email = ? AND id = ?");
			
			prep.setString(1, documentTitle);
			prep.setString(2, item.getName()); //file name
			prep.setBinaryStream(3, item.getInputStream(),(int) item.getSize()); //file data 
			prep.setString(4, description);
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
			prep.setString(5, timeStamp);
			prep.setString(6, compareTime(timeStamp, deadline));
			prep.setString(7, email);
			id = AesEncryption.decrypt(id);
			prep.setString(8, id);
			prep.executeUpdate();
			
			String des = getFullName(email) +" has submitted his/her task for " + getTaskTitle(id);
			NotificationFunctions.addNotification("Task Page", des, email);
	}
	
	
	
	public static String compareTime (String currentTime, String deadline) throws SQLException, ParseException 
	{
		   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Date deadlineDate = sdf.parse(deadline);
	       Date submitDate = sdf.parse(currentTime);
	       String result = "";
	       if(submitDate.after(deadlineDate))
	       {
	    	   result = "Late Submission";
	       }
	       else
	       {
	    	   result = "On-time Submission";
	       }
	       
	       return result;
	}
	
	public static File getFile (int id, String email) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			

	       PreparedStatement prep = con.prepareStatement("SELECT file_name, file_data, description FROM tasks_assigned_to WHERE id = ? AND email = ?");
	       prep.setInt(1, id);
	       prep.setString(2, email);
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
	
	public static void editTask (String id, String userEmail, String title, String deadline, String category, String instructions, String email[]) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE tasks SET title = ?, deadline = ?, category = ?, instructions = ? WHERE id = ? AND assigned_by = ?");
		prep.setString(1, title);
		prep.setString(2, deadline);
		prep.setString(3, category);
		prep.setString(4, instructions);
		prep.setString(5, id);
		prep.setString(6, userEmail);
		
		prep.executeUpdate();
		
		assignEditUsers(email, id);
		
		String des = getFullName(userEmail) +" has updated the task details of " + getTaskTitle(id);
		NotificationFunctions.addNotification("Task Page", des, email);
		
	}
	
	public static void assignEditUsers(String email[], String id) throws SQLException
	{
			String tempID = id;
			Connection con = DBConnect.getConnection();
			
			for(String mail: email)
			{
				if(checkExists(id,mail))
				{
				PreparedStatement prep = con.prepareStatement("INSERT INTO tasks_assigned_to (id, name, email) VALUES (?,?,?)");
				
				String fullName = getFullName(mail);
				prep.setString(1, tempID);
				prep.setString(2, fullName);
				prep.setString(3, mail);
				prep.executeUpdate();
				}
			}
			
	}
	
	public static boolean checkExists(String id, String email) throws SQLException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT id FROM tasks_assigned_to WHERE id = ? AND email = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		ResultSet rs = prep.executeQuery();
		
		boolean flag = true;
		
		if (rs.isBeforeFirst())
		{
			flag = false;
		}
		return flag;
		
	}
	
	public static ResultSet getSpecificCreatedTask(String id) throws SQLException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title, deadline, category, instructions, status, date_created FROM tasks WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		return rs;
		
	}
	
	public static ResultSet getUnfinishedTasks(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id FROM tasks_assigned_to WHERE email = ? AND status = ?");
			prep.setString(1, email);
			prep.setString(2, "No Submission");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}

	

}
