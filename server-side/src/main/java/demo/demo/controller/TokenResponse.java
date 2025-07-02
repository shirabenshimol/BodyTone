package demo.demo.controller;

public class TokenResponse {
    private String token;
    private Long code;

    public TokenResponse(String token, Long code) {
        this.token = token;
        this.code = code;
    }

    public String getToken() {
        return token;
    }

    public Long getCode() {
        return code;
    }
}

