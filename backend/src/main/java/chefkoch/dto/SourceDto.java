package chefkoch.dto;

import org.jdom2.Element;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Source;
import chefkoch.util.StringUtil;

public class SourceDto extends GenericDto {
	private String year;
	private String isbn;
	
	@JsonCreator
	public SourceDto() {}

	public SourceDto(Source source) {
		this.setId(source.getId());
		this.setUuid(source.getUuid());
		this.setName(source.getName());
		this.setYear(source.getYear());
		this.setIsbn(source.getIsbn());
	}

	public Element toXml() {
		Element srcEle = new Element("source");
		srcEle.setAttribute("id", this.getId().toString());
		srcEle.addContent((new Element("name")).addContent(StringUtil.toString(this.getName())));
		srcEle.addContent((new Element("year")).addContent(StringUtil.toString(this.getYear())));
		srcEle.addContent((new Element("isbn")).addContent(StringUtil.toString(this.getIsbn())));
		return srcEle;
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
