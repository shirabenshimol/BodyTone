package demo.demo.controller;

import java.util.List;
import java.lang.reflect.Type;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import demo.demo.dto.UserDTO;
import demo.demo.model.User;
import demo.demo.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/Users") // דרך הכתובת הזו תהיה הגישה לכל הפונקציות במחלקה
public class UserController {

    @Autowired
    private UserService aService;

    @Autowired
    private ModelMapper mapper; // לצורך המרת DTO ל-Entity ולהפך

    @GetMapping("/getAll")
    public List<UserDTO> getAllUsers() {
        Type t = new TypeToken<List<UserDTO>>() {}.getType();
        return mapper.map(aService.getAll(), t);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody UserDTO p) {
        try {
            aService.addUser(mapper.map(p, User.class));
            return ResponseEntity.ok().build(); // הצלחה ללא גוף
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעת הוספת משתמש: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO p) {
        try {
            aService.updateUser(mapper.map(p, User.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעדכון משתמש: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{idUser}") // תיאום בין שם בפרמטר לשם ב-URL
    public ResponseEntity<?> deleteUser(@PathVariable long idUser) {
        try {
            aService.deleteUser(idUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה במחיקת משתמש: " + e.getMessage());
        }
    }

    @GetMapping("/getByCode/{idUser}")
    public ResponseEntity<?> getUser(@PathVariable long idUser) {
        try {
            User user = aService.getByIdUser(idUser);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("משתמש לא נמצא");
            }
            UserDTO dto = mapper.map(user, UserDTO.class);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בקבלת משתמש: " + e.getMessage());
        }
    }
}
