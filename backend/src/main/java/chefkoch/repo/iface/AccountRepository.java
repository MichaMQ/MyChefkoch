package chefkoch.repo.iface;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import chefkoch.entity.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> {
	@Query("SELECT t FROM Account t WHERE t.username = ?1")
	Account findAccountByUsername(String username);

	@Query("SELECT t FROM Account t WHERE t.token = ?1")
	Account findAccountByToken(String token);
}
