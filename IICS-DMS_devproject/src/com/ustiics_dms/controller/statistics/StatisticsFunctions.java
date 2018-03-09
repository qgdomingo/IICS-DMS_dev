package com.ustiics_dms.controller.statistics;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.Task;
import com.ustiics_dms.model.TaskStatistics;

public class StatisticsFunctions {

	public static ResultSet getTasksByDepartment(String schoolYear, String department) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id,title FROM tasks WHERE school_year = ? AND department = ?");

	       prep.setString(1, schoolYear);
	       prep.setString(2, department);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getTasks(String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id FROM tasks WHERE school_year = ?");
	       prep.setString(1, schoolYear);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getSpecificTask(String id, String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT title FROM tasks WHERE id = ? AND school_year = ?");
	       prep.setString(1, id);
	       prep.setString(2, schoolYear);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getStatusByID(String id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT status FROM tasks_assigned_to WHERE id = ?");
	       prep.setString(1, id);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getStatusByEmail(String email, String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id,status FROM tasks_assigned_to WHERE email = ? AND school_year = ?");
	       prep.setString(1, email);
	       prep.setString(2, schoolYear);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static int getStatistics(String email, String type) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT COUNT(*) FROM tasks_assigned_to WHERE email = ? AND status = ?");
	       prep.setString(1, email);
	       prep.setString(2, type);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       rs.next();
	       int counter = rs.getInt("COUNT(*)");
	       
	       return counter;
	}
	
	public static List<Task> getTotalStatsPerPerson(String email, String schoolYear) throws SQLException 
	{
		
		List <Task> taskList = new ArrayList <Task> ();
		ResultSet status = StatisticsFunctions.getStatusByEmail(email, schoolYear);
		
		while(status.next())
		{
			ResultSet task = StatisticsFunctions.getSpecificTask(status.getString("id"), schoolYear);
			task.next();
			
			String taskName = task.getString("title");
			String tempStatus = status.getString("status");
			
			taskList.add(new Task(
					taskName,
					tempStatus));
		}
		return taskList;
	}
	
	
	public static List<TaskStatistics> getTotalStatsDepartment(String department, String year) throws SQLException 
	{
		ResultSet task = StatisticsFunctions.getTasksByDepartment(year, department);
		List <TaskStatistics> taskList = new ArrayList <TaskStatistics> ();
		
		while(task.next())
		{
			int onTimeSubmission = 0;
			int lateSubmission = 0;
			int noSubmission = 0;
			
			String taskName = task.getString("title");
			
			ResultSet status = StatisticsFunctions.getStatusByID(task.getString("id"));
			
			while(status.next())
			{
				String tempStatus = status.getString("status");
				
				if(tempStatus.equalsIgnoreCase("On-Time Submission"))
				{
					onTimeSubmission++;
				}
				else if(tempStatus.equalsIgnoreCase("Late Submission"))
				{
					lateSubmission++;
				}
				else if(tempStatus.equalsIgnoreCase("No Submission"))
				{
					noSubmission++;
				}
			}
			taskList.add(new TaskStatistics(
							taskName,
							onTimeSubmission,
							lateSubmission,
							noSubmission));
		}
		
		return taskList;
	}
	
	public static List<TaskStatistics> getPieChartDepartment(String department,String schoolYear) throws SQLException 
	{
		int onTimeSubmission = 0;
		int lateSubmission = 0;
		int noSubmission = 0;
		
		ResultSet task = StatisticsFunctions.getTasksByDepartment(schoolYear, department);
		List <TaskStatistics> taskStats = new ArrayList <TaskStatistics> ();
		
		while(task.next())
		{
			
			
			ResultSet status = StatisticsFunctions.getStatusByID(task.getString("id"));
			
			while(status.next())
			{
				String tempStatus = status.getString("status");
				
				if(tempStatus.equalsIgnoreCase("On-Time Submission"))
				{
					onTimeSubmission++;
				}
				else if(tempStatus.equalsIgnoreCase("Late Submission"))
				{
					lateSubmission++;
				}
				else if(tempStatus.equalsIgnoreCase("No Submission"))
				{
					noSubmission++;
				}
			}
			
		}
		taskStats.add(new TaskStatistics(
				onTimeSubmission,
				lateSubmission,
				noSubmission));
		
		return taskStats;
	}
	
	public static List<TaskStatistics> getPieChartPerson(String email, String schoolYear) throws SQLException 
	{
		int onTimeSubmission = 0;
		int lateSubmission = 0;
		int noSubmission = 0;
		
		List <TaskStatistics> taskStats = new ArrayList <TaskStatistics> ();
		ResultSet status = StatisticsFunctions.getStatusByEmail(email, schoolYear);
		
		while(status.next())
		{
			String tempStatus = status.getString("status");
			
			if(tempStatus.equalsIgnoreCase("On-Time Submission"))
			{
				onTimeSubmission++;
			}
			else if(tempStatus.equalsIgnoreCase("Late Submission"))
			{
				lateSubmission++;
			}
			else if(tempStatus.equalsIgnoreCase("No Submission"))
			{
				noSubmission++;
			}
		}
		
		taskStats.add(new TaskStatistics(
				onTimeSubmission,
				lateSubmission,
				noSubmission));
		
		return taskStats;
	}
}
