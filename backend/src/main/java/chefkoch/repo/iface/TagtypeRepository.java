package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Tag_Type;

public interface TagtypeRepository extends CrudRepository<Tag_Type, Integer> {

	@Query("SELECT t FROM Tag_Type t WHERE t.uuid IS NULL")
	List<Tag_Type> findAllWhereUuisIsNull();

}
