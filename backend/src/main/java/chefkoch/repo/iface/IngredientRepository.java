package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Integer> {

	@Query("SELECT t FROM Ingredient t WHERE t.uuid IS NULL")
	List<Ingredient> findAllWhereUuisIsNull();

}
