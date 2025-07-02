package demo.demo.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable  // מציין שזהו סוג שמוטמע בתוך Entity אחר (מפתח משולב)
public class LessonRegistrationId implements Serializable {

    private Long userId;  // מזהה משתמש
    private Long lessonId;  // מזהה שיעור

    public LessonRegistrationId() {}  // קונסטרקטור ריק דרוש ל-JPA

    public LessonRegistrationId(Long userId, Long lessonId) {
        this.userId = userId;
        this.lessonId = lessonId;
    }

    // equals & hashCode - הכרחיים כדי ש-JPA יוכל להשוות מפתחות
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LessonRegistrationId)) return false;
        LessonRegistrationId that = (LessonRegistrationId) o;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(lessonId, that.lessonId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, lessonId);
    }

    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getLessonId() {
        return lessonId;
    }
    
    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }
    
}
