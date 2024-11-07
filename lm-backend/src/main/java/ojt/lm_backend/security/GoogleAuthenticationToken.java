package ojt.lm_backend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class GoogleAuthenticationToken extends AbstractAuthenticationToken {
    private final Object principal;

    public GoogleAuthenticationToken(Object principal) {
        super(null);
        this.principal = principal;
        setAuthenticated(false);
    }

    public GoogleAuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;  // No credentials required
    }

    @Override
    public Object getPrincipal() {
        return this.principal;  // This is typically the email
    }
}
