package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Source;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface SourceRepository extends CrudRepository<Source, Integer> {

	@Query("SELECT t FROM Source t WHERE t.uuid IS NULL")
	List<Source> findAllWhereUuisIsNull();

}
