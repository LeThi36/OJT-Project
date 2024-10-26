package ojt.lm_backend.config;

import lombok.AllArgsConstructor;
import ojt.lm_backend.security.CustomUserDetail;
import ojt.lm_backend.security.GoogleAuthenticationProvider;
import ojt.lm_backend.security.JwtAuthenticationEntryPoint;
import ojt.lm_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {
    private JwtAuthenticationFilter authenticaionFilter;

    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private CustomUserDetail customUserDetail;

    private GoogleAuthenticationProvider googleAuthenticationProvider;


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(author -> {
                    author.requestMatchers("/api/auth/login").permitAll();
                    author.requestMatchers("/api/auth/login/google").permitAll();
                    author.requestMatchers("/api/auth/register").permitAll();
                    author.requestMatchers("/api/auth/change-password").permitAll();
                    author.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    author.requestMatchers("/api/user/count").permitAll();
                    author.requestMatchers("/api/author/count").permitAll();
                    author.requestMatchers("/api/book/count").permitAll();
                    author.requestMatchers("/api/category").permitAll();
                    author.requestMatchers("/api/sendmail").permitAll();
                    author.requestMatchers("/api/category/count").permitAll();
                    author.requestMatchers("/api/category/book/*").permitAll();
                    author.anyRequest().authenticated();
                })
                .httpBasic(Customizer.withDefaults()).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));
        http.addFilterBefore(authenticaionFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration,
                                                       AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetail).passwordEncoder(passwordEncoder());
        auth.authenticationProvider(googleAuthenticationProvider);  // Register custom provider
        return authenticationConfiguration.getAuthenticationManager();
    }
}
