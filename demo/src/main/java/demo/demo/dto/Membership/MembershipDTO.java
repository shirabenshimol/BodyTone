package demo.demo.dto.Membership;

import lombok.Data;

@Data
public class MembershipDTO {
    private Long id;
    private String name;
    private String describition;
    // לא מוסיפים את רשימת המשתמשים כדי לא להכביד ולא להיכנס ללולאות סירקולריות
}
