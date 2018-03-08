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
