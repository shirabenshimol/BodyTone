package demo.demo.service;
import java.util.List;
import demo.demo.model.User;

public interface UserService {
 void addUser(User u);
    void updateUser(User u);
    void deleteUser(long idUser);
    List<User> getAll();
    User getByIdUser(long idUser);
} 
