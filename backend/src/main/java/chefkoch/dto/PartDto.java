package chefkoch.dto;

import java.util.LinkedList;
import java.util.List;

import org.jdom2.Element;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Part;

public class PartDto extends GenericDto {
	private List<IngredientDto> ingredients = new LinkedList<IngredientDto>();
	
	@JsonCreator
	public PartDto() {}
	
	public PartDto(Part part) {
		if(part == null) {
			this.setId(Integer.valueOf(-2));
			this.setName("Sonstige Zutaten");
		} else {
			this.setId(part.getId());
			this.setName(part.getName());
		}
	}

	public Element toXml() {
		Element partEle = new Element("part");
		partEle.setAttribute("id", "" + this.getId());
		partEle.setAttribute("name", this.getName());
		for(IngredientDto i : this.getIngredients()) {
			partEle.addContent(i.toXml());
		}
		return partEle;
	}

	public List<IngredientDto> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<IngredientDto> ingredients) {
		this.ingredients = ingredients;
	}
}
