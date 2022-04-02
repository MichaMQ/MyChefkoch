package chefkoch.requestObj;

import chefkoch.dto.IngredientDto;

public class AddIngredient {
	private Integer recipeId;
	private IngredientDto ingredientDto;
	
	public Integer getRecipeId() {
		return recipeId;
	}
	public void setRecipeId(Integer recipeId) {
		this.recipeId = recipeId;
	}
	public IngredientDto getIngredientDto() {
		return ingredientDto;
	}
	public void setIngredientDto(IngredientDto ingredientDto) {
		this.ingredientDto = ingredientDto;
	}
}
