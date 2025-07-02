package demo.demo.controller;

import demo.demo.dto.UserDTO;
import demo.demo.service.AuthService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
public TokenResponse login(@RequestBody LoginRequest request) {
    String token = authService.login(request.getEmail(), request.getPassword());
    Long code = authService.getUserCodeByEmail(request.getEmail());
    return new TokenResponse(token, code);
}


    // מחלקת עזר פנימית בשביל בקשת login
    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    // מחלקת עזר להחזרת הטוקן כ־JSON
    // @Data
    // public static class TokenResponse {
    //     private String token;
    //     private Long code;

    //     public TokenResponse(String token, Long code) {
    //         this.token = token;
    //         this.code = code;
    //     }
    // }
}
