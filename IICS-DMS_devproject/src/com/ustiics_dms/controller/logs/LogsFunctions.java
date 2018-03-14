package com.ustiics_dms.controller.logs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
	
	public static void addLog(String type, String information, String email, String name, String userType, String department, String additionalInfo, String additionalInfo1) throws SQLException
	{

		Connection con = DBConnect.getConnection();
		String description = getDescription(information, additionalInfo, additionalInfo1);
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
		else if(information.equalsIgnoreCase("Logout"))
		{
			description = "User has successfully logged out from the system";
		}
		else if(information.equalsIgnoreCase("Request Code"))
		{
			description = "User has requested for a reset code.";
		}
		else if(information.equalsIgnoreCase("Password Change"))
		{
			description = "User has successfully changed password.";
		}

		return description;
	}
	
	public static String getDescription(String information, String additionalInfo)
	{
		String description = "";
		
		if(information.equalsIgnoreCase("External Sent to Director"))
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
		else if(information.equalsIgnoreCase("Update Year"))
		{
			description = "User has updated the academic year to " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Change Note"))
		{
			description = "User has changed the note on incoming document, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Mark As Done"))
		{
			description = "User has set an incoming document, "+ additionalInfo +" to ‘Done’";
		}
		else if(information.equalsIgnoreCase("Upload Personal"))
		{
			description = "User has uploaded a document, " + additionalInfo + ", on Personal documents";
		}
		else if(information.equalsIgnoreCase("Upload Incoming"))
		{
			description = "User has uploaded a document, " + additionalInfo + ", on Incoming documents";
		}
		else if(information.equalsIgnoreCase("Upload Outgoing"))
		{
			description = "User has uploaded a document, " + additionalInfo + ", on Outgoing documents";
		}
		else if(information.equalsIgnoreCase("New Task"))
		{
			description = "User has created a new task, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Submit Task"))
		{
			description = "User has submitted a task, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Update Task"))
		{
			description = "User has submitted a task, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Send Mail"))
		{
			description = "User has sent a mail, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Acknowledge Mail"))
		{
			description = "User has acknowledged a mail, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("External Mail"))
		{
			description = "User has responded to an external mail, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Export Mail"))
		{
			description = "User has exported a mail, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Add Event"))
		{
			description = "User has created a new event, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Update Event"))
		{
			description = "User has updated the event, " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Update Response"))
		{
			description = "User has updated his/her response to event,  " + additionalInfo;
		}
		else if(information.equalsIgnoreCase("Delete Event"))
		{
			description = "User has deleted the event, " + additionalInfo;
		}
		return description;
	}
	
	public static String getDescription(String information, String additionalInfo, String additionalInfo1)
	{
		String description = "";
		
		if(information.equalsIgnoreCase("Enable User"))
		{
			description = "User has enabled a user, " +  additionalInfo + ", for the reason of " + additionalInfo1;
		}
		else if(information.equalsIgnoreCase("Disable User"))
		{
			description = "User has disabled a user, " +  additionalInfo + ", for the reason of " + additionalInfo1;
		}
		else if(information.equalsIgnoreCase("Respond to Event"))
		{
			description = "User has responded, " +  additionalInfo + ", to the event  " + additionalInfo1;
		}
		else if(information.equalsIgnoreCase("Generate ISO"))
		{
			description = "User has generated an ISO Number, " +  additionalInfo + ", for the reason of" + additionalInfo1;
		}
		
		return description;
	}
	
	public static ResultSet getLogs() throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT timestamp, type, information, user, user_type, department FROM logs");
		return prep.executeQuery();
	}
}
