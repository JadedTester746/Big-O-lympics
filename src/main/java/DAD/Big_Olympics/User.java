package DAD.Big_Olympics;


import jakarta.persistence.*;
import java.util.*;


@Entity
@Table(name = "users")
public class User {

    @Id
    private String id; // GitHub ID or another unique identifier

    private String name;
    private String email;
    private int completedPackets;

    @ElementCollection
    private List<completedRun>runs;

    @Lob
    private byte[] profilePicture;

    // Getter & Setter
    public byte[] getProfilePicture() {
        return profilePicture;
        }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }   

    public String getName(){return name;}
    public String getEmail(){return email;}
    public int getPackets(){return completedPackets;}
    public List<completedRun> getRuns(){return runs;}
    public void setName(String name){this.name = name;}
    public void setEmail(String email){this.email = email;}
    public void setPacket(int packets){completedPackets = packets;}
    public void addRun(completedRun run){runs.add(run); run.runID = completedPackets; completedPackets++;}


    public User() {}

    public User(String id, String name, String email, int comp) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.completedPackets = comp;
        runs = new ArrayList<completedRun>();

    }


}
