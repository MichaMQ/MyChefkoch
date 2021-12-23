package chefkoch.util;

import org.apache.ws.commons.util.Base64;
import org.apache.ws.commons.util.Base64.DecodingException;

public class Base64Util {
	
	public static String encodeToBase64(String filePath) {
		byte[] pBuffer = FileUtil.readFileToBytes(filePath);
		String code = null;
		if(pBuffer.length > 0) {
			code = Base64.encode(pBuffer);
		}
		return code;
	}
	
	public static String encodeToBase64(byte[] pBuffer) {
		return Base64.encode(pBuffer);
	}
	
	public static byte[] decodeToBase64(String data) throws DecodingException {
		return Base64.decode(data);
	}

}
