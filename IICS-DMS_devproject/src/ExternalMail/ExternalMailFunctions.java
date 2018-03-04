package ExternalMail;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.commons.fileupload.FileItem;

import com.ustiics_dms.databaseconnection.DBConnect;

public class ExternalMailFunctions {
	
	public static void SendMailToDirector (String firstName, String lastName, String emailAddress, String contactNumber, String affiliation, String subject, String message, FileItem fileData) throws SQLException, IOException 
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("INSERT INTO external_mail (firstName, lastName, emailAddress, contactNumber, affiliation, subject, message, file_name, file_data) VALUES (?,?,?,?,?,?,?,?,?)");
		
		prep.setString(1, firstName);
		prep.setString(2, lastName);
		prep.setString(3, emailAddress);
		prep.setString(4, contactNumber);
		prep.setString(5, affiliation);
		prep.setString(6, subject);
		prep.setString(7, message);
		prep.setString(8, fileData.getName());
		prep.setBinaryStream(9, fileData.getInputStream(), (int) fileData.getSize());
		
		prep.executeUpdate();
	}
}
