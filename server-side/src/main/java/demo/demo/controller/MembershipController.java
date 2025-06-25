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
    public ResponseEntity<?> addMembership(@RequestBody MembershipDTO p) {
        try {
            aService.addMembership(mapper.map(p, Membership.class));
            return ResponseEntity.ok().build(); // הצלחה ללא גוף
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה בעת הוספת חבר: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMembership(@RequestBody MembershipDTO p) {
        try {
            aService.updateMembership(mapper.map(p, Membership.class));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה בעדכון חבר: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{idMembership}") // תיאום בין שם בפרמטר לשם ב-URL
    public ResponseEntity<?> deleteMembership(@PathVariable long idMembership) {
        try {
            aService.deleteMembership(idMembership);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה במחיקת חבר: " + e.getMessage());
        }
    }

    @GetMapping("/getByCode/{idMembership}")
    public ResponseEntity<?> getMembership(@PathVariable long idMembership) {
        try {
            Membership membership = aService.getByIdMembership(idMembership);
            if (membership == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("חבר לא נמצא");
            }
            MembershipDTO dto = mapper.map(membership, MembershipDTO.class);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("שגיאה בקבלת חבר: " + e.getMessage());
        }
    }
}
