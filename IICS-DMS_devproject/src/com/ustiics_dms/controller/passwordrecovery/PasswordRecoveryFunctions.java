package com.ustiics_dms.controller.passwordrecovery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.utility.AesEncryption;

public class PasswordRecoveryFunctions {
	
	public static void addRecoveryCode(String email, String code) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			if(checkEmailExists(email)&&checkDuplicateEmailCode(email))
			{
				PreparedStatement prep = con.prepareStatement("Insert into account_recovery values (?,?)");
				String encryptedCode = AesEncryption.encrypt(code);
				
				prep.setString(1,  email);
				prep.setString(2, encryptedCode);
				
				prep.executeUpdate();
			}
	}
	
	public static void deleteRecoveryCode(String email,String code) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("delete from account_recovery where email = ? and code = ?");
			String encryptedCode = AesEncryption.encrypt(code);
			prep.setString(1,  email);
			prep.setString(2, encryptedCode);
			
			System.out.println(prep.executeUpdate());
			
	}
	
	public static boolean checkRecoveryCode(String email, String code) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Select email,code from account_recovery where email = ? and code = ?");
			String encryptedCode = AesEncryption.encrypt(code);
			prep.setString(1,  email);
			prep.setString(2, encryptedCode);
			
			
			ResultSet result = prep.executeQuery();
			
			boolean flag = true;
			
			if (!result.isBeforeFirst())
			{
				flag = false;
			}
			return flag;
	}
	
	public static boolean updatePassword(String email, String password, String confirmPassword, String code) throws SQLException
	{
			boolean result = false;
			if(password.equals(confirmPassword))
			{
				
				Connection con = DBConnect.getConnection();
				PreparedStatement prep = con.prepareStatement("update accounts set password = ? where email = ?");
	
				prep.setString(1,  password);
				prep.setString(2, email);
				
				prep.executeUpdate();
				deleteRecoveryCode(email, code);
				result = true;
			}
			
			return result;
	}
	
	public static boolean checkEmailExists(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Select email from accounts where email = ?");
			boolean flag = true;
			
			prep.setString(1,  email);
			ResultSet result = prep.executeQuery();
			
			if (!result.isBeforeFirst())
			{
				flag = false;
			}
			
			return flag;
	}
	
	public static boolean checkDuplicateEmailCode(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Select email from account_recovery where email = ?");
			boolean flag = true;
			
			prep.setString(1,  email);
			ResultSet result = prep.executeQuery();
			
			if (!result.isBeforeFirst())
			{
				flag = false;
			}
			
			return flag;
	}
	
	


}
