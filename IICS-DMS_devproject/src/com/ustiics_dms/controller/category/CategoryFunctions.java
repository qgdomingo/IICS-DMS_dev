package com.ustiics_dms.controller.category;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class CategoryFunctions {
	
	public static ResultSet getCategoryList() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT category_name FROM category_list ORDER BY category_name");
		
			ResultSet rs = prep.executeQuery();

			return rs;
	}
	
	public static void addCategory(String category) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO category_list (category_name) VALUES (?)");
			prep.setString(1, category);

			
			prep.executeUpdate();

	}

}
