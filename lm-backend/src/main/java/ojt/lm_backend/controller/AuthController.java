package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.*;
import ojt.lm_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    //test security
    @GetMapping("/getuser/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<UserDto> getuser(@PathVariable("name") String usernameoremail){
        UserDto u = authService.account(usernameoremail);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }

    @PostMapping("/login/google")
    public ResponseEntity<JwtAuthResponse> loginWithGoogle(@RequestBody AuthRequestDto authRequestDto) {
        JwtAuthResponse jwtAuthResponse = authService.loginWithGoogle(authRequestDto);
        return new ResponseEntity<>(jwtAuthResponse,HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> ChangePassword(@RequestBody ChangePasswordRequestDto changePasswordRequestDto) {
        return new ResponseEntity<>(authService.changePassword(changePasswordRequestDto), HttpStatus.OK);
    }

}
