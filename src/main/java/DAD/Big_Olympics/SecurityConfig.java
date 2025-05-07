package DAD.Big_Olympics;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // Define all the specific URL patterns before `anyRequest()`
                .requestMatchers("/h2-console/**", "/", "/index.html", "/webjars/**", "/css/**", "/ImageFolder/**", "/js/**").permitAll()
                .requestMatchers("/api/score").authenticated()  // /api/score should be authenticated
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**", "/api/score") // Disable CSRF for H2 Console
            )
            .headers(headers -> headers
                .frameOptions(frame -> frame
                    .sameOrigin() // Needed to allow H2 console to be displayed in a frame
                )
            )
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("/", true)
            );
    
        return http.build();
    }
}