package DAD.Big_Olympics;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

import java.util.Collections;
import java.util.HashMap;

@RestController
public class UserController {

    final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
     
@GetMapping("/user")
public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
    String id = principal.getAttribute("id").toString();
    String name = principal.getAttribute("name");
    String email = principal.getAttribute("email");

    // Fetch from DB or create new if not found
    User user = userRepository.findById(id).orElseGet(() -> {
        User newUser = new User(id, name, email, 0);
        return userRepository.save(newUser);
    });

    // Return both name and completedPackets
    Map<String, Object> result = new HashMap<>();
    result.put("name", user.getName());
    result.put("completedPackets", user.getPackets());
    return result;
}

    public void incrementPackets(User user, completedRun run){

        user.addRun(run);
        System.out.println("Packets: " + user.getRuns());
        
    }

    @Transactional
    public void completedTest(OAuth2User principal, String testId, int score, double accuracy, String missed){
        String id = principal.getAttribute("id").toString();
        try{
            User user = userRepository.findById(id).get();
            incrementPackets(user, new completedRun(testId, accuracy, score, missed));
            userRepository.save(user);
            user = userRepository.findById(id).get();
            System.out.println("Packets: " + user.getRuns());
        }catch(Exception e){System.out.println("EXCEPTIN!!!!!!!!!!!!!!!!!"); e.printStackTrace();}



        

    }


    public UserRepository getData(){
        return userRepository;
    }

}