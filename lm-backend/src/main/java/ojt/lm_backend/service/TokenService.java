package ojt.lm_backend.service;

import ojt.lm_backend.dto.TokenDto;

public interface TokenService {
    TokenDto generateToken(String email);
    String verifyToken(String token);
    TokenDto getToken(String token);
}
