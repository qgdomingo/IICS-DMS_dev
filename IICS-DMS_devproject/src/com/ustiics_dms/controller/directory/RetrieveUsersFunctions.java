package com.ustiics_dms.controller.directory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class RetrieveUsersFunctions {

	public static ResultSet retrieveDepartmentUsers(String email, String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null ;
			boolean trigger = false;
			if(userType.equalsIgnoreCase("Director") || userType.equalsIgnoreCase("Faculty Secretary"))
			{
				sqlStatement = "SELECT faculty_number, first_name, last_name, full_name, email, user_type, department, time_created, status"
						+ " FROM accounts WHERE NOT user_type = ? AND NOT email = ?";
			}
			else if(userType.equalsIgnoreCase("Department Head"))
			{
				sqlStatement = "SELECT faculty_number, first_name, last_name, full_name, email, user_type, department, time_created, status"
						+ " FROM accounts WHERE NOT user_type = ? AND NOT email = ? AND department = ?";
				trigger = true;
			}
			
			PreparedStatement prep = con.prepareStatement(sqlStatement);
			prep.setString(1, "Administrator");
			prep.setString(2, email);
			
			if(trigger)
			{
				prep.setString(3,  department);
			}
			
			ResultSet result = prep.executeQuery();

			return result;
	}
}
