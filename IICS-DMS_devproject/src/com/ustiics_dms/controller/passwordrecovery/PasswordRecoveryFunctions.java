package com.ustiics_dms.controller.passwordrecovery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.controller.logs.LogsFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.utility.AesEncryption;

/*
 * PasswordRecoveryFunctions.java
 * 	- a java class that contains static functions needed for Password Recovery specifically methods used to
 * 		interact with the database
 */
public class PasswordRecoveryFunctions {
	
	public static void addRecoveryCode(String email, String code) throws SQLException
	{
			Connection con = DBConnect.getConnection();

			PreparedStatement prep = con.prepareStatement("INSERT INTO account_recovery VALUES (?,?)");
			String encryptedCode = AesEncryption.encrypt(code);
				
			prep.setString(1,  email);
			prep.setString(2, encryptedCode);
				
			prep.executeUpdate();
			
			LogsFunctions.addLog("System", "Request Code", email, ManageTasksFunctions.getFullName(email), ManageTasksFunctions.getUserType(email), ManageTasksFunctions.getDepartment(email));
			
	}
	
	public static void deleteRecoveryCode(String email,String code) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("DELETE FROM account_recovery WHERE email = ? AND code = ?");
			String encryptedCode = AesEncryption.encrypt(code);
			prep.setString(1, email);
			prep.setString(2, encryptedCode);
			prep.executeUpdate();
			
	}
	
	public static boolean checkRecoveryCode(String email, String code) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email, code FROM account_recovery WHERE email = ? AND code = ?");
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
				PreparedStatement prep = con.prepareStatement("UPDATE accounts SET password = ? WHERE email = ?");
	
				prep.setString(1, AesEncryption.encrypt(password));
				prep.setString(2, email);
				
				prep.executeUpdate();
				LogsFunctions.addLog("System", "Password Change", email, ManageTasksFunctions.getFullName(email), ManageTasksFunctions.getUserType(email), ManageTasksFunctions.getDepartment(email));
				deleteRecoveryCode(email, code);
				result = true;
			}
			
			return result;
	}
	
	public static boolean checkEmailExists(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT email FROM accounts WHERE email = ?");
			boolean flag = true;
			
			prep.setString(1,  email);
			ResultSet result = prep.executeQuery();
			
			if (!result.isBeforeFirst())
			{
				flag = false;
			}
			return flag;
	}
	
	public static void deleteExistingRecoveryCode(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("DELETE FROM account_recovery WHERE email = ?");

			
			prep.setString(1,  email);
			prep.executeUpdate();
			

	}
	
}
