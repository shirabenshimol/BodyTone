package demo.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue
  private Long code;

  @Column
  private String name;

  @Column
  private String password;

  @Column
  private String phone;

  @Column
  private String email;

  @Column
  private LocalDate birthDate;

  @Column
  private String address;

  @Column(name = "membership_start")
  private LocalDate membershipStart;

  @Column(name = "membership_end")
  private LocalDate membershipEnd;

  @ManyToOne
  @JoinColumn(name = "membership_id")
  private Membership membership;
}
