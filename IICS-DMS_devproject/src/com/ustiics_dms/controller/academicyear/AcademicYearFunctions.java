package com.ustiics_dms.controller.academicyear;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ustiics_dms.databaseconnection.DBConnect;

public class AcademicYearFunctions {

	public static void updateYear( int yearStart, int yearEnd) throws SQLException
	{
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE academic_year SET start_year = ?, end_year = ?");
			
			prep.setInt(1, yearStart);
			prep.setInt(2, yearEnd);
		
			prep.executeUpdate();
			
	}
	
	public static ResultSet getAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
}
