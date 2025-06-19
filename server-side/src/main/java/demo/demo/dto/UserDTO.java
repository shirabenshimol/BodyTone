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
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
    private Long membershipId;  // מקשר למנוי דרך מזהה בלבד
}
