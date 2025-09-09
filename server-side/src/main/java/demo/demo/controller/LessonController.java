package demo.demo.controller;

import java.util.List;
import java.lang.reflect.Type;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import demo.demo.dto.LessonDTO;
import demo.demo.model.Lesson;
import demo.demo.service.LessonService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/Lessons") // דרך הכתובת הזו תהיה הגישה לכל הפונקציות במחלקה
public class LessonController {

    @Autowired
    private LessonService aService;

    @Autowired
    private ModelMapper mapper; // לצורך המרת DTO ל-Entity ולהפך

    @GetMapping("/getAll")
    public List<LessonDTO> getAllLessons() {
        Type t = new TypeToken<List<LessonDTO>>() {
        }.getType();
        return mapper.map(aService.getAll(), t);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLesson(@RequestBody LessonDTO p) {
        try {
            aService.addLesson(mapper.map(p, Lesson.class));
            return ResponseEntity.ok().build(); // הצלחה ללא גוף
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעת הוספת שיעור: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateLesson(@RequestBody LessonDTO p) {
        try {
            aService.updateLesson(mapper.map(p, Lesson.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעדכון שיעור: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{idLesson}") // תיאום בין שם בפרמטר לשם ב-URL
    public ResponseEntity<?> deleteLesson(@PathVariable long idLesson) {
        try {
            aService.deleteLesson(idLesson);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה במחיקת שיעור: " + e.getMessage());
        }
    }

    @GetMapping("/getByCode/{idLesson}")
    public ResponseEntity<?> getLesson(@PathVariable long idLesson) {
        try {
            Lesson lesson = aService.getByIdLesson(idLesson);
            if (lesson == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("שיעור לא נמצא");
            }
            return ResponseEntity.ok(mapper.map(lesson, LessonDTO.class));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בקבלת השיעור: " + e.getMessage());
        }
    }

    @GetMapping("/byMonth")
public List<LessonDTO> getLessonsByMonth(@RequestParam int month, @RequestParam int year) {
    Type t = new TypeToken<List<LessonDTO>>() {}.getType();
    return mapper.map(aService.getLessonsByMonth(month, year), t);
}


}
