package demo.demo.dal;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import demo.demo.model.Lesson;

@Repository
public interface LessonRepository extends CrudRepository<Lesson, Long> {

    @Query("SELECT l FROM Lesson l WHERE MONTH(l.date) = :month AND YEAR(l.date) = :year")
List<Lesson> findLessonsByMonth(@Param("month") int month, @Param("year") int year);

}

