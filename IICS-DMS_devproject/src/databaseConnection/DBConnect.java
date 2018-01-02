package databaseConnection;

import java.sql.*;

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
