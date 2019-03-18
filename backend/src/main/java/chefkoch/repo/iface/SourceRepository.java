package chefkoch.repo.iface;

import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Source;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface SourceRepository extends CrudRepository<Source, Integer> {

}
