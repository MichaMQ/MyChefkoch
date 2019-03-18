package chefkoch.repo.iface;

import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Part;

public interface PartRepository extends CrudRepository<Part, Integer> {

}
