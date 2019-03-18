package de.schaefer.objects;

import java.io.Serializable;

import de.schaefer.persistence.entities.Tag;
public class TagDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public TagDto() {}
	
	public TagDto(Tag t) {
		this.setId(t.getId());
		this.setName(t.getName());
		this.setTagType(new TagTypeDto(t.getTagType()));
	}
	
	private Long id;
	private String name;
  private TagTypeDto tagType;

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
	
	public TagTypeDto getTagType() {
		return this.tagType;
	}
	
	public void setTagType(TagTypeDto tagType) {
		this.tagType = tagType;
	}
}
