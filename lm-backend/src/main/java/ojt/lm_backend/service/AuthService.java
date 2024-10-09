package ojt.lm_backend.service;

import ojt.lm_backend.dto.JwtAuthResponse;
import ojt.lm_backend.dto.LoginDto;
import ojt.lm_backend.dto.RegisterDto;
import ojt.lm_backend.dto.UserDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
    //test security
    UserDto account (String name);
}
