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

			// remote - qmVJxaakjfR2RpWZtcWa3k9kaW5p+/zwF+Hn4LqRMBM=
			// com.mysql.jdbc.Driver
			
			String username = "root";
			// remote - Awu84ohbyxEVYznIqhVNEw==
			// local - root
			// iics_dms_web01
			
			String password = "";
			// remote - v3+X9sB4qFpk/JPxNROFJATqcliC2XiS5d9zSzrJktA=
			// local -
			// C4ll1twh4ty0uw4nt
			
			String url = "jdbc:mysql://localhost:3306/iics_dms";
			// remote - FYrRIcMajDR9ZPaWrq4n0qqWQLegusLkL+7K4vclS53bcKAyJL8UOpgThQ31lbH2
			// local - jdbc:mysql://localhost:3306/iics_dms
			// jdbc:mysql://ustiics-dms.me:3306/iics_dms 
			
			connection = DriverManager.getConnection(url , username , password);
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return connection;
	}
	
	public static Connection getConnection() {
//		if (connection == null) {
//			getDBConnection();
//		} 
//		else {
//			try {
//				connection.close();
//			} catch (SQLException e) {
//				e.printStackTrace();
//			}
//			getDBConnection();
//		}
//		
//		return connection;
		return ( (connection!=null)
				 ?connection
				 : getDBConnection()		 
				);
	}
}
