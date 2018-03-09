package com.ustiics_dms.controller.statistics;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.MailStatistics;
import com.ustiics_dms.model.SentMail;
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
	
	public static ResultSet getMailByDepartment(String schoolYear, String department) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id,subject FROM mail WHERE school_year = ? AND department = ?");

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
	
	public static ResultSet getSpecificMail(String id, String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT subject FROM mail WHERE id = ? AND school_year = ?");
	       prep.setString(1, id);
	       prep.setString(2, schoolYear);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getTaskStatusByID(String id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT status FROM tasks_assigned_to WHERE id = ?");
	       prep.setString(1, id);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getMailStatusByID(String id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT acknowledgement FROM sent_mail_to WHERE id = ?");
	       prep.setString(1, id);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getTaskStatusByEmail(String email, String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id,status FROM tasks_assigned_to WHERE email = ? AND school_year = ?");
	       prep.setString(1, email);
	       prep.setString(2, schoolYear);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}

	public static ResultSet getMailStatusByEmail(String email, String schoolYear) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id,acknowledgement FROM sent_mail_to WHERE recipient_mail = ? AND school_year = ?");
	       prep.setString(1, email);
	       prep.setString(2, schoolYear);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static List<Task> getTotalTaskPerPerson(String email, String schoolYear) throws SQLException 
	{
		
		List <Task> taskList = new ArrayList <Task> ();
		ResultSet status = StatisticsFunctions.getTaskStatusByEmail(email, schoolYear);
		
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
	
	public static List<SentMail> getTotalMailPerPerson(String email, String schoolYear) throws SQLException 
	{
		
		List <SentMail> mailList = new ArrayList <SentMail> ();
		ResultSet status = StatisticsFunctions.getMailStatusByEmail(email, schoolYear);
		
		while(status.next())
		{
			ResultSet mail = StatisticsFunctions.getSpecificMail(status.getString("id"), schoolYear);
			mail.next();
			
			String subject = mail.getString("subject");
			String tempStatus = status.getString("acknowledgement");
			
			mailList.add(new SentMail(
					subject,
					tempStatus));
		}
		return mailList;
	}
	
	public static List<TaskStatistics> getTotalTaskDepartment(String department, String year) throws SQLException 
	{
		ResultSet task = StatisticsFunctions.getTasksByDepartment(year, department);
		List <TaskStatistics> taskList = new ArrayList <TaskStatistics> ();
		
		while(task.next())
		{
			int onTimeSubmission = 0;
			int lateSubmission = 0;
			int noSubmission = 0;
			
			String taskName = task.getString("title");
			
			ResultSet status = StatisticsFunctions.getTaskStatusByID(task.getString("id"));
			
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
	
	public static List<MailStatistics> getTotalMailDepartment(String department, String year) throws SQLException 
	{
		ResultSet mail = StatisticsFunctions.getMailByDepartment(year, department);
		List <MailStatistics> mailList = new ArrayList <MailStatistics> ();
		
		while(mail.next())
		{
			int read = 0;
			int unread = 0;
			int acknowledged = 0;
			
			String subject = mail.getString("subject");
			
			ResultSet status = StatisticsFunctions.getMailStatusByID(mail.getString("id"));
			
			while(status.next())
			{
				String tempStatus = status.getString("acknowledgement");
				
				if(tempStatus.equalsIgnoreCase("Read"))
				{
					read++;
				}
				else if(tempStatus.equalsIgnoreCase("Unread"))
				{
					unread++;
				}
				else if(tempStatus.equalsIgnoreCase("Acknowledged"))
				{
					acknowledged++;
				}
			}
			mailList.add(new MailStatistics(
							subject,
							read,
							unread,
							acknowledged));
		}
		
		return mailList;
	}
	
	public static List<TaskStatistics> getTaskPieChartDepartment(String department,String schoolYear) throws SQLException 
	{
		int onTimeSubmission = 0;
		int lateSubmission = 0;
		int noSubmission = 0;
		
		ResultSet task = StatisticsFunctions.getTasksByDepartment(schoolYear, department);
		List <TaskStatistics> taskStats = new ArrayList <TaskStatistics> ();
		
		while(task.next())
		{
			
			
			ResultSet status = StatisticsFunctions.getTaskStatusByID(task.getString("id"));
			
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
	
	public static List<TaskStatistics> getTaskPieChartPerson(String email, String schoolYear) throws SQLException 
	{
		int onTimeSubmission = 0;
		int lateSubmission = 0;
		int noSubmission = 0;
		
		List <TaskStatistics> taskStats = new ArrayList <TaskStatistics> ();
		ResultSet status = StatisticsFunctions.getTaskStatusByEmail(email, schoolYear);
		
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
	
	public static List<MailStatistics> getMailPieChartPerson(String email, String schoolYear) throws SQLException 
	{
		int read = 0;
		int unread = 0;
		int acknowledged = 0;
		
		List <MailStatistics> mailList = new ArrayList <MailStatistics> ();
		ResultSet status = StatisticsFunctions.getMailStatusByEmail(email, schoolYear);
		
		while(status.next())
		{
			String tempStatus = status.getString("acknowledgement");

			if(tempStatus.equalsIgnoreCase("Read"))
			{
				read++;
			}
			else if(tempStatus.equalsIgnoreCase("Unread"))
			{
				unread++;
			}
			else if(tempStatus.equalsIgnoreCase("Acknowledged"))
			{
				acknowledged++;
			}
		}
			mailList.add(new MailStatistics(
					read,
					unread,
					acknowledged));
			
		return mailList;
	}
	
	public static List<MailStatistics> getMailPieChartDepartment(String department,String schoolYear) throws SQLException 
	{
		int read = 0;
		int unread = 0;
		int acknowledged = 0;
		
		ResultSet mail = StatisticsFunctions.getMailByDepartment(schoolYear, department);
		List <MailStatistics> taskStats = new ArrayList <MailStatistics> ();
		
		while(mail.next())
		{
			ResultSet status = StatisticsFunctions.getMailStatusByID(mail.getString("id"));
			
			while(status.next())
			{
				String tempStatus = status.getString("acknowledgement");
				
				if(tempStatus.equalsIgnoreCase("Read"))
				{
					read++;
				}
				else if(tempStatus.equalsIgnoreCase("Unread"))
				{
					unread++;
				}
				else if(tempStatus.equalsIgnoreCase("Acknowledged"))
				{
					acknowledged++;
				}
			}
			
		}
		taskStats.add(new MailStatistics(
				read,
				unread,
				acknowledged));
		
		return taskStats;
	}
}
