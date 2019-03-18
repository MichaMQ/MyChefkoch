package chefkoch.dto;

import java.util.LinkedList;
import java.util.List;

import chefkoch.entity.Tag;
import chefkoch.entity.Tag_Type;

public class TagtypeDto extends GenericDto {
	private List<TagDto> tagList = new LinkedList<TagDto>();
	
	public TagtypeDto(Tag_Type tagtype, List<Tag> tagObjList) {
		this.setId(tagtype.getId());
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
