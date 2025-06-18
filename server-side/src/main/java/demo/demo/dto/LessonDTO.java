package demo.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class LessonDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private LocalTime time;
    private Integer maxCapacity;
    private Boolean femaleOnly;
}



