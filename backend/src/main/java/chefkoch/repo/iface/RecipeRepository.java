package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Recipe;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface RecipeRepository extends CrudRepository<Recipe, Integer> {
	@Query("SELECT r FROM Recipe r JOIN r.tags t WHERE t.id = ?1 ORDER BY r.name")
  List<Recipe> findRecipeByTagId(Integer tagId);

	@Query("SELECT r FROM Recipe r JOIN r.tags t WHERE t.uuid IS NULL ORDER BY r.name")
	List<Recipe> findAllWhereUuisIsNull();
}
