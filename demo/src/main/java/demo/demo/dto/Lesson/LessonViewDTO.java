package demo.demo.dto.Lesson;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import demo.demo.dto.LessonRegistration.LessonRegistrationViewDTO;
import lombok.Data;

@Data
public class LessonViewDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private LocalTime time;
    private Integer maxCapacity;
    private Boolean femaleOnly;

    private List<LessonRegistrationViewDTO> registrations;
}
