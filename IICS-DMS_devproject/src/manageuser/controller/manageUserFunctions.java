package manageuser.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import databaseConnection.DBConnect;
import utility.AesEncryption;

public class manageUserFunctions {

	public static void addAccount( String email, String facultyNo, String firstName, String lastName, String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Insert into accounts (email,password,faculty_number,first_name,last_name,user_type,department) values (?,?,?,?,?,?,?)");
			String encryptedPassword = AesEncryption.encrypt(facultyNo);
			
			prep.setString(1, email);
			prep.setString(2, encryptedPassword);
			prep.setString(3, facultyNo);
			prep.setString(4, firstName);
			prep.setString(5, lastName);
			prep.setString(6, userType);
			prep.setString(7, department);

			
			prep.executeUpdate();
	}
	
	public static void enableStatus( String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("update accounts set status = ? where email = ?");
			
			prep.setString(1, "active");
			prep.setString(2, email);
		
			prep.executeUpdate();
	}
	
	public static void disableStatus( String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("update accounts set status = ? where email = ?");
			
			prep.setString(1, "inactive");
			prep.setString(2, email);
		
			prep.executeUpdate();
	}
}
