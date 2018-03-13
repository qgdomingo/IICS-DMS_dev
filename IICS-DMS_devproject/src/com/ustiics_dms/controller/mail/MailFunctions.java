package com.ustiics_dms.controller.mail;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.FontSelector;
import com.itextpdf.text.pdf.PdfWriter;
import com.ustiics_dms.controller.fileupload.FileUploadFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.File;


public class MailFunctions {
	
	public static void saveMailInformation(String type, String recipient, String externalRecipient, String  subject, String message, String  name, String  sentBy, String department) throws SQLException, IOException, DocumentException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO mail (iso_number, type, external_recipient, subject, file_data, sender_name, sent_by, school_year, department) VALUES (?,?,?,?,?,?,?,?,?)");
			String isoNumber = getISONumber(department, type);
			InputStream pdf = createPdf(recipient, subject, name, message, isoNumber, sentBy);
			prep.setString(1, isoNumber);
			prep.setString(2, type);
			prep.setString(3, externalRecipient);
			prep.setString(4, subject);
			prep.setBinaryStream(5, pdf, pdf.available() );
			prep.setString(6, name);
			prep.setString(7, sentBy);
			prep.setString(8, ManageTasksFunctions.getSchoolYear());
			prep.setString(9, department);
			prep.executeUpdate();
			
