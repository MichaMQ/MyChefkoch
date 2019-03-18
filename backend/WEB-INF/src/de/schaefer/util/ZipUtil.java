package de.schaefer.util;

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.log4j.Logger;

public class ZipUtil {
	private static Logger logger = Logger.getLogger(ZipUtil.class);

	public static File unpackArchive(URL url, File targetDir, List<String> unpackedFiles) throws IOException {
		return unpackArchive(url, targetDir, null, null, null, unpackedFiles);
	}
	/**
	 * Unpack an archive from a URL
	 * 
	 * @param url
	 * @param targetDir
	 * @return the file to the url
	 * @throws IOException
	 */
	public static File unpackArchive(URL url, File targetDir, String startsWith, String endsWith, String fileName, List<String> unpackedFiles) throws IOException {
		if (!targetDir.exists()) {
			targetDir.mkdirs();
		}
		File zip = ZipUtil.downloadFile(url, targetDir);
		return unpackArchive(zip, targetDir, startsWith, endsWith, fileName, unpackedFiles);
	}

	public static File downloadFile(URL url, File targetDir) throws IOException {
		InputStream in = new BufferedInputStream(url.openStream(), 1024);
		// make sure we get the actual file
		logger.debug(targetDir);
		File zip = File.createTempFile("arc", ".zip", targetDir);
		OutputStream out = new BufferedOutputStream(new FileOutputStream(zip));
		copyInputStream(in, out);
		out.close();
		return zip;
	}
	
	public static File unpackArchive(File theFile, File targetDir, List<String> unpackedFiles) throws IOException {
		return unpackArchive(theFile, targetDir, null, null, null, unpackedFiles);
	}
	/**
	 * Unpack a zip file
	 * 
	 * @param theFile
	 * @param targetDir
	 * @return the file
	 * @throws IOException
	 */
	public static File unpackArchive(File theFile, File targetDir, String startsWith, String endsWith, String fileName, List<String> unpackedFiles) throws IOException {
		if (!theFile.exists()) {
			throw new IOException(theFile.getAbsolutePath() + " does not exist");
		}
		if (!buildDirectory(targetDir)) {
			throw new IOException("Could not create directory: " + targetDir);
		}
		ZipFile zipFile = new ZipFile(theFile);
		for (Enumeration<?> entries = zipFile.entries(); entries.hasMoreElements();) {
			ZipEntry entry = (ZipEntry) entries.nextElement();
			File file = new File(targetDir, File.separator + entry.getName());
			if (!buildDirectory(file.getParentFile())) {
				zipFile.close();
				throw new IOException("Could not create directory: " + file.getParentFile());
			}
			//logger.info("Datei im Archiv: " + file.getName());
			boolean testStart = (startsWith != null && file.getName().toLowerCase().startsWith(startsWith.toLowerCase()));
			boolean testEnd = (endsWith != null && file.getName().toLowerCase().endsWith(endsWith.toLowerCase()));
			boolean testName = (fileName != null && file.getName().equalsIgnoreCase(fileName));
			if (!entry.isDirectory()) {
				if(((startsWith == null && endsWith == null && fileName == null) || (testStart || testEnd || testName))) {
					copyInputStream(zipFile.getInputStream(entry), new BufferedOutputStream(new FileOutputStream(file)));
					unpackedFiles.add(entry.getName());
				}
			} else {
				if (!buildDirectory(file)) {
					throw new IOException("Could not create directory: " + file);
				}
			}
		}
		zipFile.close();
		return theFile;
	}

	public static void copyInputStream(InputStream in, OutputStream out) throws IOException {
		byte[] buffer = new byte[1024];
		int len = in.read(buffer);
		while (len >= 0) {
			out.write(buffer, 0, len);
			len = in.read(buffer);
		}
		in.close();
		out.close();
	}

	public static boolean buildDirectory(File file) {
		return file.exists() || file.mkdirs();
	}

}