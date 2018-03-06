package com.ustiics_dms.utility;

import javax.servlet.http.HttpSession;

public class SessionChecking {

	public static boolean checkSession(HttpSession session) 
	{
		boolean result = false;
		if (session.getAttribute("currentCredentials") == null) 
		{
			result = true;   
		} 
		
		return result;
	}

}
