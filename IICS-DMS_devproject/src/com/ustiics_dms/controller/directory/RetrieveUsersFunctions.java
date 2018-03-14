package com.ustiics_dms.controller.directory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class RetrieveUsersFunctions {

	public static ResultSet retrieveAllUsers(String email) throws SQLException {
		
		Connection con = DBConnect.getConnection();
		String statement = "SELECT full_name, email, user_type, department FROM accounts WHERE " +
				" NOT status = 'inactive' AND NOT email = ? AND NOT user_type = ?";
		
		PreparedStatement prep = con.prepareStatement(statement);
		prep.setString(1, email);
		prep.setString(2, "Administrator");
		ResultSet result = prep.executeQuery();

		return result;
	}
	
	public static ResultSet retrieveDepartmentUsers(String email, String department) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String statement = "SELECT full_name, email, user_type, department FROM accounts "
				+ "WHERE NOT email = ? AND NOT user_type = ? AND department = ? AND NOT status = 'inactive'";
		
		PreparedStatement prep = con.prepareStatement(statement);
		
		prep.setString(1, email);
		prep.setString(2, "Administrator");
		prep.setString(3,  department);
		
		ResultSet result = prep.executeQuery();

		return result;
	}
	
	public static ResultSet retrieveStaffUsers(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String statement = "SELECT full_name, email, user_type, department FROM accounts "
				+ "WHERE NOT email = ? AND NOT user_type = ? AND user_type = ? OR user_type =? AND NOT status = 'inactive'";
		
		PreparedStatement prep = con.prepareStatement(statement);
		
		prep.setString(1, email);
		prep.setString(2, "Administrator");
		prep.setString(3, "Staff");
		prep.setString(4, "Supervisor");
		
		ResultSet result = prep.executeQuery();

		return result;
	}
	
	public static ResultSet retrieveFacultyUsers(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String statement = "SELECT full_name, email, user_type, department FROM accounts "
				+ "WHERE NOT email = ? AND NOT user_type = ? AND user_type = ? OR user_type = ? AND NOT status = 'inactive'";
		
		PreparedStatement prep = con.prepareStatement(statement);
		
		prep.setString(1, email);
		prep.setString(2, "Administrator");
		prep.setString(3, "Faculty");
		prep.setString(4, "Department Head");
		
		ResultSet result = prep.executeQuery();

		return result;
	}
	
	public static ResultSet retrieveExternalTo() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String statement = "SELECT group_name, email, first_name, last_name FROM group_list";
		
		PreparedStatement prep = con.prepareStatement(statement);
		ResultSet result = prep.executeQuery();

		return result;
	}
	
}
