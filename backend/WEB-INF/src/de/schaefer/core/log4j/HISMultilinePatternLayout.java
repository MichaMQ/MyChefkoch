package de.schaefer.core.log4j;

import org.apache.log4j.PatternLayout;
import org.apache.log4j.spi.LoggingEvent;

/**
 * Prefixes addition lines, so that no logging messages can be faked.
 *
 * @author brummermann
 */
public class HISMultilinePatternLayout extends PatternLayout {
    private static final String lineSeparator = System.getProperty("line.separator");

    /**
     * Creates a new HISMultilinePatternLayout
     */
    public HISMultilinePatternLayout() {
        super();
    }

    /**
     * Creates a new HISMultilinePatternLayout
     *
     * @param pattern @see org.apache.log4j.PatternLayout
     */
    public HISMultilinePatternLayout(String pattern) {
        super(pattern);
    }

    @Override
    public String format(LoggingEvent event) {
        String res =  super.format(event);
        res = res.replaceAll("(\r\n|\r|\n)(.)", lineSeparator + "    $2");
        return res;
    }

}
