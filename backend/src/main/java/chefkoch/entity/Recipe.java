package chefkoch.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;

@Entity
@NamedQueries({ @NamedQuery(name = Recipe.QUERY_GETALL, query = "SELECT r FROM Recipe r ORDER BY r.name"),
		@NamedQuery(name = Recipe.QUERY_DELETE_BY_ID, query = "DELETE FROM Recipe WHERE id = :recipeId"),
		@NamedQuery(name = Recipe.QUERY_GET_BY_TAG, query = "SELECT r FROM Recipe r JOIN r.tags t WHERE t.id = :tagId ORDER BY r.name"),
		@NamedQuery(name = Recipe.QUERY_FIND_BY_NAME, query = "SELECT r FROM Recipe r WHERE r.name like :search ORDER BY r.name") })
public class Recipe {
	public static final String QUERY_GETALL = "Recipe.GetAll";
	public static final String QUERY_GET_BY_TAG = "Recipe.GetByTag";
	public static final String QUERY_DELETE_BY_ID = "Recipe.DeleteById";
	public static final String QUERY_FIND_BY_NAME = "Recipe.FindByName";

	public Recipe() {
		this.setUuid(UUID.randomUUID().toString());
	}
	
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
	private String name;

	private String translate;
	private Long number;
	private String number_comment;
	private Long nv_size;

	private Double nv_energy;
	private Double nv_carbohydrates;
	private Double nv_protein;
	private Double nv_fat;

	@Column(columnDefinition = "TEXT")
	private String image;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "source_id")
	private Source source;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "person_id")
	@NotNull
	private Person person;

	private Long source_page;

	private Long aikz;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "r_recipe_tag", joinColumns = { @JoinColumn(name = "recipe_id") }, inverseJoinColumns = {@JoinColumn(name = "tag_id") })
	@OrderBy("name")
	private Set<Tag> tags = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
	//@OrderBy("part,sortorder")
	@OrderBy("sortorder")
	private Set<Ingredient> ingredients;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
	@OrderBy("number")
	private Set<Todo> todos;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTranslate() {
		return translate;
	}

	public void setTranslate(String translate) {
		this.translate = translate;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getNumber_comment() {
		return number_comment;
	}

	public void setNumber_comment(String number_comment) {
		this.number_comment = number_comment;
	}

	public Long getNv_size() {
		return nv_size;
	}

	public void setNv_size(Long nv_size) {
		this.nv_size = nv_size;
	}

	public Double getNv_energy() {
		return nv_energy;
	}

	public void setNv_energy(Double nv_energy) {
		this.nv_energy = nv_energy;
	}

	public Double getNv_carbohydrates() {
		return nv_carbohydrates;
	}

	public void setNv_carbohydrates(Double nv_carbohydrates) {
		this.nv_carbohydrates = nv_carbohydrates;
	}

	public Double getNv_protein() {
		return nv_protein;
	}

	public void setNv_protein(Double nv_protein) {
		this.nv_protein = nv_protein;
	}

	public Double getNv_fat() {
		return nv_fat;
	}

	public void setNv_fat(Double nv_fat) {
		this.nv_fat = nv_fat;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Source getSource() {
		return source;
	}

	public void setSource(Source source) {
		this.source = source;
	}

	public Long getSource_page() {
		return source_page;
	}

	public void setSource_page(Long source_page) {
		this.source_page = source_page;
	}

	public Long getAikz() {
		return aikz;
	}

	public void setAikz(Long aikz) {
		this.aikz = aikz;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	public Set<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(Set<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public Set<Todo> getTodos() {
		return todos;
	}

	public void setTodos(Set<Todo> todos) {
		this.todos = todos;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}
}
