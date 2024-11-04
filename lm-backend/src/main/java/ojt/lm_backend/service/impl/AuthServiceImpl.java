package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.JwtAuthResponse;
import ojt.lm_backend.dto.LoginDto;
import ojt.lm_backend.dto.RegisterDto;
import ojt.lm_backend.dto.UserDto;
import ojt.lm_backend.entity.Role;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.LMAPIException;
import ojt.lm_backend.repository.RoleRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.security.JwtTokenProvider;
import ojt.lm_backend.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private PasswordEncoder passwordEncoder;

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
    
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDto.getUsernameOrEmail(),
                    loginDto.getPassword()
            ));
            SecurityContextHolder.getContext().setAuthentication(authentication);
    
            String token = jwtTokenProvider.generateToken(authentication);
    
            Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());
    
    
            String role = null;
            if (userOptional.isPresent()) {
                User loggedInUser = userOptional.get();
    
                if (loggedInUser.getRole() != null && loggedInUser.getRole().getRoleName() != null) {
                    role = loggedInUser.getRole().getRoleName();
                }
            }
    
            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setRole(role);
            jwtAuthResponse.setAccessToken(token);
            User u = userOptional.orElseThrow(()->new RuntimeException("aaa"));
            System.out.println(u.getRole().getRoleName());
            return jwtAuthResponse;
        }
//test security
    @Override
    public UserDto account(String name) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(name,name);
        return modelMapper.map(userOptional, UserDto.class);
    }
}
