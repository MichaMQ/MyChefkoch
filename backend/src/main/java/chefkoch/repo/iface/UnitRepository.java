package chefkoch.repo.iface;

import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Unit;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface UnitRepository extends CrudRepository<Unit, Integer> {

}
