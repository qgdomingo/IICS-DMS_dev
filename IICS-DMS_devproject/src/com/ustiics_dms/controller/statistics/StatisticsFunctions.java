<<<<<<< HEAD
package com.ustiics_dms.controller.statistics;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class StatisticsFunctions {

	public static ResultSet getTasksByDepartment(String schoolYear, String department) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT id FROM tasks WHERE school_year = ? AND department = ?");

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
	
	public static ResultSet getStatusByID(String id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT status FROM tasks_assigned_to WHERE id = ?");
	       prep.setString(1, id);
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
	
	public static ResultSet getT(String email) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM  tasks_assigned_to WHERE email = ?");
	       prep.setString(1, email);
	       ResultSet rs = prep.executeQuery();
	       return rs;
	}
}
=======
package com.ustiics_dms.controller.statistics;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class StatisticsFunctions {

	public static ResultSet getUserType(String department) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT email FROM accounts WHERE user_type = ? AND status = ?");
	       prep.setString(1, department);
	       prep.setString(2, "Active");
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getFromUserType(String email) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM  tasks_assigned_to WHERE email = ?");
	       prep.setString(1, email);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static ResultSet getTotalTasks() throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT COUNT(*)FROM tasks");
	       ResultSet rs = prep.executeQuery();
	      
	       return rs;
	}
}
>>>>>>> branch 'master' of https://github.com/qgdomingo/IICS-DMS_dev.git
