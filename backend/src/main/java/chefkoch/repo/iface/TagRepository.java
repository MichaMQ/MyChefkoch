package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Tag;

public interface TagRepository extends CrudRepository<Tag, Integer> {
	@Query("SELECT t FROM Tag t WHERE t.tagType.id = ?1 ORDER BY t.name")
	List<Tag> findTagByTagtypeId(Integer tagtypeId);
}
