package com.ustiics_dms.controller.mail;

import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;


@WebServlet("/CreatePDF")
public class CreatePDF extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public CreatePDF() {
        super();

    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Document document = new Document(PageSize.A4);
		try {
			
			PdfWriter.getInstance(document, new FileOutputStream("IsoNumber"));
			document.addAuthor("sessionName");
			document.addTitle("Title");
			document.open();
			Paragraph paragraph = new Paragraph("Test 123");
			document.add(paragraph);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

}
