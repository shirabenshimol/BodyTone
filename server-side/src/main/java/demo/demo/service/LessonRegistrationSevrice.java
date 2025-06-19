package demo.demo.service;
import java.util.List;
import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;

public interface LessonRegistrationSevrice {
    void addLessonRegistration(LessonRegistration l);
    void updateLessonRegistration(LessonRegistration l);
    void deleteLessonRegistration(LessonRegistrationId idLessonRegistration);
    List<LessonRegistration> getAll();
    LessonRegistration getByIdLessonRegistration(LessonRegistrationId idLessonRegistration);
}



