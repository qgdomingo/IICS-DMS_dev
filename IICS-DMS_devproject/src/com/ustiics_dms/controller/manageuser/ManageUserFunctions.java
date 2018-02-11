package com.ustiics_dms.controller.manageuser;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;

public class ManageUserFunctions {

	public static void addAccount(String email, String facultyNo, String firstName, String lastName, String fullName, String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO accounts (email, password, faculty_number, "
					+ "first_name, last_name, fullName, user_type, department) VALUES (?,?,?,?,?,?,?,?)");
			String encryptedPassword = AesEncryption.encrypt(facultyNo);
			
			prep.setString(1, email);
			prep.setString(2, encryptedPassword);
			prep.setString(3, facultyNo);
			prep.setString(4, firstName);
			prep.setString(5, lastName);
			prep.setString(6, fullName);
			prep.setString(7, userType);
			prep.setString(8, department);

			prep.executeUpdate();
	}
	
	public static void updateAccount(String email, String facultyNo, String firstName, String lastName, String userType, String department, String originalEmail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET email = ?, faculty_number = ?, first_name = ?, "
					+ "last_name = ?, fullName = ?, user_type = ?, department = ? WHERE email = ?");
			
			String fullName = firstName + " " + lastName;
			prep.setString(1, email);
			prep.setString(2, facultyNo);
			prep.setString(3, firstName);
			prep.setString(4, lastName);
			prep.setString(5, fullName);
			prep.setString(6, userType);
			prep.setString(7, department);
			prep.setString(8, originalEmail);
			
			prep.executeUpdate();
	}
	
	
	public static void enableStatus( String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET status = ? WHERE email = ?");
			
			prep.setString(1, "active");
			prep.setString(2, email);
			System.out.println(email);
			prep.executeUpdate();
	}
	
	public static void disableStatus( String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET status = ? WHERE email = ?");
			
			prep.setString(1, "inactive");
			prep.setString(2, email);
			
			prep.executeUpdate();
	}
	
	public static ResultSet viewAccounts() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email, faculty_number, first_name, "
					+ "last_name, department, user_type, status, time_created FROM accounts");
			
			ResultSet rs = prep.executeQuery();
			return rs;
	}
		
	public static Account getAccount(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email, faculty_number, first_name, "
					+ "last_name, department, user_type, status, time_created FROM accounts WHERE email = ?");
			
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
			rs.next();
			Account user = new Account (rs.getString("time_created"),
									  Integer.parseInt(rs.getString("faculty_number")),
									  rs.getString("first_name"),
									  rs.getString("last_name"),
									  rs.getString("first_name") + " " + rs.getString("last_name"),
									  rs.getString("email"),
									  rs.getString("user_type"),
									  rs.getString("department"),
									  rs.getString("status")
									  );
			return user;
	}
}

