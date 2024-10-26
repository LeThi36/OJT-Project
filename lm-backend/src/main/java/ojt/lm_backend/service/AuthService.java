package ojt.lm_backend.service;

import ojt.lm_backend.dto.*;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
    //test security
    UserDto account (String name);

    JwtAuthResponse loginWithGoogle(AuthRequestDto authRequestDto);
    String changePassword(ChangePasswordRequestDto changePasswordRequestDto);
}
