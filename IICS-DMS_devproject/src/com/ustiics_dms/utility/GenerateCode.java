package com.ustiics_dms.utility;

import java.util.Random;

public class GenerateCode {

	public static String generateRecoveryCode()
	{
		Random rand = new Random();

		int  number = 10000 + rand.nextInt(89999); //generate 5 digit code
		String code = Integer.toString(number);
		return code;
		
	}
}
