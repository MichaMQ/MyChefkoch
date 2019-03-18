package de.schaefer.fop;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;
import org.jcodec.common.logging.Logger;
import org.jdom.Element;
import org.jdom.transform.JDOMSource;

/**
 * Servlet implementation class FopInterface
 */
public class FopInterface {

	public static byte[] transform(Element xml) throws ServletException, IOException {
		String confPath = System.getProperty("confPath");
		Source xmlFile = null;
		Source xslFile = null;
		byte[] pdfAsArray = new byte[0];
		boolean debug = false;
		
		xmlFile = new JDOMSource(xml);
		
		File xsl = new File(confPath + "book.xsl");
		xslFile = new StreamSource(xsl);
		

		try {
			if(debug) {
				debugSource(xmlFile);
				debugSource(xslFile);
			}
		} catch (TransformerException e1) {
			e1.printStackTrace();
		}

		if (xslFile != null && xmlFile != null) {
			FopFactory fopFactory = FopFactory.newInstance();
			TransformerFactory tFactory = TransformerFactory.newInstance();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, out);
				Transformer transformer = tFactory.newTransformer(xslFile);
				Result res = new SAXResult(fop.getDefaultHandler());
				transformer.transform(xmlFile, res);
				pdfAsArray = out.toByteArray();
				
				
			} catch (FOPException e) {
				e.printStackTrace();
			} catch (TransformerConfigurationException e) {
				e.printStackTrace();
			} catch (TransformerException e) {
				e.printStackTrace();
			} finally {
        out.close();
			}
		} else {
			Logger.error("Keine Quelldatei gefunden!");
		}
		return pdfAsArray;
	}
	
	private static void debugSource(Source file) throws TransformerException {
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
    Transformer transformer = transformerFactory.newTransformer();
		StreamResult result = new StreamResult(System.out);
    transformer.transform(file, result);
	}
}
