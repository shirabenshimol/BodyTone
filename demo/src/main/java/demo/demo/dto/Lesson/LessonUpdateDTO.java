package demo.demo.dto.Lesson;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
public class LessonUpdateDTO {
    private String name;
    private LocalDate date;
    private LocalTime time;
    private Integer maxCapacity;
    private Boolean femaleOnly;
}
