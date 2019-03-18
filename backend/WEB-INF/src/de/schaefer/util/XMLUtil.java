package de.schaefer.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.IllegalDataException;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import de.schaefer.beans.RecipeBean;
import de.schaefer.objects.ObjectFactory;
import de.schaefer.objects.RecipeDto;
import de.schaefer.objects.TagTypeDto;
import de.schaefer.persistence.entities.Tag;

/**
 * XMLUtil: Allgemeine Utilities für Document/Element Company: HIS
 * 
 * @author Jauer, Bolte, Brummermann
 */
public class XMLUtil {

	private static final String encoding = "UTF-8";
	private static String confroot = null;
	private static Logger logger = Logger.getLogger(XMLUtil.class);

	public static Element getRecipeBookXML(List<RecipeDto> recipes, List<TagTypeDto> tagtypes, RecipeBean recipeBean) {
		String imagePath = System.getProperty("pubPath").replace("\\", "/") + "images/";
		Element bookEle = new Element("export");
		
		Element locEle = new Element("loc");
		for(TagTypeDto tt : tagtypes) {
			Element ttEle = new Element("tagtype");
			ttEle.setAttribute("id", tt.getId().toString());
			ttEle.setAttribute("name", StringUtil.toString(tt.getName()));
			
			for(Tag t : tt.getTagList()) {
				Element tEle = new Element("tag");
				tEle.setAttribute("id", t.getId().toString());
				tEle.setAttribute("name", StringUtil.toString(t.getName()));
				
				for(RecipeDto r : recipeBean.getAllRecipeByTag(t.getId(), false)) {
					Element rEle = new Element("recipe");
					rEle.setAttribute("id", r.getId().toString());
					rEle.setAttribute("name", StringUtil.toString(r.getName()));
					tEle.addContent(rEle);
				}
				
				ttEle.addContent(tEle);
			}
			
			locEle.addContent(ttEle);
		}
		bookEle.addContent(locEle);
		
		Element recEle = new Element("rec");
		for(RecipeDto r : recipes) {
			recEle.addContent(ObjectFactory.recipeToXml(r, imagePath));
		}
		bookEle.addContent(recEle);
		return bookEle;
	}
	
	/**
	 * Liefert alle Kinder des gegebenen Elements. Kapselt dabei die Warning, dass
	 * der Typ-Check nicht ok ist.
	 * 
	 * @param elem
	 *          Element
	 * @return Liste der Kinder-Elemente
	 * @throws NullPointerException
	 *           wenn das Argument nicht definiert ist.
	 */
	@SuppressWarnings("unchecked")
	public static List<Element> getChildren(Element elem) {
		return elem.getChildren();
	}

	/**
	 * Liefert die Kinder des Elements mit dem gewuenschten Namen. Kapselt dabei
	 * die Warning, dass der Typ-Check nicht ok ist.
	 * 
	 * @param elem
	 *          Element
	 * @param childrenName
	 *          Name der gewuenschten Kinder
	 * @return Liste der Kinder-Elemente mit dem gegebenen Namen
	 * @throws NullPointerException
	 *           wenn ein Argument nicht definiert ist.
	 */
	@SuppressWarnings("unchecked")
	public static List<Element> getChildren(Element elem, String childrenName) throws NullPointerException {
		if (elem != null) {
			return elem.getChildren(childrenName);
		} else {
			return (null);
		}
	}

	/**
	 * Diese Methode liefert false, wenn das Element ein Attribute "active" mit
	 * dem Wert "n" oder "N" hat, ansonsten true.
	 * 
	 * @param e
	 *          Element
	 * @return <code>active</code> true/false
	 */
	public static boolean isActive(Element e) {
		boolean active = true;
		if (e != null) {
			String activeStr = e.getAttributeValue("active");
			if ((activeStr != null) && activeStr.toLowerCase().equals("n")) {
				active = false;
			}
		}
		return active;
	}

	/**
	 * Diese Methode erzeugt ein Element-Object aus einem File-Object (Root) Wenn
	 * das übergebene Argument kein gültiger FileName ist, wird null zurückgegeben
	 * ohne Fehlermeldung.
	 * <p>
	 * Wenn das übergebene Argument ein gültiger FileName ist, aber kein gültiger
	 * XML-File, wird null zurückgegeben mit Fehlermeldung.
	 * 
	 * @param fileName
	 *          Name eines Files
	 * @return aus dem File erzeugtes Element
	 * 
	 */
	public static Element getElementFromFile(String fileName) {
		Element element = null;
		Document document = XMLUtil.getDocumentFromFile(fileName, true);
		if (document != null) {
			element = document.getRootElement();
		}
		return element;
	}

