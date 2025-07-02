package demo.demo.service;
import demo.demo.dto.UserDTO;
import demo.demo.model.User;
import demo.demo.dal.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
   private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(UserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        User user = modelMapper.map(dto, User.class);

        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);

        return jwtUtil.generateToken(user.getEmail());
    }

    public String login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public Long getUserCodeByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getCode)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    

  
}
