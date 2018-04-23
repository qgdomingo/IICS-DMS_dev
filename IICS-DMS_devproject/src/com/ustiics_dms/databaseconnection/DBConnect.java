package com.ustiics_dms.databaseconnection;

import java.sql.*;

import com.ustiics_dms.utility.AesEncryption;

public class DBConnect {
	
  	private DBConnect()
	{
		
	}

	private static Connection connection;
	
	private static Connection getDBConnection() {
		
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			String username = "root";
			String password = "";
			String url = "jdbc:mysql://localhost:3306/iics_dms";
			connection = DriverManager.getConnection(url , username , password);
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return connection;
	}
	
	public static Connection getConnection() {
		return ( (connection!=null)
				 ?connection
				 : getDBConnection()		 
				);
	}
}
