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
        Type t = new TypeToken<List<LessonDTO>>() {}.getType();
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
    public void updateLesson(@RequestBody LessonDTO p) {
        aService.updateLesson(mapper.map(p, Lesson.class));
    }

    @DeleteMapping("/delete/{idLesson}") // תיאום בין שם בפרמטר לשם ב-URL
    public void deleteLesson(@PathVariable int idLesson) {
        aService.deleteLesson(idLesson);
    }

   @GetMapping("/getByCode/{idLesson}")
    public Lesson getLesson(@PathVariable long idLesson) {
    return aService.getByIdLesson(idLesson);
}

}

