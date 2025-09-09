// package demo.demo.controller;

// import java.util.List;
// import java.lang.reflect.Type;

// import org.modelmapper.ModelMapper;
// import org.modelmapper.TypeToken;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import demo.demo.dto.LessonHistoryDTO;
// import demo.demo.dto.LessonRegistrationDTO;
// import demo.demo.model.LessonRegistration;
// import demo.demo.model.LessonRegistrationId;
// import demo.demo.service.LessonRegistrationService;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// @RestController
// @RequestMapping("/LessonRegistration")
// public class LessonRegistrationController {

//     @Autowired
//     private LessonRegistrationService aService;

//     @Autowired
//     private ModelMapper mapper;

//     @GetMapping("/getAll")
//     public List<LessonRegistrationDTO> getAll() {
//         Type listType = new TypeToken<List<LessonRegistrationDTO>>() {}.getType();
//         return mapper.map(aService.getAll(), listType);
//     }

//     @PostMapping("/add")
//     public ResponseEntity<?> add(@RequestBody LessonRegistrationDTO dto) {
//         try {
//             aService.addLessonRegistration(mapper.map(dto, LessonRegistration.class));
//             return ResponseEntity.ok().build();
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity
//                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body("שגיאה בעת הוספת הרשמה: " + e.getMessage());
//         }
//     }

//     @PutMapping("/update")
//     public ResponseEntity<?> update(@RequestBody LessonRegistrationDTO dto) {
//         try {
//             aService.updateLessonRegistration(mapper.map(dto, LessonRegistration.class));
//             return ResponseEntity.ok().build();
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("שגיאה בעדכון הרשמה: " + e.getMessage());
//         }
//     }

//     @DeleteMapping("/delete/{lessonId}/{studentId}")
//     public ResponseEntity<?> delete(@PathVariable long lessonId, @PathVariable long studentId) {
//         try {
//             LessonRegistrationId id = new LessonRegistrationId(studentId,lessonId);
//             aService.deleteLessonRegistration(id);
//             return ResponseEntity.ok().build();
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("שגיאה במחיקת הרשמה: " + e.getMessage());
//         }
//     }

//     @GetMapping("/getById/{lessonId}/{studentId}")
//     public ResponseEntity<?> getById(@PathVariable long lessonId, @PathVariable long studentId) {
//         try {
//             LessonRegistrationId id = new LessonRegistrationId(lessonId, studentId);
//             LessonRegistration entity = aService.getByIdLessonRegistration(id);
//             if (entity == null) {
//                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("הרשמה לא נמצאה");
//             }
//             LessonRegistrationDTO dto = mapper.map(entity, LessonRegistrationDTO.class);
//             return ResponseEntity.ok(dto);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("שגיאה בקבלת הרשמה: " + e.getMessage());
//         }
//     }

//     @GetMapping("/getByUser/{userId}")
// public ResponseEntity<?> getLessonsByUser(@PathVariable Long userId) {
//     try {
//         List<LessonHistoryDTO> list = aService.getLessonsByUserId(userId);
//         return ResponseEntity.ok(list);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body("שגיאה בשליפת שיעורים למשתמש");
//     }
// }

// }


package demo.demo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import demo.demo.dto.LessonHistoryDTO;
import demo.demo.dto.LessonRegistrationDTO;
import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;
import demo.demo.service.LessonRegistrationService;

@RestController
@RequestMapping("/LessonRegistration")
public class LessonRegistrationController {

    @Autowired
    private LessonRegistrationService aService;

    /* ---------- Helpers: map Entity <-> DTO ---------- */

    private LessonRegistrationDTO toDto(LessonRegistration entity) {
        LessonRegistrationDTO dto = new LessonRegistrationDTO();
        if (entity.getId() != null) {
            dto.setUserId(entity.getId().getUserId());
            dto.setLessonId(entity.getId().getLessonId());
        }
        dto.setJoinedAt(entity.getJoinedAt());
        dto.setStatus(entity.getStatus());
        return dto;
    }

    private LessonRegistration fromDto(LessonRegistrationDTO dto) {
        LessonRegistration entity = new LessonRegistration();
        // סדר נכון ב-ID: userId, ואז lessonId
        LessonRegistrationId id = new LessonRegistrationId(dto.getUserId(), dto.getLessonId());
        entity.setId(id);
        entity.setJoinedAt(dto.getJoinedAt());
        entity.setStatus(dto.getStatus());
        // אם בהמשך תרצי לטעון גם ישויות (Lesson/User) מהדאטהבייס:
        // entity.setUser(userRepo.getReferenceById(dto.getUserId()));
        // entity.setLesson(lessonRepo.getReferenceById(dto.getLessonId()));
        return entity;
    }

    /* -------------------- Endpoints -------------------- */

    @GetMapping("/getAll")
    public List<LessonRegistrationDTO> getAll() {
        return aService.getAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody LessonRegistrationDTO dto) {
        try {
            LessonRegistration entity = fromDto(dto);
            aService.addLessonRegistration(entity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה בעת הוספת הרשמה: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody LessonRegistrationDTO dto) {
        try {
            LessonRegistration entity = fromDto(dto);
            aService.updateLessonRegistration(entity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעדכון הרשמה: " + e.getMessage());
        }
    }

    // שמרתי את שמות הפרמטרים בשביל תאימות לאחור (studentId = userId),
    // אבל בניית ה-ID היא תמיד (userId, lessonId)
    @DeleteMapping("/delete/{lessonId}/{studentId}")
    public ResponseEntity<?> delete(@PathVariable long lessonId, @PathVariable long studentId) {
        try {
            LessonRegistrationId id = new LessonRegistrationId(studentId, lessonId); // userId, lessonId
            aService.deleteLessonRegistration(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה במחיקת הרשמה: " + e.getMessage());
        }
    }

    @GetMapping("/getById/{lessonId}/{studentId}")
    public ResponseEntity<?> getById(@PathVariable long lessonId, @PathVariable long studentId) {
        try {
            LessonRegistrationId id = new LessonRegistrationId(studentId, lessonId); // userId, lessonId
            LessonRegistration entity = aService.getByIdLessonRegistration(id);
            if (entity == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("הרשמה לא נמצאה");
            }
            return ResponseEntity.ok(toDto(entity));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בקבלת הרשמה: " + e.getMessage());
        }
    }

    @GetMapping("/getByUser/{userId}")
    public ResponseEntity<?> getLessonsByUser(@PathVariable Long userId) {
        try {
            List<LessonHistoryDTO> list = aService.getLessonsByUserId(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בשליפת שיעורים למשתמש");
        }
    }
}
