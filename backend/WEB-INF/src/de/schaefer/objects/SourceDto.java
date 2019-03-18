package de.schaefer.objects;

import java.io.Serializable;

import org.jdom.Element;

import de.schaefer.persistence.entities.Source;
import de.schaefer.util.StringUtil;
public class SourceDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public SourceDto() {}
	
	public SourceDto(Source t) {
		this.setId(t.getId());
		this.setName(t.getName());
		this.setIsbn(t.getIsbn());
		this.setYear(t.getYear());
	}
	
	private Long id;
	private String name;
	private String year;
	private String isbn;

	public Element toXml() {
		Element srcEle = new Element("source");
		srcEle.setAttribute("id", this.getId().toString());
		srcEle.addContent((new Element("name")).addContent(StringUtil.toString(this.getName())));
		srcEle.addContent((new Element("year")).addContent(StringUtil.toString(this.getYear())));
		srcEle.addContent((new Element("isbn")).addContent(StringUtil.toString(this.getIsbn())));
		return srcEle;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	
}
