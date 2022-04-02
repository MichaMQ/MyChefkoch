package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Unit_Category;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface UnitCategoryRepository extends CrudRepository<Unit_Category, Integer> {

	@Query("SELECT t FROM Unit_Category t WHERE t.uuid IS NULL")
	List<Unit_Category> findAllWhereUuisIsNull();

}
