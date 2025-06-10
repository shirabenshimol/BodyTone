package demo.demo.dto.LessonRegistration;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class LessonRegistrationViewDTO {
    private Long userId;
    private Long lessonId;
    private LocalDateTime joinedAt;
    private String status;
}
