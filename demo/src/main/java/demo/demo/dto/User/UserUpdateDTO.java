package demo.demo.dto.User;
import java.time.LocalDate;
import lombok.Data;

@Data
public class UserUpdateDTO {
    private String phone;
    private LocalDate membershipEnd;
}
