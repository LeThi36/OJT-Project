package ojt.lm_backend.security;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetail implements UserDetailsService {
    private UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        Set<GrantedAuthority> authorities = new HashSet<>();
        if (user.getRole().getRoleName() != null) {
            authorities.add(new SimpleGrantedAuthority(user.getRole().getRoleName()));
        }
        return new org.springframework.security.core.userdetails.User(
                usernameOrEmail,
                user.getPasswordHash(),
                authorities
        );
    }
}
