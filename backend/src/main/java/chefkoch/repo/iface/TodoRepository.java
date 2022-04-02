package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Integer> {

	@Query("SELECT t FROM Todo t WHERE t.uuid IS NULL")
	List<Todo> findAllWhereUuisIsNull();

}
