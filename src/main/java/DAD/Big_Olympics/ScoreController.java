package DAD.Big_Olympics;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.bind.annotation.*;


@RestController
public class ScoreController {

    @Autowired
    private UserController userController;  

    @PostMapping("/api/score")
    public ResponseEntity<String> uploadScore(@AuthenticationPrincipal OAuth2User principal,
                                              @RequestParam String testId,
                                              @RequestParam int score) {
        

        userController.completedTest(principal, testId, score);

        return ResponseEntity.ok("Score saved");
    }


}
