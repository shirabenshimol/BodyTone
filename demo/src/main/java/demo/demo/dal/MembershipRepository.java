package demo.demo.dal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import demo.demo.model.Membership;

@Repository
public interface MembershipRepository extends CrudRepository<Membership, Integer> {
}