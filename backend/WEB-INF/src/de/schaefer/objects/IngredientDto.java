package de.schaefer.objects;

import java.io.Serializable;

import de.schaefer.persistence.entities.Ingredient;

public class IngredientDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;
	public IngredientDto() {}
	
	public IngredientDto(Ingredient i, boolean withRecipe) {
		this.setId(i.getId());
		this.setQuantity(i.getQuantity());
		this.setName(i.getName());
		this.setComment(i.getComment());
		this.setSortorder(i.getSortorder());
		this.setPart(i.getPart());
		if(withRecipe) this.setRecipe(new RecipeDto(i.getRecipe(), false));
		if(i.getUnit() != null) this.setUnit(new UnitDto(i.getUnit()));
		
	}
	
	private Long id;
	private Double quantity;
	private String name;
	private String comment;
	private Long sortorder;
	private Long part;
  private RecipeDto recipe;
  private UnitDto unit;

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

	public Long getPart() {
		return part;
	}

	public void setPart(Long part) {
		this.part = part;
	}

	public UnitDto getUnit() {
		return unit;
	}

	public void setUnit(UnitDto unit) {
		this.unit = unit;
	}

	public RecipeDto getRecipe() {
		return this.recipe;
	}

	public void setRecipe(RecipeDto recipe) {
		this.recipe = recipe;
	}
}
