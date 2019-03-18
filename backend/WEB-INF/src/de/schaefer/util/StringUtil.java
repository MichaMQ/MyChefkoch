package de.schaefer.util;

import java.util.Map;

import org.apache.log4j.Logger;

public class StringUtil {
	private static Logger logger = Logger.getLogger(StringUtil.class);

	public static String toString(Object o) {
		if(o == null) {
			return "";
		} else {
			return o.toString();
		}
	}
	
	/**
   * Ersetzt Werte in [...], wenn vorhanden; Nicht vorhandene Werte werden
   * durch den Leerstring ersetzt
   *
   * @param arg Der zu behandelnde String.
   * @param prop Properties mit zu ersetzenden Werten.
   * @return String mit ersetzten Werten
   */
  public static String argsubst(String arg, Map<?, ?> prop) {
      return StringUtil.argsubst(arg, null, prop, false);
  }

  /**
   * Ersetzt Werte in [...], hierbei kann der Platzhalter ein Token #
   * enthalten, welches es ermöglicht, Werte aus einem Properties-Objekt zu
   * lesen, welches Teil der Map ist.
   *
   * @param arg Der zu behandelnde String.
   * @param prefix Eventuelles Präfix in den Properties.
   * @param prop Properties mit zu ersetzenden Werten.
   * @param keep true: nicht gefundene Parameter bleiben erhalten false: nicht
   *        gefundene Parameter werden durch den Leerstring ersetzt
   * @return String mit ersetzten Werten
   */
  public static String argsubst(String arg, String prefix, Map<?, ?> prop, boolean keep) {
      if ((arg == null) || (prop == null)) {
          return arg;
      }
      StringBuffer parlist = new StringBuffer();
      String work = arg;
      // boolean inWherePart = true;
      while (work.length() > 0) {
          // logger.info("*** work=" + work);

          // Naechste Variablen finden
          int backslaschPos = work.indexOf('\\');
          int i = work.indexOf('[');
          boolean replace;
          // Wenn ein \ direkt vor [...] existiert dann soll dies nicht als
          // Variable angesehen werden und nicht ersetzt werden
          // kann bei Matches in SELECTS benutzt werden
          if ((backslaschPos > -1) && (backslaschPos + 1 == i)) {
              replace = false;
          } else {
              replace = true;
          }
          if ((i > -1) && replace) {
              if (i > 0) {
                  parlist.append(work.substring(0, i));
              }
              i++;
              work = work.substring(i);

              // Ende der Variable finden
              int j = work.indexOf(']');
              if (j < 0) {
                  logger.info("argsubst: ]" + " fehlt in " + arg);
                  parlist.append(work);
                  break;
              }
              int k = work.indexOf('[');
              if ((k > -1) && (k < j)) {
                  // Auessere [ einer verschachtelten Variable:
                  // //*[@value='[text]']
                  parlist.append("[");
                  continue;
              }

              String par = work.substring(0, j);
              if ((par != null) && (par.length() > 0)) {
                  // Bestimmte Zeichen in vermeintlichen Variablennamen deuten
                  // an,
                  // dass das gar keine Variable ist:
                  // [2,3] Informix-Syntax fuer einen Teilstring
                  // = ( @ deuten auf einen xpath-Ausdruck hin
                  // "(..." muss ersetzt werden!
                  if ((par.indexOf(",") > -1) || (par.indexOf('=') > -1 /*
                   * || par.indexOf("(") >
                   * -1
                   */) || (par.indexOf("@") > -1)) {
                      // logger.info("--- argsubst: " + par);
                      parlist.append("[" + par + "]");
                  } else {
                      String key = par;
                      if (prefix != null) {
                          key = prefix + "." + par;
                      }
                      String parval = null;
                      Object parvalObj = null;

                      if (key.indexOf('#') > -1) {
                          String[] keyNewArr = key.split("#");
                          Map<?, ?> tmpProp = (Map<?, ?>) prop.get(keyNewArr[0]);
                          if ((tmpProp != null) && (keyNewArr.length > 1)) {
                              parvalObj = tmpProp.get(keyNewArr[1]);
                          } else {
                          	logger.info("tmpProp is " + tmpProp + "  for " + key);
                          }
                      } else {
                          parvalObj = prop.get(key);
                      }

                      if (parvalObj != null) {
                          parval = parvalObj.toString();
                      }

                      if ((parval != null) && (parval.trim().length() > 0)) {
                          parlist.append(parval);
                      } else {
                          if (prefix != null) {
                              key = par;
                              Object temp = prop.get(key);
                              if (temp != null) {
                                  parval = temp.toString();
                              }
                              // logger.info("-B- argsubst: key=" + key + "
                              // parval=" + parval);
                              if ((parval != null) && (parval.trim().length() > 0)) {
                                  parlist.append(parval);                                }
                          }
                      }
                      // evtl. defaults probieren ...
                      // logger.info("-B- argsubst: key=" + key + " parval="
                      // + parval);
                      if (((parval == null) || (parval.length() < 1)) && keep) {
                          parlist.append("[" + par + "]");
                      }
                  }
              }
              j++;
              work = work.substring(j);
          } else {
              if ((backslaschPos > -1) && (backslaschPos + 1 == i)) {
                  // der \ wird aus dem String entfernt, damit er als gültiger
                  // Select an die DB übergeben werden kann
                  work = work.replace("\\", "");
                  int weiter = work.indexOf(']') + 1;
                  // Übergabe des Substring bis an das Ende der eckigen
                  // Klammer an die bestehende Liste
                  parlist.append(work, 0, weiter);
                  work = work.substring(weiter);
              } else {
                  parlist.append(work);
                  work = work.substring(work.length());
              }
          }
      }
      // logger.info("### argsubstImpl: "+ parlist.toString());
      return parlist.toString();
  }

  public static String arrayToString(String[] arr, String sep, int lastIdx) {
  	StringBuffer sb = new StringBuffer();
  	String seperator = " ";
  	if(sep != null) {
  		seperator = sep;
  	}
  	for(int i = 0; i < lastIdx; i++) {
  		sb.append(arr[i]);
  		if(i < (lastIdx - 1)) {
    		sb.append(seperator);
  		}
  	}
  	return sb.toString();
  }
  
  public static String arrayToString(String[] arr, String sep) {
  	return StringUtil.arrayToString(arr, sep, arr.length);
  }
  
  public static String escapeHTML(String s) {
  	if(s != null) {
      StringBuilder out = new StringBuilder(Math.max(16, s.length()));
      for (int i = 0; i < s.length(); i++) {
          char c = s.charAt(i);
          if (c > 127 || c == '"' || c == '<' || c == '>' || c == '&') {
              out.append("&#");
              out.append((int) c);
              out.append(';');
          } else {
              out.append(c);
          }
      }
      return out.toString();
  	} else {
  		return "";
  	}
}
}
