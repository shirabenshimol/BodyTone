package demo.demo.dto.User;
import java.time.LocalDate;
import lombok.Data;

@Data
public class UserDTO {
    private Long code;
    private String name;
    private String phone;
    private String email;
    private LocalDate membershipStart;
    private LocalDate membershipEnd;

    // אפשר לשמור רק את ה-ID של המנוי (Membership) כדי לא להעמיס בפרטים
    private Long membershipId;

    // אם תרצי, ניתן להוסיף גם שם מנוי, אבל זה כבר מורכב יותר
}
