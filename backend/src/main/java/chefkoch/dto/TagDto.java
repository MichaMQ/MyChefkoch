package chefkoch.dto;

import java.util.LinkedList;

import org.jdom2.Element;

import chefkoch.entity.Tag;
import chefkoch.util.StringUtil;

public class TagDto extends GenericDto {
	private TagtypeDto tagtype;
	
	public TagDto(Tag tag) {
		this.setId(tag.getId());
		this.setName(tag.getName());
		this.setTagtype(new TagtypeDto(tag.getTagType(), new LinkedList<Tag>()));
	}

	public Element toXml() {
		Element tagEle = new Element("tag");
		tagEle.setAttribute("id", this.getId().toString());
		tagEle.setAttribute("name", StringUtil.toString(this.getName()));
		tagEle.setAttribute("tagTypeName", StringUtil.toString(this.getTagtype().getName()));
		return tagEle;
	}

	public TagtypeDto getTagtype() {
		return this.tagtype;
	}

	public void setTagtype(TagtypeDto tagtype) {
		this.tagtype = tagtype;
	}
}
