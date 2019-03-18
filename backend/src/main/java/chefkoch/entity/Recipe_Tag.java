package chefkoch.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@NamedQueries({ 
	@NamedQuery(
			name = Recipe_Tag.QUERY_GETALL, 
			query = "SELECT rt FROM Recipe_Tag rt"
		),
	@NamedQuery(
			name=Recipe_Tag.QUERY_DELETE_BY_RECIPEID,
			query="DELETE FROM Recipe_Tag rt WHERE rt.recipe_id = :recipeId"
	)
})

@Table(name = "r_recipe_tag")
public class Recipe_Tag {
	public static final String QUERY_GETALL = "Recipe_Tag.GetAll";
	public static final String QUERY_DELETE_BY_RECIPEID = "Recipe_Tag.DeleteByRecipeId";
	
	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="recipe_tag_seq_gen")
	@SequenceGenerator(name="recipe_tag_seq_gen", sequenceName="recipe_tag_seq")	
	@Column(name = "id", updatable = false, nullable = false)
	private Integer id;

	@NotNull
	private Long recipe_id;

	@NotNull
	private Long tag_id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Long getReipe_id() {
		return recipe_id;
	}

	public void setRecipe_id(Long recipe_id) {
		this.recipe_id = recipe_id;
	}

	public Long getTag_id() {
		return tag_id;
	}

	public void setTag_id(Long tag_id) {
		this.tag_id = tag_id;
	}
}
