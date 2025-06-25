package demo.demo.controller;

import java.util.List;
import java.lang.reflect.Type;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import demo.demo.dto.MembershipDTO;
import demo.demo.model.Membership;
import demo.demo.service.MembershipService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/Membership") // דרך הכתובת הזו תהיה הגישה לכל הפונקציות במחלקה
public class MembershipController {

    @Autowired
    private MembershipService aService;

    @Autowired
    private ModelMapper mapper; // לצורך המרת DTO ל-Entity ולהפך

    @GetMapping("/getAll")
    public List<MembershipDTO> getAllMembership() {
        Type t = new TypeToken<List<MembershipDTO>>() {}.getType();
        return mapper.map(aService.getAll(), t);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLesson(@RequestBody MembershipDTO p) {
        try {
            aService.addMembership(mapper.map(p, Membership.class));
            return ResponseEntity.ok().build(); // הצלחה ללא גוף
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("שגיאה בעת הוספת שיעור: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public void updateMembership(@RequestBody MembershipDTO p) {
        aService.updateMembership(mapper.map(p, Membership.class));
    }

    @DeleteMapping("/delete/{idMembership}") // תיאום בין שם בפרמטר לשם ב-URL
    public void deleteMembership(@PathVariable int idMembership) {
        aService.deleteMembership(idMembership);
    }

   @GetMapping("/getByCode/{idMembership}")
    public Membership getMembershipn(@PathVariable long idMembership) {
    return aService.getByIdMembership(idMembership);
}

}

