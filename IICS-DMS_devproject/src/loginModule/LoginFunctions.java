package loginModule;

import java.sql.*;
import databaseConnection.*;
import encryption.AesEncryption;
import model.Account;

public class LoginFunctions {

	public static boolean authenticate(String username, String password) throws Exception
	{
		
		//servlet authenticates username and password
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("Select username,password from accounts where username = ? and password = ?");
		prep.setString(1,  username);
		
		String encryptedPassword = AesEncryption.encrypt(password);
		prep.setString(2, "123");
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
		PreparedStatement prep = con.prepareStatement("Select * from accounts where username = ?");
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
