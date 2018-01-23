package login.controller;

import java.sql.*;
import databaseConnection.*;
import model.Account;
import utility.AesEncryption;

public class LoginFunctions {

	public static boolean authenticate(String email, String password) throws SQLException
	{
		
		//servlet authenticates username and password
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("Select email,password from accounts where email = ? and password = ?");
		prep.setString(1,  email);
		
		String encryptedPassword = AesEncryption.encrypt(password);
		prep.setString(2, encryptedPassword);
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
		PreparedStatement prep = con.prepareStatement("Select * from accounts where email = ?");
		prep.setString(1,  username);
		ResultSet result = prep.executeQuery();
		
		Account acc = null;

		if (result.next()) //servlet authorizes user privilege extracting from db
		{
			acc = new Account(
			result.getInt("faculty_Number"),
			result.getString("first_Name"),
			result.getString("last_Name"),
			result.getString("email"),
			result.getString("user_Type"),
			result.getString("department"),
			result.getString("status")
			);
			
		}

		
		return acc;
	
	}
}
