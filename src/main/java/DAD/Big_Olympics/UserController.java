package DAD.Big_Olympics;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.Collections;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
     
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        String id = principal.getAttribute("id").toString();
        String name = principal.getAttribute("name");
        String email = principal.getAttribute("email");
        System.out.println("Name: " + name);
        // Save user info to DB if not already there
        userRepository.findById(id).orElseGet(() -> {
            User newUser = new User(id, name, email, 0);
            return userRepository.save(newUser);
        });
    


        return Collections.singletonMap("name", name);
    }
    public static void incrementPackets(User user){
        userRepository.findById();
    }
    
}