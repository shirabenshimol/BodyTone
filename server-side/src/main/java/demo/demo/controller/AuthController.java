package demo.demo.controller;
import demo.demo.model.User;

import demo.demo.dto.UserDTO;
import demo.demo.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ={ "http://localhost:3000",
"http://bodytone-frontend.s3-website-us-east-1.amazonaws.com"},
allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public TokenResponse register(@RequestBody UserDTO dto) {
        String token = authService.register(dto);
        Long code = authService.getUserCodeByEmail(dto.getEmail());
        return new TokenResponse(token, code);
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {
    String token = authService.login(request.getEmail(), request.getPassword());
    Long code = authService.getUserCodeByEmail(request.getEmail());
    User user = authService.getUserByEmail(request.getEmail());

    return new LoginResponse(
        token,
        code,
        user.getName(),
        user.getEmail(),
        user.getPhone(),
        user.getAddress(),
        user.getMembership() != null ? user.getMembership().getName() : "None",
        user.getBirthDate() != null ? user.getBirthDate().toString() : null
    );
    

}


    // מחלקת עזר פנימית בשביל בקשת login
    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public class LoginResponse {
        private String token;
        private Long code;
        private String name;
        private String email;
        private String phone;
        private String address;
        private String membership;
        private String birthDate;

    }

    // מחלקת עזר להחזרת הטוקן כ־JSON
    // @Data
    // public static class TokenResponse {
    // private String token;
    // private Long code;

    // public TokenResponse(String token, Long code) {
    // this.token = token;
    // this.code = code;
    // }
    // }
}
