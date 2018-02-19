package com.ustiics_dms.controller.sources;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class SourcesFunctions {

	public static ResultSet getSourcesList() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT sources_name FROM sources_list UNION SELECT sources_name FROM external_list");
		
			ResultSet rs = prep.executeQuery();

			return rs;
	}
	
	public static void addSource(String source) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO sources_list (sources_name) VALUES (?)");
			prep.setString(1, source);

			
			prep.executeUpdate();

	}
}
