package utility;

import java.util.Random;
import encryption.AesEncryption;

public class GenerateCode {

	public static String generateRecoveryCode()
	{
		Random rand = new Random();

		int  number = rand.nextInt(99999) + 10000; //generate 5 digit code
		String code = Integer.toString(number);
		return code;
		
	}
}
