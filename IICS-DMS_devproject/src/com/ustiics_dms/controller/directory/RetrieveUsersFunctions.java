package com.ustiics_dms.controller.directory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class RetrieveUsersFunctions {

	public static ResultSet retrieveDepartmentUsers(String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			String sqlStatement = null ;
			boolean trigger = false;
			if(userType.equalsIgnoreCase("Director")||userType.equalsIgnoreCase("Faculty Secretary"))
			{
				sqlStatement = "SELECT * FROM accounts";
			}
			else if(userType.equalsIgnoreCase("Director"))
			{
				sqlStatement = "SELECT * FROM accounts WHERE department = ?";
				trigger = true;
			}
			
			PreparedStatement prep = con.prepareStatement(sqlStatement);
			
			if(trigger)
			{
				prep.setString(1,  department);
			}
			
			ResultSet result = prep.executeQuery();

			return result;
	}
}
