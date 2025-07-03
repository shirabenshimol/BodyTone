package demo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.demo.dal.UserRepository;
import demo.demo.model.User;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository rep;

    @Override
    public void addUser(User u) {
        if (rep.existsById(u.getCode())) {
            throw new RuntimeException("Cannot add User with id " + u.getCode() + " because it already exists.");
        }
        rep.save(u);
    }

    @Override
    public void updateUser(User u) {
        if (!rep.existsById(u.getCode())) {
            throw new RuntimeException("Cannot update User with id " + u.getCode() + " because it does not exist.");
        }

        User existingUser = rep.findById(u.getCode())
            .orElseThrow(() -> new RuntimeException("User not found."));

        // שמירה על הסיסמה הקיימת אם לא הוזנה חדשה
        if (u.getPassword() == null || u.getPassword().trim().isEmpty()) {
            u.setPassword(existingUser.getPassword());
        }

        rep.save(u);
    }

    @Override
    public void deleteUser(long idUser) {
        if (!rep.existsById(idUser)) {
            throw new RuntimeException("Cannot delete User with id " + idUser + " because it does not exist.");
        }
        rep.deleteById(idUser);
    }

    @Override
    public List<User> getAll() {
        return (List<User>) rep.findAll();
    }

    @Override
    public User getByIdUser(long idUser) {
        Optional<User> u = rep.findById(idUser);
        return u.orElseThrow(() -> new RuntimeException("User with id " + idUser + " not found."));
    }
}
