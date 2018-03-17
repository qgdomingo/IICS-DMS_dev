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
		Class.forName(AesEncryption.decrypt("qmVJxaakjfR2RpWZtcWa3k9kaW5p+/zwF+Hn4LqRMBM="));
		String username = AesEncryption.decrypt("Awu84ohbyxEVYznIqhVNEw==");
		String password = AesEncryption.decrypt("v3+X9sB4qFpk/JPxNROFJATqcliC2XiS5d9zSzrJktA=");
		String url = AesEncryption.decrypt("FYrRIcMajDR9ZPaWrq4n0qqWQLegusLkL+7K4vclS53bcKAyJL8UOpgThQ31lbH2");
		try {
			connection = DriverManager.getConnection(url , username , password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
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
