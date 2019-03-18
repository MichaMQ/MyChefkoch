package de.schaefer.persistence.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@NamedQueries({ 
	@NamedQuery(
			name=Ingredient.QUERY_GET_BY_RECIPEID,
			query="SELECT i FROM Ingredient i WHERE i.recipe.id = :recipeId ORDER BY i.part, i.sortorder"
	),
	@NamedQuery(
			name=Ingredient.QUERY_DELETE_BY_RECIPEID,
			query="DELETE FROM Ingredient i WHERE i.recipe.id = :recipeId"
	)
})
public class Ingredient implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public static final String QUERY_GET_BY_RECIPEID = "Ingredient.GetByRecipeId";
	public static final String QUERY_DELETE_BY_RECIPEID = "Ingredient.DeleteByRecipeId";

	public Ingredient() {}
	
	public Ingredient(String name, Recipe recipe) {
		this.setName(name);
		this.setRecipe(recipe);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Double quantity;

	@NotNull
	@Column(length = 255)
	private String name;

	@NotNull
	@Column(length = 255)
	private String comment;

	@NotNull
	private Long sortorder;

	private Long part;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="recipe_id")
  private Recipe recipe;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="unit_id")
  private Unit unit;

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

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	public Recipe getRecipe() {
		return this.recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

}
