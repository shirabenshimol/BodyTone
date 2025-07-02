package demo.demo.service;
import java.util.List;

import demo.demo.dto.LessonHistoryDTO;
import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;

public interface LessonRegistrationService {
    void addLessonRegistration(LessonRegistration l);
    void updateLessonRegistration(LessonRegistration l);
    void deleteLessonRegistration(LessonRegistrationId idLessonRegistration);
    List<LessonRegistration> getAll();
    List<LessonHistoryDTO> getLessonsByUserId(Long userId);
    LessonRegistration getByIdLessonRegistration(LessonRegistrationId idLessonRegistration);
}



