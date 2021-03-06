package com.ustiics_dms.controller.calendar;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.ustiics_dms.controller.mail.MailFunctions;
import com.ustiics_dms.controller.managetasks.ManageTasksFunctions;
import com.ustiics_dms.controller.notifications.NotificationFunctions;
import com.ustiics_dms.databaseconnection.DBConnect;

public class ManageEventsFunctions {
	
	public static void addEvent(String title, String location, int allDayEvent, String startDateTime, String endDateTime, String description, String createdBy, String invited[], int displayInvitedList) throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = 
					con.prepareStatement("INSERT INTO events (title, location, all_day_event, start_date, end_date, description, created_by, display_invited) VALUES (?,?,?,?,?,?,?,?)");
			prep.setString(1, title);
			prep.setString(2, location);
			prep.setInt(3, allDayEvent);
			prep.setString(4, startDateTime);
			prep.setString(5, endDateTime);
			prep.setString(6, description);
			prep.setString(7, createdBy);
			prep.setInt(8, displayInvitedList);
			prep.executeUpdate(); 

			if(invited != null) {
				inviteUsers(invited);
				
				String des = getFullName(createdBy) +" is inviting you to an event, "+ title;
				NotificationFunctions.addNotification("Calendar Page", des, invited);
			}
	}
	
	public static void inviteUsers(String invited[]) throws SQLException
	{
			int id = getIncrement();
			Connection con = DBConnect.getConnection();
			
			for(String email: invited)
			{
				PreparedStatement prep = con.prepareStatement("INSERT INTO events_invitation (event_id, email) VALUES (?,?)");
				
				prep.setInt(1, id);
				prep.setString(2, email);
				prep.executeUpdate(); 
			}
	}
	
	public static String getFullName(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT full_name FROM accounts WHERE email = ?");
		prep.setString(1, email);
		
		ResultSet rs = prep.executeQuery();
		
		String fullName = "";
		
		if(rs.next())
		{
			fullName = rs.getString("full_name");
		}
		
		return fullName;
			
	}
	
	public static String getEventTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet rs = prep.executeQuery();
		
		String title = "";
		
		if(rs.next())
		{
			title = rs.getString("title");
		}
		
		return title;
		
			
	}
	
	public static int getIncrement() throws SQLException
	{
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SHOW TABLE STATUS WHERE `Name` = 'events'");
			ResultSet rs = prep.executeQuery();
			int increment = 0;
			
			if(rs.next())
			{
				increment = rs.getInt("Auto_increment") - 1;
			}
			

			return increment;
	}
	
	public static ResultSet getCalendarEventsData(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, status, description, created_by FROM events WHERE created_by = ? "
				+ "UNION SELECT event_id, title, location, start_date, end_date, status, description, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted')");
		
		prep.setString(1, email);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getPendingInvitations(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id FROM events_invitation WHERE email = ? AND (status = 'No Response' OR resend_invite = 1) " +
				"AND event_id IN (SELECT event_id FROM events WHERE status = 'Continued')");
		prep.setString(1, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventInvitedList(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email, status, response, date_response FROM events_invitation WHERE event_id = ?");
		prep.setString(1, id);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventList(String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, status, created_by FROM events WHERE created_by = ? "
				+ "UNION SELECT event_id, title, location, start_date, end_date, status, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted')");
		
		prep.setString(1, email);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventsData(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, all_day_event, start_date, end_date, description, created_by, display_invited, status FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		return prep.executeQuery();
	}
	
	public static ResultSet getEventResponseDetails(String id, String email) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT status, response, date_response FROM events_invitation "
				+ "WHERE event_id = ? AND email = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		
		return prep.executeQuery();
	}
	
	public static void updateInvitationResponse(String id, String email, String response, String responseText) throws SQLException {
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events_invitation SET status = ?, response = ?, resend_invite = 0 WHERE email = ? AND event_id = ?");
		prep.setString(1, response);
		prep.setString(2, responseText);
		prep.setString(3, email);
		prep.setString(4, id);
		
		prep.executeUpdate(); 
		
		String des = getFullName(email) +" has responded " + response + " to your event, "+ retrieveEventTitle(id);
		NotificationFunctions.addNotification("Calendar Page", des, retrieveEventOwner(id) );
	}
	
	public static ResultSet getUpcomingEvents(String email) throws SQLException
	{
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE created_by = ? "
				+ "AND start_date >= ? AND status = 'Continued'"
				+ "UNION SELECT event_id, title, location, start_date, end_date, created_by FROM events WHERE event_id IN (SELECT event_id FROM events_invitation "
				+ "WHERE email = ? AND status = 'Accepted') AND start_date >= ? AND status = 'Continued' ORDER BY start_date ASC");
		
		prep.setString(1, email);
		prep.setString(2, timeStamp);
		prep.setString(3, email);
		prep.setString(4, timeStamp);
		
		return prep.executeQuery();
	}
	
	public static void updateEvent(String email, String id, String title, String location, int allDayEvent, String startDateTime, String endDateTime, String description, String invited[], int displayInvitedList) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events SET title = ?, location = ?, all_day_event = ?, start_date = ?, end_date = ?, description = ?, display_invited = ? WHERE event_id = ? AND created_by = ?");
		prep.setString(1, title);
		prep.setString(2, location);
		prep.setInt(3, allDayEvent);
		prep.setString(4, startDateTime);
		prep.setString(5, endDateTime);
		prep.setString(6, description);
		prep.setInt(7, displayInvitedList);
		prep.setString(8, id);
		prep.setString(9, email);
				
		prep.executeUpdate(); 

		assiginEditUsers(invited, id);
	}
	
	public static void assiginEditUsers(String invited[], String id) throws SQLException
	{
		String tempID = id;
		Connection con = DBConnect.getConnection();
		String des = "";
		
		if(invited != null) { 
			String eventOwner = getFullName(retrieveEventOwner(tempID));
			String title = retrieveEventTitle(tempID);
			String updateInvitationSQL = "";
			boolean ifExistingOnInvitation;
			
			for(String user: invited)
			{
				ifExistingOnInvitation = checkExists(tempID, user);
				
				if( !ifExistingOnInvitation )
				{
					updateInvitationSQL = "INSERT INTO events_invitation (event_id, email) VALUES (?,?)";
					des = eventOwner +" is inviting you to an event, "+ title;
				}
				else {
					updateInvitationSQL = "UPDATE events_invitation SET resend_invite = 1 WHERE event_id = ? AND email = ?";
					des = eventOwner +" has updated the event details of "+ title + ". The event invitation has been resent.";
				}
				
				PreparedStatement prep = con.prepareStatement(updateInvitationSQL);
				prep.setString(1, tempID);
				prep.setString(2, user);
				prep.executeUpdate(); 
				NotificationFunctions.addNotification("Calendar Page", des, user);
			}
						
			String deleteNotInvitedUserSQL = "DELETE FROM events_invitation WHERE event_id = ?";
			
			for(String user: invited)
			{
				deleteNotInvitedUserSQL += " AND NOT email = ?";
			}
			
			PreparedStatement prep = con.prepareStatement(deleteNotInvitedUserSQL);
			prep.setString(1, tempID);
			
			int userCount = 2;
			
			for(String user: invited)
			{
				prep.setString(userCount, user);
				userCount++;
			}
			prep.executeUpdate(); 
						
		}
		else
		{
			PreparedStatement prep = con.prepareStatement("DELETE FROM events_invitation WHERE event_id = ?");
			prep.setString(1, tempID);
			prep.executeUpdate(); 
		}
	}
	
	public static boolean checkExists(String id, String email) throws SQLException 
	{
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT event_id FROM events_invitation WHERE event_id = ? AND email = ?");
		prep.setString(1, id);
		prep.setString(2, email);
		ResultSet rs = prep.executeQuery();
		
		boolean flag = false;
		
		if (rs.isBeforeFirst())
		{
			flag = true;
		}
		return flag;
		
	}
	
	public static void cancelEvent(String id, String email) throws SQLException
	{
		String eventOwner = getFullName(retrieveEventOwner(id));
		String title = retrieveEventTitle(id);
		
		String des = eventOwner +" has cancelled the event, "+ title;
		NotificationFunctions.addNotification("Calendar Page", des, retrieveInvitedUsers(id));
		
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("UPDATE events SET status = ? WHERE event_id = ? AND created_by = ?");
		prep.setString(1, "Cancelled");
		prep.setString(2, id);
		prep.setString(3, email);
		prep.executeUpdate(); 
	}
	
	public static String retrieveEventOwner(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT created_by FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet owner = prep.executeQuery();
		owner.next();
		
		return owner.getString("created_by");
	}
	
	public static String retrieveEventTitle(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT title FROM events WHERE event_id = ?");
		prep.setString(1, id);
		
		ResultSet owner = prep.executeQuery();
		owner.next();
		
		return owner.getString("title");
	}
	
	public static String[] retrieveInvitedUsers(String id) throws SQLException
	{
		Connection con = DBConnect.getConnection();
		PreparedStatement prep = con.prepareStatement("SELECT email FROM events_invitation WHERE event_id = ?");
		prep.setString(1, id);
		
		ArrayList<String> invited = new ArrayList<String>();
		ResultSet eventList = prep.executeQuery();
		
		while(eventList.next())
		{
			invited.add(eventList.getString("email"));
		}
		
		return invited.toArray(new String[invited.size()]);
	}
	
	public static InputStream createPDF (String id) throws SQLException, FileNotFoundException, DocumentException 
	{
		  ByteArrayOutputStream out = new ByteArrayOutputStream();            
		  PdfWriter writer;
		    
		    
		  Connection con = DBConnect.getConnection();
			
		  PreparedStatement eventDetails = con.prepareStatement("SELECT * FROM events WHERE event_id = ?");
		  eventDetails.setString(1, id);
		  ResultSet detailResults = eventDetails.executeQuery();
		  detailResults.next();
		  PreparedStatement eventInvitations = con.prepareStatement("SELECT * FROM events_invitation WHERE event_id = ?");
		  eventInvitations.setString(1, id);
		  ResultSet invitationResults = eventInvitations.executeQuery();
		  invitationResults.next();
		  Document document = new Document();
		  writer = PdfWriter.getInstance(document, out);
		  
		  document.open();
		  Paragraph titlePara = new Paragraph("Title: " + detailResults.getString("title"));
		  titlePara.setIndentationLeft(55f);
		  document.add(titlePara);
		  
		  Paragraph locationPara = new Paragraph("Location: " + detailResults.getString("location"));
		  locationPara.setIndentationLeft(55f);
		  document.add(locationPara);
		  
		  Paragraph startDatePara = new Paragraph("Start Date: " + detailResults.getString("start_date"));
		  startDatePara.setIndentationLeft(55f);
		  document.add(startDatePara);
		  
		  Paragraph endDatePara = new Paragraph("End Date: " + detailResults.getString("end_date"));
		  endDatePara.setIndentationLeft(55f);
		  document.add(endDatePara);
		  
		  Paragraph descriptionPara = new Paragraph("Description: " + detailResults.getString("description"));
		  descriptionPara.setIndentationLeft(55f);
		  document.add(descriptionPara);

		  document.add(Chunk.NEWLINE);
		  PdfPTable table = new PdfPTable(new float[] { 8, 5, 6 , 4 });
		  table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);

		  table.addCell("Name");
	      table.addCell("Status");
	      table.addCell("Remarks");
		  
		  table.setHeaderRows(1);
		  PdfPCell[] cells = table.getRow(0).getCells(); 
		  for (int j=0;j<cells.length;j++){
		     cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
		  }
	      while(invitationResults.next())
	      {
	    	     table.addCell(MailFunctions.getFullName(invitationResults.getString("email")));
	             table.addCell(invitationResults.getString("status"));
	             table.addCell(invitationResults.getString("response"));
	      }

	      document.add(table);
		  document.close();

		  return new ByteArrayInputStream(out.toByteArray());

	}
}