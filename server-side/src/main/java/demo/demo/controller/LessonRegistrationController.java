package demo.demo.controller;

import java.util.List;
import java.lang.reflect.Type;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import demo.demo.dto.LessonRegistrationDTO;
import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;
import demo.demo.service.LessonRegistrationSevrice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/LessonRegistration")
public class LessonRegistrationController {

    @Autowired
    private LessonRegistrationSevrice aService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping("/getAll")
    public List<LessonRegistrationDTO> getAll() {
        Type listType = new TypeToken<List<LessonRegistrationDTO>>() {}.getType();
        return mapper.map(aService.getAll(), listType);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody LessonRegistrationDTO dto) {
        try {
            aService.addLessonRegistration(mapper.map(dto, LessonRegistration.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה בעת הוספת הרשמה: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public void update(@RequestBody LessonRegistrationDTO dto) {
        aService.updateLessonRegistration(mapper.map(dto, LessonRegistration.class));
    }

  @DeleteMapping("/delete/{lessonId}/{studentId}")
public void delete(@PathVariable long lessonId, @PathVariable long studentId) {
    LessonRegistrationId id = new LessonRegistrationId(lessonId, studentId);
    aService.deleteLessonRegistration(id);
}


   @GetMapping("/getById/{lessonId}/{studentId}")
public LessonRegistration getById(@PathVariable long lessonId, @PathVariable long studentId) {
    LessonRegistrationId id = new LessonRegistrationId(lessonId, studentId);
    return aService.getByIdLessonRegistration(id);
}

}
