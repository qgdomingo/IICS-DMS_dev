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
			PreparedStatement prep = con.prepareStatement("SELECT sources_name, default_reference FROM sources_list "
					+ "UNION SELECT sources_name, default_reference FROM external_list ORDER BY sources_name");
		
			ResultSet rs = prep.executeQuery();

			return rs;
	}
	
	public static void addSource(String source) throws SQLException
	{
		String defaultReference = "EXT:"+ appendZeroes(getIncrement()) + getIncrement() + "-";
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_list (sources_name, default_reference) VALUES (?,?)");
		
		prep.setString(1, source);
		prep.setString(2, defaultReference);
		
		prep.executeUpdate();
		

	}
	
	public static int getIncrement() throws SQLException
	{
			int rows = 1;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT COUNT(sources_name) FROM external_list");
			

			ResultSet rs = prep.executeQuery();
			rs.next();
			rows += rs.getInt("COUNT(sources_name)");
			
			return rows;
	}
	
	public static String appendZeroes(int word)
	{
			int zeroes = 4 - String.valueOf(word).length();
			String append = "";
			for(int ct = 0 ; ct < zeroes ; ct ++)
			{
				append += "0";
			}
			
			return append;
	}
}
