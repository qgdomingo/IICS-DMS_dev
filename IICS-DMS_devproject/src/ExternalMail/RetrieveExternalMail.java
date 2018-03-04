package ExternalMail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSet;
import com.ustiics_dms.model.Account;
import com.ustiics_dms.model.ExternalMail;


@WebServlet("/RetrieveExternalMail")
public class RetrieveExternalMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public RetrieveExternalMail() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<ExternalMail> external = new ArrayList<ExternalMail>();
	    response.setCharacterEncoding("UTF-8");
		
	    HttpSession session = request.getSession();
	    Account acc = (Account) session.getAttribute("currentCredentials");
		try {
			
			ResultSet externalMail = (ResultSet) ExternalMailFunctions.getExternalMail();
			
			while(externalMail.next())
			{
				external.add(new ExternalMail(
						externalMail.getString("id"),
						externalMail.getString("thread_number"),
						externalMail.getString("first_name"),
						externalMail.getString("last_name"),
						externalMail.getString("email"),
						externalMail.getString("contact_number"),
						externalMail.getString("affiliation"),
						externalMail.getString("subject"),
						externalMail.getString("message"),
						externalMail.getString("file_name")
						 ));		
			}
			String json = new Gson().toJson(external);
			
		    response.setContentType("application/json");
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.getWriter().write(json);
		   
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	}

}
