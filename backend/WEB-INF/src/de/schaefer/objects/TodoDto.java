package de.schaefer.objects;

import java.io.Serializable;

import de.schaefer.persistence.entities.Todo;
public class TodoDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public TodoDto(Todo t, boolean withRecipe) {
		this.setId(t.getId());
		this.setNumber(t.getNumber());
		this.setText(t.getText());
		this.setImage(t.getImage());
		this.setImage_comment(t.getImage_comment());
		if(withRecipe) this.setRecipe(new RecipeDto(t.getRecipe(), false));
	}
	
	private Long id;
	private Long number;
	private String text;
	private String image;
	private String image_comment;
  private RecipeDto recipe;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public RecipeDto getRecipe() {
		return this.recipe;
	}

	public void setRecipe(RecipeDto recipe) {
		this.recipe = recipe;
	}

}
