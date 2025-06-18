package demo.demo.dal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import demo.demo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}