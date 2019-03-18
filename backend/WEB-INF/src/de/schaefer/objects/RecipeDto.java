package de.schaefer.objects;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import de.schaefer.persistence.entities.Ingredient;
import de.schaefer.persistence.entities.Recipe;
import de.schaefer.persistence.entities.Tag;
import de.schaefer.persistence.entities.Todo;

public class RecipeDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	private Long id;
	private String name;
	private String translate;
	private Long number;
	private String number_comment;
	private Long nv_size;
	private Double nv_energy;
	private Double nv_carbohydrates;
	private Double nv_protein;
	private Double nv_fat;
	private String image;
  private SourceDto source;
	private Long source_page;
	private Long aikz;
  private List<TagDto> tags = new LinkedList<>();
  private List<IngredientDto> ingredients = new LinkedList<>();
  private List<TodoDto> todos = new LinkedList<>();
	
	public RecipeDto(Recipe r, boolean withappendedRecipe) {
		this.setId(r.getId());
		this.setName(r.getName());
		this.setTranslate(r.getTranslate());
		this.setNumber(r.getNumber());
		this.setNumber_comment(r.getNumber_comment());
		this.setNv_size(r.getNv_size());
		this.setNv_energy(r.getNv_energy());
		this.setNv_carbohydrates(r.getNv_carbohydrates());
		this.setNv_protein(r.getNv_protein());
		this.setNv_fat(r.getNv_fat());
		this.setImage(r.getImage());
		this.setSource(new SourceDto(r.getSource()));
		this.setSource_page(r.getSource_page());
		this.setAikz(r.getAikz());
		for(Tag t : r.getTags()) this.getTags().add(new TagDto(t));
		for(Ingredient i : r.getIngredients()) this.getIngredients().add(new IngredientDto(i,withappendedRecipe));
		for(Todo t : r.getTodos()) this.getTodos().add(new TodoDto(t, withappendedRecipe));
	}

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

	public SourceDto getSource() {
		return source;
	}

	public void setSource(SourceDto source) {
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

	public List<TagDto> getTags() {
		return tags;
	}

	public void setTags(List<TagDto> tags) {
		this.tags = tags;
	}

	public List<IngredientDto> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<IngredientDto> ingredients) {
		this.ingredients = ingredients;
	}

	public List<TodoDto> getTodos() {
		return todos;
	}

	public void setTodos(List<TodoDto> todos) {
		this.todos = todos;
	}
}
