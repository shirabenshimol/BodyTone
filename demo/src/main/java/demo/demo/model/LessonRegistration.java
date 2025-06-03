package demo.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;


@Data
@Entity
@Table(name = "lesson_registration")  // טבלת קשר בין משתמשים לשיעורים

public class LessonRegistration {

    @EmbeddedId  
    // מזהה משולב, המייצג מפתח ראשי משותף משני שדות (userId + lessonId)
    private LessonRegistrationId id = new LessonRegistrationId();

    @ManyToOne  // קשר רבים-לאחד ל-User
    @MapsId("userId")  // מורה ש-id של המשתמש בקומפוזיציה הוא userId
    @JoinColumn(name = "user_id")  // עמודת המפתח הזר
    private User user;

    @ManyToOne  // קשר רבים-לאחד ל-Lesson
    @MapsId("lessonId")  // id משותף בקומפוזיציה הוא lessonId
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;  // תאריך ושעת ההרשמה לשיעור

    
    @Column private String status;  // סטטוס ההרשמה (REGISTERED, CANCELED, ATTENDED)

    // Getters & Setters
}
