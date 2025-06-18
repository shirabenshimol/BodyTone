package demo.demo.service;
import java.util.List;
import demo.demo.model.Membership;

public interface MembershipService {
 void addMembership(Membership m);
    void updateMembership(Membership m);
    void deleteMembership(long idMembership);
    List<Membership> getAll();
    Membership getByIdMembership(long idMembership);
} 
