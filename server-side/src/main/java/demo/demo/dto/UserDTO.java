package demo.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserDTO {
    private Long code;
    private String name;
    private String password;
    private String phone;
    private String email;
    private String birthDate; // או LocalDate אם את מעבדת אותו בצד שרת
    private String address;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
    private Long membershipId;  // מקשר למנוי דרך מזהה בלבד
}
