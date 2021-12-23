package chefkoch.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * helper methods for handling files
 */
public class FileUtil {

	/** Path prefix for loading resources from within a jar as specified by the servlet api */
	private static final String SERVLET_CONTEXT_RESOURCE_PATH = "META-INF/resources/";
	private static Logger logger = LoggerFactory.getLogger(FileUtil.class);

	public static byte[] readFileToBytes(String filePath) {
		File file = new File(filePath);
		int length = 0;
		byte[] bytes = new byte[length];
		if(file.canRead()) {
			bytes = new byte[(int) file.length()];
			try (FileInputStream fis = new FileInputStream(file)) {
				fis.read(bytes);
			} catch (IOException e) {
				logger.error(filePath + " kann nicht gelesen werden", e);
			}
		} else {
			logger.warn(filePath + " kann nicht gelesen werden");
		}
		return bytes;
	}

	/**
	 * &Uuml;berpr&uuml;ft, ob eine Datei unterhalb eines Verzeichnises liegt. Wenn chroot nicht definiert ist, wird der Zugriff gestattet.
	 *
	 * @param chroot   Verzeichnis per ((new File(filename)).getCanonicalPath()) normalisiert
	 * @param filename Dateiname (muss nicht normalisiert werden)
	 * @return true, wenn der Zugriff erlaubt ist, sonst false
	 */
	public static boolean checkChroot(String chroot, String filename) {
		if (chroot == null) {
			return true;
		}
		try {
			File file = new File(filename);
			String canonicalForFile = file.getCanonicalPath();
			File root = new File(chroot);
			String canonicalForRoot = root.getCanonicalPath();
			boolean res = canonicalForFile.startsWith(canonicalForRoot);
			if (!res) {
				logger.info("Zugriff auf Datei " + canonicalForFile + " ausserhalb des chroot " + chroot + " verweigert");
			}
			return res;
		} catch (IOException e) {
			logger.info("Fehler beim Analysieren des Pfades \"" + filename + "\": " + e.getMessage());
		}
		return false;
	}

	/**
	 * reads a file from the filesystem or the classpath (in this order)
	 *
	 * @param filename         name of file
	 * @param filesystemPrefix prefix to use in the filesystem (e. g. initProps.getProperty("CONFROOT")
	 * @return an input stream to the file or <code>null</code> if the file does not exist at either location
	 */
	public static InputStream getFileFromFilesystemOrClasspath(String filename, String filesystemPrefix) {
		String pathname = filesystemPrefix + "/" + filename;
		if (new File(pathname).canRead()) {
			try {
				return new FileInputStream(pathname);
			} catch (FileNotFoundException e) {
				logger.info("Cannot open file \"" + pathname + "\" although it exists and may be read" + e.getMessage());
			}
		}
		InputStream resourceStream = FileUtil.class.getClassLoader().getResourceAsStream(SERVLET_CONTEXT_RESOURCE_PATH + filename);
		if (resourceStream != null) {
			return resourceStream;
		}
		return FileUtil.class.getClassLoader().getResourceAsStream(filename);
	}

}
