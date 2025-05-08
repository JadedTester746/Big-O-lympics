package DAD.Big_Olympics;

import java.util.*;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Embeddable;

@Embeddable
public class completedRun {
    String testID;
    double accuracy;
    int score;

    int runID;
    String missed;

    public completedRun(String t, double a, int s, String m){
        testID = t;
        accuracy = a;
        score = s;
        missed = m;

    }

    public completedRun(){}


    public String getTestID() {
        return testID;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public int getScore() {
        return score;
    }

    public String getMissed(){
        return missed;
    }
}
