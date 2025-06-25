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
    public List<UserDTO> getAllLessons() {
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
    public void updateUser(@RequestBody UserDTO p) {
        aService.updateUser(mapper.map(p, User.class));
    }

    @DeleteMapping("/delete/{idUser}") // תיאום בין שם בפרמטר לשם ב-URL
    public void deleteUser(@PathVariable int idUser) {
        aService.deleteUser(idUser);
    }

   @GetMapping("/getByCode/{idUser}")
    public User getUser(@PathVariable long idUser) {
    return aService.getByIdUser(idUser);
}

}
