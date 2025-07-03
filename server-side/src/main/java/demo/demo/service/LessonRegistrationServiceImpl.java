package demo.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.demo.dal.LessonRegistrationRepository;
import demo.demo.dal.UserRepository;
import demo.demo.dto.LessonHistoryDTO;
import demo.demo.dal.LessonRepository;

import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;
import demo.demo.model.User;
import demo.demo.model.Lesson;

@Service
public class LessonRegistrationServiceImpl implements LessonRegistrationService {

    @Autowired
    private LessonRegistrationRepository lessonRegistrationRepository;

    @Autowired
    private LessonRegistrationRepository rep;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public void addLessonRegistration(LessonRegistration l) {
        if (rep.existsById(l.getId()))
            throw new RuntimeException(
                    "Cannot add LessonRegistration with id " + l.getId() + " because it already exists.");

        // שואבים את הישויות מהמסד
        Long userId = l.getId().getUserId();
        Long lessonId = l.getId().getLessonId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found with ID: " + lessonId));

        // מקשרים ל־LessonRegistration
        l.setUser(user);
        l.setLesson(lesson);

        rep.save(l);
    }

    @Override
    public void updateLessonRegistration(LessonRegistration l) {
        if (!rep.existsById(l.getId()))
            throw new RuntimeException("LessonRegistration with id " + l.getId() + " does not exist.");
    
        // לוודא שגם כאן הישויות קיימות
        Long userId = l.getId().getUserId();
        Long lessonId = l.getId().getLessonId();
    
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found with ID: " + lessonId));
    
        l.setUser(user);
        l.setLesson(lesson);
    
        rep.save(l);
    }
    

    @Override
    public List<LessonHistoryDTO> getLessonsByUserId(Long userId) {
        List<LessonRegistration> registrations = lessonRegistrationRepository.findByUser_Code(userId);

        return registrations.stream().map(reg -> {
            LessonHistoryDTO dto = new LessonHistoryDTO();
            dto.setLessonId(reg.getLesson().getId());
            dto.setTitle(reg.getLesson().getName());
            dto.setDate(reg.getLesson().getDate().toString());
            dto.setTime(reg.getLesson().getTime().toString().substring(0, 5));
            dto.setStatus(reg.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteLessonRegistration(LessonRegistrationId idLessonRegistration) {
        rep.deleteById(idLessonRegistration);
    }

    @Override
    public List<LessonRegistration> getAll() {
        return (List<LessonRegistration>) rep.findAll();
    }

    @Override
    public LessonRegistration getByIdLessonRegistration(LessonRegistrationId idLessonRegistration) {
        return rep.findById(idLessonRegistration)
                .orElseThrow(() -> new RuntimeException(
                        "LessonRegistration with id " + idLessonRegistration + " not found"));
    }
}
