package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Part;

public interface PartRepository extends CrudRepository<Part, Integer> {

	@Query("SELECT t FROM Part t WHERE t.uuid IS NULL")
	List<Part> findAllWhereUuisIsNull();

}
