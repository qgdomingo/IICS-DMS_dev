package com.ustiics_dms.controller.profile;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.utility.AesEncryption;

public class ProfileFunctions {
	
	public static void editUserProfile(String facultyNo, String title, String contactNumber, String firstName, String lastName, String email, String currentEmail) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET faculty_number = ?, title = ?, contact_number = ?, first_name = ?, last_name = ?, email = ? WHERE email = ?");
			
			prep.setString(1, facultyNo);
			prep.setString(2, title);
			prep.setString(3, contactNumber);
			prep.setString(4, firstName);
			prep.setString(5, lastName);
			prep.setString(6, email);
			prep.setString(7, currentEmail);

			prep.executeUpdate();
	}
	
	public static void editPassword(String email, String newPassword) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE accounts SET password = ? WHERE email = ?");
			String encryptedPassword = AesEncryption.encrypt(newPassword);
			prep.setString(1, encryptedPassword);
			prep.setString(2, email);

			prep.executeUpdate();
	}

}
