package chefkoch.util;

import java.math.BigDecimal;

public class ObjectUtil {
	public static Boolean getBoolean(String value) {
		Boolean ret = null;
		String val = value;
		if(val != null) {
			val = value.trim().toUpperCase();
			if(value.equals("J") || value.equals("Y") || value.equals("T")) {
				ret = Boolean.TRUE;
			} else {
				ret = Boolean.FALSE;
			}
		}
		return ret;
	}
	
	public static Integer getInteger(String value) {
		Integer ret = null;
		if(value != null && !value.trim().isEmpty()) {
			ret = Integer.valueOf(value);
		}
		return ret;
	}
	
	public static BigDecimal getDecimal(String value) {
		BigDecimal ret = null;
		if(value != null && !value.trim().isEmpty()) {
			ret = BigDecimal.valueOf(Double.valueOf(value).doubleValue());
		}
		return ret;
	}
	
}
