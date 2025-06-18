package demo.demo.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class LessonRegistrationDTO {
    private Long userId;
    private Long lessonId;
    private LocalDateTime joinedAt;
    private String status;
}
