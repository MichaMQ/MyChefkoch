package chefkoch.repo.iface;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Person;

public interface PersonRepository extends CrudRepository<Person, Integer> {
	@Query("SELECT p FROM Person p WHERE p.account.id = ?1")
	Person findPersonByAccountId(Integer accountId);

	@Query("SELECT t FROM Person t WHERE t.uuid IS NULL")
	List<Person> findAllWhereUuisIsNull();
}
