package chefkoch.repo.iface;

import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Integer> {

}
