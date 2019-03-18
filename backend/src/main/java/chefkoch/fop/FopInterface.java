package chefkoch.fop;

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
import org.jdom2.Element;
import org.jdom2.transform.JDOMSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class FopInterface
 */
public class FopInterface {
	private static Logger logger = LoggerFactory.getLogger(FopInterface.class);

	public static byte[] transform(Element xml, File xsl) throws ServletException, IOException {
		Source xmlFile = null;
		Source xslFile = null;
		byte[] pdfAsArray = new byte[0];
		boolean debug = false;
		
		xmlFile = new JDOMSource(xml);
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
			FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());
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
			logger.warn("Keine Quelldatei gefunden!");
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