package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.*;
import ojt.lm_backend.entity.EmailDetail;
import ojt.lm_backend.entity.Role;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.LMAPIException;
import ojt.lm_backend.repository.RoleRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.security.GoogleAuthenticationToken;
import ojt.lm_backend.security.JwtTokenProvider;
import ojt.lm_backend.service.AuthService;
import ojt.lm_backend.service.EmailService;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;

    private ModelMapper modelMapper;

    @Override
    public String register(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new LMAPIException(HttpStatus.BAD_REQUEST, "Username is exists");
        }
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new LMAPIException(HttpStatus.BAD_REQUEST, "Email is exists");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerDto.getPassword_hash()));
        user.setAddress(registerDto.getAddress());
        user.setPhoneNumber(registerDto.getPhonenumber());
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        Role userRole = roleRepository.findByRoleName("ROLE_USER");
        user.setRole(userRole);
        userRepository.save(user);
        return "User register successfully !";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());
        String username = null;
        long userID = 0;
        String role = null;
        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            username = loggedInUser.getUsername();
            userID = loggedInUser.getUserId();
            if (loggedInUser.getRole() != null && loggedInUser.getRole().getRoleName() != null) {
                role = loggedInUser.getRole().getRoleName();
            }
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                username,
                loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setUserId(userID);
        jwtAuthResponse.setAccessToken(token);
        User u = userOptional.orElseThrow(() -> new RuntimeException("aaa"));
        System.out.println(userID+" "+role);
        return jwtAuthResponse;
    }

    //test security
    @Override
    public UserDto account(String name) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(name, name);
        return modelMapper.map(userOptional, UserDto.class);
    }

    @Override
    public JwtAuthResponse loginWithGoogle(AuthRequestDto authRequestDto) {
        String credential = authRequestDto.getCredential();
        String email = extractEmailFromCredential(credential);


        Optional<User> userOptional = userRepository.findByUsernameOrEmail(email, email);

        long userId = 0;
        String role = null;
        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            userId = loggedInUser.getUserId();
            if (loggedInUser.getRole() != null && loggedInUser.getRole().getRoleName() != null) {
                role = loggedInUser.getRole().getRoleName();
            }
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            Role userRole = roleRepository.findByRoleName("ROLE_USER");
            newUser.setRole(userRole);
            String passwordRandom = usingRandomUUID();
            newUser.setPasswordHash(passwordEncoder.encode(passwordRandom));
            String[] arrStr = email.split("@");
            newUser.setUsername(arrStr[0]);
            userRepository.save(newUser);
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setRecipient(email);
            emailDetail.setMsgBody("your password is: " + passwordRandom);
            emailDetail.setSubject("Welcome " + email + " to our project");
            emailService.sendSimpleEmail(emailDetail);
            role = newUser.getRole().getRoleName();
        }
        Authentication authentication = new GoogleAuthenticationToken(email);
        Authentication authenticated = authenticationManager.authenticate(authentication);

        SecurityContextHolder.getContext().setAuthentication(authenticated);
        String token = jwtTokenProvider.generateToken(authenticated);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setUserId(userId);
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        System.out.println(userId+" "+role);
        return jwtAuthResponse;
    }

    @Override
    public String changePassword(ChangePasswordRequestDto changePasswordRequestDto) {
        User user = userRepository.findByUsernameOrEmail(changePasswordRequestDto.getEmail(), changePasswordRequestDto.getEmail()).orElse(null);
        if (user != null) {
            if (passwordEncoder.matches(changePasswordRequestDto.getOldPassword(), user.getPasswordHash())) {
                user.setPasswordHash(passwordEncoder.encode(changePasswordRequestDto.getNewPassword()));
            } else {
                return "old password not match";
            }
        } else {
            return changePasswordRequestDto.getEmail() + " email not found";
        }
        userRepository.save(user);
        return "change password successfully";
    }

    private String extractEmailFromCredential(String credential) {
        try {
            String[] parts = credential.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid JWT token structure");
            }

            String payload = parts[1];
            String decodedPayload = decodeBase64Url(payload);

            // Parse the JSON
            JSONObject jsonObject = new JSONObject(decodedPayload);
            return jsonObject.getString("email");
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Handle errors appropriately
        }
    }

    private String decodeBase64Url(String base64Url) {
        String base64 = base64Url.replace('-', '+').replace('_', '/');
        switch (base64.length() % 4) {
            case 2:
                base64 += "==";
                break;
            case 3:
                base64 += "=";
                break;
        }
        return new String(Base64.getDecoder().decode(base64));
    }

    private String usingRandomUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("_", "");
    }
}
