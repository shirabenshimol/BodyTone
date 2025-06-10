package demo.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;


@Data
@Entity
@Table(name = "lessons")

public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String name;  // שם השיעור, לדוגמה "יוגה למתחילים"
    @Column private LocalDate date;  // תאריך השיעור
    @Column private LocalTime time;  // זמן התחלת השיעור

    @Column(name = "max_capacity")  
    // שם עמודה שונה מטבע ברירת המחדל
    private Integer maxCapacity;  // קיבולת מרבית בשיעור

    @Column(name = "female_only")
    private Boolean femaleOnly;  // האם השיעור מיועד רק לנשים

    @OneToMany(mappedBy = "lesson")  
    // קשר אחד-לרבים: שיעור אחד מחזיק רשימת הרשמות
     @JsonManagedReference
    private List<LessonRegistration> registrations;

    // Getters & Setters
}
