package chefkoch.dto;

import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Tag;
import chefkoch.entity.Tag_Type;

public class TagtypeDto extends GenericDto {
	private List<TagDto> tagList = new LinkedList<TagDto>();
	
	@JsonCreator
	public TagtypeDto() {}

	public TagtypeDto(Tag_Type tagtype, List<Tag> tagObjList) {
		this.setId(tagtype.getId());
		this.setUuid(tagtype.getUuid());
		this.setName(tagtype.getName());
		for(Tag tagObj : tagObjList) {
			this.getTagList().add(new TagDto(tagObj));
		}
	}

	public List<TagDto> getTagList() {
		return tagList;
	}

	public void setTagList(List<TagDto> tagList) {
		this.tagList = tagList;
	}
}
