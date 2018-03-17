package com.ustiics_dms.controller.manageuser;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.utility.AesEncryption;

public class ManageUserFunctions {

	public static void addAccount(String email, String facultyNo, String firstName, String middileInitial, String lastName, String fullName, String userType, String department, String title, String contactNumber) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO accounts (email, password, faculty_number, "
					+ "first_name, middle_initial, last_name, full_name, user_type, department, title, contact_number) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
			String encryptedPassword = AesEncryption.encrypt(facultyNo);
			
			prep.setString(1, email);
			prep.setString(2, encryptedPassword);
			prep.setString(3, facultyNo);
			prep.setString(4, firstName);
			prep.setString(5, middileInitial);
			prep.setString(6, lastName);
			prep.setString(7, fullName);
			prep.setString(8, userType);
			prep.setString(9, department);
			prep.setString(10, title);
			prep.setString(11, contactNumber);

			prep.executeUpdate();
			prep.close();
	}
	
	public static void updateAccount(String email, String facultyNo, String firstName, String middleInitial, String lastName, String userType, String department, String title, String contactNumber, String originalEmail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET email = ?, faculty_number = ?, first_name = ?, middle_initial = ?, "
					+ "last_name = ?, full_name = ?, user_type = ?, department = ?, title = ?, contact_number = ? WHERE email = ?");
			
			String fullName = firstName + " " + lastName;
			prep.setString(1, email);
			prep.setString(2, facultyNo);
			prep.setString(3, firstName);
			prep.setString(4, middleInitial);
			prep.setString(5, lastName);
			prep.setString(6, fullName);
			prep.setString(7, userType);
			prep.setString(8, department);
			prep.setString(9, title);
			prep.setString(10, contactNumber);
			prep.setString(11, originalEmail);
			
			prep.executeUpdate();
			prep.close();
	}
	
	
	public static void enableStatus(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET status = ? WHERE email = ?");
			
			prep.setString(1, "active");
			prep.setString(2, email);

			prep.executeUpdate();
			prep.close();
	}
	
	public static void disableStatus(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET status = ? WHERE email = ?");
			
			prep.setString(1, "inactive");
			prep.setString(2, email);
			
			prep.executeUpdate();
			prep.close();
	}
	
	public static ResultSet viewAccounts() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email, title, faculty_number, first_name, middle_initial, "
					+ "last_name, department, user_type, status, time_created, contact_number FROM accounts "
					+ "WHERE NOT user_type = 'Administrator' ");
			
			ResultSet rs = prep.executeQuery();
			return rs;
	}
		
	public static Account getAccount(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email, title, contact_number, faculty_number, first_name, middle_initial, "
					+ "last_name, department, user_type, status, time_created FROM accounts WHERE email = ?");
			
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
			
			rs.next();
			
			Account user = new Account (rs.getString("time_created"),
									  Integer.parseInt(rs.getString("faculty_number")),
									  rs.getString("title"),
									  rs.getString("contact_number"),
									  rs.getString("first_name"),
									  rs.getString("middle_initial"),
									  rs.getString("last_name"),
									  rs.getString("first_name") + " " + rs.getString("last_name"),
									  rs.getString("email"),
									  rs.getString("user_type"),
									  rs.getString("department"),
									  rs.getString("status")
									  );
			
			return user;
	}
	
	public static void editUserProfile(String facultyNo, String title, String contactNumber, String firstName, String middleInitial, String lastName, String email, String currentEmail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET faculty_number = ?, title = ?, contact_number = ?, first_name = ?, middle_initial = ?, last_name = ?, email = ? WHERE email = ?");
			
			prep.setString(1, facultyNo);
			prep.setString(2, title);
			prep.setString(3, contactNumber);
			prep.setString(4, firstName);
			prep.setString(5, middleInitial);
			prep.setString(6, lastName);
			prep.setString(7, email);
			prep.setString(8, currentEmail);

			prep.executeUpdate();
			prep.close();
	}
	
	public static boolean checkMail(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email FROM accounts WHERE email = ?");
			
			prep.setString(1, email);

			ResultSet rs = prep.executeQuery();
			
			boolean flag = true;
			
			if (!rs.isBeforeFirst())
			{
				flag = false;
			}
			return flag;
			
	}

}


