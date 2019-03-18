package chefkoch.dto;

import org.jdom2.Element;

import chefkoch.entity.Ingredient;
import chefkoch.util.StringUtil;

public class IngredientDto extends GenericDto {
	private Double quantity;
	private String comment;
	private Long sortorder;
	private UnitDto unit;
	private PartDto part;

	public IngredientDto(Ingredient ingredient) {
		this.setId(ingredient.getId());
		this.setName(ingredient.getName());
		this.setQuantity(ingredient.getQuantity());
		this.setComment(ingredient.getComment());
		this.setSortorder(ingredient.getSortorder());
		if(ingredient.getUnit() != null) {
			this.setUnit(new UnitDto(ingredient.getUnit()));
		}
		this.setPart(new PartDto(ingredient.getPart()));
	}

	public Element toXml() {
		Element ingreEle = new Element("ingredient");
		ingreEle.setAttribute("id", this.getId().toString());
		ingreEle.setAttribute("quantity", StringUtil.toString(this.getQuantity()));
		ingreEle.setAttribute("sortorder", StringUtil.toString(this.getSortorder()));
		ingreEle.setAttribute("part", StringUtil.toString(this.getPart()));
		ingreEle.setAttribute("comment", StringUtil.toString(this.getComment()));
		if(this.getUnit() != null) {
			ingreEle.setAttribute("unit_name", StringUtil.toString(this.getUnit().getName()));
		}
		ingreEle.addContent(StringUtil.toString(this.getName()));
		return ingreEle;
	}
	
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Long getSortorder() {
		return sortorder;
	}
	public void setSortorder(Long sortorder) {
		this.sortorder = sortorder;
	}
	public PartDto getPart() {
		return part;
	}
	public void setPart(PartDto part) {
		this.part = part;
	}

	public UnitDto getUnit() {
		return unit;
	}

	public void setUnit(UnitDto unit) {
		this.unit = unit;
	}

	public int compareTo(IngredientDto o) {
	    Long mySort = this.getSortorder();
	    Long oSort = o.getSortorder();
	    return mySort.compareTo(oSort);
	}
}
