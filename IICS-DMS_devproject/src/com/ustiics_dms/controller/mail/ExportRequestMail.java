package com.ustiics_dms.controller.mail;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ustiics_dms.databaseconnection.DBConnect;
import com.ustiics_dms.model.Account;


@WebServlet("/ExportRequestMail")
public class ExportRequestMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public ExportRequestMail() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			HttpSession session = request.getSession();
			Account acc = (Account) session.getAttribute("currentCredentials");
			
			String id = request.getParameter("id");
			Connection con = DBConnect.getConnection();
			PreparedStatement prep = con.prepareStatement("SELECT * FROM request WHERE id = ? AND status = ?");
			prep.setString(1, id);
			prep.setString(2, "Approved");
			
			ResultSet rs = prep.executeQuery();
			rs.next();
			
			MailFunctions.saveMailInformation(rs.getString("type"), null, null, rs.getString("subject"), rs.getString("message"), rs.getString("sender_name"), rs.getString("sent_by"), rs.getString("department"), rs.getString("address_line1"), rs.getString("address_line2"), rs.getString("address_line3"), rs.getString("closing_remarks"));
			int latestID = MailFunctions.getIncrement();
			MailFunctions.addExportedMail (latestID, acc.getEmail());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
