package demo.demo.dal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;

@Repository
public interface LessonRegistrationRepository extends CrudRepository<LessonRegistration, LessonRegistrationId> {
}

