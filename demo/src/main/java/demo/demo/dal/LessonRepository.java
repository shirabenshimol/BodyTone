package demo.demo.dal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import demo.demo.model.Lesson;

@Repository
public interface LessonRepository extends CrudRepository<Lesson, Integer> {
}