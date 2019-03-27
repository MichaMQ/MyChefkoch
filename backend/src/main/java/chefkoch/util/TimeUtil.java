package chefkoch.util;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TimeUtil {
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(StringUtil.class);
	private final static long ONE_MINUTE_IN_MILLIS = 60000;//millisecs
	
	public static Date addMinutesToDate(int minutes, Date beforeTime){
    long curTimeInMs = beforeTime.getTime();
    Date afterAddingMins = new Date(curTimeInMs + (minutes * ONE_MINUTE_IN_MILLIS));
    return afterAddingMins;
}
}
