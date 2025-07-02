package demo.demo.dal;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import demo.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
