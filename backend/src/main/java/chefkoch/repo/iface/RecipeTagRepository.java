package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Recipe_Tag;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface RecipeTagRepository extends CrudRepository<Recipe_Tag, Integer> {

	@Query("SELECT t FROM Recipe_Tag t WHERE t.uuid IS NULL")
	List<Recipe_Tag> findAllWhereUuisIsNull();

	@Query("SELECT t FROM Recipe_Tag t WHERE t.recipe_id = ?1 AND t.tag_id = ?2")
	List<Recipe_Tag> findByTagIdAndRecipeId(Long recipeId, Long tagId);
}
