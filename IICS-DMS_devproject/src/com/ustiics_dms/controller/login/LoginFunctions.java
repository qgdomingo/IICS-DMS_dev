package com.ustiics_dms.controller.login;

import java.sql.*;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;


/*
 *  LoginFunctions.java
 *   - a java class that contains static functions needed by the Login functionality to interact with database
 */
public class LoginFunctions {

	public static boolean authenticate(String email, String password) throws SQLException
	{
		//servlet authenticates username and password
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email, password FROM accounts WHERE email = ? AND password = ? AND status = ?");
		prep.setString(1,  email);
		
		String encryptedPassword = AesEncryption.encrypt(password);
		prep.setString(2, encryptedPassword);
		prep.setString(3, "active");
		ResultSet result = prep.executeQuery();
		
		boolean flag = true;
		
		if (!result.isBeforeFirst())
		{
			flag = false;
		}
		return flag; //returns if username and password is authorized
	}
	
	public static Account authorize(String username) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email, title, faculty_number, first_name, middle_initial, "
				+ "last_name, department, user_type, status, time_created, contact_number FROM accounts WHERE email = ?");
		prep.setString(1,  username);
		ResultSet result = prep.executeQuery();
		
		Account acc = null;

		if (result.next()) //servlet authorizes user privilege extracting from db
		{
			String fullName = result.getString("first_name") + " " + result.getString("last_name");
			
			acc = new Account(
				result.getString("time_created"),
				result.getInt("faculty_number"),
				result.getString("title"),
				result.getString("contact_number"),
				result.getString("first_name"),
				result.getString("middle_initial"),
				result.getString("last_Name"),
				fullName,
				result.getString("email"),
				result.getString("user_type"),
				result.getString("department"),
				result.getString("status")
			);
			
		}
		return acc;
	}
}
