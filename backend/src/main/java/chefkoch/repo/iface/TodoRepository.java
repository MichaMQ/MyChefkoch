package chefkoch.repo.iface;

import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Integer> {

}
