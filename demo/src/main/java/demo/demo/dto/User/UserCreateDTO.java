package demo.demo.dto.User;
import java.time.LocalDate;
import lombok.Data;

@Data
public class UserCreateDTO {
    private String name;
    private String password;
    private String phone;
    private String email;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;
    private Long membershipId;
}
