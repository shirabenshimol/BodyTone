package demo.demo.dto;

import lombok.Data;

@Data
public class LessonHistoryDTO {
    private Long lessonId;
    private String title; // לדוגמה: "HIIT - Sarah M."
    private String date;  // YYYY-MM-DD
    private String time;  // HH:mm
    private String status; // REGISTERED, CANCELED, ATTENDED
}