	/**
	 * Diese Methode erzeugt ein Document-Object aus einem File-Object
	 * 
	 * Wenn das übergebene Argument kein gültiger FileName ist, wird null
	 * zurückgegeben ohne Fehlermeldung.
	 * <p>
	 * Wenn das übergebene Argument ein gültiger FileName ist, aber kein gültiger
	 * XML-File, wird null zurückgegeben mit Fehlermeldung.
	 * 
	 * @param fileName
	 *          Name eines Files
	 * @param useChroot
	 *          true, wenn nur Dateien aus dem conf-Verzeichnis gelesen werden
	 *          duerfen.
	 * @return aus dem File erzeugtes Document
	 */
	protected static Document getDocumentFromFile(String fileName, boolean useChroot) {
		Document document = null;
		File file = new File(fileName);
		if ((!useChroot || FileUtil.checkChroot(confroot, fileName)) && file.isFile()) {
			SAXBuilder builder = new SAXBuilder();
			try {
				document = builder.build(file);
			} catch (JDOMException e) {
				logger.info("Fehler bei " + fileName + ": " + e.getMessage());
			} catch (IllegalDataException e) {
				logger.info("Fehler bei " + fileName + ": " + e.getMessage());
			} catch (IOException e) {
				logger.info("Fehler bei " + fileName + ": " + e.getMessage());
			}
		}
		return document;
	}

	/**
	 * Setzt das chroot-Verzeichnis
	 * 
	 * @param confroot
	 *          Verzeichnis
	 */
	public static void setConfroot(String confroot) {
		XMLUtil.confroot = confroot;
	}

	/**
	 * Parst einen XML-String in einen JDOM-Objekt-Baum
	 * 
	 * @param xml
	 *          XML-String
	 * @return Element
	 */
	public static Element parseXML(String xml) {
		if (xml == null) {
			return null;
		}
		Element res = null;
		SAXBuilder builder = new SAXBuilder();
		try {
			res = builder.build(new StringReader(xml)).getRootElement();
		} catch (JDOMException e) {
			logger.info(e.getMessage());
		} catch (IOException e) {
			logger.info(e.getMessage());
		}
		return res;
	}

	/**
	 * Parst die Daten eines Readers in einen JDOM-Objekt-Baum
	 * 
	 * @param xml
	 *          XML-String
	 * @return Element
	 */
	public static Element parseXML(Reader xml) {
		if (xml == null) {
			return null;
		}
		Element res = null;
		SAXBuilder builder = new SAXBuilder();
		try {
			res = builder.build(xml).getRootElement();
		} catch (JDOMException e) {
			logger.info(e.getMessage());
		} catch (IOException e) {
			logger.info(e.getMessage());
		}
		return res;
	}

	/**
	 * Erzeugt ein String-Objekt aus einem XML-Baum
	 * 
	 * @param element
	 *          element
	 * @return String
	 */
	public static String dumpXML(Element element) {
		return dumpXML(element, "    ", encoding);
	}

	@SuppressWarnings("unchecked")
	public static String dumpElementContent(Element element) {
		String res = "";
		if (element != null) {
			Iterator<Element> itr = element.getChildren().iterator();
			while(itr.hasNext()) {
				Element child = itr.next();
				res = res + dumpElement(child);
			}
		}
		return res;
	}
	
  /**
   * Erzeugt ein String-Objekt aus einem XML-Baum ohne einleitendes XML-Tag
   *
   * @param element
   *            element
   * @return String
   */
  public static String dumpElement(Element element) {
      return dumpElement (element, false);
  }

  /**
   * Erzeugt ein String-Objekt aus einem XML-Baum ohne einleitendes XML-Tag
   *
   * @param element
   *            element
   * @param raw (true for OO-Reports)
   * @return String
   */
  public static String dumpElement(Element element, boolean raw) {
      String res = "";
      if (element != null) {
          element = (Element) element.clone();
          try {
              Format format = Format.getPrettyFormat();
              if (raw) {
                  format = Format.getRawFormat();
              }
              format.setEncoding(encoding);
              XMLOutputter out = new XMLOutputter(format);
              StringWriter sw = new StringWriter();
              BufferedWriter bw = new BufferedWriter(sw);
              out.output(element, bw);
              bw.close();
              res = sw.toString();
          } catch (Exception e) {
              logger.error(e, e);
          }
      }
      return res;
  }

	/**
	 * Erzeugt ein String-Objekt aus einem XML-Baum
	 * 
	 * @param element
	 *          element
	 * @param indent
	 *          Einr&uuml;ckung
	 * @param charset
	 *          Zeichensatz (beispielsweise ISO-8859-15)
	 * @return String
	 */
	public static String dumpXML(Element element, String indent, String charset) {
		String res = "";
		if (element != null) {
			Element ele = (Element) element.clone();
			Document doc = new Document(ele);
			try {
				Format format = Format.getPrettyFormat();
				format.setEncoding(charset);
				format.setIndent(indent);
				XMLOutputter out = new XMLOutputter(format);
				StringWriter sw = new StringWriter();
				BufferedWriter bw = new BufferedWriter(sw);
				out.output(doc, bw);
				bw.close();
				res = sw.toString();
			} catch (Exception e) {
				logger.info(e.getMessage());
			}
		}
		return res;
	}
}