			if(!(recipient.length() <= 0))
			{
				sendInternalMail(recipient);
	
				String des = ManageTasksFunctions.getFullName(sentBy) +" has sent you a mail, " + subject;
				NotificationFunctions.addNotification("Mail Page", des, recipient);
				
				ExternalMail.send(externalRecipient, subject, getIncrement(), "jlteoh23@gmail.com", "jed231096");
			}
	}
	
	public static String getISONumber(String department, String type) throws SQLException
	{

		Connection con = DBConnect.getConnection();
		String getDepartment = "SELECT counter, iso_number FROM iso_counter WHERE department_name = ? AND type = ?";
		PreparedStatement prep = con.prepareStatement(getDepartment);
		prep.setString(1, department);
		prep.setString(2, type);
		
		ResultSet counter = prep.executeQuery();
		counter.next();

		int updatedCounter = counter.getInt("counter") + 1 ;
		String updateCounter = "UPDATE iso_counter SET counter = ? WHERE department_name = ? AND type = ?";
		prep = con.prepareStatement(updateCounter);
		prep.setInt(1, updatedCounter);
		prep.setString(2, department);
		prep.setString(3, type);
		prep.executeUpdate();
	
		String isoNumber = getAcadYear() + counter.getString("iso_number") + appendZeroes(updatedCounter) + updatedCounter;
		
		return isoNumber;
		
	}
	
	public static String getAcadYear() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT start_year, end_year FROM academic_year");
			

			ResultSet rs = prep.executeQuery();
			
			rs.next();
			
			String start = rs.getString("start_year").substring(2);
			String end = rs.getString("end_year").substring(2);
			String year = start + "-" + end + "-";
			return year;
	}
	
	public static String appendZeroes(int word)
	{
			int zeroes = 2 - String.valueOf(word).length();
			String append = "";
			for(int ct = 0 ; ct < zeroes ; ct ++)
			{
				append += "0";
			}
			
			return append;
	}
	
	
	public static void sendInternalMail(String recipient) throws SQLException
	{
			List<String> emailList = Arrays.asList(recipient.split(","));
			Connection con = DBConnect.getConnection();

			for(String tempEmail : emailList)
			{
				String email = tempEmail.trim();

				PreparedStatement prep = con.prepareStatement("INSERT INTO sent_mail_to (id, recipient_mail, school_year) VALUES (?,?,?)");
				prep.setInt(1, getIncrement());
				prep.setString(2, email);
				prep.setString(3, ManageTasksFunctions.getSchoolYear());
				
				prep.executeUpdate();
				
			}
	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'mail'");
			ResultSet rs = prep.executeQuery();
			rs.next();

			return rs.getInt("Auto_increment")-1;
	}

	public static ResultSet getInbox(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT id FROM sent_mail_to WHERE recipient_mail = ?");
			
			prep.setString(1, email);
			
			ResultSet rs = prep.executeQuery();

			return rs;
	}
	
	public static ResultSet getInboxInformation(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE id = ?");
			
			prep.setString(1, id);
			
			ResultSet rs = prep.executeQuery();
			

			return rs;
	}
	
	public static ResultSet getSentMail(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE sent_by = ?");
			
			prep.setString(1, email);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
	
	//Requests
	public static void forwardRequestMail(String type, String recipient, String externalRecipient, String  subject, String  message, String  name, String  sentBy, String userType, String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO request (type, recipient, external_recipient, subject, message, sender_name, sent_by, department) VALUES (?,?,?,?,?,?,?,?)");
			prep.setString(1, type);
			prep.setString(2, recipient);
			prep.setString(3, externalRecipient);
			prep.setString(4, subject);
			prep.setString(5, message);
			prep.setString(6, name);
			prep.setString(7, sentBy);
			prep.setString(8, department);
			prep.executeUpdate();

			String des = name +" sent you a mail request, "+ subject + ", for your approval.";
			NotificationFunctions.addNotification("Request Mail Page", des, FileUploadFunctions.getGroupByDepartment(department, sentBy));
	}
	
	public static ResultSet getRequestMail(String department) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE department = ?");
			
			prep.setString(1, department);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
	
	public static ResultSet getRequesterMail(String email) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE sent_by = ? UNION SELECT * FROM approved_request WHERE sent_by = ? ");
			
			prep.setString(1, email);
			prep.setString(2, email);
			ResultSet rs = prep.executeQuery();
		

			return rs;
	}
	
	public static void approveRequestMail(String id) throws SQLException, IOException, DocumentException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE request SET status = ? WHERE id = ?");
			prep.setString(1, "Approved");
			prep.setString(2, id);
			
			prep.executeUpdate();
			
			ResultSet requestInfo = getRequestInformation(id);
			
			requestInfo.next();
			
			String subject = requestInfo.getString("subject");
			String name = requestInfo.getString("sender_name");
			String department = requestInfo.getString("department");
			String sentBy = requestInfo.getString("sent_by");
			/*
			ResultSet requestInfo = getRequestInformation(id);
			
			requestInfo.next();
			
			String type = requestInfo.getString("type");
			String recipient = "mangkanor@gmail.com";//requestInfo.getString("recipient");
			String externalRecipient = requestInfo.getString("external_recipient");
			String subject = requestInfo.getString("subject");
			String message = requestInfo.getString("message");
			String name = requestInfo.getString("sender_name");
			String sentBy = requestInfo.getString("sent_by");
			String department = requestInfo.getString("department");
			
			approveRequest(type, recipient, externalRecipient, subject, message, name, sentBy, department);
			*/
			String head = FileUploadFunctions.getGroupHead(department);
			String des = head +" has approved your mail request, "+ subject;
			NotificationFunctions.addNotification("Request Mail Page", des, sentBy);
			//deleteRequest(id);

	}
	
	public static ResultSet getRequestInformation(String id) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE id = ?");
			prep.setString(1, id);
			
			ResultSet rs = prep.executeQuery();
		
			return rs;
	}
	
	public static void deleteRequest(String id) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("DELETE FROM request WHERE id = ?");
			prep.setString(1, id);
			
			prep.executeUpdate();
			
	}
	// to be updated
	public static void editRequestNote(String editedNote, String id) throws SQLException
	{

			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE request SET note = ? WHERE id = ?");
			
			prep.setString(1, editedNote);
			prep.setString(2, id);
			
			prep.executeUpdate();
			
	}
	
	public static void updateReadTimeStamp(String emailID, String email) throws SQLException
	{
		if(hasRead(emailID,email))
		{
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE sent_mail_to SET acknowledgement = ?, time_read = ? WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, "Read");
			prep.setString(2, timeStamp);
			prep.setString(3, emailID);
			prep.setString(4, email);
			
			prep.executeUpdate();
		}
			
	}
	
	public static void updateAcknowledgeTimeStamp(String emailID, String email) throws SQLException
	{
		if(hasAcknowledged(emailID,email))
		{
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("UPDATE sent_mail_to SET acknowledgement = ?, time_acknowledged = ? WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, "Acknowledged");
			prep.setString(2, timeStamp);
			prep.setString(3, emailID);
			prep.setString(4, email);
			
			prep.executeUpdate();
			
			String des = ManageTasksFunctions.getFullName(email) +" acknowledged your mail, " + getMailTitle(emailID);
			NotificationFunctions.addNotification("Mail Page", des, getMailSender(emailID));
		}
	}
	
	public static String getMailTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT subject FROM mail WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("title");
			
	}
	
	public static String getMailSender(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT sent_by FROM mail WHERE id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		rs.next();
		
		return rs.getString("sent_by");
			
	}
	
	public static boolean hasRead(String id, String email) throws SQLException
	{
			boolean result = true;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT acknowledgement FROM sent_mail_to WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, id);
			prep.setString(2, email);
			
			ResultSet rs = prep.executeQuery();
		
			if(rs.getString("acknowledgement").equals("Read"))
			{
				result = false;
			}
			
			return result;
	}
	
	public static boolean hasAcknowledged(String id, String email) throws SQLException
	{
			boolean result = true;
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT acknowledgement FROM sent_mail_to WHERE id = ? AND recipient_mail = ?");
			prep.setString(1, id);
			prep.setString(2, email);
			
			ResultSet rs = prep.executeQuery();
		
			if(rs.getString("acknowledgement").equals("Acknowledged"))
			{
				result = false;
			}
			
			return result;
	}
	public static InputStream createPdf(String recipient, String subject, String name, String message, String isoNumber, String email) throws IOException, DocumentException, SQLException {
	    Document doc = new Document(PageSize.A4, 50, 50, 50, 50);
	       
	    ByteArrayOutputStream out = new ByteArrayOutputStream();            
	    PdfWriter writer;
	    
	    writer = PdfWriter.getInstance(doc, out);
	            
	    doc.open();
	    writer.setStrictImageSequence(true);
	    
	    float fntSize, lineSpacing;
	    fntSize = 11.5f;
	    lineSpacing = 20f;
	    
	    String month = getMonth();
	    String day = getDay();
	    String year = getYear();
	    String date = day + " " + month + " " + year;
	    
		String title = getTitle(email) + " " + name;
		String position = getPosition(email);
		
		Paragraph isoNumberPara = new Paragraph(new Phrase(lineSpacing, isoNumber, FontFactory.getFont(FontFactory.HELVETICA,fntSize)));
		
		Paragraph messagePara = new Paragraph(new Phrase(lineSpacing, message, FontFactory.getFont(FontFactory.HELVETICA,fntSize)));
		
		messagePara.setAlignment(Element.ALIGN_JUSTIFIED);
		
		Paragraph datePara = new Paragraph(new Phrase(lineSpacing, date, FontFactory.getFont(FontFactory.HELVETICA,fntSize)));
		
		Paragraph closingPara = new Paragraph(new Phrase(lineSpacing, "Your Sincerely,", FontFactory.getFont(FontFactory.HELVETICA,fntSize)));
		
		Paragraph signatoryPara = new Paragraph(new Phrase(lineSpacing, title, FontFactory.getFont(FontFactory.HELVETICA_BOLD,fntSize)));
		
		Paragraph positionPara = new Paragraph(new Phrase(lineSpacing, position, FontFactory.getFont(FontFactory.HELVETICA,fntSize)));
		
		
		doc.add(isoNumberPara);
		doc.add(datePara);
		doc.add(messagePara);
		doc.add(Chunk.NEWLINE);
		doc.add(Chunk.NEWLINE);
		doc.add(closingPara);
		doc.add(Chunk.NEWLINE);
		doc.add(Chunk.NEWLINE);
		doc.add(signatoryPara);
		doc.add(positionPara);
	    doc.close();
	        
	    return new ByteArrayInputStream(out.toByteArray());
	}
	
	public static String getMonth() 
	{
		Calendar mCalendar = Calendar.getInstance();    
		String month = mCalendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
		
		return month;
        
    }
	public static String getDay() 
	{
		DateFormat dateFormat = new SimpleDateFormat("dd");
		Date date = new Date();
		String day = dateFormat.format(date);
		
		return day;
        
    }
	
	public static String getYear() 
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy");
		Date date = new Date();
		String year = dateFormat.format(date);
		
		return year;
        
    }
	public static File getPdf (int id) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE id = ?");
	       prep.setInt(1, id);
	       
	       ResultSet rs = prep.executeQuery();
	       
	       if (rs.next()) 
	       {
	           String fileName = rs.getString("iso_number") + ".pdf";
	           Blob fileData = rs.getBlob("file_data");
	           String description = "";

	           return new File(id, fileName, fileData, description);
	       }
	       return null;
	}

	public static void addExportedMail (int id, String email) throws SQLException 
	{
			Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("INSERT INTO exported_mail (id, owner) VALUES (?,?)");
	       prep.setInt(1, id);
	       prep.setString(2, email);
	       prep.executeUpdate();  
	}
	
	public static List <String> getExportedMailID (String email) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM exported_mail");
	       
	       ResultSet rs = prep.executeQuery();
	       
	      
	       List <String> idValues = new ArrayList <String> ();
	       while(rs.next())
	       {
	    	   idValues.add(rs.getString("id"));
	    	   
	       }
	       
	       return idValues;
	}
	
	public static ResultSet getExportedMail (String email, String id) throws SQLException 
	{
		   Connection con = DBConnect.getConnection();
			
	       PreparedStatement prep = con.prepareStatement("SELECT * FROM mail WHERE sent_by = ? AND id = ?");
	       prep.setString(1, email);
	       prep.setString(2, id);
	       ResultSet rs = prep.executeQuery();
	       
	       return rs;
	}
	
	public static void approveRequest(String type, String recipient, String externalRecipient, String  subject, String message, String  name, String  sentBy, String department) throws SQLException, IOException, DocumentException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("INSERT INTO approved_request (iso_number, type, external_recipient, subject, file_data, sender_name, sent_by) VALUES (?,?,?,?,?,?,?)");
			String isoNumber = getISONumber(department, type);
			InputStream pdf = createPdf(recipient, subject, name, message, isoNumber, sentBy);
			prep.setString(1, isoNumber);
			prep.setString(2, type);
			prep.setString(3, externalRecipient);
			prep.setString(4, subject);
			prep.setBinaryStream(5, pdf, pdf.available() );
			prep.setString(6, name);
			prep.setString(7, sentBy);
			
			prep.executeUpdate();	
	}
	
	public static String getTitle(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("SELECT title FROM accounts WHERE email = ?");
		
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		String title = "";
		if(rs.next())
		{
			title = rs.getString("title");
		}
		
		return title;
	}
	
	public static String getPosition(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		
		PreparedStatement prep = con.prepareStatement("SELECT user_type FROM accounts WHERE email = ?");
		
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		String position = "";
		if(rs.next())
		{
			position = rs.getString("user_type");
		}
		
		return position;
	}
	
	
}
