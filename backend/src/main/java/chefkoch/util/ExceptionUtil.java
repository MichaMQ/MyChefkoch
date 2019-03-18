package chefkoch.util;

public class ExceptionUtil {
	public static void testArgument(Object argument) {
		ExceptionUtil.testArgument(argument, null);
	}
	
	public static void testArgument(Object argument, String msg) {
		if(argument == null) {
			String infoMsg = "Eines der übergemenen Argumente darf nicht null sein!";
			if(msg != null && !msg.isEmpty()) {
				infoMsg = msg;
			}
			throw new IllegalArgumentException(infoMsg);
		}
	}
}
