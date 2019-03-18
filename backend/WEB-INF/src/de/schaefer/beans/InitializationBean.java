package de.schaefer.beans;

import org.apache.log4j.Logger;

public class InitializationBean {
	private static Logger logger = Logger.getLogger(InitializationBean.class);
	private RecipeBean recipeBean;

	public RecipeBean getRecipeBean() {
		return this.recipeBean;
	}

	public void setRecipeBean(RecipeBean recipeBean) {
		this.recipeBean = recipeBean;
	}

	public void init() {
		// TODO Auto-generated method stub
		
	}

}
