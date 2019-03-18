package de.schaefer.objects;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import de.schaefer.persistence.entities.Tag;
import de.schaefer.persistence.entities.Tag_Type;

public class TagTypeDto implements Serializable {
	private static final long serialVersionUID = -7138854414381033693L;

	private Long id;
	private String name;
	private List<Tag> tagList = new LinkedList<Tag>();
	
	public TagTypeDto(Tag_Type tagType) {
		this.setId(tagType.getId());
		this.setName(tagType.getName());
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
	public List<Tag> getTagList() {
		return tagList;
	}
	public void setTagList(List<Tag> tagList) {
		this.tagList = tagList;
	}
}
