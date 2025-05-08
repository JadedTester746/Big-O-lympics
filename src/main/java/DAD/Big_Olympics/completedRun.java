package DAD.Big_Olympics;

import java.util.*;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

public class completedRun {
    String testID;
    double accuracy;
    int score;
    ArrayList<Integer> missedQuestions;

    public completedRun(String t, double a, int s){
        testID = t;
        accuracy = a;
        score = s;
        missedQuestions = new ArrayList<Integer>();
        
    }
}
