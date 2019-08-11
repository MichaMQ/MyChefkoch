package chefkoch.entity;

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
@NamedQueries({ @NamedQuery(name = Todo.QUERY_GETALL, query = "SELECT td FROM Todo td ORDER BY td.number"),
		@NamedQuery(name = Todo.QUERY_DELETE_BY_RECIPEID, query = "DELETE FROM Todo td WHERE td.recipe.id = :recipeId"),
		@NamedQuery(name = Todo.QUERY_GET_BY_RECIPEID, query = "SELECT td FROM Todo td WHERE td.recipe.id = :recipeId ORDER BY td.number") })
public class Todo {
	public static final String QUERY_GETALL = "Todo.GetAll";
	public static final String QUERY_GET_BY_RECIPEID = "Todo.GetByRecipeId";
	public static final String QUERY_DELETE_BY_RECIPEID = "Todo.DeleteByRecipeId";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String uuid;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@NotNull
	private Long number;

	@NotNull
	@Column(columnDefinition = "TEXT")
	private String text;

	@Column(columnDefinition = "TEXT")
	private String image;

	private String image_comment;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getImage_comment() {
		return image_comment;
	}

	public void setImage_comment(String image_comment) {
		this.image_comment = image_comment;
	}

	public Recipe getRecipe() {
		return this.recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

}
