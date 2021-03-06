package chefkoch.entity;

import javax.persistence.CascadeType;
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
		@NamedQuery(name = Ingredient.QUERY_GET_BY_RECIPEID, query = "SELECT i FROM Ingredient i WHERE i.recipe.id = :recipeId ORDER BY i.part, i.sortorder"),
		@NamedQuery(name = Ingredient.QUERY_DELETE_BY_RECIPEID, query = "DELETE FROM Ingredient i WHERE i.recipe.id = :recipeId") })
public class Ingredient {
	public static final String QUERY_GET_BY_RECIPEID = "Ingredient.GetByRecipeId";
	public static final String QUERY_DELETE_BY_RECIPEID = "Ingredient.DeleteByRecipeId";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private Double quantity;

	@NotNull
	private String name;

	@NotNull
	private String comment;

	@NotNull
	private Long sortorder;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "part_id")
	private Part part;
//	private Long part;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "unit_id")
	private Unit unit;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public Part getPart() {
		return part;
	}

	public void setPart(Part part) {
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
