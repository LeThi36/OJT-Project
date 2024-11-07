package ojt.lm_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class GoogleAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private CustomUserDetail customUserDetail;  // You should have a service that loads user by email

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = (String) authentication.getPrincipal();

        // Load user by email (from DB)
        UserDetails userDetails = customUserDetail.loadUserByUsername(email);

        // Create a successful authenticated token with user's authorities
        return new GoogleAuthenticationToken(userDetails.getUsername(), userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return GoogleAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
