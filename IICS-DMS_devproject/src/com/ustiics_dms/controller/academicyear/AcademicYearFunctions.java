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
			
			PreparedStatement prep = con.prepareStatement("UPDATE academic_year SET status = ?");

			prep.setString(1, "Past");
			
			prep.executeUpdate();
			
			prep = con.prepareStatement("INSERT INTO academic_year (start_year, end_year, status) VALUES (?,?,?)");

			prep.setInt(1, yearStart);
			
			prep.setInt(2, yearEnd);
			
			prep.setString(3, "Current");
		
			prep.executeUpdate();
			
			setCounterToZero();
			
	}
	
	public static void setCounterToZero() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("UPDATE external_list SET counter = ?");
			
			prep.setInt(1, 0);
			
			prep.executeUpdate();
			
			prep = con.prepareStatement("UPDATE iso_counter SET counter = ?");
			
			prep.setInt(1, 0);
			
			prep.executeUpdate();
			
	}
	
	public static ResultSet getAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year WHERE status = ?");
			
			prep.setString(1, "Current");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
	
	public static String getAcademicYearMail() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year WHERE status = ?");
			
			prep.setString(1, "Current");
			
			ResultSet rs = prep.executeQuery();
			rs.next();
			return "A.Y. " + rs.getString("start_year") + "-" + rs.getString("end_year");
	}
	
	public static ResultSet getAllAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year ORDER BY start_year DESC");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
}
