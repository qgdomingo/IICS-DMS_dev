package com.ustiics_dms.controller.logs;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class LogsFunctions {

	public static void addLog(String type, String information, String email, String name, String userType, String department) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String description = getDescription(information);
		String fullUser = name + " (" + email + ")";
		PreparedStatement prep = con.prepareStatement("INSERT INTO logs (type, information, user, user_type, department) VALUES (?,?,?,?,?)");
		
		prep.setString(1, type);
		prep.setString(2, description);
		prep.setString(3, fullUser);
		prep.setString(4, userType);
		prep.setString(5, department);
		
		prep.executeUpdate();
	}
	
	public static void addLog(String type, String information, String email, String name, String userType, String department, String additionalInfo) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		String description = getDescription(information, additionalInfo);
		String fullUser = name + " (" + email + ")";
		PreparedStatement prep = con.prepareStatement("INSERT INTO logs (type, information, user, user_type, department) VALUES (?,?,?,?,?)");
		
		prep.setString(1, type);
		prep.setString(2, description);
		prep.setString(3, fullUser);
		prep.setString(4, userType);
		prep.setString(5, department);
		
		prep.executeUpdate();
	}
	
	public static String getDescription(String information)
	{
		String description = "";
		
		if(information.equalsIgnoreCase("Login"))
		{
			description = "User has successfully logged in to the system";
		}
		else if(information.equalsIgnoreCase("Request Code"))
		{
			description = "User has requested for a reset code.";
		}
		else if(information.equalsIgnoreCase("Password Change"))
		{
			description = "User has successfully changed password.";
		}
		else if(information.equalsIgnoreCase("External Sent to Director"))
		{
			description = "User has sent a mail to the Director, <subject> ";
		}

		return description;
	}
	
	public static String getDescription(String information, String additionalInfo)
	{
		String description = "";
		
		if(information.equalsIgnoreCase("Login"))
		{
			description = "User has successfully logged in to the system";
		}
		else if(information.equalsIgnoreCase("Request Code"))
		{
			description = "User has requested for a reset code.";
		}
		else if(information.equalsIgnoreCase("Password Change"))
		{
			description = "User has successfully changed password.";
		}
		else if(information.equalsIgnoreCase("External Sent to Director"))
		{
			description = "User has sent a mail to the Director, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("External Reply to Director"))
		{
			description = "User has sent a reply to the response of the Director, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Add User"))
		{
			description = "User has added a new system user, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Update User"))
		{
			description = "User has updated a user information, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Enable User"))
		{
			description = "User has enabled a user, " +  additionalInfo + ", for the reason of <reason>";
		}
		else if(information.equalsIgnoreCase("Disable User"))
		{
			description = "User has disabled a user, " +  additionalInfo + ", for the reason of <reason>";
		}
		return description;
	}
}
