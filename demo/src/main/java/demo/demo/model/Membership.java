package demo.demo.model;

import jakarta.persistence.*;
import java.util.List;  // רשימה של משתמשים המשתייכים למנוי
import lombok.Data;


@Data
@Entity  // טבלה במסד הנתונים
@Table(name = "memberships")  // שם הטבלה

public class Membership {

    @Id  // מזהה ראשי בטבלה
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    // ערך אוטומטי בטבלה
    private Long id;

    @Column
    private String name;  // שם המנוי, לדוגמה "חודשי" או "שנתי"

    @Column
    private String describition;  // תיאור

    @OneToMany(mappedBy = "membership")  
    // קשר "אחד-לרבים": מנוי אחד מחזיק רשימת משתמשים
    // mappedBy מציין שהקשר מנוהל על ידי המשתנה "membership" במחלקת User
    private List<User> users;

    // Getters & Setters
}
