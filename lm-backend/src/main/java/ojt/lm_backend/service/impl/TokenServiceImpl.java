package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.TokenDto;
import ojt.lm_backend.entity.Token;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.TokenRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.TokenService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TokenServiceImpl implements TokenService {
    private TokenRepository tokenRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    @Override
    public TokenDto generateToken(String email) {
        User u = userRepository.findByUsernameOrEmail(email, email).orElseThrow(() -> {
            throw new ResourceNotFoundException("user not found");
        });
        System.out.println(u.getEmail());
        Token token = new Token();
        token.setToken(generateRandomString());
        token.setUser(u);
        System.out.println(token.getToken());
        Token token1 = tokenRepository.save(token);
        return modelMapper.map(token1, TokenDto.class);
    }

    @Override
    public String verifyToken(String token) {
        Token token1 = tokenRepository.findByToken(token).orElse(null);
        if (token1 == null) {
            return "token not found";
        } else {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            if(now.after(token1.getExpiresAt())){
                return "token has been expired";
            }
        }
        return "token is valid";
    }

    @Override
    public TokenDto getToken(String token) {
        Token token1 = tokenRepository.findByToken(token).orElse(null);
        return modelMapper.map(token1,TokenDto.class);
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString();
    }
}
