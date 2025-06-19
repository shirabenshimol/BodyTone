package demo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.demo.dal.MembershipRepository;
import demo.demo.model.Membership;

@Service
public class MembershipServiceImpl implements MembershipService {

    @Autowired
    private MembershipRepository rep;

    @Override
    public void addMembership(Membership m) {
        if (rep.existsById(m.getId())) {
            throw new RuntimeException("Cannot add Membership with id " + m.getId() + " because it already exists.");
        }
        rep.save(m);
    }

    @Override
    public void updateMembership(Membership m) {
        if (!rep.existsById(m.getId())) {
            throw new RuntimeException("Cannot update Membership with id " + m.getId() + " because it does not exist.");
        }
        rep.save(m);
    }

    @Override
    public void deleteMembership(long idMembership) {
        if (!rep.existsById(idMembership)) {
            throw new RuntimeException("Cannot delete Membership with id " + idMembership + " because it does not exist.");
        }
        rep.deleteById(idMembership);
    }

    @Override
    public List<Membership> getAll() {
        return (List<Membership>) rep.findAll();
    }

    @Override
    public Membership getByIdMembership(long idMembership) {
        Optional<Membership> m = rep.findById(idMembership);
        if (m.isPresent()) {
            return m.get();
        } else {
            throw new RuntimeException("Membership with id " + idMembership + " not found");
        }
    }
}
