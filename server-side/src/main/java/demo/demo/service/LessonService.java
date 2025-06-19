package demo.demo.service;
import java.util.List;
import demo.demo.model.Lesson;

public interface LessonService {
 void addLesson(Lesson l);
    void updateLesson(Lesson l);
    void deleteLesson(long idLesson);
    List<Lesson> getAll();
    Lesson getByIdLesson(long idLesson);
} 

