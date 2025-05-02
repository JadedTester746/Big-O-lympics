package DAD.Big_Olympics;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // Optional: add custom finders if needed
}