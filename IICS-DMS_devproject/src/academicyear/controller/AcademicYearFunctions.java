package academicyear.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import databaseConnection.DBConnect;

public class AcademicYearFunctions {

	public static void updateYear( int yearStart, String monthStart, int yearEnd, String monthEnd) throws SQLException
	{
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("update academic_year set start_year = ? , start_month = ? , end_year = ? , end_month = ?");
			
			prep.setInt(1, yearStart);
			prep.setString(2, monthStart);
			prep.setInt(3, yearEnd);
			prep.setString(4, monthEnd);
		
			prep.executeUpdate();
			
	}
	
	public static ResultSet getAcademicYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("Select * from academic_year");
			
			ResultSet rs = prep.executeQuery();
			
			return rs;
	}
}
