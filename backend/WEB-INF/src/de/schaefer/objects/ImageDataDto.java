package de.schaefer.objects;

import java.io.Serializable;
public class ImageDataDto implements Serializable {
	private static final long serialVersionUID = -6737871270282933886L;
	
	private String contents, filename;

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}
}