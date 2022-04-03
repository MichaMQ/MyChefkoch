package chefkoch.requestObj;

import chefkoch.dto.TodoDto;

public class AddTodo {
	private Integer recipeId;
	private TodoDto todoDto;
	
	public Integer getRecipeId() {
		return recipeId;
	}
	public void setRecipeId(Integer recipeId) {
		this.recipeId = recipeId;
	}
	public TodoDto getTodoDto() {
		return todoDto;
	}
	public void setTodoDto(TodoDto todoDto) {
		this.todoDto = todoDto;
	}
}
