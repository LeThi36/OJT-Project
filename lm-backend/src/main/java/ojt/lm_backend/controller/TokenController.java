package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.ForgotPasswordRequest;
import ojt.lm_backend.dto.TokenDto;
import ojt.lm_backend.entity.EmailDetail;
import ojt.lm_backend.service.EmailService;
import ojt.lm_backend.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/token")
@CrossOrigin("*")
public class TokenController {
    private TokenService tokenService;
    private EmailService emailService;

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> generateToken(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        System.out.println(forgotPasswordRequest.getEmail());
        TokenDto tokenDto = tokenService.generateToken(forgotPasswordRequest.getEmail());
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setSubject("Reset your password");
        emailDetail.setRecipient(forgotPasswordRequest.getEmail());
        emailDetail.setMsgBody("http://localhost:3000/reset-password/" + tokenDto.getToken());
        emailService.sendSimpleEmail(emailDetail);
        return new ResponseEntity<>("Email Sent to User email: " + forgotPasswordRequest.getEmail(), HttpStatus.OK);
    }

    @GetMapping("{token}")
    public ResponseEntity<String> verifyToken(@PathVariable String token){
        return new ResponseEntity<>(tokenService.verifyToken(token),HttpStatus.OK);
    }

    @GetMapping("/getToken/{token}")
    public ResponseEntity<TokenDto> getToken(@PathVariable String token) {
        return new ResponseEntity<>(tokenService.getToken(token), HttpStatus.OK);
    }
}
