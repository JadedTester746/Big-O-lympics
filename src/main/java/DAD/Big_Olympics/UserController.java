package DAD.Big_Olympics;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;

import java.io.IOException;
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
    @GetMapping("/namechange")
    public void changeName(@RequestParam String name, @AuthenticationPrincipal OAuth2User principal){
        User user = userRepository.findById(principal.getAttribute("id").toString()).get();
        user.setName(name);
        userRepository.save(user);
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

    @PostMapping("/uploadProfilePic")
    public ResponseEntity<?> uploadProfilePic(@AuthenticationPrincipal OAuth2User principal,
                                          @RequestParam("file") MultipartFile file) {
                                            System.out.println("RANNN!!!!!!!");
        String id = principal.getAttribute("id").toString();
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            try {
                user.setProfilePicture(file.getBytes());
                userRepository.save(user);
                return ResponseEntity.ok().build();
        }    catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving image.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @GetMapping("/profile-pic")
public ResponseEntity<byte[]> getProfilePic(@AuthenticationPrincipal OAuth2User principal) {
    String id = principal.getAttribute("id").toString();
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent() && optionalUser.get().getProfilePicture() != null) {
        byte[] image = optionalUser.get().getProfilePicture();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    
}