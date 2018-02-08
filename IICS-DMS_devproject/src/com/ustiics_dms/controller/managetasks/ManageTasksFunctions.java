package com.ustiics_dms.controller.managetasks;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;

public class ManageTasksFunctions {
	
	public static ResultSet getAccountsList(String userMail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name, email FROM accounts WHERE NOT email = ?");
			prep.setString(1, userMail);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static void addTask(String title, String date, String time, String category, String instructions, String email [], String assignedBy) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO tasks (title, due_date, due_time, category, instructions, assigned_by) VALUES (?,?,?,?,?,?)");
			prep.setString(1, title);
			prep.setString(2, date);
			prep.setString(3, time);
			prep.setString(4, category);
			prep.setString(5, instructions);
			prep.setString(6, assignedBy);
			
			prep.executeUpdate();
			
			assignUsers(email);

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
				PreparedStatement prep = con.prepareStatement("INSERT INTO tasks_assigned_to (id, name, email) VALUES (?,?,?)");
				
				String fullName = getFullName(mail);
				prep.setInt(1, id);
				prep.setString(2, fullName);
				prep.setString(3, mail);
				prep.executeUpdate();
			}
			
	}
	
	public static String getFullName(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT first_name, last_name FROM accounts WHERE email = ?");
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		String fullName = rs.getString("first_name") + " ";
		fullName += rs.getString("last_name");
		
		return fullName;
			
	}
	
	public static ResultSet getTaskAssigned(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id,status FROM tasks_assigned_to WHERE email = ?");
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTask(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM tasks_assigned_to WHERE id = ?");
			prep.setString(1, id);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getSpecificTask(String email, String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM tasks_assigned_to WHERE email = ? AND id = ?");
			prep.setString(1, email);
			prep.setString(2, id);
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTaskInfo(int taskID) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			ResultSet rs;

			PreparedStatement prep = con.prepareStatement("SELECT * FROM tasks WHERE id = ?");
			prep.setInt(1, taskID);
			rs = prep.executeQuery();
			
			return rs;
	}
	
	public static ResultSet getTasksCreated(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			ResultSet rs;

			PreparedStatement prep = con.prepareStatement("SELECT * FROM tasks WHERE assigned_by = ?");
			prep.setString(1, email);
			rs = prep.executeQuery();
			
			return rs;
	}
	
	public static boolean checkAssignedTask(String email, String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id FROM tasks_assigned_to WHERE email = ? AND id = ?");
			boolean flag = true;
			
			prep.setString(1,  email);
			prep.setString(2,  id);
			ResultSet result = prep.executeQuery();
			
			if (!result.isBeforeFirst())
			{
				flag = false;
			}
			
			return flag;
	}
	
	public static void submitTask(String documentTitle, FileItem item, String description, String email) throws SQLException, IOException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE tasks_assigned_to SET title = ?, file_name = ?, file_data = ?, description = ?, upload_date = ? , status = ? WHERE email = ?");
			
			prep.setString(1, documentTitle);
			prep.setString(2, item.getName());//file name
			prep.setBinaryStream(3, item.getInputStream(),(int) item.getSize());//file data 
			prep.setString(4, description);
			String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
			prep.setString(5, timeStamp);
			prep.setString(6, "On-time Submission");
			prep.setString(7, email);
			
			prep.executeUpdate();
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
		

}

